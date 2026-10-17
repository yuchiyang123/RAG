// 唯一的顏色來源（single source of truth）。
// Naive UI、圖表、全域 CSS 變數都從這裡衍生，改色只改這個檔。
//
// 台股慣例：紅漲、綠跌（與美股相反）。所以 up = 紅、down = 綠。
// 因此「主色」刻意不用綠或紅，避免跟漲跌色混淆。

export type ThemeMode = 'light' | 'dark'

export interface Palette {
  bg: string          // 頁面底色
  surface: string     // 卡片、面板
  surface2: string    // 次層（hover、表頭）
  border: string
  text: string
  textMuted: string
  accent: string      // 主色（按鈕、連結、焦點）
  accentHover: string
  up: string          // 漲（紅）
  down: string        // 跌（綠）
  warning: string
  danger: string
}

export const palettes: Record<ThemeMode, Palette> = {
  dark: {
    bg: '#0b0f17',
    surface: '#121826',
    surface2: '#1a2232',
    border: '#263045',
    text: '#e6eaf2',
    textMuted: '#8b95a9',
    accent: '#6c8cff',
    accentHover: '#8aa3ff',
    up: '#f6465d',
    down: '#2ebd85',
    warning: '#f0b429',
    danger: '#ff6b81',
  },
  light: {
    bg: '#f5f6fa',
    surface: '#ffffff',
    surface2: '#eef0f6',
    border: '#e0e4ee',
    text: '#151a26',
    textMuted: '#667085',
    accent: '#3b5bdb',
    accentHover: '#2f49b5',
    up: '#d92d45',
    down: '#0f9d6b',
    warning: '#b7791f',
    danger: '#c92a3c',
  },
}

export const radius = { sm: '6px', md: '10px', lg: '14px' } as const

// 中文優先的系統字型，不載入網路字型（部署在內網主機，少一個外部依賴）
export const fontSans =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif'
export const fontMono = 'ui-monospace, "SF Mono", Menlo, Consolas, monospace'

/** 把調色盤寫成 CSS 變數：var(--c-bg)、var(--c-up) ...，並同步 <html data-theme> */
export function applyTheme(mode: ThemeMode, root: HTMLElement = document.documentElement) {
  const p = palettes[mode]
  root.dataset.theme = mode
  root.style.colorScheme = mode
  for (const [key, value] of Object.entries(p)) {
    // surface2 -> --c-surface-2, textMuted -> --c-text-muted
    const name = key.replace(/([A-Z0-9])/g, '-$1').toLowerCase()
    root.style.setProperty(`--c-${name}`, value)
  }
  root.style.setProperty('--radius-sm', radius.sm)
  root.style.setProperty('--radius-md', radius.md)
  root.style.setProperty('--radius-lg', radius.lg)
  root.style.setProperty('--font-sans', fontSans)
  root.style.setProperty('--font-mono', fontMono)
}