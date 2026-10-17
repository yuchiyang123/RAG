# RAG：股票分析（RAG + GraphQL + OIDC）

學習用專案。環境已備好，**業務程式碼全部留白**，由你自己寫。

## 結構（後端採 Clean Architecture，依賴只能向內）

```
src/Rag.Domain          實體、值物件、領域規則。不依賴任何東西
src/Rag.Application     Use Case + 介面（ports，例如 IEmbeddingClient）。只依賴 Domain
src/Rag.Infrastructure  EF Core、Ollama / TWSE 的實作（adapters）。依賴 Application
src/Rag.Bff             Presentation：OIDC client、GraphQL、host SPA。依賴 Application + Infrastructure（只在組合根接線）
src/Rag.Ingest          Presentation：背景工作 host。同上
src/Rag.Idp             OIDC Provider（OpenIddict）。獨立部署、獨立資料庫（RagIdp），不走 Clean Architecture 分層
tests/Rag.Tests         xUnit；ArchitectureTests 守住依賴方向
web/                    Vue3 + TS + Vite + Naive UI（theme/ 已備好，其餘架構自己寫）
```

埠：Idp `5100`、Bff `5200`、Vite `5173`。
瀏覽器只會連 5173；Vite 把 `/bff`、`/graphql`、`/signin-oidc` 轉給 BFF（同源，行為與正式環境一致）。

## 本機開發（不需要 Docker）

前置：.NET 9 SDK、Node 22、本機 SQL Server（預設用 LocalDB，連線字串在各專案 `appsettings.Development.json`）、Ollama。

```powershell
dotnet tool restore                    # 裝 dotnet-ef（版本釘 9.0.21）
dotnet run --project src/Rag.Idp       # 終端 1
dotnet run --project src/Rag.Bff       # 終端 2
cd web; npm run dev                    # 終端 3
```

Ollama 模型：`bge-m3`（embedding，已 pull）、`gemma4:e4b`（聊天，本機已有）。

## 部署

`docker-compose.yml` + `.github/workflows/`，流程同 `../_playbook/self-hosted-deploy-playbook.md`。
- BFF 綁 `127.0.0.1:12130`、IdP 綁 `127.0.0.1:12131`，各需要在 Cloudflare 加 Public Hostname。
- 要用的網域與 runner label (`rag`) 請自行確認；`.env.example` 複製成 `.env` 再填。

## 版本約定

所有 `Microsoft.*` 套件釘在 **9.0.21**，與 `net9.0` 一致（Mini-SSO 踩過版本錯位的坑）。升級時一起升。

## 待你實作（建議順序）

1. IdP：`DbContext` + OpenIddict 註冊、Authorization Code + PKCE、登入頁、註冊 client `rag-bff`
2. BFF：OpenIdConnect + Cookie 驗證、`/bff/login` `/bff/logout` `/bff/user`
3. 資料：台股行情匯入、EF 模型、GraphQL schema + DataLoader
4. RAG：文字 chunk、`bge-m3` embedding、SQL Server 內的向量儲存與相似度查詢
5. LLM：tool calling 查數字 + RAG 查文字、串流輸出
6. 部署