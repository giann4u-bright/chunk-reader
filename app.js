const sampleText = `When people think about success, they often imagine a person who has a special talent. However, many studies show that steady practice and clear feedback are more important than talent alone. Students who divide a difficult task into small steps can understand it better and remember it longer.`;

const sampleAnalysis = [
  {
    sentence: "When people think about success, they often imagine a person who has a special talent.",
    translation: "사람들은 성공을 생각할 때, 특별한 재능을 가진 사람을 자주 떠올립니다.",
    source: "demo",
    points: {
      structure: "주어 they + 동사 imagine. When절은 시간 부사절입니다.",
      pronouns: "they = people, who = a person",
      flow: "성공에 대한 흔한 생각을 제시합니다.",
    },
    chunks: [
      { text: "When people think about success", translation: "사람들이 성공에 대해 생각할 때", grammar: "시간 부사절" },
      { text: "they often imagine a person", translation: "그들은 자주 한 사람을 떠올린다", grammar: "S they / V imagine" },
      { text: "who has a special talent.", translation: "특별한 재능을 가진", grammar: "관계사 who = a person" },
    ],
  },
  {
    sentence: "However, many studies show that steady practice and clear feedback are more important than talent alone.",
    translation: "하지만 많은 연구는 꾸준한 연습과 명확한 피드백이 재능만 있는 것보다 더 중요하다는 점을 보여 줍니다.",
    source: "demo",
    points: {
      structure: "주어 many studies + 동사 show. that절은 show의 목적어 역할입니다.",
      pronouns: "",
      flow: "However로 앞의 생각을 반박하며 글의 방향을 바꿉니다.",
    },
    chunks: [
      { text: "However", translation: "하지만", grammar: "역접 흐름" },
      { text: "many studies show", translation: "많은 연구가 보여 준다", grammar: "S studies / V show" },
      { text: "that steady practice and clear feedback", translation: "꾸준한 연습과 명확한 피드백이", grammar: "명사절 that" },
      { text: "are more important than talent alone.", translation: "재능만 있는 것보다 더 중요하다는 것을", grammar: "비교급 more A than B" },
    ],
  },
  {
    sentence: "Students who divide a difficult task into small steps can understand it better and remember it longer.",
    translation: "어려운 과제를 작은 단계로 나누는 학생들은 그것을 더 잘 이해하고 더 오래 기억할 수 있습니다.",
    source: "demo",
    points: {
      structure: "주어는 Students, 동사는 can understand / remember입니다. who절은 Students를 꾸밉니다.",
      pronouns: "who = Students, it = a difficult task",
      flow: "앞 문장의 주장을 학생들의 공부 방법으로 구체화합니다.",
    },
    chunks: [
      { text: "Students", translation: "학생들은", grammar: "문장 주어" },
      { text: "who divide a difficult task into small steps", translation: "어려운 과제를 작은 단계로 나누는", grammar: "관계사 who = Students" },
      { text: "can understand it better", translation: "그것을 더 잘 이해할 수 있고", grammar: "대명사 it = task" },
      { text: "and remember it longer.", translation: "그것을 더 오래 기억할 수 있다", grammar: "병렬: understand / remember" },
    ],
  },
];

const sampleFineAnalysis = [
  {
    sentence: "When people think about success, they often imagine a person who has a special talent.",
    translation: "사람들은 성공을 생각할 때, 특별한 재능을 가진 사람을 자주 떠올립니다.",
    source: "demo",
    points: {
      structure: "When절 안의 주어는 people, 동사는 think입니다. 주절의 주어는 they, 동사는 imagine입니다.",
      pronouns: "they = people, who = a person",
      flow: "성공에 대한 흔한 생각을 먼저 제시합니다.",
    },
    chunks: [
      { text: "When people", translation: "사람들이 ~할 때", grammar: "부사절 + 주어" },
      { text: "think", translation: "생각한다", grammar: "동사" },
      { text: "about success", translation: "성공에 대해", grammar: "전치사구" },
      { text: "they", translation: "그들은", grammar: "주어" },
      { text: "often imagine", translation: "자주 떠올린다", grammar: "동사구" },
      { text: "a person", translation: "한 사람을", grammar: "목적어" },
      { text: "who", translation: "그 사람은", grammar: "관계사" },
      { text: "has", translation: "가지고 있다", grammar: "동사" },
      { text: "a special talent.", translation: "특별한 재능을", grammar: "목적어" },
    ],
  },
  {
    sentence: "However, many studies show that steady practice and clear feedback are more important than talent alone.",
    translation: "하지만 많은 연구는 꾸준한 연습과 명확한 피드백이 재능만 있는 것보다 더 중요하다는 점을 보여 줍니다.",
    source: "demo",
    points: {
      structure: "주어는 many studies, 동사는 show입니다. that절 전체가 show의 목적어입니다.",
      pronouns: "",
      flow: "However로 앞 문장의 생각을 반박합니다.",
    },
    chunks: [
      { text: "However", translation: "하지만", grammar: "역접" },
      { text: "many studies", translation: "많은 연구가", grammar: "주어" },
      { text: "show", translation: "보여 준다", grammar: "동사" },
      { text: "that steady practice", translation: "꾸준한 연습이", grammar: "that절 주어 1" },
      { text: "and clear feedback", translation: "그리고 명확한 피드백이", grammar: "that절 주어 2" },
      { text: "are", translation: "~이다", grammar: "be동사" },
      { text: "more important", translation: "더 중요하다", grammar: "보어" },
      { text: "than talent alone.", translation: "재능만 있는 것보다", grammar: "비교 전치사구" },
    ],
  },
  {
    sentence: "Students who divide a difficult task into small steps can understand it better and remember it longer.",
    translation: "어려운 과제를 작은 단계로 나누는 학생들은 그것을 더 잘 이해하고 더 오래 기억할 수 있습니다.",
    source: "demo",
    points: {
      structure: "큰 주어는 Students, 큰 동사는 can understand / remember입니다. who절은 Students를 설명합니다.",
      pronouns: "who = Students, it = a difficult task",
      flow: "주장을 학생들의 공부 방법으로 구체화합니다.",
    },
    chunks: [
      { text: "Students", translation: "학생들은", grammar: "주어" },
      { text: "who", translation: "그 학생들은", grammar: "관계사" },
      { text: "divide", translation: "나눈다", grammar: "동사" },
      { text: "a difficult task", translation: "어려운 과제를", grammar: "목적어" },
      { text: "into small steps", translation: "작은 단계들로", grammar: "전치사구" },
      { text: "can understand", translation: "이해할 수 있고", grammar: "조동사 + 동사" },
      { text: "it", translation: "그것을", grammar: "목적어/대명사" },
      { text: "better", translation: "더 잘", grammar: "부사" },
      { text: "and remember", translation: "그리고 기억할 수 있다", grammar: "병렬 동사" },
      { text: "it", translation: "그것을", grammar: "목적어/대명사" },
      { text: "longer.", translation: "더 오래", grammar: "부사" },
    ],
  },
];

