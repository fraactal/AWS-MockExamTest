const certifications = window.APP_DATA.certifications;
const certificationIds = Object.keys(certifications);

const defaultExamSettings = {
  targetExamDate: "2026-06-30",
  targetScore: 85,
  questionsPerExam: 20,
  dailyPracticeGoal: 1,
  preferredMode: "full",
  focusDomainIds: []
};

let state = createDefaultState();
let saveQueue = Promise.resolve();
let currentView = "home";
let toastTimer = null;

const els = {
  workspaceShell: document.getElementById("workspace-shell"),
  selectedExamCode: document.getElementById("selected-exam-code"),
  selectedExamName: document.getElementById("selected-exam-name"),
  selectedExamCopy: document.getElementById("selected-exam-copy"),
  workspaceGreeting: document.getElementById("workspace-greeting"),
  workspaceDate: document.getElementById("workspace-date"),
  exitWorkspace: document.getElementById("exit-workspace"),
  workspaceSummary: document.getElementById("workspace-summary"),
  home: document.getElementById("home-view"),
  dashboard: document.getElementById("dashboard-view"),
  exam: document.getElementById("exam-view"),
  history: document.getElementById("history-view"),
  settings: document.getElementById("settings-view"),
  toastRoot: document.getElementById("toast-root"),
  navLinks: [...document.querySelectorAll(".nav-link")]
};

bindNavigation();
bootstrapApp();

function createDefaultState() {
  return {
    version: 2,
    selectedExamId: null,
    currentView: "home",
    exams: Object.fromEntries(certificationIds.map((examId) => [examId, createDefaultExamState(examId)]))
  };
}

function createDefaultExamState(examId) {
  const certification = certifications[examId];
  return {
    settings: {
      ...defaultExamSettings,
      ...(certification.appMeta.defaultSettings || {})
    },
    attempts: [],
    currentExam: null
  };
}

async function bootstrapApp() {
  renderLoadingState();
  try {
    const saved = await loadState();
    state = mergeState(saved);
  } catch {
    state = createDefaultState();
  }
  refreshSidebar();
  renderApp();
  currentView = state.currentView || (state.selectedExamId ? "dashboard" : "home");
  setView(currentView);
}

async function loadState() {
  const response = await fetch("/api/state", {
    headers: {
      Accept: "application/json"
    }
  });

  if (!response.ok) {
    throw new Error(`State request failed with ${response.status}`);
  }

  return response.json();
}

function mergeState(saved) {
  const base = createDefaultState();
  if (!saved || typeof saved !== "object") {
    return base;
  }

  const exams = { ...base.exams };
  const providedExams = isPlainObject(saved.exams) ? saved.exams : {};
  const legacyPractitioner = normalizeExamState("clf-c02", saved);

  certificationIds.forEach((examId) => {
    if (isPlainObject(providedExams[examId])) {
      exams[examId] = normalizeExamState(examId, providedExams[examId]);
      return;
    }

    if (
      examId === "clf-c02" &&
      (Array.isArray(saved.attempts) || isPlainObject(saved.settings) || isPlainObject(saved.currentExam))
    ) {
      exams[examId] = legacyPractitioner;
    }
  });

  return {
    version: 2,
    selectedExamId: certificationIds.includes(saved.selectedExamId) ? saved.selectedExamId : null,
    currentView: normalizeView(saved.currentView, certificationIds.includes(saved.selectedExamId) ? saved.selectedExamId : null),
    exams
  };
}

function normalizeExamState(examId, value) {
  const base = createDefaultExamState(examId);
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

function bindNavigation() {
  els.navLinks.forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.view));
  });
  els.exitWorkspace.addEventListener("click", exitWorkspace);
}

function showToast(title, message, tone = "success") {
  if (!els.toastRoot) {
    return;
  }

  if (toastTimer) {
    clearTimeout(toastTimer);
    toastTimer = null;
  }

  els.toastRoot.innerHTML = `
    <article class="toast toast-${tone}">
      <strong>${title}</strong>
      <p>${message}</p>
    </article>
  `;
  els.toastRoot.classList.add("visible");

  toastTimer = setTimeout(() => {
    els.toastRoot.classList.remove("visible");
    toastTimer = setTimeout(() => {
      els.toastRoot.innerHTML = "";
      toastTimer = null;
    }, 180);
  }, 3200);
}

function setView(viewId) {
  if (state.selectedExamId && viewId === "home") {
    viewId = "dashboard";
  }

  if (!state.selectedExamId && viewId !== "home") {
    viewId = "home";
  }

  const previousView = state.currentView;
  currentView = viewId;
  state.currentView = viewId;

  els.navLinks.forEach((button) => button.classList.toggle("active", button.dataset.view === viewId));
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("active", view.id === `${viewId}-view`);
  });

  if (viewId === "dashboard") {
    renderDashboard();
  }
  if (viewId === "exam") {
    renderExamView();
  }
  if (viewId === "history") {
    renderHistory();
  }
  if (viewId === "settings") {
    renderSettings();
  }

  if (previousView !== viewId) {
    void saveState();
  }
}

function renderLoadingState() {
  const loadingMarkup = `
    <article class="card">
      <p class="eyebrow">Inicializando</p>
      <h2>Cargando historial y configuracion</h2>
      <p class="muted">Conectando con la base SQLite del backend.</p>
    </article>
  `;

  els.home.innerHTML = loadingMarkup;
  els.dashboard.innerHTML = loadingMarkup;
  els.exam.innerHTML = loadingMarkup;
  els.history.innerHTML = loadingMarkup;
  els.settings.innerHTML = loadingMarkup;
}

function renderApp() {
  refreshSidebar();
  syncNavAvailability();
  renderHome();
  renderDashboard();
  renderExamView();
  renderHistory();
  renderSettings();
}

