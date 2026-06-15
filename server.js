"use strict";

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const express = require("express");
const Database = require("better-sqlite3");

const PORT = Number(process.env.PORT || 3080);
const DATABASE_PATH = process.env.DATABASE_PATH || path.join(__dirname, "data", "prep.db");
const CERTIFICATION_IDS = ["clf-c02", "saa-c03"];
const SESSION_COOKIE_NAME = "aws_prep_session";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 30;
const ALLOW_SELF_REGISTRATION = process.env.ALLOW_SELF_REGISTRATION === "true";

const defaultState = createDefaultState();

fs.mkdirSync(path.dirname(DATABASE_PATH), { recursive: true });

const db = new Database(DATABASE_PATH);
db.pragma("journal_mode = WAL");
db.exec(`
  CREATE TABLE IF NOT EXISTS app_state (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    state_json TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    display_name TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    expires_at TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS user_state (
    user_id TEXT PRIMARY KEY,
    state_json TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
  );
`);

ensureLegacyStateRow();
cleanupExpiredSessions();

const app = express();
app.use(express.json({ limit: "4mb" }));
app.use(attachSessionContext);
app.use(express.static(__dirname));

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    databasePath: DATABASE_PATH,
    registrationOpen: isRegistrationOpen()
  });
});

app.get("/api/auth/session", (req, res) => {
  res.json(buildSessionPayload(req.user));
});

app.post("/api/auth/register", (req, res) => {
  if (!isRegistrationOpen()) {
    return res.status(403).json({
      ok: false,
      error: "registration_closed"
    });
  }

  const payload = normalizeCredentials(req.body || {});
  if (!payload.ok) {
    return res.status(400).json({
      ok: false,
      error: payload.error
    });
  }

  const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(payload.email);
  if (existing) {
    return res.status(409).json({
      ok: false,
      error: "email_in_use"
    });
  }

  const now = new Date().toISOString();
  const userId = crypto.randomUUID();
  db.prepare(`
    INSERT INTO users (id, email, password_hash, display_name, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(
    userId,
    payload.email,
    hashPassword(payload.password),
    payload.displayName,
    now,
    now
  );

  ensureUserStateRow(userId);
  const user = getUserById(userId);
  createSession(res, userId);
  return res.status(201).json(buildSessionPayload(user));
});

app.post("/api/auth/login", (req, res) => {
  const payload = normalizeCredentials(req.body || {}, { requireDisplayName: false });
  if (!payload.ok) {
    return res.status(400).json({
      ok: false,
      error: payload.error
    });
  }

  const user = db.prepare(`
    SELECT id, email, display_name AS displayName, password_hash AS passwordHash
    FROM users
    WHERE email = ?
  `).get(payload.email);

  if (!user || !verifyPassword(payload.password, user.passwordHash)) {
    return res.status(401).json({
      ok: false,
      error: "invalid_credentials"
    });
  }

  ensureUserStateRow(user.id);
  createSession(res, user.id);
  return res.json(buildSessionPayload({
    id: user.id,
    email: user.email,
    displayName: user.displayName
  }));
});

app.post("/api/auth/logout", (req, res) => {
  const sessionId = req.cookies[SESSION_COOKIE_NAME];
  if (sessionId) {
    db.prepare("DELETE FROM sessions WHERE id = ?").run(sessionId);
  }
  clearSessionCookie(res);
  res.json({
    ok: true
  });
});

app.get("/api/state", requireAuth, (req, res) => {
  res.json(readState(req.user.id));
});

app.put("/api/state", requireAuth, (req, res) => {
  const normalized = normalizeState(req.body || {});
  writeState(req.user.id, normalized);
  res.json({
    ok: true,
    state: normalized
  });
});

app.listen(PORT, () => {
  console.log(`AWS prep app listening on http://0.0.0.0:${PORT}`);
  console.log(`SQLite database: ${DATABASE_PATH}`);
});

function createDefaultExamState() {
  return {
    settings: {
      targetExamDate: "2026-06-30",
      targetScore: 85,
      questionsPerExam: 20,
      dailyPracticeGoal: 1,
      preferredMode: "full",
      focusDomainIds: []
    },
    attempts: [],
    currentExam: null
  };
}

function createDefaultState() {
  return {
    version: 2,
    selectedExamId: null,
    currentView: "home",
    exams: Object.fromEntries(CERTIFICATION_IDS.map((id) => [id, createDefaultExamState()]))
  };
}

function ensureLegacyStateRow() {
  const existing = db.prepare("SELECT id FROM app_state WHERE id = 1").get();
  if (existing) {
    return;
  }

  db.prepare(`
    INSERT INTO app_state (id, state_json, updated_at)
    VALUES (1, ?, ?)
  `).run(JSON.stringify(defaultState), new Date().toISOString());
}

function cleanupExpiredSessions() {
  db.prepare("DELETE FROM sessions WHERE expires_at <= ?").run(new Date().toISOString());
}

function attachSessionContext(req, _res, next) {
  cleanupExpiredSessions();
  req.cookies = parseCookies(req.headers.cookie || "");
  req.user = getUserBySession(req.cookies[SESSION_COOKIE_NAME]);
  next();
}

function requireAuth(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      ok: false,
      error: "unauthorized"
    });
  }
  return next();
}

