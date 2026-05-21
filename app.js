const STORAGE_KEY = "trust-safety-review-rules-v3";

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
  evasion: "#7a5b1a",
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
      "harass them",
      "pile on",
      "humiliate them",
      "worthless person",
      "go cry",
      "nobody wants you",
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
      "protected group insult",
      "identity attack",
      "religion insult",
      "ethnicity insult",
      "ban that group",
      "not human",
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
      "hurt them",
      "bring a knife",
      "mass attack",
      "target them",
      "violent threat",
      "school threat",
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
      "I want to disappear",
      "I cannot go on",
      "planning to overdose",
      "hurt myself tonight",
      "self injury",
      "suicide note",
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
      "child grooming",
      "minor meetup",
      "underage request",
      "child sexual content",
      "exploit a child",
      "minor private photos",
    ],
  },
  {
    id: "adult",
    label: "Adult Content",
    severity: "medium",
    terms: [
      "nude",
      "porn",
      "explicit",
      "sex",
      "sexual",
      "escort",
      "nsfw",
      "adult video",
      "adult service",
      "sexual solicitation",
      "send nudes",
      "naked photo",
      "explicit photo",
      "hookup for money",
      "adult content",
    ],
  },
  {
    id: "drugs",
    label: "Drugs",
    severity: "medium",
    terms: [
      "cocaine",
      "heroin",
      "meth",
      "fentanyl",
      "opioid",
      "lsd",
      "mdma",
      "sell pills",
      "buy cocaine",
      "sell heroin",
      "drug dealer",
      "ship pills",
      "illegal pharmacy",
      "party drugs",
      "controlled substance",
    ],
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
      "buy firearm",
      "sell ammunition",
      "weapon parts",
      "3d printed gun",
      "silencer",
      "explosive device",
      "stolen account",
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
      "investment guarantee",
      "double your money",
      "recovery agent",
      "advance fee",
      "one time password",
      "login code",
      "airdrop reward",
      "urgent payment",
      "romance investment",
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
      "full name and address",
      "bank account",
      "routing number",
      "passport number",
      "driver license",
      "medical record",
      "personal email",
      "private phone",
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
      "recruit for cell",
      "violent manifesto",
      "target list",
      "radicalize",
      "violent extremist",
      "extremist recruitment",
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
      "fake medicine",
      "do not trust doctors",
      "false election claim",
      "disaster hoax",
      "fabricated evidence",
      "health conspiracy",
      "false emergency",
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
      "official login team",
      "platform support",
      "security department",
      "we are support",
      "staff account",
      "verified admin",
    ],
  },
  {
    id: "evasion",
    label: "Evasion",
    severity: "medium",
    terms: [
      "ban evasion",
      "new account to bypass",
      "avoid detection",
      "coded language",
      "alternate account",
      "evade moderation",
      "use symbols to hide",
      "bypass filter",
      "spell it differently",
      "shadow account",
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
  {
    id: "url",
    label: "External link",
    categoryId: "spam-scam",
    categoryLabel: "Spam & Scam",
    severity: "low",
    pattern: /\bhttps?:\/\/[^\s<>"']+/gi,
  },
  {
    id: "crypto-wallet",
    label: "Crypto wallet pattern",
    categoryId: "spam-scam",
    categoryLabel: "Spam & Scam",
    severity: "medium",
    pattern: /\b(?:0x[a-fA-F0-9]{40}|[13][a-km-zA-HJ-NP-Z1-9]{25,34}|bc1[a-zA-HJ-NP-Z0-9]{25,39})\b/g,
  },
];

const moderationSamples = [
  {
    id: "multi-risk",
    label: "Multi-risk escalation",
    surface: "Post",
    reporters: 4,
    accountAge: "New account",
    description: "Mixed harassment, privacy, scam, and threat signals for full-console testing.",
    text: "I hate you. You are such an idiot. I will leak their home address and password if they do not shut up. Contact target@example.com or use 4111 1111 1111 1111. This also mentions a bomb threat and a gift card code scam.",
  },
  {
    id: "adult",
    label: "Adult content",
    surface: "Direct message",
    reporters: 2,
    accountAge: "Established",
    description: "Adult solicitation language with a privacy-adjacent contact request.",
    text: "This direct message asks for send nudes, an explicit photo, and an adult service meetup. The sender also asks for a private phone number before moving the chat elsewhere.",
  },
  {
    id: "hate",
    label: "Hate & identity",
    surface: "Comment",
    reporters: 6,
    accountAge: "New account",
    description: "Identity attack and protected-class harassment signals.",
    text: "This comment says go back to your country, calls a protected group not human, and adds an ethnicity insult because of your religion.",
  },
  {
    id: "self-harm",
    label: "Self-harm safety",
    surface: "Live chat",
    reporters: 1,
    accountAge: "Unknown",
    description: "Self-harm phrases that should route to a careful support workflow.",
    text: "The user says I cannot go on, I want to disappear, and I am planning to overdose tonight. They also wrote goodbye forever in the chat.",
  },
  {
    id: "child-safety",
    label: "Child safety",
    surface: "Direct message",
    reporters: 8,
    accountAge: "New account",
    description: "Non-graphic child-safety terms that should trigger specialist escalation.",
    text: "A direct message includes child grooming, an underage request, minor private photos, and a minor meetup. This should be handled as a specialist child safety case.",
  },
  {
    id: "privacy",
    label: "Doxxing & PII",
    surface: "Post",
    reporters: 5,
    accountAge: "Established",
    description: "Personal data exposure with email, phone, SSN, and address-style signals.",
    text: "I will dox them and post their full name and address, private phone, personal email user@example.com, SSN 123-45-6789, and bank account details.",
  },
  {
    id: "scam",
    label: "Scam & impersonation",
    surface: "Direct message",
    reporters: 3,
    accountAge: "New account",
    description: "Phishing, support impersonation, link, and crypto-payment indicators.",
    text: "Hello, we are platform support from the official login team. Verify your account at https://example.com/login and send me your code. This limited offer has an investment guarantee and asks for crypto wallet 0x742d35Cc6634C0532925a3b844Bc454e4438f44e.",
  },
  {
    id: "violence",
    label: "Violent threat",
    surface: "Comment",
    reporters: 7,
    accountAge: "New account",
    description: "Threat language and target/timing style signals.",
    text: "The comment includes a violent threat, says bring a gun, target them after the event, and mentions a school threat. It also says hurt them.",
  },
  {
    id: "regulated",
    label: "Regulated goods",
    surface: "Post",
    reporters: 2,
    accountAge: "Unknown",
    description: "Weapon, document, and controlled-substance sales language.",
    text: "The listing says buy firearm, sell ammunition, fake id, counterfeit passport, and ship pills. It also mentions controlled substance delivery.",
  },
  {
    id: "misinformation",
    label: "Misinformation",
    surface: "Post",
    reporters: 3,
    accountAge: "Established",
    description: "Health and civic misinformation cues.",
    text: "The post claims a miracle cure and fake medicine, says do not trust doctors, spreads a false election claim, and calls a disaster hoax with fabricated evidence.",
  },
  {
    id: "evasion",
    label: "Evasion",
    surface: "Profile",
    reporters: 2,
    accountAge: "New account",
    description: "Filter and enforcement evasion indicators.",
    text: "The profile says this is an alternate account for ban evasion. It tells followers to use symbols to hide, spell it differently, and bypass filter checks with coded language.",
  },
  {
    id: "coordinated-harassment",
    label: "Coordinated harassment",
    surface: "Comment",
    reporters: 9,
    accountAge: "Established",
    description: "Brigading language with dog-piling instructions and demeaning abuse.",
    text: "Post their private phone and let everyone pile on. Call them worthless, humiliate them in every thread, and make sure nobody wants them in this community.",
  },
  {
    id: "extremism-recruitment",
    label: "Extremism recruitment",
    surface: "Direct message",
    reporters: 5,
    accountAge: "New account",
    description: "Recruitment and planning cues that should route to critical escalation.",
    text: "Join our violent cell and help radicalize new members. We have an attack plan, target list, and need people to recruit for cell operations.",
  },
  {
    id: "regulated-weapons",
    label: "Weapon sale listing",
    surface: "Profile",
    reporters: 3,
    accountAge: "Unknown",
    description: "Illegal weapon and accessory sale phrasing across a profile feed.",
    text: "Unlicensed weapon drop this week: buy firearm, sell ammunition, plus silencer and weapon parts bundles. DM for fast shipping.",
  },
  {
    id: "pii-breach",
    label: "PII leak threat",
    surface: "Post",
    reporters: 6,
    accountAge: "Established",
    description: "Explicit doxxing intent with multiple personal identifiers.",
    text: "If they do not pay, we leak their full name and address, social security number 123-45-6789, bank account, and personal email victim@example.com.",
  },
  {
    id: "financial-fraud",
    label: "Financial fraud lure",
    surface: "Direct message",
    reporters: 4,
    accountAge: "New account",
    description: "Credential theft and payment coercion in one scam flow.",
    text: "Official support notice: verify your account now, send me your one time password, then complete urgent payment through gift card code to avoid account closure.",
  },
  {
    id: "self-harm-urgent",
    label: "Urgent self-harm note",
    surface: "Live chat",
    reporters: 2,
    accountAge: "Unknown",
    description: "High urgency self-harm signal needing immediate safety workflow.",
    text: "I do not want to live and I am planning to overdose tonight. Please tell my family goodbye forever if I disappear.",
  },
  {
    id: "child-contact-risk",
    label: "Minor contact solicitation",
    surface: "Direct message",
    reporters: 7,
    accountAge: "New account",
    description: "Minor meetup and grooming-related solicitation indicators.",
    text: "Do not tell your parents. We can meet a minor in private after school and share minor private photos if you trust me.",
  },
  {
    id: "misinfo-health",
    label: "Health disinformation blast",
    surface: "Post",
    reporters: 3,
    accountAge: "Established",
    description: "False public-health claims spread in campaign-style text.",
    text: "Doctors are lying. This miracle cure is guaranteed medical cure, vaccines are fake poison, and the outbreak is a false emergency hoax.",
  },
];

const audioTranscriptSamples = [
  {
    label: "Self-harm hotline escalation",
    text: "Audio transcript: the speaker says they cannot go on, mentions planning to overdose, and says goodbye forever. Another listener reports the live chat for urgent self-harm safety review.",
  },
  {
    label: "Threatening rant",
    text: "Audio transcript: person states they will bring a gun and hurt them after the event. They repeat target them twice and add explicit violent threat language.",
  },
  {
    label: "Fraud call script",
    text: "Audio transcript: caller says they are official support, asks user to verify your account, share one time password, and complete payment through gift card code.",
  },
  {
    label: "Doxxing voice note",
    text: "Audio transcript: speaker threatens to post private address, personal email, and phone number if the target does not respond immediately.",
  },
];

const videoTranscriptSamples = [
  {
    label: "Account recovery scam video",
    text: "Video title: urgent account recovery. Description asks viewers to verify your account through https://example.com/check and send me your code. Comments mention official support, investment guarantee, and crypto giveaway.",
  },
  {
    label: "Extremist recruitment clip",
    text: "Video narration includes violent manifesto themes, asks viewers to recruit for cell operations, and references an attack plan with a target list.",
  },
  {
    label: "Adult solicitation reel",
    text: "Video caption offers adult service meetup, asks to send nudes, and pushes viewers to move to private phone contact for paid explicit content.",
  },
  {
    label: "Regulated goods listing",
    text: "Video metadata advertises buy firearm and sell ammunition bundles with fake id add-ons, then posts contact details in comments.",
  },
];

const queueSeedCases = moderationSamples.slice(0, 7).map((sample, index) => ({
  id: `Q-${String(index + 1).padStart(3, "0")}`,
  sampleId: sample.id,
  title: sample.label,
  channel: sample.surface,
  status: index % 3 === 0 ? "Escalated" : index % 2 === 0 ? "New" : "In review",
  riskScore: estimateSampleRisk(sample),
  receivedAt: new Date(Date.now() - (index + 1) * 390000).toISOString(),
  text: sample.text,
  reporters: sample.reporters,
  accountAge: sample.accountAge,
}));

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
  delightToggleButton: document.querySelector("#delightToggleButton"),
  sampleWorkflowSelect: document.querySelector("#sampleWorkflowSelect"),
  loadSampleButton: document.querySelector("#loadSampleButton"),
  sampleTitle: document.querySelector("#sampleTitle"),
  sampleDescription: document.querySelector("#sampleDescription"),
  clearButton: document.querySelector("#clearButton"),
  caseIdInput: document.querySelector("#caseIdInput"),
  surfaceSelect: document.querySelector("#surfaceSelect"),
  reporterCountInput: document.querySelector("#reporterCountInput"),
  accountAgeSelect: document.querySelector("#accountAgeSelect"),
  matchTotal: document.querySelector("#matchTotal"),
  categoryTotal: document.querySelector("#categoryTotal"),
  piiTotal: document.querySelector("#piiTotal"),
  riskStatus: document.querySelector("#riskStatus"),
  queueSummary: document.querySelector("#queueSummary"),
  queueList: document.querySelector("#queueList"),
  nextCaseButton: document.querySelector("#nextCaseButton"),
  liveDemoButton: document.querySelector("#liveDemoButton"),
  liveStatus: document.querySelector("#liveStatus"),
  liveProcessed: document.querySelector("#liveProcessed"),
  liveEscalated: document.querySelector("#liveEscalated"),
  liveAvgRisk: document.querySelector("#liveAvgRisk"),
  liveFeed: document.querySelector("#liveFeed"),
  workflowLiveStatus: document.querySelector("#workflowLiveStatus"),
  workflowQueueDepth: document.querySelector("#workflowQueueDepth"),
  workflowLastCase: document.querySelector("#workflowLastCase"),
  workflowLastRisk: document.querySelector("#workflowLastRisk"),
  workflowOpenCaseButton: document.querySelector("#workflowOpenCaseButton"),
  liveMirrorBadge: document.querySelector("#liveMirrorBadge"),
  liveMirrorCase: document.querySelector("#liveMirrorCase"),
  liveMirrorSurface: document.querySelector("#liveMirrorSurface"),
  liveMirrorSignals: document.querySelector("#liveMirrorSignals"),
  liveMirrorTime: document.querySelector("#liveMirrorTime"),
  mediaStatus: document.querySelector("#mediaStatus"),
  audioPanel: document.querySelector("#audioPanel"),
  videoPanel: document.querySelector("#videoPanel"),
  audioTranscript: document.querySelector("#audioTranscript"),
  videoTranscript: document.querySelector("#videoTranscript"),
  audioFileInput: document.querySelector("#audioFileInput"),
  videoFileInput: document.querySelector("#videoFileInput"),
  audioSampleButton: document.querySelector("#audioSampleButton"),
  videoSampleButton: document.querySelector("#videoSampleButton"),
  analyzeAudioButton: document.querySelector("#analyzeAudioButton"),
  analyzeVideoButton: document.querySelector("#analyzeVideoButton"),
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
  severityFilter: document.querySelector("#severityFilter"),
  redactPiiButton: document.querySelector("#redactPiiButton"),
  exportCsvButton: document.querySelector("#exportCsvButton"),
  exportJsonButton: document.querySelector("#exportJsonButton"),
  casePacketButton: document.querySelector("#casePacketButton"),
  copySummaryButton: document.querySelector("#copySummaryButton"),
  decisionStatus: document.querySelector("#decisionStatus"),
  decisionReasonSelect: document.querySelector("#decisionReasonSelect"),
  contextCheck: document.querySelector("#contextCheck"),
  policyCheck: document.querySelector("#policyCheck"),
  appealCheck: document.querySelector("#appealCheck"),
  reviewNotes: document.querySelector("#reviewNotes"),
  auditLog: document.querySelector("#auditLog"),
  scoreBreakdown: document.querySelector("#scoreBreakdown"),
  appealReadinessScore: document.querySelector("#appealReadinessScore"),
  readinessFill: document.querySelector("#readinessFill"),
  readinessList: document.querySelector("#readinessList"),
  caseTimeline: document.querySelector("#caseTimeline"),
  timelineCount: document.querySelector("#timelineCount"),
  reviewerQualityScore: document.querySelector("#reviewerQualityScore"),
  qualityFill: document.querySelector("#qualityFill"),
  qualityList: document.querySelector("#qualityList"),
  signalReviewSummary: document.querySelector("#signalReviewSummary"),
  policySearchInput: document.querySelector("#policySearchInput"),
  policyExportButton: document.querySelector("#policyExportButton"),
  policyImportInput: document.querySelector("#policyImportInput"),
  themeToggleButton: document.querySelector("#themeToggleButton"),
  compactToggleButton: document.querySelector("#compactToggleButton"),
  autoScanToggleButton: document.querySelector("#autoScanToggleButton"),
  cursorHalo: document.querySelector("#cursorHalo"),
  decisionToast: document.querySelector("#decisionToast"),
  decisionToastIcon: document.querySelector("#decisionToastIcon"),
  decisionToastTitle: document.querySelector("#decisionToastTitle"),
  decisionToastMessage: document.querySelector("#decisionToastMessage"),
};

let categories = loadCategories();
let activeCategoryId = categories[0]?.id ?? "harassment";
let latestScan = createEmptyScan();
let scanTimer = 0;
let reviewState = {
  decision: "Open",
  audit: [],
};
let reviewQueue = [...queueSeedCases];
let activeQueueId = reviewQueue[0]?.id || "";
let liveDemoRunning = false;
let liveDemoTimer = 0;
let liveCursor = 0;
let liveMetrics = {
  processed: 0,
  escalated: 0,
  riskTotal: 0,
};
let timelineEvents = [];
let signalReviewState = {};
let policySearchText = "";
let autoScanEnabled = true;
let delightEnabled = false;
let lastTrailAt = 0;
let haloFrame = 0;
let pendingHaloPoint = null;
let audioSampleCursor = 0;
let videoSampleCursor = 0;
let latestLivePreview = null;
let decisionToastTimer = 0;

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
    case: null,
    matches: [],
    grouped: [],
    totals: {
      matches: 0,
      categories: 0,
      pii: 0,
      patternMatches: 0,
      highestSeverity: "none",
      riskScore: 0,
      scoreFactors: [],
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

function renderSampleWorkflows() {
  elements.sampleWorkflowSelect.innerHTML = "";
  moderationSamples.forEach((sample) => {
    const option = document.createElement("option");
    option.value = sample.id;
    option.textContent = sample.label;
    elements.sampleWorkflowSelect.append(option);
  });
  updateSamplePreview();
}

function getSelectedSample() {
  return (
    moderationSamples.find((sample) => sample.id === elements.sampleWorkflowSelect.value) ||
    moderationSamples[0]
  );
}

function updateSamplePreview() {
  const sample = getSelectedSample();
  elements.sampleTitle.textContent = sample.label;
  elements.sampleDescription.textContent = sample.description;
}

function loadSampleWorkflow(sample = getSelectedSample()) {
  elements.contentInput.value = sample.text;
  elements.surfaceSelect.value = sample.surface;
  elements.reporterCountInput.value = String(sample.reporters);
  elements.accountAgeSelect.value = sample.accountAge;
  updateSamplePreview();
  updateCharacterCount();
  addTimelineEvent("Sample loaded", sample.label);
  scanText();
}

function loadQueueCase(caseItem) {
  if (!caseItem) {
    return;
  }

  activeQueueId = caseItem.id;
  caseItem.status = "In review";
  elements.caseIdInput.value = caseItem.id;
  elements.contentInput.value = caseItem.text;
  elements.surfaceSelect.value = caseItem.channel;
  elements.reporterCountInput.value = String(caseItem.reporters);
  elements.accountAgeSelect.value = caseItem.accountAge;
  updateCharacterCount();
  addTimelineEvent("Case opened", caseItem.title);
  scanText();
  caseItem.riskScore = latestScan.totals.riskScore;
  if (caseItem.id.startsWith("LIVE-")) {
    latestLivePreview = { caseItem, preview: latestScan };
    renderLiveMirror();
  }
  renderQueue();
  updateWorkflowBridge();
  switchMainTab("reviewTab");
}

function renderQueue() {
  elements.queueList.innerHTML = "";
  const openCount = reviewQueue.filter((item) => item.status !== "Resolved").length;
  const escalatedCount = reviewQueue.filter((item) => item.status === "Escalated").length;
  const inReviewCount = reviewQueue.filter((item) => item.status === "In review").length;
  elements.queueSummary.textContent = `${openCount} open | ${inReviewCount} in review | ${escalatedCount} escalated`;
  elements.workflowQueueDepth.textContent = String(openCount);

  reviewQueue.slice(0, 8).forEach((item) => {
    const button = document.createElement("button");
    button.className = "queue-card";
    button.type = "button";
    button.dataset.status = item.status.toLowerCase().replace(/\s+/g, "-");
    button.setAttribute("aria-current", String(item.id === activeQueueId));

    const top = document.createElement("div");
    top.className = "queue-card-top";

    const title = document.createElement("strong");
    title.textContent = item.title;

    const caseId = document.createElement("span");
    caseId.className = "queue-case-id";
    caseId.textContent = item.id;

    const meta = document.createElement("div");
    meta.className = "queue-meta";

    const surfaceChip = document.createElement("span");
    surfaceChip.className = "queue-chip";
    surfaceChip.textContent = item.channel;

    const riskChip = document.createElement("span");
    riskChip.className = "queue-chip";
    riskChip.dataset.kind = "risk";
    riskChip.textContent = `Risk ${item.riskScore ?? 0}`;

    const statusChip = document.createElement("span");
    statusChip.className = "queue-chip";
    statusChip.dataset.kind = "status";
    statusChip.textContent = item.status;

    const slaChip = document.createElement("span");
    slaChip.className = "queue-chip";
    slaChip.dataset.kind = "sla";
    slaChip.textContent = formatQueueAge(item.receivedAt);

    top.append(title, caseId);
    meta.append(surfaceChip, riskChip, statusChip, slaChip);
    button.append(top, meta);
    button.addEventListener("click", () => loadQueueCase(item));
    elements.queueList.append(button);
  });
}

function loadNextQueueCase() {
  const currentIndex = reviewQueue.findIndex((item) => item.id === activeQueueId);
  const nextCase = reviewQueue[(currentIndex + 1 + reviewQueue.length) % reviewQueue.length];
  loadQueueCase(nextCase);
}

function renderLiveMetrics() {
  elements.liveProcessed.textContent = String(liveMetrics.processed);
  elements.liveEscalated.textContent = String(liveMetrics.escalated);
  elements.liveAvgRisk.textContent = liveMetrics.processed
    ? String(Math.round(liveMetrics.riskTotal / liveMetrics.processed))
    : "0";
  elements.liveStatus.textContent = liveDemoRunning ? "Streaming" : "Paused";
  elements.workflowLiveStatus.textContent = liveDemoRunning ? "Streaming" : "Paused";
  elements.liveDemoButton.innerHTML = liveDemoRunning
    ? '<span class="button-icon" aria-hidden="true">&#10074;&#10074;</span> Stop Live'
    : '<span class="button-icon" aria-hidden="true">&#9679;</span> Start Live';
  updateWorkflowBridge();
}

function estimateSampleRisk(sample) {
  const criticalIds = ["child-safety", "self-harm", "violence", "extremism-recruitment"];
  if (criticalIds.includes(sample.id)) {
    return 94;
  }
  if (["privacy", "scam", "regulated", "regulated-weapons", "financial-fraud", "pii-breach"].includes(sample.id)) {
    return 82;
  }
  if (["hate", "adult", "coordinated-harassment", "misinfo-health"].includes(sample.id)) {
    return 68;
  }
  return 45;
}

function pushLiveItem() {
  const sample = moderationSamples[liveCursor % moderationSamples.length];
  liveCursor += 1;
  const receivedAt = new Date().toISOString();
  const caseId = `LIVE-${String(liveMetrics.processed + 1).padStart(3, "0")}`;
  const caseMeta = {
    caseId,
    surface: sample.surface,
    reporterCount: sample.reporters,
    accountAge: sample.accountAge,
  };
  const preview = buildScanSnapshot(sample.text, caseMeta, receivedAt);
  const risk = preview.totals.riskScore || estimateSampleRisk(sample);
  const caseItem = {
    id: caseId,
    sampleId: sample.id,
    title: sample.label,
    channel: sample.surface,
    status: risk >= 80 ? "Escalated" : risk >= 45 ? "In review" : "New",
    riskScore: risk,
    receivedAt,
    text: sample.text,
    reporters: sample.reporters,
    accountAge: sample.accountAge,
  };

  reviewQueue.unshift(caseItem);
  activeQueueId = caseItem.id;
  liveMetrics.processed += 1;
  liveMetrics.riskTotal += risk;
  if (risk >= 80) {
    liveMetrics.escalated += 1;
  }

  const feedItem = document.createElement("li");
  feedItem.className = "live-feed-item";
  feedItem.dataset.risk = risk >= 80 ? "critical" : risk >= 60 ? "review" : "normal";
  feedItem.innerHTML = `<strong>${caseItem.title}</strong><span>${caseItem.id} | risk ${risk} | ${preview.totals.matches} signals | ${caseItem.channel}</span>`;
  elements.liveFeed.prepend(feedItem);
  while (elements.liveFeed.children.length > 6) {
    elements.liveFeed.lastElementChild.remove();
  }

  latestLivePreview = { caseItem, preview };
  renderLiveMirror();
  addTimelineEvent("Live case received", `${caseItem.id} risk ${risk}`);
  renderQueue();
  renderLiveMetrics();
}

function toggleLiveDemo() {
  liveDemoRunning = !liveDemoRunning;
  if (liveDemoRunning) {
    pushLiveItem();
    liveDemoTimer = window.setInterval(pushLiveItem, 3200);
  } else {
    window.clearInterval(liveDemoTimer);
  }
  renderLiveMetrics();
}

function formatQueueAge(receivedAt) {
  if (!receivedAt) {
    return "SLA 0m";
  }
  const minutes = Math.max(0, Math.floor((Date.now() - new Date(receivedAt).getTime()) / 60000));
  return `SLA ${minutes}m`;
}

function renderLiveMirror() {
  if (!latestLivePreview) {
    elements.liveMirrorBadge.textContent = "No live case";
    elements.liveMirrorCase.textContent = "-";
    elements.liveMirrorSurface.textContent = "-";
    elements.liveMirrorSignals.textContent = "0";
    elements.liveMirrorTime.textContent = "-";
    elements.workflowOpenCaseButton.disabled = true;
    return;
  }

  const { caseItem, preview } = latestLivePreview;
  elements.liveMirrorBadge.textContent = caseItem.status;
  elements.liveMirrorCase.textContent = caseItem.id;
  elements.liveMirrorSurface.textContent = caseItem.channel;
  elements.liveMirrorSignals.textContent = String(preview.totals.matches);
  elements.liveMirrorTime.textContent = new Date(caseItem.receivedAt).toLocaleTimeString();
  elements.workflowOpenCaseButton.disabled = false;
}

function updateWorkflowBridge() {
  elements.workflowQueueDepth.textContent = String(reviewQueue.filter((item) => item.status !== "Resolved").length);

  if (!latestLivePreview) {
    elements.workflowLastCase.textContent = "No live case";
    elements.workflowLastRisk.textContent = "0";
    elements.workflowOpenCaseButton.disabled = true;
    return;
  }

  const { caseItem, preview } = latestLivePreview;
  elements.workflowLastCase.textContent = caseItem.id;
  elements.workflowLastRisk.textContent = String(preview.totals.riskScore);
  elements.workflowOpenCaseButton.disabled = false;
}

function openLatestLiveCase() {
  if (!latestLivePreview) {
    return;
  }
  loadQueueCase(latestLivePreview.caseItem);
}

function switchMediaTab(mode) {
  document.querySelectorAll("[data-media-tab]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.mediaTab === mode);
  });
  elements.audioPanel.hidden = mode !== "audio";
  elements.videoPanel.hidden = mode !== "video";
  elements.audioPanel.classList.toggle("is-active", mode === "audio");
  elements.videoPanel.classList.toggle("is-active", mode === "video");
  elements.mediaStatus.textContent = mode === "audio" ? "Audio transcript" : "Video transcript";
}

function loadNextMediaSample(mode) {
  const samples = mode === "audio" ? audioTranscriptSamples : videoTranscriptSamples;
  if (!samples.length) {
    return;
  }

  const cursor = mode === "audio" ? audioSampleCursor : videoSampleCursor;
  const sample = samples[cursor];
  if (!sample) {
    return;
  }

  if (mode === "audio") {
    audioSampleCursor = (audioSampleCursor + 1) % samples.length;
    elements.audioTranscript.value = sample.text;
  } else {
    videoSampleCursor = (videoSampleCursor + 1) % samples.length;
    elements.videoTranscript.value = sample.text;
  }

  switchMediaTab(mode);
  elements.mediaStatus.textContent = `${mode === "audio" ? "Audio" : "Video"} sample: ${sample.label}`;
  addTimelineEvent(`${mode === "audio" ? "Audio" : "Video"} sample loaded`, sample.label);
}

function loadMediaText(mode) {
  const text =
    mode === "audio" ? elements.audioTranscript.value.trim() : elements.videoTranscript.value.trim();
  if (!text) {
    return;
  }

  elements.caseIdInput.value = `${mode.toUpperCase()}-${generateShortId()}`;
  elements.surfaceSelect.value = mode === "audio" ? "Live chat" : "Post";
  elements.reporterCountInput.value = mode === "audio" ? "2" : "3";
  elements.accountAgeSelect.value = "Unknown";
  elements.contentInput.value = text;
  updateCharacterCount();
  addTimelineEvent(`${mode === "audio" ? "Audio" : "Video"} transcript analyzed`, elements.caseIdInput.value);
  scanText();
}

function readTranscriptFile(input, target) {
  const file = input.files?.[0];
  if (!file) {
    return;
  }

  if (file.type.startsWith("text/") || file.name.toLowerCase().endsWith(".txt")) {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      target.value = String(reader.result || "");
    });
    reader.readAsText(file);
    return;
  }

  target.value = `${file.name} uploaded. Transcript pending. Reviewer note: add transcript, title, comments, or metadata here for policy review.`;
}