function refreshSidebar() {
  const certification = state.selectedExamId ? getCurrentCertification() : null;
  els.workspaceShell.classList.toggle("hidden", !certification);

  if (!certification) {
    els.selectedExamCode.textContent = "AWS Exams";
    els.selectedExamName.textContent = "Prep Tracker";
    els.selectedExamCopy.textContent = "Selecciona una certificacion para ver su progreso, documentos y simuladores asociados.";
    els.workspaceGreeting.textContent = "Tu espacio de estudio";
    els.workspaceDate.textContent = "Selecciona una certificacion";
    els.workspaceSummary.innerHTML = "";
    return;
  }

  const examState = getCurrentExamState();
  const metrics = buildMetrics(state.selectedExamId);
  els.selectedExamCode.textContent = certification.appMeta.examCode;
  els.selectedExamName.textContent = certification.appMeta.examName;
  els.selectedExamCopy.textContent = `Preparacion activa para ${certification.appMeta.examName}. Todo el progreso y el historial se muestran en contexto de esta certificacion.`;
  els.workspaceGreeting.textContent = `${certification.appMeta.examCode} activo`;
  els.workspaceDate.textContent = formatWorkspaceDate();
  const bestScore = examState.attempts.length ? Math.max(...examState.attempts.map((attempt) => attempt.scorePercent)) : 0;
  els.workspaceSummary.innerHTML = `
    <div class="summary-pill">
      <span class="summary-label">Intentos</span>
      <strong>${examState.attempts.length}</strong>
    </div>
    <div class="summary-pill">
      <span class="summary-label">Mejor puntaje</span>
      <strong>${bestScore}%</strong>
    </div>
    <div class="summary-pill">
      <span class="summary-label">Meta</span>
      <strong>${examState.settings.targetScore}%</strong>
    </div>
    <div class="summary-pill">
      <span class="summary-label">Readiness</span>
      <strong>${metrics.readiness}%</strong>
    </div>
    <div class="summary-pill">
      <span class="summary-label">Promedio reciente</span>
      <strong>${metrics.recentAverage}%</strong>
    </div>
    <div class="summary-pill">
      <span class="summary-label">Racha de practica</span>
      <strong>${metrics.streak} dia${metrics.streak === 1 ? "" : "s"}</strong>
    </div>
  `;
}

function getCurrentCertification() {
  return certifications[state.selectedExamId];
}

function getCurrentExamState() {
  return state.exams[state.selectedExamId];
}

function syncNavAvailability() {
  const hasSelection = Boolean(state.selectedExamId);
  els.navLinks.forEach((button) => {
    button.disabled = !hasSelection;
  });
}

function getDomainMap(certification) {
  return Object.fromEntries(certification.blueprint.domains.map((domain) => [domain.id, domain]));
}

function getQuestionMap(certification) {
  return Object.fromEntries(certification.questionBank.map((question) => [question.id, question]));
}

function getQuestionUsageModes(question) {
  return Array.isArray(question.usageModes) && question.usageModes.length ? question.usageModes : ["full", "reinforcement"];
}

function getEligibleQuestionPool(certification, mode) {
  const allowedMode = mode === "full" ? "full" : "reinforcement";
  return certification.questionBank.filter((question) => getQuestionUsageModes(question).includes(allowedMode));
}

function allocateCountsByWeight(domains, totalCount) {
  if (!domains.length || totalCount <= 0) {
    return new Map();
  }

  const totalWeight = domains.reduce((sum, domain) => sum + (domain.weight || 0), 0) || domains.length;
  const allocations = domains.map((domain) => {
    const raw = totalCount * ((domain.weight || 0) / totalWeight || (1 / domains.length));
    return {
      id: domain.id,
      count: Math.floor(raw),
      remainder: raw - Math.floor(raw)
    };
  });

  let allocated = allocations.reduce((sum, entry) => sum + entry.count, 0);
  const ranked = [...allocations].sort((a, b) => b.remainder - a.remainder);
  let index = 0;
  while (allocated < totalCount && ranked.length) {
    ranked[index % ranked.length].count += 1;
    allocated += 1;
    index += 1;
  }

  return new Map(allocations.map((entry) => [entry.id, entry.count]));
}

function drawQuestions(questionPool, count, excludedIds = new Set()) {
  return shuffle(questionPool.filter((question) => !excludedIds.has(question.id))).slice(0, count);
}

function topUpQuestionSelection(selected, questionPool, totalCount) {
  if (selected.length >= totalCount) {
    return selected.slice(0, totalCount);
  }

  const excludedIds = new Set(selected.map((question) => question.id));
  return [...selected, ...drawQuestions(questionPool, totalCount - selected.length, excludedIds)];
}

function buildStratifiedQuestionSet(certification, questionPool, totalCount, domainIds, desiredCounts = null) {
  const targetDomains = certification.blueprint.domains.filter((domain) => domainIds.includes(domain.id));
  const allocationMap = desiredCounts || allocateCountsByWeight(targetDomains, totalCount);
  const selected = [];
  const selectedIds = new Set();

  targetDomains.forEach((domain) => {
    const domainPool = questionPool.filter((question) => question.domainId === domain.id);
    const domainTarget = allocationMap.get(domain.id) || 0;
    const picked = drawQuestions(domainPool, domainTarget, selectedIds);
    picked.forEach((question) => selectedIds.add(question.id));
    selected.push(...picked);
  });

  const fallbackPool = questionPool.filter((question) => domainIds.includes(question.domainId));
  return topUpQuestionSelection(selected, fallbackPool, totalCount);
}

function getQuestionBankStats(certification) {
  const fullPool = getEligibleQuestionPool(certification, "full");
  const reinforcementPool = getEligibleQuestionPool(certification, "reinforcement");
  const targets = certification.appMeta.questionBankTargets || { full: certification.appMeta.simulatedQuestionCount, reinforcement: 30 };

  return {
    full: {
      available: fullPool.length,
      target: targets.full
    },
    reinforcement: {
      available: reinforcementPool.length,
      target: targets.reinforcement
    }
  };
}