function buildSessionPayload(user) {
  return {
    authenticated: Boolean(user),
    registrationOpen: isRegistrationOpen(),
    user: user ? {
      id: user.id,
      email: user.email,
      displayName: user.displayName
    } : null
  };
}

function isRegistrationOpen() {
  const row = db.prepare("SELECT COUNT(*) AS total FROM users").get();
  return row.total === 0 || ALLOW_SELF_REGISTRATION;
}

function normalizeCredentials(body, options = {}) {
  const requireDisplayName = options.requireDisplayName !== false;
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");
  const displayName = String(body.displayName || "").trim();

  if (!email || !email.includes("@")) {
    return { ok: false, error: "invalid_email" };
  }
  if (password.length < 8) {
    return { ok: false, error: "invalid_password" };
  }
  if (requireDisplayName && displayName.length < 2) {
    return { ok: false, error: "invalid_display_name" };
  }

  return {
    ok: true,
    email,
    password,
    displayName: displayName || email.split("@")[0]
  };
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const derived = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${derived}`;
}

function verifyPassword(password, serializedHash) {
  const [salt, expectedHash] = String(serializedHash || "").split(":");
  if (!salt || !expectedHash) {
    return false;
  }

  const provided = crypto.scryptSync(password, salt, 64);
  const expected = Buffer.from(expectedHash, "hex");
  return expected.length === provided.length && crypto.timingSafeEqual(expected, provided);
}

function createSession(res, userId) {
  const sessionId = crypto.randomUUID();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + SESSION_DURATION_MS);

  db.prepare(`
    INSERT INTO sessions (id, user_id, expires_at, created_at)
    VALUES (?, ?, ?, ?)
  `).run(sessionId, userId, expiresAt.toISOString(), now.toISOString());

  setSessionCookie(res, sessionId, expiresAt);
}

function setSessionCookie(res, sessionId, expiresAt) {
  const parts = [
    `${SESSION_COOKIE_NAME}=${encodeURIComponent(sessionId)}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Expires=${expiresAt.toUTCString()}`
  ];

  if (process.env.NODE_ENV === "production") {
    parts.push("Secure");
  }

  res.setHeader("Set-Cookie", parts.join("; "));
}

function clearSessionCookie(res) {
  res.setHeader("Set-Cookie", `${SESSION_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Expires=Thu, 01 Jan 1970 00:00:00 GMT`);
}

function parseCookies(rawCookieHeader) {
  if (!rawCookieHeader) {
    return {};
  }

  return rawCookieHeader
    .split(";")
    .map((item) => item.trim())
    .filter(Boolean)
    .reduce((acc, item) => {
      const separatorIndex = item.indexOf("=");
      if (separatorIndex === -1) {
        return acc;
      }
      const key = item.slice(0, separatorIndex).trim();
      const value = item.slice(separatorIndex + 1).trim();
      acc[key] = decodeURIComponent(value);
      return acc;
    }, {});
}

function getUserBySession(sessionId) {
  if (!sessionId) {
    return null;
  }

  return db.prepare(`
    SELECT u.id, u.email, u.display_name AS displayName
    FROM sessions s
    INNER JOIN users u ON u.id = s.user_id
    WHERE s.id = ?
      AND s.expires_at > ?
  `).get(sessionId, new Date().toISOString()) || null;
}

function getUserById(userId) {
  return db.prepare(`
    SELECT id, email, display_name AS displayName
    FROM users
    WHERE id = ?
  `).get(userId);
}

function ensureUserStateRow(userId) {
  const existing = db.prepare("SELECT user_id FROM user_state WHERE user_id = ?").get(userId);
  if (existing) {
    return;
  }

  const legacy = db.prepare("SELECT state_json FROM app_state WHERE id = 1").get();
  const fallbackState = legacy?.state_json ? safeParseState(legacy.state_json) : structuredClone(defaultState);
  db.prepare(`
    INSERT INTO user_state (user_id, state_json, updated_at)
    VALUES (?, ?, ?)
  `).run(userId, JSON.stringify(fallbackState), new Date().toISOString());
}

function readState(userId) {
  ensureUserStateRow(userId);
  const row = db.prepare("SELECT state_json FROM user_state WHERE user_id = ?").get(userId);
  if (!row) {
    return structuredClone(defaultState);
  }

  return safeParseState(row.state_json);
}

function writeState(userId, state) {
  ensureUserStateRow(userId);
  db.prepare(`
    UPDATE user_state
    SET state_json = ?, updated_at = ?
    WHERE user_id = ?
  `).run(JSON.stringify(state), new Date().toISOString(), userId);
}

function safeParseState(rawState) {
  try {
    return normalizeState(JSON.parse(rawState));
  } catch {
    return structuredClone(defaultState);
  }
}

function normalizeState(value) {
  const base = structuredClone(defaultState);

  if (!isPlainObject(value)) {
    return base;
  }

  const migratedLegacyExam = normalizeExamState(value);
  const providedExams = isPlainObject(value.exams) ? value.exams : {};

  const selectedExamId = CERTIFICATION_IDS.includes(value.selectedExamId) ? value.selectedExamId : null;
  const exams = Object.fromEntries(CERTIFICATION_IDS.map((id) => {
    const incoming = isPlainObject(providedExams[id]) ? providedExams[id] : null;
    if (incoming) {
      return [id, normalizeExamState(incoming)];
    }

    if (id === "clf-c02" && (Array.isArray(value.attempts) || isPlainObject(value.settings) || isPlainObject(value.currentExam))) {
      return [id, migratedLegacyExam];
    }

    return [id, structuredClone(base.exams[id])];
  }));

  return {
    version: 2,
    selectedExamId,
    currentView: normalizeView(value.currentView, selectedExamId),
    exams
  };
}

function normalizeExamState(value) {
  const safeValue = isPlainObject(value) ? value : {};
  const base = createDefaultExamState();
  return {
    ...base,
    ...safeValue,
    settings: {
      ...base.settings,
      ...(isPlainObject(safeValue.settings) ? safeValue.settings : {})
    },
    attempts: Array.isArray(safeValue.attempts) ? safeValue.attempts : [],
    currentExam: isPlainObject(safeValue.currentExam) ? stripTimerHandle(safeValue.currentExam) : null
  };
}

function stripTimerHandle(exam) {
  const { timerHandle: _ignoredTimerHandle, ...safeExam } = exam;
  return safeExam;
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function normalizeView(view, hasSelectedExam) {
  const allowedViews = ["home", "dashboard", "exam", "history", "settings"];
  if (!allowedViews.includes(view)) {
    return hasSelectedExam ? "dashboard" : "home";
  }
  if (hasSelectedExam && view === "home") {
    return "dashboard";
  }
  if (!hasSelectedExam && view !== "home") {
    return "home";
  }
  return view;
}