const samplePassageInsight = {
  topic: {
    ko: "성공에는 타고난 재능보다 꾸준한 연습과 피드백이 더 중요하다.",
    en: "Steady practice and clear feedback matter more for success than talent alone.",
  },
  logic: [
    { type: "통념", text: "성공은 특별한 재능에서 나온다고 흔히 생각한다." },
    { type: "반박", text: "하지만 연구는 재능보다 꾸준한 연습과 피드백이 더 중요함을 보여 준다." },
    { type: "주제", text: "성공의 핵심은 타고난 능력보다 지속적인 학습 과정이다." },
    { type: "적용", text: "어려운 과제를 작은 단계로 나누면 더 잘 이해하고 오래 기억할 수 있다." },
  ],
  keywords: [
    { en: "success", ko: "성공" },
    { en: "talent", ko: "재능" },
    { en: "steady practice", ko: "꾸준한 연습" },
    { en: "clear feedback", ko: "명확한 피드백" },
    { en: "small steps", ko: "작은 단계" },
  ],
};

const phraseHints = [
  [/^when\b|^while\b|^after\b|^before\b/i, "시간 부사절"],
  [/^because\b|^since\b|^as\b/i, "이유 부사절"],
  [/^if\b|^unless\b/i, "조건 부사절"],
  [/^although\b|^though\b|^even though\b/i, "양보 부사절"],
  [/^however\b|^but\b/i, "역접 흐름"],
  [/^therefore\b|^so\b|^thus\b/i, "인과 흐름"],
  [/^for example\b|^for instance\b/i, "예시 흐름"],
  [/^in order to\b|^to\s+\w+/i, "to부정사"],
  [/^who\b|^which\b|^that\b/i, "관계사절"],
  [/^by\s+\w+ing\b/i, "by + 동명사"],
];

const els = {
  imageInput: document.querySelector("#imageInput"),
  dropZone: document.querySelector("#dropZone"),
  previewWrap: document.querySelector("#previewWrap"),
  previewImage: document.querySelector("#previewImage"),
  sourceText: document.querySelector("#sourceText"),
  chunkLevel: document.querySelector("#chunkLevel"),
  showGrammar: document.querySelector("#showGrammar"),
  analyzeButton: document.querySelector("#analyzeButton"),
  sampleButton: document.querySelector("#sampleButton"),
  printButton: document.querySelector("#printButton"),
  ocrState: document.querySelector("#ocrState"),
  resultArea: document.querySelector("#resultArea"),
  passageInsight: document.querySelector("#passageInsight"),
  topicKo: document.querySelector("#topicKo"),
  topicEn: document.querySelector("#topicEn"),
  keywordList: document.querySelector("#keywordList"),
  logicFlow: document.querySelector("#logicFlow"),
  sentenceTemplate: document.querySelector("#sentenceTemplate"),
  sentenceCount: document.querySelector("#sentenceCount"),
  chunkCount: document.querySelector("#chunkCount"),
  wordCount: document.querySelector("#wordCount"),
  tabs: document.querySelectorAll(".tab"),
};

let activeView = "study";
let currentAnalysis = [];
let currentPassageInsight = null;
let focusPositions = [];

function setState(text, variant = "") {
  els.ocrState.textContent = text;
  els.ocrState.className = `state-pill ${variant}`.trim();
}

function normalizeText(text) {
  return text
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\s+/g, " ")
    .replace(/\s+([,.!?;:])/g, "$1")
    .trim();
}

function splitSentences(text) {
  const cleaned = normalizeText(text);
  if (!cleaned) return [];
  return cleaned.match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map((sentence) => sentence.trim()).filter(Boolean) ?? [];
}

function chunkSentence(sentence, level) {
  if (level === "fine") return chunkSentenceForBeginners(sentence);
  if (level === "exam") return chunkSentenceForExam(sentence);

  const protectedSentence = sentence.replace(/\b(Mr|Ms|Dr|U\.S|U\.K)\./g, (match) => match.replace(".", "<dot>"));
  const clausePattern =
    level === "fine"
      ? /\s+(?=(?:and|but|or|so|because|when|while|if|although|after|before|who|which|that|to|with|without|by|for|from|in|on|at)\b)/gi
      : /\s+(?=(?:and|but|or|so|because|when|while|if|although|after|before|who|which|that|to)\b)/gi;
  const commaChunks = protectedSentence.split(/,\s*/);
  const chunks = commaChunks.flatMap((part) => part.split(clausePattern));
  const maxWords = level === "exam" ? 9 : level === "fine" ? 6 : 8;

  return chunks
    .flatMap((chunk) => splitLongChunk(chunk.replace(/<dot>/g, "."), maxWords))
    .map((chunk) => chunk.trim())
    .filter(Boolean);
}

function chunkSentenceForExam(sentence) {
  const protectedSentence = sentence.replace(/\b(Mr|Ms|Dr|U\.S|U\.K)\./g, (match) => match.replace(".", "<dot>"));
  return protectedSentence
    .replace(/\b(Suppose),\s*(for example),/gi, "$1<comma> $2|")
    .replace(/,\s*(however|therefore|for example|for instance|in contrast|as a result),\s*/gi, "|$1 ")
    .replace(/,\s*/g, "|")
    .replace(/<comma>/g, ",")
    .replace(/\s+(?=(?:however|therefore|instead|meanwhile|otherwise)\b)/gi, "|")
    .replace(/\s+(?=(?:because|when|while|if|although|though|since|as|after|before|unless|whereas|even\s+if|even\s+though)\b)/gi, "|")
    .replace(/\s+(?=(?:who|which|whose|whom|that)\b)/gi, "|")
    .replace(/\s+(?=(?:in order to|so as to|as a result of|because of|due to|according to)\b)/gi, "|")
    .replace(/\s+(?=(?:with|without|by|for|from|into|through|during|between|among|under|over)\b)/gi, "|")
    .split("|")
    .flatMap((chunk) => splitLongChunk(chunk.replace(/<dot>/g, "."), 12))
    .map((chunk) => chunk.trim())
    .filter(Boolean);
}

