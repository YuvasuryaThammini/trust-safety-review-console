const STORAGE_KEY = "trust-safety-review-rules-v2";

const severityWeights = {
  none: 0,
  low: 8,
  medium: 18,
  high: 34,
  critical: 52,
};

const categoryColors = {
  harassment: "#a33f62",
  "hate-speech": "#a33f62",
  violence: "#b3261e",
  "self-harm": "#b3261e",
  "child-safety": "#b3261e",
  adult: "#7048a8",
  drugs: "#66712b",
  "regulated-goods": "#7048a8",
  "spam-scam": "#66712b",
  privacy: "#346f98",
  extremism: "#2c2738",
  misinformation: "#346f98",
  impersonation: "#346f98",
};

const defaultCategories = [
  {
    id: "harassment",
    label: "Harassment",
    severity: "medium",
    terms: [
      "idiot",
      "moron",
      "stupid",
      "loser",
      "worthless",
      "shut up",
      "go away",
      "hate you",
      "kys",
      "kill yourself",
      "trash person",
      "pathetic",
      "freak",
    ],
  },
  {
    id: "hate-speech",
    label: "Hate & Identity",
    severity: "high",
    terms: [
      "go back to your country",
      "inferior race",
      "racial slur",
      "ethnic slur",
      "religious slur",
      "deport them all",
      "protected class",
      "because of your religion",
      "because of your ethnicity",
    ],
  },
  {
    id: "violence",
    label: "Violence & Threats",
    severity: "high",
    terms: [
      "kill",
      "murder",
      "shoot",
      "stab",
      "attack",
      "bomb",
      "threat",
      "weapon",
      "execute",
      "beat them up",
      "burn down",
      "bring a gun",
    ],
  },
  {
    id: "self-harm",
    label: "Self-harm",
    severity: "high",
    terms: [
      "suicide",
      "self harm",
      "hurt myself",
      "cut myself",
      "overdose",
      "end my life",
      "do not want to live",
      "goodbye forever",
    ],
  },
  {
    id: "child-safety",
    label: "Child Safety",
    severity: "critical",
    terms: [
      "csam",
      "child exploitation",
      "child abuse material",
      "minor explicit",
      "underage sexual",
      "grooming",
      "meet a minor",
    ],
  },
  {
    id: "adult",
    label: "Adult Content",
    severity: "medium",
    terms: ["nude", "porn", "explicit", "sex", "sexual", "escort", "nsfw", "adult video"],
  },
  {
    id: "drugs",
    label: "Drugs",
    severity: "medium",
    terms: ["cocaine", "heroin", "meth", "fentanyl", "opioid", "lsd", "mdma", "sell pills"],
  },
  {
    id: "regulated-goods",
    label: "Regulated Goods",
    severity: "high",
    terms: [
      "buy gun",
      "sell firearm",
      "fake id",
      "counterfeit passport",
      "stolen credit card",
      "unlicensed weapon",
      "ghost gun",
    ],
  },
  {
    id: "spam-scam",
    label: "Spam & Scam",
    severity: "medium",
    terms: [
      "free money",
      "crypto giveaway",
      "wire transfer",
      "gift card code",
      "phishing",
      "click this link",
      "limited offer",
      "verify your account",
      "send me your code",
    ],
  },
  {
    id: "privacy",
    label: "Privacy & PII",
    severity: "high",
    terms: [
      "ssn",
      "social security",
      "credit card",
      "password",
      "private address",
      "home address",
      "phone number",
      "dox",
      "leak their",
    ],
  },
  {
    id: "extremism",
    label: "Extremism",
    severity: "critical",
    terms: [
      "terrorist attack",
      "violent cell",
      "extremist propaganda",
      "make a bomb",
      "explosive recipe",
      "martyrdom",
      "attack plan",
    ],
  },
  {
    id: "misinformation",
    label: "Misinformation",
    severity: "medium",
    terms: [
      "fake cure",
      "miracle cure",
      "vaccine microchip",
      "election rigged",
      "crisis actor",
      "deep state hoax",
      "guaranteed medical cure",
    ],
  },
  {
    id: "impersonation",
    label: "Impersonation",
    severity: "medium",
    terms: [
      "official support",
      "account verification",
      "I am a moderator",
      "bank support agent",
      "admin team",
      "verify your login",
    ],
  },
];