function getBlueprintFileName(certification) {
  const primaryDoc = certification.documents.find((document) => document.type === "Blueprint oficial");
  return primaryDoc ? primaryDoc.title : certification.appMeta.examCode;
}

function renderHome() {
  els.home.innerHTML = `
    <section class="home-hero">
      <p class="eyebrow">Inicio</p>
      <h2>Elige el examen AWS que quieres preparar hoy</h2>
      <p class="muted">Cada certificacion mantiene su propio historial, objetivos y examen en curso dentro de la misma base SQLite. Al seleccionar una, el panel lateral cambiara para mostrar sus indicadores y accesos relacionados.</p>
    </section>

    <div class="grid columns-2" style="margin-top:18px;">
      ${certificationIds.map((examId) => renderCertificationCard(examId)).join("")}
    </div>
  `;

  document.querySelectorAll("[data-select-exam]").forEach((button) => {
    button.addEventListener("click", async () => {
      await selectExam(button.dataset.selectExam);
    });
  });
}

function renderCertificationCard(examId) {
  const certification = certifications[examId];
  const examState = state.exams[examId];
  const metrics = buildMetrics(examId);
  const activeLabel = examId === state.selectedExamId ? "Activa" : "Disponible";
  const latestAttempt = [...examState.attempts].sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))[0];

  return `
    <article class="card cert-card ${examId === state.selectedExamId ? "is-active" : ""}">
      <p class="eyebrow">${certification.appMeta.examCode}</p>
      <h3 class="section-title">${certification.appMeta.examName}</h3>
      <p class="muted">${activeLabel} · ${certification.appMeta.simulatedQuestionCount} preguntas · ${certification.appMeta.simulatedTimeMinutes} minutos</p>
      <div class="grid columns-3" style="margin-top:16px;">
        <div>
          <p class="muted">Readiness</p>
          <p class="metric-value">${metrics.readiness}%</p>
        </div>
        <div>
          <p class="muted">Promedio</p>
          <p class="metric-value">${metrics.recentAverage}%</p>
        </div>
        <div>
          <p class="muted">Intentos</p>
          <p class="metric-value">${examState.attempts.length}</p>
        </div>
      </div>
      <p class="muted" style="margin-top:14px;">${latestAttempt ? `Ultimo resultado: ${latestAttempt.scorePercent}% el ${latestAttempt.completedAtLabel}` : "Sin intentos aun en esta certificacion."}</p>
      <div class="action-row" style="margin-top:14px;">
        <button class="primary-button" data-select-exam="${examId}">Entrar a esta certificacion</button>
      </div>
    </article>
  `;
}

async function selectExam(examId, moveToDashboard = true) {
  if (!certificationIds.includes(examId)) {
    return;
  }
  state.selectedExamId = examId;
  state.currentView = moveToDashboard ? "dashboard" : "home";
  refreshSidebar();
  renderApp();
  await saveState();
  setView(moveToDashboard ? "dashboard" : "home");
  showToast("Certificacion activa", `Entraste a ${certifications[examId].appMeta.examName}.`);
}

async function exitWorkspace() {
  state.selectedExamId = null;
  state.currentView = "home";
  refreshSidebar();
  renderApp();
  await saveState();
  setView("home");
  showToast("Volviste al inicio", "Puedes cambiar de certificacion cuando quieras.");
}