function chunkSentenceForBeginners(sentence) {
  const protectedSentence = sentence.replace(/\b(Mr|Ms|Dr|U\.S|U\.K)\./g, (match) => match.replace(".", "<dot>"));
  return splitIntoMeaningfulClauses(protectedSentence)
    .flatMap((clause) => splitClauseIntoBasics(clause.replace(/<dot>/g, ".")))
    .map((chunk) => chunk.trim())
    .filter(Boolean);
}

function splitIntoMeaningfulClauses(sentence) {
  return sentence
    .replace(/\b(Suppose),\s*(for example),/gi, "$1<comma> $2|")
    .replace(/,\s*(for example|for instance),\s*/gi, ", $1, ")
    .replace(/,\s*/g, "|")
    .replace(/<comma>/g, ",")
    .replace(/\s+(?=(?:and|but|or|so|because|when|while|if|although|after|before)\b)/gi, "|")
    .replace(/\s+(?=that\s+(?:everyone|everybody|someone|somebody|people|students|they|he|she|it|we|you)\b)/gi, "|")
    .replace(/\s+(?=(?:who|which)\b)/gi, "|")
    .split("|")
    .map((part) => part.trim())
    .filter(Boolean);
}

function splitClauseIntoBasics(clause) {
  if (isDiscourseChunk(clause)) return [clause];
  const relativePatternChunks = splitRelativeSubjectClause(clause);
  if (relativePatternChunks.length) return relativePatternChunks;

  const words = clause.trim().split(/\s+/).filter(Boolean);
  if (words.length <= 2) return [clause];

  const verbIndex = findVerbIndex(words);
  if (verbIndex === -1) return splitByPrepositions(words.join(" "));
  if (isShortConnectorClause(words, verbIndex)) return [clause];
  if (verbIndex === 0 && isBeVerbLike(words[verbIndex])) return [clause];

  const chunks = [];
  if (verbIndex > 0) chunks.push(words.slice(0, verbIndex).join(" "));

  let verbEnd = collectVerbPhraseEnd(words, verbIndex);
  if (verbEnd === verbIndex + 1 && isBeVerbLike(words[verbIndex]) && words[verbIndex + 1] && !isPreposition(words[verbIndex + 1])) {
    verbEnd += collectComplementEnd(words.slice(verbEnd));
  }
  chunks.push(words.slice(verbIndex, verbEnd).join(" "));

  const rest = words.slice(verbEnd).join(" ");
  if (rest) chunks.push(...splitByPrepositions(rest, { keepShortObjectWithPrep: true }));
  return mergeTinyChunks(chunks.flatMap((chunk) => splitLongChunk(chunk, 7)));
}

function findVerbIndex(words) {
  return words.findIndex((word, index) => (index > 0 || isImperativeVerb(word) || isBeVerbLike(word) || isModal(word)) && isLikelyVerb(word));
}

