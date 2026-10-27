# niftyindices — NSE Indices (niftyindices.com)

NSE Indices Limited (formerly IISL) manages and publishes NSE indices. This spec pulls
live data from `liveindexsa.niftyindices.com` (Azure CDN, no auth, no IP restriction) and
`www.niftyindices.com` (index constituent CSVs and press releases).

## Operations

### `liveIndicesWatch()`
All 131 NSE indices with live OHLC, % change, previous close, year high/low, and
timestamp. Updated every minute during market hours.

```bash
api-anything call niftyindices liveIndicesWatch
```

### `etfWatch()`
Live prices and NAV for all 146 NSE-listed ETFs. Per ETF: symbol, LTP, NAV,
52-week high/low, monthly and yearly % change, traded quantity and value.

```bash
api-anything call niftyindices etfWatch
```

### `equityStockWatch(index)`
Live price snapshot for every constituent of a given NSE index. Per stock: symbol, LTP,
change %, 52-week hi/lo, market cap, volume/value, ex-dividend date, 30d/365d performance.

```bash
api-anything call niftyindices equityStockWatch --index "NIFTY 50"
api-anything call niftyindices equityStockWatch --index "NIFTY BANK"
api-anything call niftyindices equityStockWatch --index "NIFTY IT"
```

Index name must use spaces, not hyphens (e.g. `"NIFTY MIDCAP 100"`, not `"NIFTY-MIDCAP-100"`).

### `intradayIndex(index)`
Today's intraday OHLCV ticks for any NSE index, plus advance/decline count and live
price. Returns 200–400 data points per day. Use for intraday charts.

```bash
api-anything call niftyindices intradayIndex --index "NIFTY 50"
api-anything call niftyindices intradayIndex --index "NIFTY BANK"
```

### `stockIntraday(symbol)`
Today's intraday OHLCV ticks for an individual NSE-listed stock. Returns data during
market hours; the file is empty outside trading hours (9:15–15:30 IST).

```bash
api-anything call niftyindices stockIntraday --symbol RELIANCE
api-anything call niftyindices stockIntraday --symbol TCS
```

### `indexConstituents(slug)`
Current constituent list for any NSE index as CSV — company name, industry, NSE symbol,
series, and ISIN code. Diff this daily to detect additions and removals before the
effective date.

```bash
api-anything call niftyindices indexConstituents --slug nifty50
api-anything call niftyindices indexConstituents --slug niftybank
api-anything call niftyindices indexConstituents --slug niftymidcap100
```

Common slugs: `nifty50`, `niftynext50`, `nifty100`, `nifty500`, `niftybank`, `niftyit`,
`niftymidcap100`, `niftymidcap50`, `niftysmlcap100`, `niftyauto`, `niftypharma`,
`niftyfmcg`, `niftymetal`, `niftymedia`, `niftyrealty`.

### `indexMapping()`
Full name mapping for all 260 NSE indices — trading short-name to long display name.
Use to resolve index names across systems.

```bash
api-anything call niftyindices indexMapping
```

### `tickerIndices()`
32 key NSE indices in compact ticker format — index name, LTP, change, % change,
OHLC, year high/low, and timestamp. Lighter alternative to `liveIndicesWatch`.

```bash
api-anything call niftyindices tickerIndices
```

### `pressReleases()`
Recent NSE Indices press releases from niftyindices.com/media. Each item has date,
title, and a direct PDF link. **Constituent change announcements appear here 4–6 weeks
before the effective rebalancing date.**

```bash
api-anything call niftyindices pressReleases
```

---

## Tracking constituent changes

To detect index additions and removals as early as possible:

1. **`pressReleases()`** — checks the media page for new PDF announcements (earliest signal,
   4–6 weeks ahead).
2. **`indexConstituents(slug)`** — download the CSV daily and diff against the previous day
   to confirm the actual change on effective date.

## Notes

- `liveindexsa.niftyindices.com` is an Azure Blob Storage CDN. Files are served publicly
  at fixed paths; directory listing returns 403.
- `stockIntraday` files have `content-length: 0` outside market hours — this is normal.
- The `IndexMapping.json` file has a UTF-8 BOM which api-anything strips automatically.
- Historical OHLC for indices is **not available** via this API (the backpage ASP.NET
  endpoints return 500).
