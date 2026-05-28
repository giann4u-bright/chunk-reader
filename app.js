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

const samplePassageInsight = {
  topic: {
    ko: "성공에는 타고난 재능보다 꾸준한 연습과 피드백이 더 중요하다.",
    en: "Steady practice and clear feedback matter more for success than talent alone.",
  },
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
  sentenceTemplate: document.querySelector("#sentenceTemplate"),
  sentenceCount: document.querySelector("#sentenceCount"),
  chunkCount: document.querySelector("#chunkCount"),
  wordCount: document.querySelector("#wordCount"),
  tabs: document.querySelectorAll(".tab"),
};

let activeView = "study";
let currentAnalysis = [];
let currentPassageInsight = null;

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

function splitLongChunk(chunk, maxWords) {
  const words = chunk.trim().split(/\s+/).filter(Boolean);
  if (words.length <= maxWords) return [chunk];
  const chunks = [];
  for (let index = 0; index < words.length; index += maxWords) {
    chunks.push(words.slice(index, index + maxWords).join(" "));
  }
  return chunks;
}

function getChunkNote(chunk) {
  if (!els.showGrammar.checked) return "";
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
  renderPassageInsight(currentPassageInsight);
  renderResults(blocks);
}

function buildFallbackAnalysis(sentences, level) {
  if (normalizeText(els.sourceText.value) === normalizeText(sampleText)) {
    return sampleAnalysis;
  }

  return sentences.map((sentence) => {
    const chunks = chunkSentence(sentence, level).map((chunk) => ({
      text: chunk,
      translation: "",
      grammar: getChunkNote(chunk),
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
        }))
      : fallback.chunks;

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

  if (!topicKo && !topicEn && !keywords.length) return null;
  return {
    topic: { ko: topicKo, en: topicEn },
    keywords,
  };
}

function normalizePoints(points = {}) {
  return {
    structure: String(points.structure || "").trim(),
    pronouns: String(points.pronouns || "").trim(),
    flow: String(points.flow || "").trim(),
  };
}

function renderPassageInsight(insight) {
  if (!insight || activeView === "clean") {
    els.passageInsight.hidden = true;
    if (!insight) {
      els.topicKo.textContent = "";
      els.topicEn.textContent = "";
      els.keywordList.innerHTML = "";
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
      event.currentTarget.textContent = translation.hidden ? "해석 보기" : "해석 숨기기";
    });

    const list = node.querySelector(".chunk-list");
    block.chunks.forEach((chunk, chunkIndex) => {
      const chunkText = typeof chunk === "string" ? chunk : chunk.text;
      const chunkNote = els.showGrammar.checked ? (typeof chunk === "string" ? getChunkNote(chunk) : chunk.grammar) : "";
      const chunkTranslation = typeof chunk === "string" ? "" : chunk.translation;
      chunkTotal += 1;
      const item = document.createElement("div");
      item.className = "chunk-item";
      item.innerHTML = `
        <span class="chunk-number">${chunkIndex + 1}</span>
        <div class="chunk-body">
          <p class="chunk-text">${escapeHtml(chunkText)}</p>
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
