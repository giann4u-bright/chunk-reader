# Chunk Reader 배포 가이드

이 앱은 정적 사이트가 아니라 작은 Node.js 서버 앱입니다.

- 학생 브라우저: `index.html`, `style.css`, `app.js` 사용
- 서버: `server.js`가 `/api/analyze`를 처리하고 OpenAI API 키를 안전하게 보관

## 1. 로컬에서 확인

```bash
OPENAI_API_KEY="your_api_key_here" node server.js
```

브라우저에서 `http://127.0.0.1:8787`을 엽니다.

API 키 없이 실행하면 샘플과 기본 청킹은 보이지만, 실제 AI 해석은 동작하지 않습니다.

## 2. GitHub에 올리기

```bash
git init
git add .
git commit -m "Initial Chunk Reader app"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO_NAME.git
git push -u origin main
```

`.env` 파일은 올리면 안 됩니다. 이 폴더의 `.gitignore`에 이미 제외해 두었습니다.

## 3. Render에 배포하기

Render 기준 설정:

- Service type: `Web Service`
- Runtime: `Node`
- Build command: 비워두거나 `npm install`
- Start command: `npm start`
- Environment variables:
  - `OPENAI_API_KEY`: OpenAI API 키
  - `OPENAI_MODEL`: `gpt-4.1-mini`

Render는 배포 환경에서 `PORT`를 제공하므로, 앱은 그 포트에 맞춰 실행됩니다.

## 4. 배포 후 확인

1. Render가 제공한 `https://...onrender.com` 주소를 엽니다.
2. 샘플 지문이 뜨는지 확인합니다.
3. 영어 지문을 붙여넣고 `청킹하기`를 눌러 AI 해석, 주제, 키워드, 내신 포인트가 나오는지 확인합니다.

## 5. 운영 전 체크

- OpenAI API 키는 GitHub에 올리지 말고 배포 플랫폼의 환경변수에만 넣습니다.
- 학생이 업로드하는 사진/지문이 서버로 전달될 수 있으므로 개인정보가 들어간 자료를 피하도록 안내합니다.
- 비용 관리를 위해 하루 요청 수 제한, 로그인, 관리자 화면 등을 나중에 추가하는 것이 좋습니다.