const patternDetectors = [
  {
    id: "email",
    label: "Email address",
    categoryId: "privacy",
    categoryLabel: "Privacy & PII",
    severity: "high",
    pattern: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi,
  },
  {
    id: "phone",
    label: "Phone number",
    categoryId: "privacy",
    categoryLabel: "Privacy & PII",
    severity: "medium",
    pattern: /\b(?:\+?\d{1,3}[\s.-]?)?(?:\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}\b/g,
  },
  {
    id: "ssn",
    label: "SSN pattern",
    categoryId: "privacy",
    categoryLabel: "Privacy & PII",
    severity: "high",
    pattern: /\b\d{3}-\d{2}-\d{4}\b/g,
  },
  {
    id: "credit-card",
    label: "Payment card pattern",
    categoryId: "privacy",
    categoryLabel: "Privacy & PII",
    severity: "high",
    pattern: /\b(?:\d[ -]*?){13,19}\b/g,
    validate: (value) => passesLuhn(value.replace(/\D/g, "")),
  },
  {
    id: "ip-address",
    label: "IP address",
    categoryId: "privacy",
    categoryLabel: "Privacy & PII",
    severity: "low",
    pattern: /\b(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\b/g,
  },
];

const sampleText =
  "I hate you. You are such an idiot. I will leak their home address and password if they do not shut up. Contact target@example.com or use 4111 1111 1111 1111. This also mentions a bomb threat and a gift card code scam.";

const elements = {
  categoryTabs: document.querySelector("#categoryTabs"),
  categoryEditor: document.querySelector("#categoryEditor"),
  termCount: document.querySelector("#termCount"),
  contentInput: document.querySelector("#contentInput"),
  characterCount: document.querySelector("#characterCount"),
  scanTimestamp: document.querySelector("#scanTimestamp"),
  scanButton: document.querySelector("#scanButton"),
  saveRulesButton: document.querySelector("#saveRulesButton"),
  resetRulesButton: document.querySelector("#resetRulesButton"),
  sampleButton: document.querySelector("#sampleButton"),
  clearButton: document.querySelector("#clearButton"),
  caseIdInput: document.querySelector("#caseIdInput"),
  surfaceSelect: document.querySelector("#surfaceSelect"),
  reporterCountInput: document.querySelector("#reporterCountInput"),
  accountAgeSelect: document.querySelector("#accountAgeSelect"),
  matchTotal: document.querySelector("#matchTotal"),
  categoryTotal: document.querySelector("#categoryTotal"),
  piiTotal: document.querySelector("#piiTotal"),
  riskStatus: document.querySelector("#riskStatus"),
  riskDial: document.querySelector("#riskDial"),
  riskScore: document.querySelector("#riskScore"),
  riskHeadline: document.querySelector("#riskHeadline"),
  riskReason: document.querySelector("#riskReason"),
  signalChips: document.querySelector("#signalChips"),
  signalCanvas: document.querySelector("#signalCanvas"),
  highlightBox: document.querySelector("#highlightBox"),
  highestSeverity: document.querySelector("#highestSeverity"),
  categoryBars: document.querySelector("#categoryBars"),
  playbookList: document.querySelector("#playbookList"),
  matchesBody: document.querySelector("#matchesBody"),
  exportCsvButton: document.querySelector("#exportCsvButton"),
  exportJsonButton: document.querySelector("#exportJsonButton"),
  copySummaryButton: document.querySelector("#copySummaryButton"),
  decisionStatus: document.querySelector("#decisionStatus"),
  contextCheck: document.querySelector("#contextCheck"),
  policyCheck: document.querySelector("#policyCheck"),
  appealCheck: document.querySelector("#appealCheck"),
  reviewNotes: document.querySelector("#reviewNotes"),
  auditLog: document.querySelector("#auditLog"),
};

let categories = loadCategories();
let activeCategoryId = categories[0]?.id ?? "harassment";
let latestScan = createEmptyScan();
let scanTimer = 0;
let reviewState = {
  decision: "Open",
  audit: [],
};

function loadCategories() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return cloneCategories(defaultCategories);
    }

    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return cloneCategories(defaultCategories);
    }

    const savedById = new Map(
      parsed.map((category, index) => [
        sanitizeId(category.id) || `category-${index + 1}`,
        {
          id: sanitizeId(category.id) || `category-${index + 1}`,
          label: String(category.label || `Category ${index + 1}`),
          severity: normalizeSeverity(category.severity),
          terms: normalizeTerms(category.terms || []),
        },
      ]),
    );

    const merged = defaultCategories.map((category) => ({
      ...category,
      ...(savedById.get(category.id) || {}),
      terms: savedById.get(category.id)?.terms || [...category.terms],
    }));

    savedById.forEach((category, id) => {
      if (!defaultCategories.some((defaultCategory) => defaultCategory.id === id)) {
        merged.push(category);
      }
    });

    return merged;
  } catch {
    return cloneCategories(defaultCategories);
  }
}

