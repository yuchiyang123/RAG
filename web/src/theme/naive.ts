import { darkTheme, lightTheme, type GlobalThemeOverrides } from 'naive-ui'
import { fontMono, fontSans, palettes, radius, type ThemeMode } from './tokens'

// 用法（<NConfigProvider> 包住整個 App）：
//   <n-config-provider :theme="naive.theme" :theme-overrides="naive.overrides">
// 其中 const naive = naiveThemeFor(mode)
export function naiveThemeFor(mode: ThemeMode) {
  const p = palettes[mode]
  const overrides: GlobalThemeOverrides = {
    common: {
      primaryColor: p.accent,
      primaryColorHover: p.accentHover,
      primaryColorPressed: p.accentHover,
      primaryColorSuppl: p.accent,
      errorColor: p.danger,
      warningColor: p.warning,
      bodyColor: p.bg,
      cardColor: p.surface,
      modalColor: p.surface,
      popoverColor: p.surface2,
      tableColor: p.surface,
      borderColor: p.border,
      dividerColor: p.border,
      textColorBase: p.text,
      textColor1: p.text,
      textColor2: p.text,
      textColor3: p.textMuted,
      borderRadius: radius.sm,
      fontFamily: fontSans,
      fontFamilyMono: fontMono,
    },
    Card: { borderRadius: radius.md },
    Button: { borderRadiusMedium: radius.sm },
  }
  return { theme: mode === 'dark' ? darkTheme : lightTheme, overrides }
}