function isLikelyVerb(word) {
  const clean = word.toLowerCase().replace(/[^a-z']/g, "");
  return (
    isBeVerbLike(clean) ||
    isModal(clean) ||
    [
      "suppose",
      "supposes",
      "know",
      "knows",
      "bring",
      "brings",
      "brought",
      "you've",
      "youve",
      "they've",
      "theyve",
      "we've",
      "weve",
      "charge",
      "think",
      "thinks",
      "imagine",
      "imagines",
      "show",
      "shows",
      "divide",
      "divides",
      "understand",
      "understands",
      "remember",
      "remembers",
      "have",
      "has",
      "make",
      "makes",
      "help",
      "helps",
      "use",
      "uses",
      "need",
      "needs",
      "become",
      "becomes",
    ].includes(clean) ||
    /\w+(ed|ing)$/.test(clean)
  );
}

function collectVerbPhraseEnd(words, verbIndex) {
  const head = cleanWord(words[verbIndex]);
  let index = verbIndex + 1;
  let adverbEnd = skipAdverbs(words, index);
  let next = cleanWord(words[adverbEnd]);

  if (isModal(head) && next && isLikelyBaseVerb(next)) {
    index = adverbEnd + 1;
    if (isHaveAux(next) || isBeVerbLike(next)) return collectVerbPhraseEnd(words, adverbEnd);
    return index;
  }

  if (isBeVerbLike(head) && next) {
    if (next === "being") {
      const afterBeing = skipAdverbs(words, adverbEnd + 1);
      if (isParticiple(words[afterBeing])) return afterBeing + 1;
    }
    if (isParticiple(next) || isGerund(next)) return adverbEnd + 1;
  }

  if (isHaveAux(head) && next) {
    if (next === "been") {
      const afterBeen = skipAdverbs(words, adverbEnd + 1);
      if (isParticiple(words[afterBeen]) || isGerund(words[afterBeen])) return afterBeen + 1;
      return adverbEnd + 1;
    }
    if (isParticiple(next)) return adverbEnd + 1;
  }
  return index;
}

function skipAdverbs(words, startIndex) {
  let index = startIndex;
  while (words[index] && isAdverbWord(cleanWord(words[index]))) index += 1;
  return index;
}

function cleanWord(word) {
  return String(word || "").toLowerCase().replace(/[^a-z']/g, "");
}

function isHaveAux(word) {
  return /^(have|has|had|'ve|ve)$/.test(cleanWord(word));
}

function isParticiple(word) {
  const clean = cleanWord(word);
  return (
    /\w+ed$/.test(clean) ||
    [
      "been",
      "brought",
      "built",
      "chosen",
      "done",
      "driven",
      "eaten",
      "found",
      "given",
      "gone",
      "known",
      "made",
      "seen",
      "shown",
      "taken",
      "taught",
      "told",
      "written",
    ].includes(clean)
  );
}

function isGerund(word) {
  return /\w+ing$/.test(cleanWord(word));
}

function isLikelyBaseVerb(word) {
  const clean = cleanWord(word);
  return (
    [
      "be",
      "have",
      "do",
      "make",
      "take",
      "get",
      "go",
      "see",
      "know",
      "think",
      "imagine",
      "show",
      "divide",
      "understand",
      "remember",
      "bring",
      "use",
      "need",
      "become",
      "help",
      "work",
      "learn",
      "study",
      "read",
      "write",
      "find",
      "give",
      "keep",
      "start",
      "finish",
    ].includes(clean) || isParticiple(clean) || isGerund(clean)
  );
}

function isBeVerb(word) {
  return /^(is|am|are|was|were|be|been|being)$/.test(String(word).toLowerCase().replace(/[^a-z']/g, ""));
}

function isBeVerbLike(word) {
  return /^(is|am|are|was|were|be|been|being|you're|youre|i'm|im|he's|hes|she's|shes|it's|its|we're|were|they're|theyre)$/.test(
    String(word).toLowerCase().replace(/[^a-z']/g, ""),
  );
}

function isImperativeVerb(word) {
  return /^(suppose|imagine|consider|remember|notice|think)$/i.test(String(word).replace(/[^a-z']/g, ""));
}

function isModal(word) {
  return /^(can|could|will|would|should|may|might|must)$/.test(String(word).toLowerCase().replace(/[^a-z']/g, ""));
}

function isPreposition(word) {
  return /^(about|of|to|for|from|in|on|at|by|with|without|into|onto|over|under|between|among|through|during|before|after|than)$/.test(
    String(word).toLowerCase().replace(/[^a-z']/g, ""),
  );
}

function splitByPrepositions(text, options = {}) {
  const pieces = text.split(/\s+(?=(?:about|of|to|for|from|in|on|at|by|with|without|into|onto|over|under|between|among|through|during|before|after|than)\b)/gi);
  const trimmed = pieces.map((piece) => piece.trim()).filter(Boolean);
  if (!options.keepShortObjectWithPrep || trimmed.length < 2) return trimmed;

  const merged = [];
  trimmed.forEach((piece) => {
    const previous = merged[merged.length - 1];
    if (previous && !isPreposition(previous.split(/\s+/)[0]) && isPreposition(piece.split(/\s+/)[0]) && previous.split(/\s+/).length <= 3) {
      merged[merged.length - 1] = `${previous} ${piece}`;
    } else {
      merged.push(piece);
    }
  });
  return merged;
}

function isDiscourseChunk(clause) {
  return /^(suppose|imagine|consider),?\s+(for example|for instance),?$/i.test(clause.trim());
}

function isShortConnectorClause(words, verbIndex) {
  return /^(and|but|or|so)$/i.test(words[0]) && verbIndex > 0 && words.length <= 4;
}

function splitRelativeSubjectClause(clause) {
  const trimmed = clause.trim();
  const match = trimmed.match(/^(that\s+(?:everyone|everybody|someone|somebody|people|students|workers|members|they|he|she|we|you))\s+(.+?)\s+(is|are|was|were)\s+(.+)$/i);
  if (!match) return [];
  const [, subject, modifier, beVerb, complement] = match;
  return [subject, modifier, `${beVerb} ${complement}`].filter(Boolean);
}

function collectComplementEnd(words) {
  if (!words.length) return 0;
  let count = 1;
  while (words[count] && !/^(and|but|or|so|because|when|while|if|although|that|who|which)$/i.test(words[count])) {
    count += 1;
    if (count >= 5) break;
  }
  return count;
}

function mergeTinyChunks(chunks) {
  const merged = [];
  chunks.forEach((chunk) => {
    const clean = chunk.trim();
    if (!clean) return;
    const previous = merged[merged.length - 1];
    if (previous && clean.split(/\s+/).length === 1 && !isLikelyVerb(clean) && !/^(who|which|that|and|but|or|so)$/i.test(clean)) {
      merged[merged.length - 1] = `${previous} ${clean}`;
    } else {
      merged.push(clean);
    }
  });
  return merged;
}

function splitLongChunk(chunk, maxWords) {
  const words = chunk.trim().split(/\s+/).filter(Boolean);
  if (words.length <= maxWords) return [chunk];
  const chunks = [];
  for (let index = 0; index < words.length; index += maxWords) {
    chunks.push(words.slice(index, index + maxWords).join(" "));
  }
  return chunks;
}

function getChunkNote(chunk, level = els.chunkLevel.value) {
  if (!els.showGrammar.checked) return "";
  if (level === "fine") {
    if (isDiscourseChunk(chunk)) return "상황 제시";
    if (/^(you're|youre|i'm|im|he's|hes|she's|shes|it's|its|we're|they're|theyre)\b/i.test(chunk)) return "상태 표현";
    if (/^that\s/i.test(chunk)) return "명사절 주어";
    if (/^and\s+\w+[.!?]?$/i.test(chunk)) return "병렬 보어";
    if (/^and\s+\w+/i.test(chunk)) return "병렬 연결";
    if (/^(about|of|to|for|from|in|on|at|by|with|without|into|onto|over|under|between|among|through|during|before|after|than)\b/i.test(chunk)) {
      return "전치사구";
    }
    if (/^(and|but|or|so|however|therefore)\b/i.test(chunk)) return "흐름 연결어";
    if (/^(who|which|that|whose|whom)\b/i.test(chunk)) return "관계사";
    if (/^(it|they|them|this|that|these|those)\b/i.test(chunk)) return "대명사";
    if (/^(can|could|will|would|should|may|might|must)\b/i.test(chunk)) return "조동사 + 동사";
    if (chunk.split(/\s+/).some((word) => isLikelyVerb(word))) return "동사구";
    return "주어/목적어";
  }
  const match = phraseHints.find(([pattern]) => pattern.test(chunk));
  if (match) return match[1];
  if (/\b(who|which|that|whose|whom)\b/i.test(chunk)) return "관계사 확인";
  if (/\b(it|they|them|this|that|these|those|one|ones)\b/i.test(chunk)) return "대명사 지칭 확인";
  if (/^\w+ing\b|\b\w+ed\b/i.test(chunk)) return "분사구문/분사 수식 확인";
  if (/\b(can|could|will|would|should|may|might|must)\b/i.test(chunk)) return "조동사 + 동사원형";
  if (/\b(is|am|are|was|were|be|been|being)\b/i.test(chunk)) return "be동사 구조";
  return "";
}

async function analyzeText() {
  const sentences = splitSentences(els.sourceText.value);
  const level = els.chunkLevel.value;

  if (!sentences.length) {
    currentAnalysis = [];
    currentPassageInsight = null;
    renderResults(currentAnalysis);
    renderPassageInsight(currentPassageInsight);
    return;
  }

  setState("해석 중", "busy");
  els.analyzeButton.disabled = true;

  const fallbackBlocks = buildFallbackAnalysis(sentences, level);
  let passageInsight = buildFallbackPassageInsight();
  let blocks = fallbackBlocks;

  try {
    const aiAnalysis = await requestAiAnalysis(normalizeText(els.sourceText.value), level);
    if (Array.isArray(aiAnalysis.sentences) && aiAnalysis.sentences.length) {
      blocks = sanitizeAiBlocks(aiAnalysis.sentences, fallbackBlocks);
      passageInsight = normalizePassageInsight(aiAnalysis.passage) || passageInsight;
      setState("AI 해석 완료");
    } else {
      setState("청킹 완료");
    }
  } catch (error) {
    console.info("AI analysis unavailable:", error);
    setState(blocks[0]?.source === "demo" ? "예시 해석" : "서버 미연결");
  } finally {
    els.analyzeButton.disabled = false;
  }

  currentAnalysis = blocks;
  currentPassageInsight = passageInsight;
  resetFocusPositions(blocks);
  renderPassageInsight(currentPassageInsight);
  renderResults(blocks);
}

function buildFallbackAnalysis(sentences, level) {
  if (normalizeText(els.sourceText.value) === normalizeText(sampleText)) {
    return level === "fine" ? sampleFineAnalysis : sampleAnalysis;
  }

  return sentences.map((sentence) => {
    const chunks = chunkSentence(sentence, level).map((chunk) => ({
      text: chunk,
      translation: "",
      grammar: getChunkNote(chunk, level),
      role: inferChunkRole(chunk, getChunkNote(chunk, level)),
    }));
    return {
      sentence,
      chunks,
      translation: "AI 해석 서버가 연결되면 이 문장을 자연스러운 한국어로 보여줍니다.",
      points: {},
      source: "fallback",
    };
  });
}

function buildFallbackPassageInsight() {
  if (normalizeText(els.sourceText.value) === normalizeText(sampleText)) {
    return samplePassageInsight;
  }
  return null;
}

async function requestAiAnalysis(text, level) {
  const response = await fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text,
      level,
      showGrammar: els.showGrammar.checked,
    }),
  });

  if (!response.ok) {
    throw new Error(`analysis failed: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

function sanitizeAiBlocks(aiBlocks, fallbackBlocks) {
  return fallbackBlocks.map((fallback, index) => {
    const ai = aiBlocks[index] ?? {};
    const aiChunks = Array.isArray(ai.chunks) ? ai.chunks : [];
    const chunks = aiChunks.length
      ? aiChunks.map((chunk, chunkIndex) => ({
          text: normalizeText(String(chunk.text || fallback.chunks[chunkIndex]?.text || "")),
          translation: String(chunk.translation || "").trim(),
          grammar: String(chunk.grammar || fallback.chunks[chunkIndex]?.grammar || "").trim(),
          role: normalizeRole(chunk.role || fallback.chunks[chunkIndex]?.role || "", chunk.text || fallback.chunks[chunkIndex]?.text, chunk.grammar || fallback.chunks[chunkIndex]?.grammar),
        }))
      : fallback.chunks.map((chunk) => ({
          ...chunk,
          role: normalizeRole(chunk.role, chunk.text, chunk.grammar),
        }));

    return {
      sentence: normalizeText(String(ai.original || fallback.sentence)),
      chunks: chunks.filter((chunk) => chunk.text),
      translation: String(ai.translation || fallback.translation).trim(),
      points: normalizePoints(ai.points || fallback.points),
      source: ai.translation ? "ai" : "fallback",
    };
  });
}

function normalizePassageInsight(passage = {}) {
  const topicKo = String(passage.topicKo || passage.topic?.ko || "").trim();
  const topicEn = String(passage.topicEn || passage.topic?.en || "").trim();
  const rawKeywords = Array.isArray(passage.keywords) ? passage.keywords : [];
  const rawLogic = Array.isArray(passage.logic)
    ? passage.logic
    : Array.isArray(passage.logicalStructure)
      ? passage.logicalStructure
      : Array.isArray(passage.flow)
        ? passage.flow
        : [];
  const keywords = rawKeywords
    .map((keyword) => {
      if (typeof keyword === "string") return { en: keyword.trim(), ko: "" };
      return {
        en: String(keyword.en || keyword.english || "").trim(),
        ko: String(keyword.ko || keyword.korean || "").trim(),
      };
    })
    .filter((keyword) => keyword.en || keyword.ko)
    .slice(0, 8);
  const logic = rawLogic
    .map((step) => {
      if (typeof step === "string") return { type: "흐름", text: step.trim() };
      return {
        type: String(step.type || step.label || step.stage || "").trim(),
        text: String(step.text || step.description || step.summary || "").trim(),
      };
    })
    .filter((step) => step.type || step.text)
    .map((step) => ({
      type: step.type || "흐름",
      text: step.text,
    }))
    .slice(0, 7);

  if (!topicKo && !topicEn && !keywords.length && !logic.length) return null;
  return {
    topic: { ko: topicKo, en: topicEn },
    keywords,
    logic,
  };
}

function normalizePoints(points = {}) {
  return {
    structure: String(points.structure || "").trim(),
    pronouns: String(points.pronouns || "").trim(),
    flow: String(points.flow || "").trim(),
  };
}

function normalizeRole(role, text = "", grammar = "") {
  const normalized = String(role || "").trim().toLowerCase();
  if (["subject", "verb", "object", "complement", "prep", "relative", "linker", "adverb"].includes(normalized)) {
    return normalized;
  }
  return inferChunkRole(String(text || ""), String(grammar || ""));
}

function inferChunkRole(text, grammar = "") {
  const clue = `${grammar} ${text}`.toLowerCase();
  const koreanClue = `${grammar} ${text}`;
  if (/^(about|of|to|for|from|in|on|at|by|with|without|into|onto|over|under|between|among|through|during|before|after|than)\b/i.test(text)) return "prep";
  if (/^(and|but|or|so|however|therefore)\b/i.test(text) || /흐름|역접|인과|예시/.test(koreanClue)) return "linker";
  if (/^(who|which|that|whose|whom)\b/i.test(text) || /관계사/.test(koreanClue)) return "relative";
  if (/보어|complement/.test(clue)) return "complement";
  if (/목적어|object|대명사/.test(koreanClue) && !/주어/.test(koreanClue)) return "object";
  if (/주어|subject|^s\s/.test(koreanClue) || /\bS\s/i.test(grammar)) return "subject";
  if (/동사|verb|^v\s|be동사|조동사/.test(koreanClue) || text.split(/\s+/).some((word) => isLikelyVerb(word))) return "verb";
  if (/부사|adverb/.test(clue)) return "adverb";
  return "";
}

function renderPassageInsight(insight) {
  if (!insight || activeView === "clean") {
    els.passageInsight.hidden = true;
    if (!insight) {
      els.topicKo.textContent = "";
      els.topicEn.textContent = "";
      els.keywordList.innerHTML = "";
      els.logicFlow.innerHTML = "";
    }
    return;
  }

  els.passageInsight.hidden = false;
  els.topicKo.textContent = insight.topic?.ko || "";
  els.topicEn.textContent = insight.topic?.en || "";
  els.keywordList.innerHTML = insight.keywords
    .map(
      (keyword) => `
        <span class="keyword-chip">
          <strong>${escapeHtml(keyword.en)}</strong>
          ${keyword.ko ? `<em>${escapeHtml(keyword.ko)}</em>` : ""}
        </span>
      `,
    )
    .join("");
  els.logicFlow.innerHTML = (insight.logic || [])
    .map(
      (step, index) => `
        <div class="logic-step">
          <span>${index + 1}</span>
          <strong>${escapeHtml(step.type)}</strong>
          <p>${escapeHtml(step.text)}</p>
        </div>
      `,
    )
    .join("");
}

function renderResults(blocks) {
  els.resultArea.innerHTML = "";
  els.resultArea.className = `result-area ${activeView === "clean" ? "clean-view" : ""}`;

  if (!blocks.length) {
    els.resultArea.className = "result-area empty";
    els.resultArea.innerHTML = "<p>지문을 넣으면 문장별 끊어읽기와 해석 칸이 만들어집니다.</p>";
    setStats(0, 0, 0);
    renderPassageInsight(null);
    return;
  }

  const fragment = document.createDocumentFragment();
  let chunkTotal = 0;
  const wordTotal = normalizeText(els.sourceText.value).split(/\s+/).filter(Boolean).length;
  ensureFocusPositions(blocks);

  blocks.forEach((block, blockIndex) => {
    const node = els.sentenceTemplate.content.cloneNode(true);
    node.querySelector(".sentence-index").textContent = `문장 ${blockIndex + 1}`;
    const translation = node.querySelector(".translation");
    translation.textContent = block.translation;
    translation.classList.toggle("fallback-translation", block.source === "fallback");
    renderExamPoints(node.querySelector(".exam-points"), block.points);
    node.querySelector(".reveal-button").addEventListener("click", (event) => {
      const translation = event.currentTarget.closest(".sentence-block").querySelector(".translation");
      translation.hidden = !translation.hidden;
      event.currentTarget.textContent = translation.hidden ? "전체 해석" : "해석 숨기기";
    });

    const list = node.querySelector(".chunk-list");
    const normalizedChunks = block.chunks.map((chunk) => {
      const text = typeof chunk === "string" ? chunk : chunk.text;
      const grammar = typeof chunk === "string" ? getChunkNote(chunk) : chunk.grammar;
      return {
        text,
        translation: typeof chunk === "string" ? "" : chunk.translation,
        grammar,
        role: normalizeRole(typeof chunk === "string" ? "" : chunk.role, text, grammar),
      };
    });
    const mainClauseRoles = getMainClauseSyntaxRoles(normalizedChunks);
    const currentChunkIndex = clampFocusIndex(focusPositions[blockIndex] || 0, normalizedChunks.length);
    focusPositions[blockIndex] = currentChunkIndex;
    setupFocusControls(node, blockIndex, currentChunkIndex, normalizedChunks.length);

    normalizedChunks.forEach((chunk, chunkIndex) => {
      const chunkText = chunk.text;
      const chunkNote = els.showGrammar.checked ? chunk.grammar : "";
      const syntaxRole = mainClauseRoles.get(chunkIndex) || "";
      const chunkTranslation = chunk.translation;
      chunkTotal += 1;
      const item = document.createElement("div");
      item.className = `chunk-item ${getFocusStateClass(chunkIndex, currentChunkIndex)}`;
      item.tabIndex = 0;
      item.setAttribute("role", "button");
      item.setAttribute("aria-label", `${chunkIndex + 1}번 청크로 이동`);
      item.addEventListener("click", () => moveFocusToChunk(blockIndex, chunkIndex));
      item.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        moveFocusToChunk(blockIndex, chunkIndex);
      });
      item.innerHTML = `
        <span class="chunk-number">${chunkIndex + 1}</span>
        <div class="chunk-body">
          <p class="chunk-text">${highlightSyntaxWords(chunkText, syntaxRole, chunkNote)}</p>
          ${chunkTranslation ? `<p class="chunk-translation">${escapeHtml(chunkTranslation)}</p>` : ""}
          ${chunkNote ? `<p class="chunk-note">${escapeHtml(chunkNote)}</p>` : ""}
        </div>
      `;
      list.append(item);
    });

    fragment.append(node);
  });

  els.resultArea.append(fragment);
  setStats(blocks.length, chunkTotal, wordTotal);
}

function resetFocusPositions(blocks) {
  focusPositions = blocks.map(() => 0);
}

function ensureFocusPositions(blocks) {
  if (focusPositions.length !== blocks.length) resetFocusPositions(blocks);
}

function clampFocusIndex(index, chunkCount) {
  if (!chunkCount) return 0;
  return Math.min(Math.max(Number(index) || 0, 0), chunkCount - 1);
}

function setupFocusControls(node, blockIndex, currentIndex, chunkCount) {
  const progress = node.querySelector(".focus-progress");
  const prevButton = node.querySelector(".focus-prev");
  const nextButton = node.querySelector(".focus-next");
  progress.textContent = `${currentIndex + 1} / ${chunkCount}`;
  prevButton.disabled = currentIndex === 0;
  nextButton.disabled = currentIndex >= chunkCount - 1;
  prevButton.addEventListener("click", () => moveFocusToChunk(blockIndex, currentIndex - 1));
  nextButton.addEventListener("click", () => moveFocusToChunk(blockIndex, currentIndex + 1));
}

function moveFocusToChunk(blockIndex, chunkIndex) {
  const chunkCount = currentAnalysis[blockIndex]?.chunks?.length || 0;
  focusPositions[blockIndex] = clampFocusIndex(chunkIndex, chunkCount);
  renderResults(currentAnalysis);
}

function getFocusStateClass(chunkIndex, currentIndex) {
  if (activeView === "clean") return "";
  if (chunkIndex < currentIndex) return "is-done";
  if (chunkIndex === currentIndex) return "is-current";
  return "is-upcoming";
}

function getMainClauseSyntaxRoles(chunks) {
  const roles = new Map();
  let subjectStarted = false;
  let foundMainVerb = false;
  let awaitingTrueSubject = false;
  let skippingAdverbial = false;
  let skippingRelative = false;
  let skippingNounClause = false;
  let adverbialSawVerb = false;
  let relativeSawVerb = false;

  chunks.forEach((chunk, index) => {
    if (foundMainVerb && !awaitingTrueSubject) return;

    const text = String(chunk.text || "").trim();
    const role = chunk.role || "";
    const grammar = chunk.grammar || "";
    const startsAdverbial = startsWithAdverbialClauseMarker(text);
    const startsRelative = startsWithRelativeClauseMarker(text) || role === "relative";
    const startsNounClause = subjectStarted && (startsWithNounClauseMarker(text) || isNounClauseGrammar(grammar));
    const verbLike = isVerbRole(role, text, grammar);
    const nominalSubject = isNominalSubjectChunk(text, grammar);

    if (skippingAdverbial && adverbialSawVerb && isPotentialMainSubject(chunk)) {
      skippingAdverbial = false;
      adverbialSawVerb = false;
    }

    if (skippingRelative && relativeSawVerb && verbLike && !startsRelative) {
      skippingRelative = false;
      relativeSawVerb = false;
    }

    if (startsAdverbial && !subjectStarted) {
      skippingAdverbial = true;
    }
    if (startsRelative) {
      skippingRelative = true;
    }
    if (startsNounClause && foundMainVerb) {
      skippingNounClause = true;
    }

    if (skippingAdverbial || skippingRelative || skippingNounClause) {
      if (verbLike) {
        if (skippingAdverbial) adverbialSawVerb = true;
        if (skippingRelative) relativeSawVerb = true;
      }
      if (endsClause(text)) {
        skippingAdverbial = false;
        skippingRelative = false;
        skippingNounClause = false;
        adverbialSawVerb = false;
        relativeSawVerb = false;
      }
      return;
    }

    if (awaitingTrueSubject) {
      if (!foundMainVerb && verbLike) {
        roles.set(index, "verb");
        foundMainVerb = true;
        return;
      }
      if (isTrueSubjectCandidate(chunk)) {
        roles.set(index, "subject");
        awaitingTrueSubject = false;
      }
      return;
    }

    if (!subjectStarted && role === "subject") {
      if (isExpletiveItChunk(text)) {
        awaitingTrueSubject = true;
        subjectStarted = true;
        return;
      }
      if (verbLike && !nominalSubject) {
        roles.set(index, "subject-verb");
        subjectStarted = true;
        foundMainVerb = true;
        return;
      }
      roles.set(index, "subject");
      subjectStarted = true;
      return;
    }

    if (subjectStarted && !foundMainVerb && !verbLike && isSubjectContinuation(chunk)) {
      roles.set(index, "subject");
      return;
    }

    if (!foundMainVerb && verbLike && (subjectStarted || isImperativeMainVerb(text))) {
      roles.set(index, "verb");
      foundMainVerb = true;
    }
  });

  return roles;
}

function highlightSyntaxWords(text, syntaxRole = "", grammar = "") {
  if (isDiscourseChunk(text)) return escapeHtml(text);

  const parts = String(text || "").match(/[A-Za-z']+|[^A-Za-z']+/g) || [];
  const wordParts = parts
    .map((part, index) => ({ part, index, word: part.match(/^[A-Za-z']+$/) ? part : "" }))
    .filter((part) => part.word);
  const subjectWordIndexes = new Set();
  const verbWordIndexes = new Set();

  if (syntaxRole === "verb" || syntaxRole === "subject-verb") {
    const firstVerbPosition = wordParts.findIndex(({ word }) => isLikelyVerb(word) || isModal(word));
    if (firstVerbPosition < 0) return escapeHtml(text);
    const verbWords = wordParts.map(({ word }) => word);
    const verbEnd = collectVerbPhraseEnd(verbWords, firstVerbPosition);
    wordParts.slice(firstVerbPosition, verbEnd).forEach(({ index }) => verbWordIndexes.add(index));
    if (syntaxRole === "subject-verb") {
      wordParts.slice(0, firstVerbPosition).forEach(({ word, index }) => {
        if (!isConnectorWord(word) && !isRelativeWord(word) && !isAdverbWord(word)) subjectWordIndexes.add(index);
      });
    }
  } else if (syntaxRole === "subject") {
    wordParts.forEach(({ word, index }) => {
      if (!isRelativeWord(word)) subjectWordIndexes.add(index);
    });
  }

  return parts
    .map((part, index) => {
      const escaped = escapeHtml(part);
      if (subjectWordIndexes.has(index)) return `<span class="syntax-subject">${escaped}</span>`;
      if (verbWordIndexes.has(index)) return `<span class="syntax-verb">${escaped}</span>`;
      return escaped;
    })
    .join("");
}

function isVerbRole(role, text = "", grammar = "") {
  const clue = `${grammar} ${text}`;
  return role === "verb" || /동사|verb|be동사|조동사/i.test(clue) || looksLikeVerbChunk(text);
}

function looksLikeVerbChunk(text) {
  const words = String(text || "").split(/\s+/).filter(Boolean);
  return words.some((word) => isLikelyVerb(word) || isModal(word));
}

function isPotentialMainSubject(chunk) {
  const text = String(chunk.text || "").trim();
  if (!text || startsWithClauseMarker(text) || startsWithPreposition(text) || isDiscourseChunk(text)) return false;
  if (["verb", "prep", "relative", "linker", "adverb"].includes(chunk.role)) return false;
  return chunk.role === "subject" || !looksLikeVerbChunk(text);
}

function isExpletiveItChunk(text) {
  return /^it$/i.test(String(text || "").trim());
}

function isTrueSubjectCandidate(chunk) {
  const text = String(chunk.text || "").trim();
  const grammar = String(chunk.grammar || "");
  return isNominalSubjectChunk(text, grammar) || chunk.role === "subject";
}

function isNominalSubjectChunk(text, grammar = "") {
  const clean = String(text || "").trim();
  return (
    startsWithToInfinitive(clean) ||
    startsWithGerundPhrase(clean) ||
    startsWithNounClauseMarker(clean) ||
    /동명사구|to부정사구|명사절|진주어|주어구/i.test(grammar)
  );
}

function isSubjectContinuation(chunk) {
  const text = String(chunk.text || "").trim();
  if (!text || isDiscourseChunk(text) || startsWithClauseMarker(text)) return false;
  if (["relative", "linker", "adverb"].includes(chunk.role)) return false;
  return chunk.role === "subject" || chunk.role === "prep" || startsWithPreposition(text) || isNounModifierChunk(text);
}

function startsWithClauseMarker(text) {
  return startsWithAdverbialClauseMarker(text) || startsWithRelativeClauseMarker(text) || startsWithNounClauseMarker(text);
}

function startsWithAdverbialClauseMarker(text) {
  return /^(when|while|if|although|though|because|since|as|after|before|unless|until|once|whereas|even\s+if|even\s+though)\b/i.test(text);
}

function startsWithRelativeClauseMarker(text) {
  return /^(who|which|whose|whom)\b/i.test(text);
}

function startsWithNounClauseMarker(text) {
  return /^(that|what|whether|if|how|why|where|when)\b/i.test(text);
}

function startsWithToInfinitive(text) {
  return /^to\s+[a-z]+/i.test(text);
}

function startsWithGerundPhrase(text) {
  const first = cleanWord(String(text || "").split(/\s+/)[0] || "");
  return Boolean(first) && isGerund(first);
}

function isNounClauseGrammar(grammar = "") {
  return /명사절|that절|what절|whether절|if절/i.test(grammar);
}

function startsWithPreposition(text) {
  return /^(about|of|to|for|from|in|on|at|by|with|without|into|onto|over|under|between|among|through|during|before|after|than)\b/i.test(text);
}

function isNounModifierChunk(text) {
  return /^(the|a|an|this|that|these|those|my|your|his|her|our|their|its)\b/i.test(text) && !looksLikeVerbChunk(text);
}

function endsClause(text) {
  return /[,;:]$/.test(String(text || "").trim());
}

function isImperativeMainVerb(text) {
  const first = cleanWord(String(text || "").split(/\s+/)[0] || "");
  return Boolean(first) && isLikelyVerb(first) && !startsWithClauseMarker(text);
}

function isConnectorWord(word) {
  return /^(when|while|if|although|though|because|since|as|and|but|or|so|however|therefore|that)$/i.test(word);
}

function isRelativeWord(word) {
  return /^(who|which|that|whose|whom)$/i.test(word);
}

function isAdverbWord(word) {
  return /^(often|also|only|just|very|more|most|better|longer|already|ever|never|still|carefully|quickly|slowly|usually|really|simply|clearly)$/i.test(word) || /ly$/i.test(word);
}

function renderExamPoints(container, points = {}) {
  const rows = [
    ["구조", points.structure],
    ["지칭", points.pronouns],
    ["흐름", points.flow],
  ].filter(([, value]) => els.showGrammar.checked && value);

  if (!rows.length) {
    container.hidden = true;
    container.innerHTML = "";
    return;
  }

  container.hidden = false;
  container.innerHTML = rows
    .map(([label, value]) => `<p><strong>${escapeHtml(label)}</strong><span>${escapeHtml(value)}</span></p>`)
    .join("");
}

function setStats(sentences, chunks, words) {
  els.sentenceCount.textContent = String(sentences);
  els.chunkCount.textContent = String(chunks);
  els.wordCount.textContent = String(words);
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => {
    const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
    return entities[char];
  });
}

async function readImage(file) {
  if (!file) return;
  const url = URL.createObjectURL(file);
  els.previewImage.src = url;
  els.previewWrap.hidden = false;

  if (!window.Tesseract) {
    setState("OCR 연결 실패", "error");
    return;
  }

  setState("사진 읽는 중", "busy");
  els.analyzeButton.disabled = true;
  try {
    const result = await Tesseract.recognize(file, "eng", {
      logger: (message) => {
        if (message.status === "recognizing text") {
          setState(`${Math.round(message.progress * 100)}%`, "busy");
        }
      },
    });
    els.sourceText.value = normalizeText(result.data.text);
    setState("추출 완료");
    analyzeText();
  } catch (error) {
    console.error(error);
    setState("OCR 실패", "error");
  } finally {
    els.analyzeButton.disabled = false;
  }
}

els.imageInput.addEventListener("change", (event) => readImage(event.target.files[0]));

els.dropZone.addEventListener("dragover", (event) => {
  event.preventDefault();
  els.dropZone.classList.add("dragover");
});

els.dropZone.addEventListener("dragleave", () => {
  els.dropZone.classList.remove("dragover");
});

els.dropZone.addEventListener("drop", (event) => {
  event.preventDefault();
  els.dropZone.classList.remove("dragover");
  const file = event.dataTransfer.files[0];
  if (file) readImage(file);
});

els.analyzeButton.addEventListener("click", analyzeText);

els.sampleButton.addEventListener("click", () => {
  els.sourceText.value = sampleText;
  setState("예문");
  analyzeText();
});

els.printButton.addEventListener("click", () => window.print());

els.showGrammar.addEventListener("change", () => {
  renderResults(currentAnalysis);
  renderPassageInsight(currentPassageInsight);
});

els.chunkLevel.addEventListener("change", analyzeText);

els.tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    activeView = tab.dataset.view;
    els.tabs.forEach((item) => item.classList.toggle("active", item === tab));
    renderResults(currentAnalysis);
    renderPassageInsight(currentPassageInsight);
  });
});

els.sourceText.value = sampleText;
analyzeText();
