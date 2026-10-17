import { ColorType, type CandlestickSeriesPartialOptions, type DeepPartial, type ChartOptions } from 'lightweight-charts'
import { palettes, fontSans, type ThemeMode } from './tokens'

// 用法：
//   const chart = createChart(el, chartOptionsFor(mode))
//   const series = chart.addSeries(CandlestickSeries, candleOptionsFor(mode))
export function chartOptionsFor(mode: ThemeMode): DeepPartial<ChartOptions> {
  const p = palettes[mode]
  return {
    autoSize: true,
    layout: {
      background: { type: ColorType.Solid, color: p.surface },
      textColor: p.textMuted,
      fontFamily: fontSans,
    },
    grid: { vertLines: { color: p.border }, horzLines: { color: p.border } },
    rightPriceScale: { borderColor: p.border },
    timeScale: { borderColor: p.border },
  }
}

// 台股：紅漲綠跌。K 棒實體與影線同色。
export function candleOptionsFor(mode: ThemeMode): CandlestickSeriesPartialOptions {
  const p = palettes[mode]
  return {
    upColor: p.up,
    downColor: p.down,
    borderUpColor: p.up,
    borderDownColor: p.down,
    wickUpColor: p.up,
    wickDownColor: p.down,
  }
}