function formatWorkspaceDate() {
  return new Intl.DateTimeFormat("es-CL", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(new Date());
}

function renderDashboard() {
  if (!state.selectedExamId) {
    els.dashboard.innerHTML = `
      <article class="card">
        <p class="eyebrow">Resumen</p>
        <h2>Selecciona primero una certificacion</h2>
        <p class="muted">El panel de indicadores se activara cuando elijas el examen desde Inicio.</p>
      </article>
    `;
    return;
  }

  const certification = getCurrentCertification();
  const examState = getCurrentExamState();
  const metrics = buildMetrics(state.selectedExamId);
  const focusDomains = buildFocusDomains(state.selectedExamId);
  const recommendation = buildStudyRecommendation(examState, certification, focusDomains, metrics);

  els.dashboard.innerHTML = `
    <div class="page-header">
      <div>
        <p class="eyebrow">Ruta diaria</p>
        <h2>${certification.appMeta.examName}</h2>
        <p class="muted">Plan de practica especifico por certificacion, alineado a su blueprint y sus documentos locales.</p>
      </div>
      <div class="action-row">
        <button class="primary-button" id="dashboard-start-full">Iniciar simulacion completa</button>
        <button class="secondary-button" id="dashboard-start-weak">Practicar debilidades</button>
      </div>
    </div>

    <div class="grid columns-2" style="margin-top: 28px;">
      <article class="card">
        <div class="page-header">
          <div>
            <p class="eyebrow">Foco por dominio</p>
            <h3 class="section-title">Tasa de acierto y brechas</h3>
          </div>
        </div>
        <div class="domain-list">
          ${focusDomains.map((domain) => `
            <div class="domain-item">
              <div class="page-header">
                <div>
                  <strong>${domain.name}</strong>
                  <p class="muted">${domain.correctRate}% de acierto · objetivo ${domain.weight}% del examen</p>
                </div>
                <span class="chip">${domain.questionsSeen} preguntas vistas</span>
              </div>
              <div class="bar"><span style="width:${domain.correctRate}%"></span></div>
              <p class="muted">${domain.studyHint}</p>
            </div>
          `).join("")}
        </div>
      </article>

      <article class="card">
        <p class="eyebrow">Siguiente iteracion</p>
        <h3 class="section-title">${recommendation.title}</h3>
        <p>${recommendation.body}</p>
        <div class="notice">${recommendation.note}</div>
        <div class="document-list document-list-secondary" style="margin-top:22px;">
          <div class="document-item">
            <strong>${getBlueprintFileName(certification)}</strong>
            <p class="muted">Documento rector para dominios, cantidad de preguntas y duracion de la simulacion ${certification.appMeta.examCode}.</p>
          </div>
          ${certification.documents.slice(1, 4).map((document) => `
            <div class="document-item">
              <strong>${document.title}</strong>
              <p class="muted">${document.type} · ${document.usage}</p>
            </div>
          `).join("")}
        </div>
      </article>
    </div>
  `;

  document.getElementById("dashboard-start-full").addEventListener("click", () => {
    startExam("full");
  });
  document.getElementById("dashboard-start-weak").addEventListener("click", () => {
    startExam("weak");
  });
}

function renderExamView() {
  if (!state.selectedExamId) {
    els.exam.innerHTML = `
      <article class="card">
        <p class="eyebrow">Examen</p>
        <h2>No hay certificacion activa</h2>
        <p class="muted">Selecciona un examen desde Inicio para abrir los modos de practica y simulacion.</p>
      </article>
    `;
    return;
  }

  const certification = getCurrentCertification();
  const examState = getCurrentExamState();
  const focusDomains = buildFocusDomains(state.selectedExamId);
  const bankStats = getQuestionBankStats(certification);

  if (!examState.currentExam) {
    const weakDomains = focusDomains.filter((domain) => domain.correctRate < 75).map((domain) => domain.id);
    const recommendedWeak = weakDomains.length ? weakDomains.join(", ") : "Sin dominio critico aun";
    els.exam.innerHTML = `
      <div class="page-header">
        <div>
          <p class="eyebrow">Simulador</p>
          <h2>Construir el siguiente examen</h2>
          <p class="muted">Modo completo segun ${certification.appMeta.simulatedQuestionCount} preguntas y ${certification.appMeta.simulatedTimeMinutes} minutos para ${certification.appMeta.examCode}.</p>
        </div>
      </div>

      <div class="grid columns-3">
        <article class="card">
          <p class="eyebrow">Modo principal</p>
          <h3 class="section-title">Examen completo</h3>
          <p>Simulacion estilo certificacion real con distribucion por dominios basada en el blueprint activo.</p>
          <button class="primary-button start-mode" data-mode="full">Iniciar examen completo</button>
        </article>
        <article class="card">
          <p class="eyebrow">Modo rapido</p>
          <h3 class="section-title">Mini test por dominio</h3>
          <p>Usa tu configuracion de practica para lanzar un test corto en los dominios que te interesan.</p>
          <button class="secondary-button start-mode" data-mode="domain">Iniciar mini test</button>
        </article>
        <article class="card">
          <p class="eyebrow">Modo refuerzo</p>
          <h3 class="section-title">Debilidades previas</h3>
          <p>Prioriza las brechas historicas detectadas. Foco actual: ${recommendedWeak}.</p>
          <button class="secondary-button start-mode" data-mode="weak">Iniciar refuerzo</button>
        </article>
      </div>

      <article class="card" style="margin-top:18px;">
        <p class="eyebrow">Cobertura del banco</p>
        <div class="grid columns-2">
          <div>
            <h3 class="section-title">Simulacion completa</h3>
            <p class="muted">${bankStats.full.available} preguntas cargadas de una meta recomendada de ${bankStats.full.target}+ para ${certification.appMeta.examCode}.</p>
          </div>
          <div>
            <h3 class="section-title">Refuerzo aleatorio</h3>
            <p class="muted">${bankStats.reinforcement.available} preguntas disponibles de una meta recomendada de ${bankStats.reinforcement.target}+ para practicas de variacion sostenida.</p>
          </div>
        </div>
      </article>

      <article class="card" style="margin-top:18px;">
        <p class="eyebrow">Notas de fidelidad</p>
        <ul>
          ${certification.appMeta.assumptions.map((assumption) => `<li>${assumption}</li>`).join("")}
        </ul>
      </article>
    `;

    document.querySelectorAll(".start-mode").forEach((button) => {
      button.addEventListener("click", () => startExam(button.dataset.mode));
    });
    return;
  }

  if (examState.currentExam.status === "finished") {
    renderFinishedExam();
    return;
  }

  const activeExam = examState.currentExam;
  const questionMap = getQuestionMap(certification);
  const domainMap = getDomainMap(certification);
  const question = activeExam.questions[activeExam.currentIndex];
  const questionDef = questionMap[question.id];
  const remainingSeconds = getRemainingSeconds(activeExam);
  const minutes = String(Math.floor(remainingSeconds / 60)).padStart(2, "0");
  const seconds = String(remainingSeconds % 60).padStart(2, "0");
  const lowTime = remainingSeconds <= 600 ? "low" : "";

  els.exam.innerHTML = `
    <div class="page-header">
      <div>
        <p class="eyebrow">Examen activo</p>
        <h2>${buildExamTitle(activeExam.mode, certification)}</h2>
        <p class="muted">${activeExam.questions.length} preguntas · ${describeExamScope(activeExam.mode)}</p>
      </div>
      <div>
        <div class="timer ${lowTime}">${minutes}:${seconds}</div>
        <p class="muted">Tiempo restante</p>
      </div>
    </div>

    <div class="exam-layout">
      <article class="question-card">
        <p class="muted">Pregunta ${activeExam.currentIndex + 1} de ${activeExam.questions.length}</p>
        <div class="question-meta">
          <span class="chip">${domainMap[questionDef.domainId].name}</span>
          <span class="chip">${questionDef.topic}</span>
          <span class="chip">${questionDef.difficulty}</span>
        </div>
        <h3>${questionDef.prompt}</h3>
        <div class="option-list">
          ${questionDef.options.map((option, index) => `
            <button class="option-button ${question.selected === index ? "selected" : ""}" data-option="${index}">
              <strong>${String.fromCharCode(65 + index)}.</strong> ${option}
            </button>
          `).join("")}
        </div>
        <div class="question-actions" style="margin-top:18px;">
          <button class="ghost-button" id="prev-question" ${activeExam.currentIndex === 0 ? "disabled" : ""}>Anterior</button>
          <button class="ghost-button" id="next-question">${activeExam.currentIndex === activeExam.questions.length - 1 ? "Revisar" : "Siguiente"}</button>
          <button class="primary-button" id="finish-exam">Finalizar examen</button>
        </div>
      </article>

      <aside class="question-nav">
        <article class="card">
          <p class="eyebrow">Progreso</p>
          <p class="muted">${countAnswered(activeExam)} respondidas · ${activeExam.questions.length - countAnswered(activeExam)} pendientes</p>
          <div class="nav-pills">
            ${activeExam.questions.map((item, index) => `
              <button class="pill-button ${item.selected !== null ? "answered" : ""} ${index === activeExam.currentIndex ? "active current" : ""}" data-jump="${index}">
                ${index + 1}
              </button>
            `).join("")}
          </div>
        </article>
        <article class="card">
          <p class="eyebrow">Trazabilidad</p>
          <p><strong>Guia oficial:</strong> ${questionDef.source.primaryFile}</p>
          <p class="muted">${questionDef.source.primarySection}</p>
          <p><strong>Documento para reforzar:</strong> ${questionDef.source.studyFile}</p>
          <p class="muted">${questionDef.source.studySection}</p>
        </article>
      </aside>
    </div>
  `;

  document.querySelectorAll("[data-option]").forEach((button) => {
    button.addEventListener("click", async () => {
      getCurrentExamState().currentExam.questions[getCurrentExamState().currentExam.currentIndex].selected = Number(button.dataset.option);
      await saveState();
      renderExamView();
    });
  });

  document.querySelectorAll("[data-jump]").forEach((button) => {
    button.addEventListener("click", async () => {
      getCurrentExamState().currentExam.currentIndex = Number(button.dataset.jump);
      await saveState();
      renderExamView();
    });
  });

  document.getElementById("prev-question").addEventListener("click", async () => {
    getCurrentExamState().currentExam.currentIndex = Math.max(0, getCurrentExamState().currentExam.currentIndex - 1);
    await saveState();
    renderExamView();
  });

  document.getElementById("next-question").addEventListener("click", async () => {
    getCurrentExamState().currentExam.currentIndex = Math.min(getCurrentExamState().currentExam.questions.length - 1, getCurrentExamState().currentExam.currentIndex + 1);
    await saveState();
    renderExamView();
  });

  document.getElementById("finish-exam").addEventListener("click", finishExam);

  if (getCurrentExamState().currentExam.timerHandle) {
    clearTimeout(getCurrentExamState().currentExam.timerHandle);
  }

  getCurrentExamState().currentExam.timerHandle = setTimeout(() => {
    const currentExam = getCurrentExamState().currentExam;
    if (!currentExam || currentExam.status !== "active") {
      return;
    }
    if (getRemainingSeconds(currentExam) <= 0) {
      finishExam();
      return;
    }
    renderExamView();
  }, 1000);
}

function renderFinishedExam() {
  const certification = getCurrentCertification();
  const attempt = getCurrentExamState().currentExam.result;
  const weakest = attempt.domainResults.filter((item) => item.correctRate < 75).slice(0, 2);

  els.exam.innerHTML = `
    <div class="page-header">
      <div>
        <p class="eyebrow">Resultado</p>
        <h2>${attempt.scorePercent}% de acierto</h2>
        <p class="muted">${attempt.correctCount} correctas de ${attempt.totalQuestions} · ${attempt.completedAtLabel}</p>
      </div>
      <div class="action-row">
        <button class="primary-button" id="new-full-exam">Nuevo examen completo</button>
        <button class="secondary-button" id="new-weak-exam">Reforzar debilidades</button>
      </div>
    </div>

    <div class="grid columns-4">
      <article class="result-card">
        <p class="muted">Puntaje</p>
        <p class="metric-value">${attempt.scorePercent}%</p>
      </article>
      <article class="result-card">
        <p class="muted">Tiempo usado</p>
        <p class="metric-value">${attempt.timeUsedLabel}</p>
      </article>
      <article class="result-card">
        <p class="muted">Dominio a reforzar</p>
        <p class="metric-value">${weakest[0] ? weakest[0].name.split(" ")[0] : "OK"}</p>
      </article>
      <article class="result-card">
        <p class="muted">Meta configurada</p>
        <p class="metric-value">${getCurrentExamState().settings.targetScore}%</p>
      </article>
    </div>

    <div class="grid columns-2">
      <article class="result-card">
        <p class="eyebrow">Resumen por dominio</p>
        <div class="domain-list">
          ${attempt.domainResults.map((domain) => `
            <div class="domain-item">
              <div class="page-header">
                <div>
                  <strong>${domain.name}</strong>
                  <p class="muted">${domain.correct} correctas de ${domain.total}</p>
                </div>
                <span class="chip">${domain.correctRate}%</span>
              </div>
              <div class="bar"><span style="width:${domain.correctRate}%"></span></div>
              <p class="muted">Refuerzo sugerido: ${domain.studyFile}</p>
            </div>
          `).join("")}
        </div>
      </article>

      <article class="result-card">
        <p class="eyebrow">Recomendacion de siguiente iteracion</p>
        <h3 class="section-title">${attempt.nextIteration.title}</h3>
        <p>${attempt.nextIteration.body}</p>
        <div class="notice">${attempt.nextIteration.note}</div>
        <p class="muted" style="margin-top:12px;">Certificacion: ${certification.appMeta.examName}</p>
      </article>
    </div>

    <article class="result-card" style="margin-top:18px;">
      <p class="eyebrow">Revision pregunta a pregunta</p>
      <div class="review-list">
        ${attempt.review.map((item) => `
          <div class="review-item ${item.isCorrect ? "correct" : "incorrect"}">
            <strong>${item.index}. ${item.prompt}</strong>
            <p class="review-answer">Tu respuesta: ${item.selectedLabel}</p>
            <p class="review-answer">Respuesta correcta: ${item.answerLabel}</p>
            <p>${item.explanation}</p>
            <p class="muted"><strong>Dominio:</strong> ${item.domainName} · <strong>Tema:</strong> ${item.topic}</p>
            <p class="muted"><strong>Estudia en:</strong> ${item.source.primaryFile} / ${item.source.primarySection}</p>
            <p class="muted"><strong>Adjunto sugerido:</strong> ${item.source.studyFile} / ${item.source.studySection}</p>
          </div>
        `).join("")}
      </div>
    </article>
  `;

  document.getElementById("new-full-exam").addEventListener("click", () => startExam("full"));
  document.getElementById("new-weak-exam").addEventListener("click", () => startExam("weak"));
}

function renderHistory() {
  if (!state.selectedExamId) {
    els.history.innerHTML = `
      <article class="card">
        <p class="eyebrow">Historial</p>
        <h2>No hay historial visible aun</h2>
        <p class="muted">Selecciona una certificacion para consultar sus intentos guardados y resultados persistentes.</p>
      </article>
    `;
    return;
  }

  const attempts = [...getCurrentExamState().attempts].sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
  const certification = getCurrentCertification();

  els.history.innerHTML = `
    <div class="page-header">
      <div>
        <p class="eyebrow">Historial</p>
        <h2>Examenes realizados</h2>
        <p class="muted">Seguimiento de evolucion para ${certification.appMeta.examCode}. Tu diagnostico anterior queda asociado a su certificacion correspondiente.</p>
      </div>
      <div class="action-row">
        <button class="ghost-button" id="clear-history">Limpiar historial de esta certificacion</button>
      </div>
    </div>

    <article class="history-card">
      ${attempts.length ? `
        <div class="history-list">
          ${attempts.map((attempt) => `
            <div class="history-item">
              <div class="page-header">
                <div>
                  <strong>${attempt.completedAtLabel}</strong>
                  <p class="muted">${buildExamTitle(attempt.mode, certification)} · ${attempt.totalQuestions} preguntas</p>
                </div>
                <span class="chip">${attempt.scorePercent}%</span>
              </div>
              <p class="muted">Foco recomendado: ${attempt.focusDomains.join(", ") || "Sin dominio critico"}</p>
              <p class="muted">Tiempo usado: ${attempt.timeUsedLabel}</p>
            </div>
          `).join("")}
        </div>
      ` : `
        <p class="muted">Todavia no hay examenes completados para esta certificacion.</p>
      `}
    </article>
  `;

  document.getElementById("clear-history").addEventListener("click", async () => {
    const examState = getCurrentExamState();
    examState.attempts = [];
    if (examState.currentExam?.status === "finished") {
      examState.currentExam = null;
    }
    await saveState();
    renderApp();
    showToast("Historial limpiado", "Se eliminaron los intentos y el ultimo resultado guardado de esta certificacion.");
  });
}

function renderSettings() {
  if (!state.selectedExamId) {
    els.settings.innerHTML = `
      <article class="card">
        <p class="eyebrow">Objetivos</p>
        <h2>Primero elige una certificacion</h2>
        <p class="muted">Los objetivos y la configuracion de avance son independientes por examen.</p>
      </article>
    `;
    return;
  }

  const certification = getCurrentCertification();
  const examState = getCurrentExamState();
  const options = certification.blueprint.domains.map((domain) => `
    <label class="chip">
      <input type="checkbox" value="${domain.id}" ${examState.settings.focusDomainIds.includes(domain.id) ? "checked" : ""}>
      ${domain.name}
    </label>
  `).join("");

  els.settings.innerHTML = `
    <div class="page-header">
      <div>
        <p class="eyebrow">Objetivos</p>
        <h2>Configuracion de avance</h2>
        <p class="muted">Estos objetivos aplican solo a ${certification.appMeta.examName}.</p>
      </div>
    </div>

    <article class="settings-card">
      <form id="settings-form" class="settings-grid">
        <div class="grid columns-2">
          <label class="form-field">
            <span>Fecha objetivo del examen</span>
            <input type="date" name="targetExamDate" value="${examState.settings.targetExamDate}">
          </label>
          <label class="form-field">
            <span>Puntaje meta (%)</span>
            <input type="number" name="targetScore" min="60" max="100" value="${examState.settings.targetScore}">
          </label>
          <label class="form-field">
            <span>Preguntas por practica corta</span>
            <input type="number" name="questionsPerExam" min="10" max="30" value="${examState.settings.questionsPerExam}">
          </label>
          <label class="form-field">
            <span>Examenes diarios</span>
            <input type="number" name="dailyPracticeGoal" min="1" max="5" value="${examState.settings.dailyPracticeGoal}">
          </label>
        </div>

        <div class="form-field">
          <span>Dominios prioritarios</span>
          <div class="mode-row">${options}</div>
        </div>

        <div class="action-row">
          <button class="primary-button" type="submit">Guardar objetivos</button>
          <button class="ghost-button" type="button" id="reset-settings">Restaurar</button>
        </div>
      </form>
    </article>
  `;

  document.getElementById("settings-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    examState.settings.targetExamDate = formData.get("targetExamDate");
    examState.settings.targetScore = Number(formData.get("targetScore"));
    examState.settings.questionsPerExam = Number(formData.get("questionsPerExam"));
    examState.settings.dailyPracticeGoal = Number(formData.get("dailyPracticeGoal"));
    examState.settings.focusDomainIds = [...event.currentTarget.querySelectorAll("input[type='checkbox']:checked")].map((input) => input.value);
    await saveState();
    renderApp();
    showToast("Objetivos guardados", "La configuracion de avance quedo registrada.");
  });

  document.getElementById("reset-settings").addEventListener("click", async () => {
    state.exams[state.selectedExamId].settings = createDefaultExamState(state.selectedExamId).settings;
    await saveState();
    renderApp();
    showToast("Objetivos restaurados", "Se recupero la configuracion base de esta certificacion.");
  });
}