function cloneCategories(source) {
  return source.map((category) => ({
    ...category,
    terms: [...category.terms],
  }));
}

function sanitizeId(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-|-$/g, "");
}

function normalizeSeverity(value) {
  return ["low", "medium", "high", "critical"].includes(value) ? value : "medium";
}

function normalizeTerms(terms) {
  const list = Array.isArray(terms) ? terms : String(terms).split(/\n|,/);
  const seen = new Set();

  return list
    .map((term) => String(term).trim())
    .filter(Boolean)
    .filter((term) => {
      const key = term.toLowerCase();
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
}

function createEmptyScan() {
  return {
    text: "",
    scannedAt: null,
    matches: [],
    grouped: [],
    totals: {
      matches: 0,
      categories: 0,
      pii: 0,
      patternMatches: 0,
      highestSeverity: "none",
      riskScore: 0,
      recommendedAction: "Awaiting review",
      reason: "Awaiting content.",
      categoryCounts: [],
      playbook: [{ title: "Queue", text: "Open case waiting for review text." }],
    },
  };
}

function getCaseMetadata() {
  return {
    caseId: elements.caseIdInput.value.trim(),
    surface: elements.surfaceSelect.value,
    reporterCount: Number(elements.reporterCountInput.value || 0),
    accountAge: elements.accountAgeSelect.value,
  };
}

function renderPolicyEditor() {
  elements.categoryTabs.innerHTML = "";
  categories.forEach((category) => {
    const tab = document.createElement("button");
    tab.className = "category-tab";
    tab.type = "button";
    tab.role = "tab";
    tab.setAttribute("aria-selected", String(category.id === activeCategoryId));
    tab.dataset.categoryId = category.id;

    const label = document.createElement("strong");
    label.textContent = category.label;

    const count = document.createElement("span");
    count.textContent = `${category.terms.length}`;

    tab.append(label, count);
    tab.addEventListener("click", () => {
      saveActiveEditorTerms();
      activeCategoryId = category.id;
      renderPolicyEditor();
    });

    elements.categoryTabs.append(tab);
  });

  const activeCategory = categories.find((category) => category.id === activeCategoryId) || categories[0];
  if (!activeCategory) {
    return;
  }

  elements.categoryEditor.innerHTML = "";

  const title = document.createElement("div");
  title.className = "category-title";

  const heading = document.createElement("h2");
  heading.textContent = activeCategory.label;

  const severity = document.createElement("span");
  severity.className = "severity-pill";
  severity.textContent = `${activeCategory.severity} risk`;

  title.append(heading, severity);

  const editor = document.createElement("textarea");
  editor.className = "term-editor";
  editor.id = "termEditor";
  editor.spellcheck = false;
  editor.value = activeCategory.terms.join("\n");
  editor.placeholder = "term or phrase per line";
  editor.addEventListener("input", () => {
    activeCategory.terms = normalizeTerms(editor.value);
    updateTermCount();
    scheduleScan();
  });

  elements.categoryEditor.append(title, editor);
  updateTermCount();
}

function saveActiveEditorTerms() {
  const editor = document.querySelector("#termEditor");
  const activeCategory = categories.find((category) => category.id === activeCategoryId);
  if (editor && activeCategory) {
    activeCategory.terms = normalizeTerms(editor.value);
  }
}

function updateTermCount() {
  const keywordCount = categories.reduce((sum, category) => sum + category.terms.length, 0);
  const total = keywordCount + patternDetectors.length;
  elements.termCount.textContent = `${total} signals`;
}

function scanText() {
  saveActiveEditorTerms();

  const text = elements.contentInput.value;
  const rawMatches = [];

  categories.forEach((category) => {
    category.terms.forEach((term) => {
      findTermMatches(text, term).forEach((range) => {
        rawMatches.push({
          ...range,
          term,
          categoryId: category.id,
          categoryLabel: category.label,
          severity: category.severity,
          source: "keyword",
          detectorId: category.id,
          context: getContext(text, range.start, range.end),
        });
      });
    });
  });

  patternDetectors.forEach((detector) => {
    findPatternMatches(text, detector).forEach((range) => {
      rawMatches.push({
        ...range,
        term: detector.label,
        categoryId: detector.categoryId,
        categoryLabel: detector.categoryLabel,
        severity: detector.severity,
        source: "pattern",
        detectorId: detector.id,
        context: getContext(text, range.start, range.end),
      });
    });
  });

  const matches = dedupeOverlappingMatches(rawMatches);
  const grouped = groupMatches(matches);
  const totals = buildTotals(text, matches, grouped);

  latestScan = {
    text,
    scannedAt: text ? new Date().toISOString() : null,
    case: getCaseMetadata(),
    matches,
    grouped,
    totals,
  };

  renderScanResults();
}

function findTermMatches(text, term) {
  const matches = [];
  const source = text.toLowerCase();
  const target = term.toLowerCase();

  if (!target) {
    return matches;
  }

  let fromIndex = 0;
  while (fromIndex < source.length) {
    const start = source.indexOf(target, fromIndex);
    if (start === -1) {
      break;
    }

    const end = start + target.length;
    if (hasTokenBoundary(text, term, start, end)) {
      matches.push({ start, end, value: text.slice(start, end) });
    }

    fromIndex = Math.max(end, start + 1);
  }

  return matches;
}

function findPatternMatches(text, detector) {
  const regex = new RegExp(detector.pattern.source, detector.pattern.flags);
  const matches = [];
  let match = regex.exec(text);

  while (match) {
    const value = match[0];
    const start = match.index;
    const end = start + value.length;

    if (!detector.validate || detector.validate(value)) {
      matches.push({ start, end, value });
    }

    match = regex.exec(text);
  }

  return matches;
}

function hasTokenBoundary(text, term, start, end) {
  const first = term[0];
  const last = term[term.length - 1];
  const before = start > 0 ? text[start - 1] : "";
  const after = end < text.length ? text[end] : "";

  const needsStartBoundary = isWordCharacter(first);
  const needsEndBoundary = isWordCharacter(last);

  return (
    (!needsStartBoundary || !isWordCharacter(before)) &&
    (!needsEndBoundary || !isWordCharacter(after))
  );
}

function isWordCharacter(character) {
  return /[a-z0-9_]/i.test(character);
}

function passesLuhn(value) {
  if (value.length < 13 || value.length > 19) {
    return false;
  }

  let sum = 0;
  let shouldDouble = false;
  for (let index = value.length - 1; index >= 0; index -= 1) {
    let digit = Number(value[index]);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

function dedupeOverlappingMatches(matches) {
  const sorted = [...matches].sort((a, b) => {
    const severityDiff = severityRank(b.severity) - severityRank(a.severity);
    const lengthDiff = b.end - b.start - (a.end - a.start);
    return severityDiff || lengthDiff || a.start - b.start;
  });

  const accepted = [];
  sorted.forEach((match) => {
    const duplicate = accepted.some(
      (acceptedMatch) =>
        match.start === acceptedMatch.start &&
        match.end === acceptedMatch.end &&
        match.categoryId === acceptedMatch.categoryId,
    );
    if (!duplicate) {
      accepted.push(match);
    }
  });

  return accepted.sort((a, b) => a.start - b.start || severityRank(b.severity) - severityRank(a.severity));
}

function groupMatches(matches) {
  const grouped = new Map();

  matches.forEach((match) => {
    const key = `${match.categoryId}:${match.source}:${match.term.toLowerCase()}`;
    if (!grouped.has(key)) {
      grouped.set(key, {
        term: match.term,
        categoryId: match.categoryId,
        categoryLabel: match.categoryLabel,
        severity: match.severity,
        source: match.source,
        count: 0,
        contexts: [],
      });
    }

    const group = grouped.get(key);
    group.count += 1;
    if (group.contexts.length < 2) {
      group.contexts.push(match.context);
    }
  });

  return [...grouped.values()].sort((a, b) => {
    return severityRank(b.severity) - severityRank(a.severity) || b.count - a.count;
  });
}

function buildTotals(text, matches, grouped) {
  if (!text) {
    return createEmptyScan().totals;
  }

  const categoryCounts = getCategoryCounts(matches);
  const highestSeverity = getHighestSeverity(matches);
  const pii = matches.filter((match) => match.categoryId === "privacy").length;
  const patternMatches = matches.filter((match) => match.source === "pattern").length;
  const riskScore = calculateRiskScore(matches, categoryCounts);
  const recommendation = getRecommendation(riskScore, highestSeverity, categoryCounts, pii);

  return {
    matches: matches.length,
    categories: categoryCounts.length,
    pii,
    patternMatches,
    highestSeverity,
    riskScore,
    recommendedAction: recommendation.action,
    reason: recommendation.reason,
    categoryCounts,
    playbook: getPlaybook(matches, grouped, categoryCounts, pii, riskScore),
  };
}

function getCategoryCounts(matches) {
  const counts = new Map();
  matches.forEach((match) => {
    if (!counts.has(match.categoryId)) {
      counts.set(match.categoryId, {
        categoryId: match.categoryId,
        categoryLabel: match.categoryLabel,
        severity: match.severity,
        count: 0,
      });
    }
    const item = counts.get(match.categoryId);
    item.count += 1;
    if (severityRank(match.severity) > severityRank(item.severity)) {
      item.severity = match.severity;
    }
  });

  return [...counts.values()].sort((a, b) => {
    return severityRank(b.severity) - severityRank(a.severity) || b.count - a.count;
  });
}

function calculateRiskScore(matches, categoryCounts) {
  const meta = getCaseMetadata();
  const base = matches.reduce((sum, match) => sum + severityWeights[match.severity], 0);
  const uniqueCategoryBonus = categoryCounts.length * 5;
  const repeatBonus = Math.max(0, matches.length - categoryCounts.length) * 3;
  const reporterBonus = meta.reporterCount >= 5 ? 12 : meta.reporterCount >= 2 ? 7 : 0;
  const accountBonus = meta.accountAge === "New account" ? 6 : 0;
  const surfaceBonus = ["Direct message", "Live chat"].includes(meta.surface) ? 4 : 0;

  return Math.min(100, Math.round(base + uniqueCategoryBonus + repeatBonus + reporterBonus + accountBonus + surfaceBonus));
}

function getHighestSeverity(matches) {
  if (!matches.length) {
    return "none";
  }

  return matches.reduce((highest, match) => {
    return severityRank(match.severity) > severityRank(highest) ? match.severity : highest;
  }, "low");
}

function severityRank(severity) {
  return {
    none: 0,
    low: 1,
    medium: 2,
    high: 3,
    critical: 4,
  }[severity] ?? 0;
}

function getRecommendation(riskScore, highestSeverity, categoryCounts, pii) {
  const ids = new Set(categoryCounts.map((category) => category.categoryId));

  if (ids.has("child-safety") || highestSeverity === "critical") {
    return {
      action: "Specialist escalation",
      reason: "Critical-category content was detected and should move to a trained escalation queue.",
    };
  }

  if (ids.has("self-harm")) {
    return {
      action: "Escalate with safety support",
      reason: "Self-harm language needs a safety workflow and careful reviewer handling.",
    };
  }

  if (riskScore >= 70) {
    return {
      action: "Remove and escalate",
      reason: "Multiple high-risk signals were detected across policy categories.",
    };
  }

  if (pii > 0) {
    return {
      action: "Redact and review",
      reason: "Personal data patterns or privacy terms appeared in the content.",
    };
  }

  if (riskScore >= 30) {
    return {
      action: "Queue for review",
      reason: "Moderate-risk policy terms were detected and need human judgment.",
    };
  }

  if (riskScore > 0) {
    return {
      action: "Light review",
      reason: "Low-risk or metadata-only signals were detected.",
    };
  }

  return {
    action: "Allow",
    reason: "No policy terms or privacy patterns were detected.",
  };
}

function getPlaybook(matches, grouped, categoryCounts, pii, riskScore) {
  if (!latestScan.text && !elements.contentInput.value) {
    return [{ title: "Queue", text: "Open case waiting for review text." }];
  }

  const ids = new Set(categoryCounts.map((category) => category.categoryId));
  const playbook = [];

  if (ids.has("child-safety")) {
    playbook.push({ title: "Child safety", text: "Preserve evidence, restrict access, and route to the specialist queue." });
  }
  if (ids.has("self-harm")) {
    playbook.push({ title: "Self-harm", text: "Prioritize supportive handling and crisis-response review." });
  }
  if (ids.has("violence") || ids.has("extremism")) {
    playbook.push({ title: "Threat review", text: "Check credibility, targets, timing, and platform escalation requirements." });
  }
  if (pii > 0) {
    playbook.push({ title: "Privacy", text: "Limit exposure, redact personal data, and assess doxxing intent." });
  }
  if (ids.has("spam-scam") || ids.has("impersonation")) {
    playbook.push({ title: "Integrity", text: "Compare account behavior, links, and payment or credential requests." });
  }
  if (ids.has("misinformation")) {
    playbook.push({ title: "Misinformation", text: "Review claim context, local policy, and potential real-world harm." });
  }

  if (!playbook.length) {
    playbook.push({
      title: riskScore > 0 ? "Review" : "Clear",
      text: riskScore > 0 ? "Use context and local policy before actioning." : "No automated policy signal found.",
    });
  }

  return playbook.slice(0, 4);
}

function getContext(text, start, end) {
  const pad = 46;
  const contextStart = Math.max(0, start - pad);
  const contextEnd = Math.min(text.length, end + pad);
  const prefix = contextStart > 0 ? "..." : "";
  const suffix = contextEnd < text.length ? "..." : "";

  return `${prefix}${text.slice(contextStart, contextEnd).replace(/\s+/g, " ").trim()}${suffix}`;
}

function renderScanResults() {
  const { matches, grouped, totals, text, scannedAt } = latestScan;
  elements.matchTotal.textContent = String(totals.matches);
  elements.categoryTotal.textContent = String(totals.categories);
  elements.piiTotal.textContent = String(totals.pii);
  elements.highestSeverity.textContent = totals.highestSeverity;
  elements.scanTimestamp.textContent = scannedAt ? `Scanned ${new Date(scannedAt).toLocaleTimeString()}` : "No scan yet";

  renderRiskStatus(totals);
  renderRiskBoard(totals);
  renderHighlights(text, matches);
  renderCategoryBars(totals.categoryCounts);
  renderPlaybook(totals.playbook);
  renderMatchesTable(grouped);
  drawSignalCanvas(totals);
}

function renderRiskStatus(totals) {
  let label = "Clear";
  let state = "clear";

  if (!latestScan.text) {
    label = "No scan";
    state = "";
  } else if (totals.highestSeverity === "critical" || totals.riskScore >= 80) {
    label = "Critical";
    state = "critical";
  } else if (totals.riskScore >= 60) {
    label = "Escalate";
    state = "escalate";
  } else if (totals.riskScore > 0) {
    label = "Needs review";
    state = "review";
  }

  elements.riskStatus.dataset.state = state;
  elements.riskStatus.querySelector("strong").textContent = label;
}

function renderRiskBoard(totals) {
  const color = getRiskColor(totals.riskScore);
  elements.riskDial.style.setProperty("--score", String(totals.riskScore));
  elements.riskDial.style.setProperty("--risk-color", color);
  elements.riskScore.textContent = String(totals.riskScore);
  elements.riskHeadline.textContent = totals.recommendedAction;
  elements.riskReason.textContent = totals.reason;

  elements.signalChips.innerHTML = "";
  const chips = [];
  if (totals.categories > 0) {
    chips.push(`${totals.categories} policy areas`);
  }
  if (totals.patternMatches > 0) {
    chips.push(`${totals.patternMatches} pattern checks`);
  }
  if (totals.pii > 0) {
    chips.push(`${totals.pii} privacy signals`);
  }
  if (!chips.length) {
    chips.push(latestScan.text ? "No signal" : "Ready");
  }

  chips.forEach((chipText) => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = chipText;
    elements.signalChips.append(chip);
  });
}

function getRiskColor(score) {
  if (score >= 80) {
    return "#b3261e";
  }
  if (score >= 60) {
    return "#a9630c";
  }
  if (score > 0) {
    return "#346f98";
  }
  return "#2f6f50";
}

function renderHighlights(text, matches) {
  elements.highlightBox.innerHTML = "";
  elements.highlightBox.classList.toggle("empty", !text);

  if (!text) {
    elements.highlightBox.textContent = "No content scanned";
    return;
  }

  if (!matches.length) {
    elements.highlightBox.textContent = text;
    return;
  }

  let cursor = 0;
  const ranges = collapseRanges(matches);
  ranges.forEach((range) => {
    if (cursor < range.start) {
      elements.highlightBox.append(document.createTextNode(text.slice(cursor, range.start)));
    }

    const mark = document.createElement("mark");
    mark.className = "hit";
    mark.dataset.category = range.categoryId;
    mark.title = `${range.categoryLabel}: ${range.severity}`;
    mark.textContent = text.slice(range.start, range.end);
    elements.highlightBox.append(mark);
    cursor = range.end;
  });

  if (cursor < text.length) {
    elements.highlightBox.append(document.createTextNode(text.slice(cursor)));
  }
}

function collapseRanges(matches) {
  const sorted = [...matches].sort((a, b) => a.start - b.start || b.end - a.end);
  const ranges = [];

  sorted.forEach((match) => {
    const last = ranges[ranges.length - 1];
    if (!last || match.start >= last.end) {
      ranges.push({ ...match });
      return;
    }

    if (severityRank(match.severity) > severityRank(last.severity)) {
      last.categoryId = match.categoryId;
      last.categoryLabel = match.categoryLabel;
      last.severity = match.severity;
    }
    last.end = Math.max(last.end, match.end);
  });

  return ranges;
}

function renderCategoryBars(categoryCounts) {
  elements.categoryBars.innerHTML = "";

  if (!categoryCounts.length) {
    const empty = document.createElement("div");
    empty.className = "empty-cell";
    empty.textContent = latestScan.text ? "No policy distribution" : "Awaiting scan";
    elements.categoryBars.append(empty);
    return;
  }

  const max = Math.max(...categoryCounts.map((category) => category.count));
  categoryCounts.forEach((category) => {
    const row = document.createElement("div");
    row.className = "bar-row";

    const label = document.createElement("span");
    label.className = "bar-label";
    label.textContent = category.categoryLabel;

    const track = document.createElement("span");
    track.className = "bar-track";

    const fill = document.createElement("span");
    fill.className = "bar-fill";
    fill.style.width = `${Math.max(8, (category.count / max) * 100)}%`;
    fill.style.background = categoryColors[category.categoryId] || "#155e63";
    track.append(fill);

    const count = document.createElement("strong");
    count.textContent = String(category.count);

    row.append(label, track, count);
    elements.categoryBars.append(row);
  });
}

function renderPlaybook(playbook) {
  elements.playbookList.innerHTML = "";
  playbook.forEach((item) => {
    const row = document.createElement("div");
    row.className = "playbook-item";

    const marker = document.createElement("strong");
    marker.textContent = item.title;

    const text = document.createElement("span");
    text.textContent = item.text;

    row.append(marker, text);
    elements.playbookList.append(row);
  });
}

function renderMatchesTable(grouped) {
  elements.matchesBody.innerHTML = "";

  if (!grouped.length) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 5;
    cell.className = "empty-cell";
    cell.textContent = latestScan.text ? "No detected signals" : "No matches yet";
    row.append(cell);
    elements.matchesBody.append(row);
    return;
  }

  grouped.forEach((group) => {
    const row = document.createElement("tr");
    const signal = document.createElement("td");
    const category = document.createElement("td");
    const severity = document.createElement("td");
    const source = document.createElement("td");
    const count = document.createElement("td");

    signal.textContent = group.term;
    group.contexts.forEach((context) => {
      const contextLine = document.createElement("span");
      contextLine.className = "context-line";
      contextLine.textContent = context;
      signal.append(contextLine);
    });

    category.textContent = group.categoryLabel;
    severity.textContent = group.severity;
    source.textContent = group.source;
    count.textContent = String(group.count);

    row.append(signal, category, severity, source, count);
    elements.matchesBody.append(row);
  });
}

function drawSignalCanvas(totals) {
  const canvas = elements.signalCanvas;
  const context = canvas.getContext("2d");
  const rect = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  const width = Math.max(320, Math.round(rect.width || canvas.width));
  const height = Math.max(160, Math.round(rect.height || canvas.height));

  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  context.clearRect(0, 0, width, height);

  context.fillStyle = "#fbf7ef";
  context.fillRect(0, 0, width, height);

  context.strokeStyle = "#ded7ca";
  context.lineWidth = 1;
  for (let index = 0; index < 5; index += 1) {
    const y = 22 + index * 32;
    context.beginPath();
    context.moveTo(18, y);
    context.lineTo(width - 18, y);
    context.stroke();
  }

  const categoriesToDraw = totals.categoryCounts.length
    ? totals.categoryCounts.slice(0, 7)
    : [{ categoryId: "clear", categoryLabel: "Clear", count: 1, severity: "low" }];
  const max = Math.max(...categoriesToDraw.map((category) => category.count));
  const barWidth = Math.max(16, (width - 72) / categoriesToDraw.length - 10);

  categoriesToDraw.forEach((category, index) => {
    const x = 34 + index * (barWidth + 10);
    const barHeight = Math.max(18, (category.count / max) * 94);
    const y = height - 34 - barHeight;
    context.fillStyle = categoryColors[category.categoryId] || getRiskColor(totals.riskScore);
    context.fillRect(x, y, barWidth, barHeight);
    context.fillStyle = "#3f4248";
    context.font = "700 10px system-ui";
    context.fillText(String(category.count), x + 2, y - 6);
  });

  context.beginPath();
  context.arc(width - 36, 34, 16, 0, Math.PI * 2);
  context.fillStyle = getRiskColor(totals.riskScore);
  context.fill();
  context.fillStyle = "#ffffff";
  context.font = "800 11px system-ui";
  context.fillText(String(totals.riskScore), width - 44, 38);
}

function saveRules() {
  saveActiveEditorTerms();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
  renderPolicyEditor();
  scanText();
}

function resetRules() {
  categories = cloneCategories(defaultCategories);
  activeCategoryId = categories[0].id;
  localStorage.removeItem(STORAGE_KEY);
  renderPolicyEditor();
  scanText();
}

function updateCharacterCount() {
  const length = elements.contentInput.value.length;
  elements.characterCount.textContent = `${length} ${length === 1 ? "character" : "characters"}`;
}

function scheduleScan() {
  window.clearTimeout(scanTimer);
  scanTimer = window.setTimeout(scanText, 250);
}

function download(filename, mimeType, content) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function exportCsv() {
  const rows = [
    ["case_id", "risk_score", "recommended_action", "signal", "category", "severity", "source", "count", "contexts"],
    ...latestScan.grouped.map((group) => [
      latestScan.case?.caseId || "",
      latestScan.totals.riskScore,
      latestScan.totals.recommendedAction,
      group.term,
      group.categoryLabel,
      group.severity,
      group.source,
      group.count,
      group.contexts.join(" | "),
    ]),
  ];

  const csv = rows
    .map((row) =>
      row
        .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
        .join(","),
    )
    .join("\n");

  download("trust-safety-scan.csv", "text/csv;charset=utf-8", csv);
}

function exportJson() {
  download(
    "trust-safety-case-report.json",
    "application/json;charset=utf-8",
    JSON.stringify(
      {
        ...latestScan,
        review: {
          decision: reviewState.decision,
          checklist: getChecklistState(),
          notes: elements.reviewNotes.value,
          audit: reviewState.audit,
        },
      },
      null,
      2,
    ),
  );
}

function copySummary() {
  const summary = [
    `Case: ${latestScan.case?.caseId || elements.caseIdInput.value}`,
    `Status: ${elements.riskStatus.querySelector("strong").textContent}`,
    `Recommended action: ${latestScan.totals.recommendedAction}`,
    `Risk score: ${latestScan.totals.riskScore}`,
    `Matches: ${latestScan.totals.matches}`,
    `Categories: ${latestScan.totals.categories}`,
    `PII signals: ${latestScan.totals.pii}`,
    ...latestScan.grouped.map(
      (group) => `- ${group.term} (${group.categoryLabel}, ${group.severity}, ${group.source}): ${group.count}`,
    ),
  ].join("\n");

  navigator.clipboard?.writeText(summary);
}

function getChecklistState() {
  return {
    contextReviewed: elements.contextCheck.checked,
    policyMapped: elements.policyCheck.checked,
    appealPathConsidered: elements.appealCheck.checked,
  };
}

function recordDecision(action) {
  reviewState.decision = action;
  elements.decisionStatus.textContent = action;

  reviewState.audit.unshift({
    action,
    time: new Date().toISOString(),
    caseId: elements.caseIdInput.value,
    riskScore: latestScan.totals.riskScore,
    checklist: getChecklistState(),
    notes: elements.reviewNotes.value.trim(),
  });

  renderAuditLog();
}

function renderAuditLog() {
  elements.auditLog.innerHTML = "";

  if (!reviewState.audit.length) {
    const item = document.createElement("li");
    item.textContent = "No reviewer action recorded";
    elements.auditLog.append(item);
    return;
  }

  reviewState.audit.forEach((entry) => {
    const item = document.createElement("li");
    item.textContent = `${new Date(entry.time).toLocaleTimeString()} - ${entry.action} at risk ${entry.riskScore}`;
    elements.auditLog.append(item);
  });
}

function generateCaseId() {
  const date = new Date();
  const compactDate = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
  const random = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `TS-${compactDate}-${random}`;
}

elements.scanButton.addEventListener("click", scanText);
elements.saveRulesButton.addEventListener("click", saveRules);
elements.resetRulesButton.addEventListener("click", resetRules);
elements.sampleButton.addEventListener("click", () => {
  elements.contentInput.value = sampleText;
  elements.reporterCountInput.value = "4";
  elements.accountAgeSelect.value = "New account";
  updateCharacterCount();
  scanText();
});
elements.clearButton.addEventListener("click", () => {
  elements.contentInput.value = "";
  updateCharacterCount();
  latestScan = createEmptyScan();
  renderScanResults();
});
elements.contentInput.addEventListener("input", () => {
  updateCharacterCount();
  scheduleScan();
});
elements.surfaceSelect.addEventListener("change", scheduleScan);
elements.reporterCountInput.addEventListener("input", scheduleScan);
elements.accountAgeSelect.addEventListener("change", scheduleScan);
elements.exportCsvButton.addEventListener("click", exportCsv);
elements.exportJsonButton.addEventListener("click", exportJson);
elements.copySummaryButton.addEventListener("click", copySummary);
document.querySelectorAll("[data-action]").forEach((button) => {
  button.addEventListener("click", () => recordDecision(button.dataset.action));
});
window.addEventListener("resize", () => drawSignalCanvas(latestScan.totals));

elements.caseIdInput.value = generateCaseId();
renderPolicyEditor();
updateCharacterCount();
renderAuditLog();
renderScanResults();
