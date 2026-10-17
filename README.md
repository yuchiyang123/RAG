# RAG：股票分析（RAG + GraphQL + OIDC）

學習用專案。環境已備好，**業務程式碼全部留白**，由你自己寫。

## 結構

```
src/Rag.Idp      OIDC Provider（OpenIddict）            http://localhost:5100
src/Rag.Bff      BFF + GraphQL（Hot Chocolate）+ RAG     http://localhost:5200
src/Rag.Data     EF Core 實體 / DbContext（兩邊共用）
src/Rag.Ingest   背景工作：抓行情、切 chunk、做 embedding
tests/Rag.Tests  xUnit
web/             Vue3 + TS + Vite                       http://localhost:5173（瀏覽器只連這個）
```

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