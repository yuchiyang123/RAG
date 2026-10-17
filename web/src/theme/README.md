# 主題（已備好，尚未接線）

| 檔案 | 作用 |
|---|---|
| `tokens.ts` | 唯一的顏色/圓角/字型來源，`applyTheme(mode)` 寫入 CSS 變數 |
| `naive.ts` | `naiveThemeFor(mode)` → 給 `<n-config-provider>` 的 theme 與 overrides |
| `chart.ts` | lightweight-charts 的圖表與 K 棒（紅漲綠跌）選項 |
| `base.css` | 全域基礎樣式，吃 `--c-*` 變數；提供 `.num`、`.is-up/.is-down` |

接線（由你決定放在哪、怎麼管理 light/dark 狀態）：
1. `main.ts` 匯入 `./theme/base.css`
2. 啟動時呼叫 `applyTheme('dark')`（之後切換主題就再呼叫一次）
3. 根元件用 `<n-config-provider>` 包住，帶入 `naiveThemeFor(mode)`

選型：UI 用 **Naive UI**（Vue3 + TypeScript 原生、內建深色主題、可用 overrides 統一換色）；
圖表用 **lightweight-charts**（TradingView 開源，專做 K 線，體積小）。