async function startExam(mode) {
  const certification = getCurrentCertification();
  const examState = getCurrentExamState();
  if (examState.currentExam?.timerHandle) {
    clearTimeout(examState.currentExam.timerHandle);
  }
  const questions = buildExamQuestions(mode, certification, examState);
  const durationMinutes = mode === "full"
    ? certification.appMeta.simulatedTimeMinutes
    : Math.max(15, Math.round(questions.length * 1.5));

  examState.currentExam = {
    certificationId: state.selectedExamId,
    mode,
    status: "active",
    currentIndex: 0,
    durationMinutes,
    startedAt: new Date().toISOString(),
    endsAt: new Date(Date.now() + durationMinutes * 60 * 1000).toISOString(),
    questions: questions.map((question) => ({ id: question.id, selected: null }))
  };
  state.currentView = "exam";
  await saveState();
  setView("exam");
  renderExamView();
  showToast("Examen iniciado", `${buildExamTitle(mode, certification)} listo con ${questions.length} preguntas.`);
}

function buildExamQuestions(mode, certification, examState) {
  const fullPool = getEligibleQuestionPool(certification, "full");
  const reinforcementPool = getEligibleQuestionPool(certification, "reinforcement");
  const practiceQuestionCount = Math.max(10, Math.min(30, examState.settings.questionsPerExam));
  const focusDomains = buildFocusDomains(state.selectedExamId);

  if (mode === "domain") {
    const targetDomainId = examState.settings.focusDomainIds[0] || focusDomains[0]?.id || certification.blueprint.domains[0].id;
    return buildStratifiedQuestionSet(certification, reinforcementPool, practiceQuestionCount, [targetDomainId]);
  }

  if (mode === "weak") {
    const weakIds = focusDomains.filter((domain) => domain.correctRate < 75).map((domain) => domain.id);
    const fallbackIds = examState.settings.focusDomainIds.length ? examState.settings.focusDomainIds : certification.blueprint.domains.slice(0, 2).map((domain) => domain.id);
    const targetIds = weakIds.length ? weakIds : fallbackIds;
    return buildStratifiedQuestionSet(certification, reinforcementPool, practiceQuestionCount, targetIds);
  }

  return buildStratifiedQuestionSet(
    certification,
    fullPool,
    certification.appMeta.simulatedQuestionCount,
    certification.blueprint.domains.map((domain) => domain.id),
    new Map(certification.blueprint.domains.map((domain) => [domain.id, domain.questionTarget]))
  );
}

