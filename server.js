"use strict";

const fs = require("fs");
const path = require("path");
const express = require("express");
const Database = require("better-sqlite3");

const PORT = Number(process.env.PORT || 3080);
const DATABASE_PATH = process.env.DATABASE_PATH || path.join(__dirname, "data", "prep.db");
const CERTIFICATION_IDS = ["clf-c02", "saa-c03"];

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
`);

ensureStateRow();

const app = express();
app.use(express.json({ limit: "4mb" }));
app.use(express.static(__dirname));

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    databasePath: DATABASE_PATH
  });
});

app.get("/api/state", (_req, res) => {
  res.json(readState());
});

app.put("/api/state", (req, res) => {
  const normalized = normalizeState(req.body || {});
  writeState(normalized);
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

function ensureStateRow() {
  const existing = db.prepare("SELECT id FROM app_state WHERE id = 1").get();
  if (existing) {
    return;
  }

  db.prepare(`
    INSERT INTO app_state (id, state_json, updated_at)
    VALUES (1, ?, ?)
  `).run(JSON.stringify(defaultState), new Date().toISOString());
}

function readState() {
  const row = db.prepare("SELECT state_json FROM app_state WHERE id = 1").get();
  if (!row) {
    return structuredClone(defaultState);
  }

  try {
    return normalizeState(JSON.parse(row.state_json));
  } catch {
    return structuredClone(defaultState);
  }
}

function writeState(state) {
  db.prepare(`
    UPDATE app_state
    SET state_json = ?, updated_at = ?
    WHERE id = 1
  `).run(JSON.stringify(state), new Date().toISOString());
}

function normalizeState(value) {
  const base = structuredClone(defaultState);

  if (!isPlainObject(value)) {
    return base;
  }

  const migratedLegacyExam = normalizeExamState(value);
  const providedExams = isPlainObject(value.exams) ? value.exams : {};

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
    selectedExamId: CERTIFICATION_IDS.includes(value.selectedExamId) ? value.selectedExamId : null,
    currentView: normalizeView(value.currentView, CERTIFICATION_IDS.includes(value.selectedExamId) ? value.selectedExamId : null),
    exams
  };
}

function normalizeExamState(value) {
  const base = createDefaultExamState();
  return {
    ...base,
    ...(isPlainObject(value) ? value : {}),
    settings: {
      ...base.settings,
      ...(isPlainObject(value.settings) ? value.settings : {})
    },
    attempts: Array.isArray(value.attempts) ? value.attempts : [],
    currentExam: isPlainObject(value.currentExam) ? stripTimerHandle(value.currentExam) : null
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