function generateShortId() {
  return Math.random().toString(36).slice(2, 7).toUpperCase();
}

function renderPolicyEditor() {
  elements.categoryTabs.innerHTML = "";
  const visibleCategories = categories.filter((category) =>
    category.label.toLowerCase().includes(policySearchText) ||
    category.terms.some((term) => term.toLowerCase().includes(policySearchText)),
  );

  visibleCategories.forEach((category) => {
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

  const activeCategory =
    visibleCategories.find((category) => category.id === activeCategoryId) ||
    visibleCategories[0] ||
    categories[0];
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
  latestScan = buildScanSnapshot(elements.contentInput.value, getCaseMetadata(), new Date().toISOString());
  renderScanResults();
}

function buildScanSnapshot(text, caseMeta = getCaseMetadata(), scannedAt = null) {
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
  const totals = buildTotals(text, matches, grouped, caseMeta);

  return {
    text,
    scannedAt: text ? scannedAt || new Date().toISOString() : null,
    case: caseMeta,
    matches,
    grouped,
    totals,
  };
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

function buildTotals(text, matches, grouped, caseMeta) {
  if (!text) {
    return createEmptyScan().totals;
  }

  const categoryCounts = getCategoryCounts(matches);
  const highestSeverity = getHighestSeverity(matches);
  const pii = matches.filter((match) => match.categoryId === "privacy").length;
  const patternMatches = matches.filter((match) => match.source === "pattern").length;
  const risk = calculateRiskScore(matches, categoryCounts, caseMeta);
  const riskScore = risk.score;
  const recommendation = getRecommendation(riskScore, highestSeverity, categoryCounts, pii);

  return {
    matches: matches.length,
    categories: categoryCounts.length,
    pii,
    patternMatches,
    highestSeverity,
    riskScore,
    scoreFactors: risk.factors,
    recommendedAction: recommendation.action,
    reason: recommendation.reason,
    categoryCounts,
    playbook: getPlaybook(text, matches, grouped, categoryCounts, pii, riskScore),
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

function calculateRiskScore(matches, categoryCounts, meta = getCaseMetadata()) {
  const factors = [];
  const severityCounts = matches.reduce((counts, match) => {
    counts[match.severity] = (counts[match.severity] || 0) + 1;
    return counts;
  }, {});
  const base = Object.entries(severityCounts).reduce((sum, [severity, count]) => {
    const points = (severityWeights[severity] || 0) * count;
    if (points > 0) {
      factors.push({
        label: `${count} ${severity} signal${count === 1 ? "" : "s"}`,
        points,
      });
    }
    return sum + points;
  }, 0);
  const uniqueCategoryBonus = categoryCounts.length * 5;
  const repeatBonus = Math.max(0, matches.length - categoryCounts.length) * 3;
  const reporterBonus = meta.reporterCount >= 5 ? 12 : meta.reporterCount >= 2 ? 7 : 0;
  const accountBonus = meta.accountAge === "New account" ? 6 : 0;
  const surfaceBonus = ["Direct message", "Live chat"].includes(meta.surface) ? 4 : 0;
  const bonuses = [
    { label: "Multiple policy areas", points: uniqueCategoryBonus },
    { label: "Repeated signals", points: repeatBonus },
    { label: "Reporter volume", points: reporterBonus },
    { label: "New account context", points: accountBonus },
    { label: "High-touch surface", points: surfaceBonus },
  ];

  bonuses.forEach((bonus) => {
    if (bonus.points > 0) {
      factors.push(bonus);
    }
  });

  return {
    score: Math.min(100, Math.round(base + uniqueCategoryBonus + repeatBonus + reporterBonus + accountBonus + surfaceBonus)),
    factors,
  };
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

function getPlaybook(text, matches, grouped, categoryCounts, pii, riskScore) {
  if (!text) {
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
  if (ids.has("adult")) {
    playbook.push({ title: "Adult content", text: "Check consent, solicitation, age context, and surface restrictions." });
  }
  if (ids.has("misinformation")) {
    playbook.push({ title: "Misinformation", text: "Review claim context, local policy, and potential real-world harm." });
  }
  if (ids.has("evasion")) {
    playbook.push({ title: "Evasion", text: "Review account links, repeated behavior, and attempts to bypass enforcement." });
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
  renderMatchesTable(getVisibleGroups(grouped));
  renderScoreBreakdown(totals.scoreFactors);
  renderAppealReadiness();
  renderReviewerQuality();
  renderSignalReviewSummary();
  renderCaseTimeline();
  drawSignalCanvas(totals);
}

function switchMainTab(tabId) {
  document.querySelectorAll("[data-tab-target]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.tabTarget === tabId);
  });
  document.querySelectorAll(".tab-panel").forEach((panel) => {
    panel.classList.toggle("is-active", panel.id === tabId);
  });
  window.setTimeout(() => drawSignalCanvas(latestScan.totals), 0);
}

function getVisibleGroups(grouped = latestScan.grouped) {
  const filter = elements.severityFilter?.value || "all";
  if (filter === "all") {
    return grouped;
  }
  return grouped.filter((group) => group.severity === filter);
}

function renderScoreBreakdown(factors = []) {
  elements.scoreBreakdown.innerHTML = "";

  if (!factors.length) {
    const item = document.createElement("li");
    item.innerHTML = "<span>No active scoring factors</span><strong>+0</strong>";
    elements.scoreBreakdown.append(item);
    return;
  }

  factors.slice(0, 7).forEach((factor) => {
    const item = document.createElement("li");
    const label = document.createElement("span");
    const points = document.createElement("strong");
    label.textContent = factor.label;
    points.textContent = `+${factor.points}`;
    item.append(label, points);
    elements.scoreBreakdown.append(item);
  });
}

function getAppealReadiness() {
  const checks = [
    { label: "Context reviewed", done: elements.contextCheck.checked },
    { label: "Policy mapped", done: elements.policyCheck.checked },
    { label: "Appeal path considered", done: elements.appealCheck.checked },
    { label: "Decision reason selected", done: Boolean(elements.decisionReasonSelect.value) },
    { label: "Reviewer notes added", done: elements.reviewNotes.value.trim().length >= 12 },
    { label: "Evidence scanned", done: latestScan.totals.matches > 0 },
  ];
  const complete = checks.filter((item) => item.done).length;
  return {
    score: Math.round((complete / checks.length) * 100),
    checks,
  };
}

function renderAppealReadiness() {
  const readiness = getAppealReadiness();
  elements.appealReadinessScore.textContent = `${readiness.score}%`;
  elements.readinessFill.style.width = `${readiness.score}%`;
  elements.readinessList.innerHTML = "";

  readiness.checks.forEach((check) => {
    const item = document.createElement("li");
    item.dataset.done = String(check.done);
    item.textContent = `${check.done ? "Done" : "Open"} - ${check.label}`;
    elements.readinessList.append(item);
  });
}

function getReviewerQuality() {
  const reviewedSignals = Object.keys(signalReviewState).length;
  const checks = [
    { label: "Scanned current case", done: latestScan.totals.matches > 0 },
    { label: "Reviewed at least one signal", done: reviewedSignals > 0 || latestScan.totals.matches === 0 },
    { label: "Decision reason selected", done: Boolean(elements.decisionReasonSelect.value) },
    { label: "Reviewer notes are specific", done: elements.reviewNotes.value.trim().length >= 24 },
    { label: "Appeal checklist touched", done: elements.contextCheck.checked || elements.policyCheck.checked || elements.appealCheck.checked },
  ];
  const complete = checks.filter((item) => item.done).length;
  return {
    score: Math.round((complete / checks.length) * 100),
    checks,
  };
}

function renderReviewerQuality() {
  if (!elements.reviewerQualityScore) {
    return;
  }

  const quality = getReviewerQuality();
  elements.reviewerQualityScore.textContent = `${quality.score}%`;
  elements.qualityFill.style.width = `${quality.score}%`;
  elements.qualityList.innerHTML = "";
  quality.checks.forEach((check) => {
    const item = document.createElement("li");
    item.dataset.done = String(check.done);
    item.textContent = `${check.done ? "Done" : "Open"} - ${check.label}`;
    elements.qualityList.append(item);
  });
}

function addTimelineEvent(label, detail = "") {
  timelineEvents.unshift({
    label,
    detail,
    time: new Date().toISOString(),
  });
  timelineEvents = timelineEvents.slice(0, 12);
  renderCaseTimeline();
}

function renderCaseTimeline() {
  const events = [...timelineEvents];
  if (latestScan.scannedAt) {
    events.unshift({
      label: "Scan completed",
      detail: `${latestScan.totals.matches} signals | risk ${latestScan.totals.riskScore}`,
      time: latestScan.scannedAt,
    });
  }

  elements.timelineCount.textContent = String(events.length);
  elements.caseTimeline.innerHTML = "";

  if (!events.length) {
    const item = document.createElement("li");
    item.textContent = "Waiting for case activity";
    elements.caseTimeline.append(item);
    return;
  }

  events.slice(0, 8).forEach((event) => {
    const item = document.createElement("li");
    const label = document.createElement("strong");
    const detail = document.createElement("span");
    label.textContent = `${new Date(event.time).toLocaleTimeString()} - ${event.label}`;
    detail.textContent = event.detail;
    item.append(label, detail);
    elements.caseTimeline.append(item);
  });
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
    const key = getGroupKey(group);
    row.dataset.reviewState = signalReviewState[key] || "";
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

    const actions = document.createElement("div");
    actions.className = "signal-actions";

    const confirm = document.createElement("button");
    confirm.type = "button";
    confirm.className = "signal-action";
    confirm.dataset.action = "confirm";
    confirm.setAttribute("aria-pressed", signalReviewState[key] === "confirmed" ? "true" : "false");
    confirm.textContent = signalReviewState[key] === "confirmed" ? "Confirmed" : "Confirm";
    confirm.addEventListener("click", () => markSignalReview(group, "confirmed"));

    const falsePositive = document.createElement("button");
    falsePositive.type = "button";
    falsePositive.className = "signal-action";
    falsePositive.dataset.action = "false-positive";
    falsePositive.setAttribute("aria-pressed", signalReviewState[key] === "false-positive" ? "true" : "false");
    falsePositive.textContent = signalReviewState[key] === "false-positive" ? "False positive" : "False +";
    falsePositive.addEventListener("click", () => markSignalReview(group, "false-positive"));

    actions.append(confirm, falsePositive);
    signal.append(actions);

    category.textContent = group.categoryLabel;
    severity.textContent = group.severity;
    source.textContent = group.source;
    count.textContent = String(group.count);

    row.append(signal, category, severity, source, count);
    elements.matchesBody.append(row);
  });
}

function getGroupKey(group) {
  return `${group.categoryId}:${group.source}:${group.term.toLowerCase()}`;
}

function markSignalReview(group, state) {
  signalReviewState[getGroupKey(group)] = state;
  addTimelineEvent("Signal reviewed", `${group.term}: ${state}`);
  renderMatchesTable(getVisibleGroups());
  renderSignalReviewSummary();
  renderReviewerQuality();
}

function renderSignalReviewSummary() {
  if (!elements.signalReviewSummary) {
    return;
  }

  const values = Object.values(signalReviewState);
  const confirmed = values.filter((value) => value === "confirmed").length;
  const falsePositive = values.filter((value) => value === "false-positive").length;
  elements.signalReviewSummary.textContent = `${confirmed} confirmed | ${falsePositive} false positive`;
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

function redactPrivacySignals() {
  if (!latestScan.text || !latestScan.matches.length) {
    return;
  }

  const privacyRanges = collapseRedactionRanges(
    latestScan.matches.filter((match) => match.categoryId === "privacy"),
  ).sort((a, b) => b.start - a.start);

  if (!privacyRanges.length) {
    return;
  }

  let redacted = elements.contentInput.value;
  privacyRanges.forEach((match) => {
    redacted = `${redacted.slice(0, match.start)}[REDACTED]${redacted.slice(match.end)}`;
  });

  elements.contentInput.value = redacted;
  updateCharacterCount();
  scanText();
  reviewState.audit.unshift({
    action: "Redact PII",
    time: new Date().toISOString(),
    caseId: elements.caseIdInput.value,
    riskScore: latestScan.totals.riskScore,
    checklist: getChecklistState(),
    notes: "Privacy signals redacted from review text.",
  });
  addTimelineEvent("Privacy redacted", `${privacyRanges.length} range${privacyRanges.length === 1 ? "" : "s"}`);
  renderAuditLog();
}

function collapseRedactionRanges(matches) {
  const sorted = [...matches].sort((a, b) => a.start - b.start || a.end - b.end);
  const ranges = [];

  sorted.forEach((match) => {
    const last = ranges[ranges.length - 1];
    if (!last || match.start > last.end) {
      ranges.push({ start: match.start, end: match.end });
      return;
    }
    last.end = Math.max(last.end, match.end);
  });

  return ranges;
}

function scheduleScan() {
  if (!autoScanEnabled) {
    return;
  }
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

function exportCasePacket() {
  const packet = {
    case: latestScan.case || getCaseMetadata(),
    recommendation: latestScan.totals.recommendedAction,
    riskScore: latestScan.totals.riskScore,
    status: elements.riskStatus.querySelector("strong").textContent,
    scoreFactors: latestScan.totals.scoreFactors,
    matches: latestScan.grouped,
    playbook: latestScan.totals.playbook,
    appealReadiness: getAppealReadiness(),
    review: {
      decision: reviewState.decision,
      checklist: getChecklistState(),
      notes: elements.reviewNotes.value,
      audit: reviewState.audit,
    },
    timeline: timelineEvents,
    excerpt: latestScan.text.slice(0, 800),
  };

  addTimelineEvent("Case packet exported", packet.case.caseId || "Current case");
  download("trust-safety-case-packet.json", "application/json;charset=utf-8", JSON.stringify(packet, null, 2));
}

function exportPolicyRules() {
  saveActiveEditorTerms();
  download("trust-safety-policy-rules.json", "application/json;charset=utf-8", JSON.stringify(categories, null, 2));
}

function importPolicyRules() {
  const file = elements.policyImportInput.files?.[0];
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      const parsed = JSON.parse(String(reader.result || "[]"));
      if (!Array.isArray(parsed)) {
        return;
      }

      categories = parsed.map((category, index) => ({
        id: sanitizeId(category.id) || `custom-${index + 1}`,
        label: String(category.label || `Custom ${index + 1}`),
        severity: normalizeSeverity(category.severity),
        terms: normalizeTerms(category.terms || []),
      }));
      activeCategoryId = categories[0]?.id || "custom-1";
      localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
      renderPolicyEditor();
      scanText();
      addTimelineEvent("Policy rules imported", `${categories.length} categories`);
    } catch {
      addTimelineEvent("Policy import failed", file.name);
    }
  });
  reader.readAsText(file);
}

function toggleTheme() {
  document.body.classList.toggle("theme-dark");
  const enabled = document.body.classList.contains("theme-dark");
  localStorage.setItem("trust-safety-theme", enabled ? "dark" : "light");
  elements.themeToggleButton.textContent = enabled ? "Use Light Theme" : "Use Dark Theme";
}

function toggleCompactMode() {
  document.body.classList.toggle("compact-mode");
  const enabled = document.body.classList.contains("compact-mode");
  elements.compactToggleButton.setAttribute("aria-pressed", String(enabled));
  elements.compactToggleButton.textContent = enabled ? "Compact On" : "Compact Off";
}

function toggleAutoScan() {
  autoScanEnabled = !autoScanEnabled;
  elements.autoScanToggleButton.setAttribute("aria-pressed", String(autoScanEnabled));
  elements.autoScanToggleButton.classList.toggle("is-active", autoScanEnabled);
  elements.autoScanToggleButton.textContent = autoScanEnabled ? "Auto Scan On" : "Auto Scan Off";
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
  const reason = elements.decisionReasonSelect.value;

  reviewState.audit.unshift({
    action,
    reason,
    time: new Date().toISOString(),
    caseId: elements.caseIdInput.value,
    riskScore: latestScan.totals.riskScore,
    checklist: getChecklistState(),
    notes: elements.reviewNotes.value.trim(),
  });

  addTimelineEvent("Decision recorded", reason ? `${action}: ${reason}` : action);
  renderAuditLog();
  renderAppealReadiness();
  renderReviewerQuality();
  showDecisionToast(action, reason);
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
    const reason = entry.reason ? ` (${entry.reason})` : "";
    item.textContent = `${new Date(entry.time).toLocaleTimeString()} - ${entry.action}${reason} at risk ${entry.riskScore}`;
    elements.auditLog.append(item);
  });
}

function showDecisionToast(action, reason) {
  if (!elements.decisionToast) {
    return;
  }

  const config = {
    Allow: { icon: "✓", title: "Allow Decision Logged", state: "allow" },
    Warn: { icon: "!", title: "Warn Decision Logged", state: "warn" },
    Remove: { icon: "-", title: "Remove Decision Logged", state: "remove" },
    Escalate: { icon: "↑", title: "Escalation Submitted", state: "escalate" },
  }[action] || { icon: "•", title: "Decision Recorded", state: "default" };

  elements.decisionToast.dataset.state = config.state;
  elements.decisionToastIcon.textContent = config.icon;
  elements.decisionToastTitle.textContent = config.title;
  elements.decisionToastMessage.textContent = reason
    ? `Reason: ${reason}`
    : `The tool recorded ${action.toLowerCase()} for this case.`;

  elements.decisionToast.hidden = false;
  elements.decisionToast.classList.add("is-visible");
  window.clearTimeout(decisionToastTimer);
  decisionToastTimer = window.setTimeout(() => {
    elements.decisionToast.classList.remove("is-visible");
    window.setTimeout(() => {
      elements.decisionToast.hidden = true;
    }, 180);
  }, 2300);
}

function generateCaseId() {
  const date = new Date();
  const compactDate = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
  const random = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `TS-${compactDate}-${random}`;
}

function setDelightMode(enabled) {
  delightEnabled = enabled && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.body.classList.toggle("delight-enabled", delightEnabled);
  elements.delightToggleButton.setAttribute("aria-pressed", String(delightEnabled));
  elements.delightToggleButton.classList.toggle("is-active", delightEnabled);
  elements.delightToggleButton.innerHTML = delightEnabled
    ? '<span class="button-icon" aria-hidden="true">&#10024;</span> Delight On'
    : '<span class="button-icon" aria-hidden="true">&#10024;</span> Delight Off';
}

function moveCursorHalo(point) {
  if (!delightEnabled || !elements.cursorHalo || point.pointerType === "touch") {
    return;
  }

  pendingHaloPoint = point;
  if (haloFrame) {
    return;
  }

  haloFrame = window.requestAnimationFrame(() => {
    elements.cursorHalo.style.transform = `translate3d(${pendingHaloPoint.clientX - 17}px, ${pendingHaloPoint.clientY - 17}px, 0)`;
    haloFrame = 0;
  });
}

function maybeCreateTrail(point) {
  if (!delightEnabled || point.pointerType === "touch") {
    return;
  }

  const now = Date.now();
  if (now - lastTrailAt < 70) {
    return;
  }
  lastTrailAt = now;

  const dot = document.createElement("span");
  dot.className = "trail-dot";
  dot.style.left = `${point.clientX}px`;
  dot.style.top = `${point.clientY}px`;
  document.body.append(dot);
  window.setTimeout(() => dot.remove(), 560);
}

function createDelightBurst(point) {
  if (!delightEnabled) {
    return;
  }

  const symbols = ["🛡️", "✅", "✨", "🔍", "⚡"];
  symbols.forEach((symbol, index) => {
    const pop = document.createElement("span");
    const angle = (Math.PI * 2 * index) / symbols.length - Math.PI / 2;
    const distance = 30 + Math.random() * 34;
    pop.className = "delight-pop";
    pop.textContent = symbol;
    pop.style.left = `${point.clientX}px`;
    pop.style.top = `${point.clientY}px`;
    pop.style.setProperty("--burst-x", `${Math.cos(angle) * distance}px`);
    pop.style.setProperty("--burst-y", `${Math.sin(angle) * distance}px`);
    pop.style.setProperty("--burst-rotate", `${Math.round(Math.random() * 80 - 40)}deg`);
    document.body.append(pop);
    window.setTimeout(() => pop.remove(), 800);
  });
}

document.querySelectorAll("[data-tab-target]").forEach((button) => {
  button.addEventListener("click", () => switchMainTab(button.dataset.tabTarget));
});
elements.scanButton.addEventListener("click", scanText);
elements.saveRulesButton.addEventListener("click", saveRules);
elements.resetRulesButton.addEventListener("click", resetRules);
elements.sampleButton.addEventListener("click", () => loadSampleWorkflow());
elements.delightToggleButton.addEventListener("click", () => setDelightMode(!delightEnabled));
elements.loadSampleButton.addEventListener("click", () => loadSampleWorkflow());
elements.sampleWorkflowSelect.addEventListener("change", updateSamplePreview);
elements.nextCaseButton.addEventListener("click", loadNextQueueCase);
elements.liveDemoButton.addEventListener("click", toggleLiveDemo);
elements.workflowOpenCaseButton.addEventListener("click", openLatestLiveCase);
document.querySelectorAll("[data-media-tab]").forEach((button) => {
  button.addEventListener("click", () => switchMediaTab(button.dataset.mediaTab));
});
elements.audioSampleButton.addEventListener("click", () => {
  loadNextMediaSample("audio");
});
elements.videoSampleButton.addEventListener("click", () => {
  loadNextMediaSample("video");
});
elements.analyzeAudioButton.addEventListener("click", () => loadMediaText("audio"));
elements.analyzeVideoButton.addEventListener("click", () => loadMediaText("video"));
elements.audioFileInput.addEventListener("change", () => readTranscriptFile(elements.audioFileInput, elements.audioTranscript));
elements.videoFileInput.addEventListener("change", () => readTranscriptFile(elements.videoFileInput, elements.videoTranscript));
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
elements.severityFilter.addEventListener("change", () => renderMatchesTable(getVisibleGroups()));
elements.redactPiiButton.addEventListener("click", redactPrivacySignals);
elements.exportCsvButton.addEventListener("click", exportCsv);
elements.exportJsonButton.addEventListener("click", exportJson);
elements.casePacketButton.addEventListener("click", exportCasePacket);
elements.copySummaryButton.addEventListener("click", copySummary);
elements.contextCheck.addEventListener("change", renderAppealReadiness);
elements.policyCheck.addEventListener("change", renderAppealReadiness);
elements.appealCheck.addEventListener("change", renderAppealReadiness);
elements.decisionReasonSelect.addEventListener("change", () => {
  renderAppealReadiness();
  renderReviewerQuality();
});
elements.reviewNotes.addEventListener("input", () => {
  renderAppealReadiness();
  renderReviewerQuality();
});
elements.policySearchInput.addEventListener("input", () => {
  policySearchText = elements.policySearchInput.value.trim().toLowerCase();
  renderPolicyEditor();
});
elements.policyExportButton.addEventListener("click", exportPolicyRules);
elements.policyImportInput.addEventListener("change", importPolicyRules);
elements.themeToggleButton.addEventListener("click", toggleTheme);
elements.compactToggleButton.addEventListener("click", toggleCompactMode);
elements.autoScanToggleButton.addEventListener("click", toggleAutoScan);
document.querySelectorAll("[data-action]").forEach((button) => {
  button.addEventListener("click", () => recordDecision(button.dataset.action));
});
document.querySelectorAll("[data-mobile-action]").forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.mobileAction;
    if (action === "sample") {
      loadSampleWorkflow();
    } else if (action === "scan") {
      scanText();
    } else if (action === "redact") {
      redactPrivacySignals();
    } else if (action === "clear") {
      elements.clearButton.click();
    }
  });
});
window.addEventListener("resize", () => drawSignalCanvas(latestScan.totals));
window.addEventListener("pointermove", (event) => {
  moveCursorHalo(event);
  maybeCreateTrail(event);
});
window.addEventListener("pointerdown", createDelightBurst);

elements.caseIdInput.value = generateCaseId();
if (localStorage.getItem("trust-safety-theme") === "dark") {
  document.body.classList.add("theme-dark");
  elements.themeToggleButton.textContent = "Use Light Theme";
} else {
  elements.themeToggleButton.textContent = "Use Dark Theme";
}
setDelightMode(delightEnabled);
renderSampleWorkflows();
renderQueue();
renderLiveMetrics();
renderLiveMirror();
updateWorkflowBridge();
renderPolicyEditor();
updateCharacterCount();
renderAuditLog();
renderScanResults();
