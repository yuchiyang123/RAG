# RAG 專案（股票分析：RAG + GraphQL + OIDC）

## 這個專案的性質：學習用，使用者要自己動手
- 使用者（對 Clean Architecture、OpenIddict、BFF、GraphQL、RAG 都還不熟）要「像上課一樣」學。
- 預設流程：先講為什麼 → 給最小範例/關鍵 API → 讓使用者自己寫 → review。**不要直接把功能整包寫完。**
- 我（Claude）負責：環境、部署設定、前端的配色與 UI 套件選型（`web/src/theme/`）。
- 使用者自己做：後端全部業務邏輯、前端基礎架構（router / store / 頁面 / urql 設定）。

## 架構規則
- Clean Architecture：Domain ← Application ← Infrastructure ← (Bff, Ingest)。`ArchitectureTests` 會擋違規。
- 不使用 MediatR / AutoMapper（v13+ 商業授權，Mini-SSO 已踩過），Use Case 用普通 handler 類別。
- `Microsoft.*` 套件一律釘 `9.0.21`（net9.0）；不要升到 10.x。
- Idp 是獨立 bounded context，自己的 DB（RagIdp），不引用 Domain/Application。
- 前端：BFF 模式，token 只在伺服器端，瀏覽器只持有 HttpOnly session cookie；瀏覽器只連 `localhost:5173`（Vite proxy → Bff）。
- 台股慣例：紅漲綠跌（`--c-up` 紅、`--c-down` 綠）。
- 資料庫 SQL Server（本機 LocalDB 2019 / 部署 2022 容器），**都沒有 VECTOR 型別** → 向量存 varbinary，相似度在 C# 算。
- LLM 全用 Ollama：embedding `bge-m3`、聊天 `gemma4:e4b`（本機）。CPU 主機，生成一律串流。數字由程式算，LLM 不憑空產生。

## 部署
- 主機與流程見 `D:\練習\NEW_PROJECT_PLAYBOOK.md`、`D:\練習\_playbook\`。
- Bff `127.0.0.1:12130`、Idp `127.0.0.1:12131`；cookie 名稱不可用 `token` / `refresh_token` / `XSRF-TOKEN`（與 Mini-SSO 的 `.matthewyu.uk` cookie 撞名）。
- 本機沒有 Docker；compose / Dockerfile 尚未實際驗證，到主機部署時才會測。