async function finishExam() {
  const certification = getCurrentCertification();
  const examState = getCurrentExamState();
  if (!examState.currentExam || examState.currentExam.status !== "active") {
    return;
  }

  const activeExam = examState.currentExam;
  if (activeExam.timerHandle) {
    clearTimeout(activeExam.timerHandle);
  }

  const questionMap = getQuestionMap(certification);
  const domainMap = getDomainMap(certification);
  const finishedAt = new Date();
  const review = activeExam.questions.map((question, index) => {
    const definition = questionMap[question.id];
    const isCorrect = question.selected === definition.answer;
    return {
      index: index + 1,
      questionId: question.id,
      prompt: definition.prompt,
      topic: definition.topic,
      domainId: definition.domainId,
      domainName: domainMap[definition.domainId].name,
      isCorrect,
      selected: question.selected,
      selectedLabel: question.selected === null ? "Sin responder" : definition.options[question.selected],
      answerLabel: definition.options[definition.answer],
      explanation: definition.explanation,
      source: definition.source
    };
  });

  const correctCount = review.filter((item) => item.isCorrect).length;
  const totalQuestions = review.length;
  const scorePercent = Math.round((correctCount / totalQuestions) * 100);
  const timeUsedMinutes = Math.max(1, Math.round((new Date(finishedAt).getTime() - new Date(activeExam.startedAt).getTime()) / 60000));
  const domainResults = certification.blueprint.domains.map((domain) => {
    const domainReview = review.filter((item) => item.domainId === domain.id);
    const correct = domainReview.filter((item) => item.isCorrect).length;
    const total = domainReview.length;
    return {
      id: domain.id,
      name: domain.name,
      correct,
      total,
      correctRate: total ? Math.round((correct / total) * 100) : 0,
      studyFile: domain.studyFile,
      officialSection: domain.officialSection
    };
  }).filter((item) => item.total > 0);

  const focusDomains = domainResults
    .filter((domain) => domain.correctRate < 75)
    .sort((a, b) => a.correctRate - b.correctRate)
    .map((domain) => domain.name);

  const nextIteration = buildStudyRecommendation(examState, certification, domainResults, { recentAverage: scorePercent });
  const attempt = {
    id: crypto.randomUUID(),
    certificationId: state.selectedExamId,
    mode: activeExam.mode,
    totalQuestions,
    correctCount,
    scorePercent,
    completedAt: finishedAt.toISOString(),
    completedAtLabel: formatDateTime(finishedAt),
    timeUsedMinutes,
    timeUsedLabel: `${timeUsedMinutes} min`,
    focusDomains,
    domainResults,
    nextIteration,
    review
  };

  examState.attempts.push(attempt);
  examState.currentExam = {
    ...activeExam,
    status: "finished",
    result: attempt
  };
  await saveState();
  renderApp();
  setView("exam");
  showToast("Examen finalizado", `Resultado registrado: ${scorePercent}% de acierto en ${certification.appMeta.examCode}.`);
}

