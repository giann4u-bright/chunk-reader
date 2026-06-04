const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");

const PORT = Number(process.env.PORT || 8787);
const HOST = process.env.HOST || (process.env.PORT ? "0.0.0.0" : "127.0.0.1");
const ROOT = __dirname;
const MODEL = process.env.OPENAI_MODEL || "gpt-4.1-mini";

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
};

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    if (req.method === "POST" && url.pathname === "/api/analyze") {
      await handleAnalyze(req, res);
      return;
    }

    if (req.method === "GET" || req.method === "HEAD") {
      await serveStatic(url.pathname, res, req.method === "HEAD");
      return;
    }

    sendJson(res, 405, { error: "method_not_allowed" });
  } catch (error) {
    console.error(error);
    sendJson(res, 500, { error: "server_error" });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Chunk Reader is running at http://${HOST}:${PORT}`);
});

async function serveStatic(pathname, res, headOnly) {
  const requested = pathname === "/" ? "/index.html" : pathname;
  const safePath = path.normalize(decodeURIComponent(requested)).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(ROOT, safePath);

  if (!filePath.startsWith(ROOT)) {
    sendJson(res, 403, { error: "forbidden" });
    return;
  }

  try {
    const data = await fs.readFile(filePath);
    res.writeHead(200, {
      "Content-Type": mimeTypes[path.extname(filePath)] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    if (!headOnly) res.end(data);
    else res.end();
  } catch {
    sendJson(res, 404, { error: "not_found" });
  }
}

async function handleAnalyze(req, res) {
  if (!process.env.OPENAI_API_KEY) {
    sendJson(res, 503, { error: "missing_openai_api_key" });
    return;
  }

  const body = await readJson(req);
  const text = String(body.text || "").trim();
  if (!text) {
    sendJson(res, 400, { error: "empty_text" });
    return;
  }

  const prompt = [
    "너는 한국 중고등학생을 위한 영어 독해 선생님이다.",
    "입력된 영어 지문을 문장별로 나누고, 각 문장을 의미 단위로 끊어라.",
    "청킹 강도가 fine이면 초등학교 6학년도 따라갈 수 있게 아주 잘게 끊어라.",
    "fine에서는 반드시 주어, 동사, 목적어/보어, 전치사구, 관계사, 접속사구를 가능한 한 분리하라.",
    "fine 예시: 'Students / who / divide / a difficult task / into small steps / can understand / it / better'.",
    "fine에서는 한 청크가 보통 1~4단어가 되게 하고, 긴 명사구도 필요하면 나눠라.",
    "balanced와 exam은 기존처럼 의미 단위 중심으로 끊어라.",
    "각 청크에는 학생이 바로 이해할 수 있는 자연스러운 한국어 뜻을 붙여라.",
    "전체 문장 해석은 직역이 아니라 한국어로 매끄럽게 하되, 원문의 정보는 빠뜨리지 마라.",
    "지문 전체의 주제와 핵심 키워드를 한글과 영어로 제공하라.",
    "주제는 너무 길지 않게 한 문장으로 쓰고, 키워드는 4~8개를 고르되 시험 독해에 중요한 명사구 중심으로 골라라.",
    "문법 힌트는 중고등 내신에 실제로 자주 나오는 사항만 표시하라.",
    "허용되는 포인트: 주어/동사, 목적어/보어, 관계사, 분사/분사구문, to부정사, 동명사, 비교, 접속사, 대명사 지칭, 글의 흐름.",
    "단순한 뜻풀이, 막연한 '의미 단위', 과한 문법 용어는 쓰지 마라.",
    "문장별 points에는 structure, pronouns, flow를 넣어라. 해당 사항이 없으면 빈 문자열로 둬라.",
    "반드시 JSON만 반환하라.",
    "",
    `청킹 강도: ${body.level || "balanced"}`,
    `내신 포인트 표시: ${body.showGrammar ? "yes" : "no"}`,
    "",
    "JSON 형식:",
    '{"passage":{"topicKo":"한글 주제","topicEn":"English topic","keywords":[{"en":"keyword","ko":"키워드"}]},"sentences":[{"original":"English sentence","translation":"자연스러운 한국어 해석","points":{"structure":"주어/동사 등","pronouns":"it = ...","flow":"역접/예시/원인 등"},"chunks":[{"text":"English chunk","translation":"청크 뜻","grammar":"내신 포인트가 있을 때만 짧게"}]}]}',
    "",
    "영어 지문:",
    text,
  ].join("\n");

  const openAiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      temperature: 0.2,
    }),
  });

  if (!openAiResponse.ok) {
    const detail = await openAiResponse.text();
    console.error(detail);
    sendJson(res, 502, { error: "ai_request_failed" });
    return;
  }

  const data = await openAiResponse.json();
  const content = data.choices?.[0]?.message?.content || "{}";
  sendJson(res, 200, JSON.parse(content));
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 200_000) {
        req.destroy();
        reject(new Error("request_too_large"));
      }
    });
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

function sendJson(res, status, payload) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}