function buildMetrics(examId) {
  const attempts = [...state.exams[examId].attempts].sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
  const recent = attempts.slice(0, 5);
  const recentAverage = recent.length ? Math.round(recent.reduce((sum, item) => sum + item.scorePercent, 0) / recent.length) : 0;
  const bestScore = attempts.length ? Math.max(...attempts.map((item) => item.scorePercent)) : 0;
  const streak = calculateStreak(attempts);
  const readiness = calculateReadiness(state.exams[examId], recentAverage, bestScore, streak);
  return { recentAverage, bestScore, streak, readiness };
}

function buildFocusDomains(examId) {
  const certification = certifications[examId];
  const attempts = state.exams[examId].attempts;
  return certification.blueprint.domains.map((domain) => {
    const questionIds = certification.questionBank.filter((question) => question.domainId === domain.id).map((question) => question.id);
    const reviewed = attempts.flatMap((attempt) => attempt.review.filter((item) => questionIds.includes(item.questionId)));
    const correct = reviewed.filter((item) => item.isCorrect).length;
    const total = reviewed.length;
    return {
      id: domain.id,
      name: domain.name,
      weight: domain.weight,
      questionsSeen: total,
      correctRate: total ? Math.round((correct / total) * 100) : 0,
      studyHint: `${domain.officialSection} · reforzar en ${domain.studyFile}`
    };
  });
}

function buildStudyRecommendation(examState, certification, domainResults, metrics) {
  const weakDomains = domainResults.filter((domain) => domain.correctRate < 75).sort((a, b) => a.correctRate - b.correctRate);
  const topWeak = weakDomains[0];

  if (!topWeak) {
    return {
      title: "Mantener ritmo y subir dificultad",
      body: `No hay un dominio claramente debil en ${certification.appMeta.examCode}. Mantiene un examen completo diario y un mini test en el dominio con menor volumen de practica.`,
      note: "Revisa igual la trazabilidad de cada error para consolidar conocimiento y no solo puntaje."
    };
  }

  return {
    title: `Reforzar ${topWeak.name}`,
    body: `El dominio con mayor riesgo es ${topWeak.name}. Haz un mini test corto, revisa cada error y luego vuelve al examen completo. Si tu promedio reciente esta bajo ${examState.settings.targetScore}%, evita cambiar de dominio hasta estabilizar este frente.`,
    note: `Empieza por ${topWeak.officialSection || topWeak.name} y usa ${topWeak.studyFile || "el adjunto alineado al dominio"} como guia concreta de repaso. Promedio actual: ${metrics.recentAverage || 0}%.`
  };
}

function calculateStreak(attempts) {
  if (!attempts.length) {
    return 0;
  }

  const uniqueDays = [...new Set(attempts.map((attempt) => attempt.completedAt.slice(0, 10)))].sort().reverse();
  let streak = 0;
  let cursor = new Date();
  cursor.setHours(0, 0, 0, 0);

  uniqueDays.forEach((day, index) => {
    const dayDate = new Date(`${day}T00:00:00`);
    const expected = new Date(cursor);
    expected.setDate(cursor.getDate() - index);
    if (dayDate.toDateString() === expected.toDateString()) {
      streak += 1;
    }
  });

  return streak;
}

function calculateReadiness(examState, recentAverage, bestScore, streak) {
  const dateNow = new Date();
  const target = new Date(`${examState.settings.targetExamDate}T23:59:59`);
  const daysRemaining = Math.max(1, Math.ceil((target.getTime() - dateNow.getTime()) / 86400000));
  const streakBoost = Math.min(10, streak * 2);
  const urgencyBoost = daysRemaining <= 7 ? 5 : daysRemaining <= 14 ? 2 : 0;
  return Math.max(0, Math.min(99, Math.round((recentAverage * 0.55) + (bestScore * 0.25) + streakBoost + urgencyBoost)));
}

function getRemainingSeconds(exam) {
  return Math.max(0, Math.round((new Date(exam.endsAt).getTime() - Date.now()) / 1000));
}

function countAnswered(exam) {
  return exam.questions.filter((question) => question.selected !== null).length;
}

function buildExamTitle(mode, certification) {
  if (mode === "full") {
    return `Examen completo estilo certificacion ${certification.appMeta.examCode}`;
  }
  if (mode === "domain") {
    return "Mini test por dominio";
  }
  return "Examen de refuerzo";
}

function describeExamScope(mode) {
  if (mode === "full") {
    return "Distribucion por dominios basada en el blueprint";
  }
  if (mode === "domain") {
    return "Concentracion en un dominio prioritario";
  }
  return "Preguntas enfocadas en errores y brechas";
}

function formatDateTime(value) {
  return new Intl.DateTimeFormat("es-CL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

function shuffle(items) {
  const list = [...items];
  for (let i = list.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

function serializeState() {
  const exams = Object.fromEntries(certificationIds.map((examId) => {
    const examState = state.exams[examId];
    return [examId, {
      settings: examState.settings,
      attempts: examState.attempts,
      currentExam: examState.currentExam ? stripTimerHandle(examState.currentExam) : null
    }];
  }));

  return {
    version: 2,
    selectedExamId: state.selectedExamId,
    currentView: state.currentView,
    exams
  };
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

function saveState() {
  const payload = serializeState();
  saveQueue = saveQueue
    .catch(() => undefined)
    .then(() => fetch("/api/state", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(payload)
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`State save failed with ${response.status}`);
      }
      return response.json();
    }))
    .catch((error) => {
      showToast("No se pudo guardar", "Revisa la conexion con el backend o el contenedor SQLite.", "error");
      throw error;
    });

  return saveQueue;
}
