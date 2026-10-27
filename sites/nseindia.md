# NSE India

**Base URL:** `https://www.nseindia.in`  
**Auth required:** No — all operations are public, no session cookie needed  
**Tier:** 1 (plain HTTP, no browser)  
**Latency:** ~350ms

> Note: use `nseindia.in` (not `.com`). The `.com` domain blocks non-India IPs; `.in` is accessible from anywhere.

## Operations

### `allindices(type)`

All NSE indices with live price, PE, PB, dividend yield, and advances/declines breadth.

```bash
# All 130+ indices
api-anything call nseindia-in allindices type=all

# Specific index family
api-anything call nseindia-in allindices type=NIFTY
api-anything call nseindia-in allindices type="NIFTY BANK"
```

**Response fields per index:** `index`, `last`, `variation`, `percentChange`, `open`, `high`, `low`, `previousClose`, `yearHigh`, `yearLow`, `pe`, `pb`, `dy`, `advances`, `declines`, `unchanged`, `perChange30d`, `perChange365d`, chart SVG paths.

---

### `corporateAnnouncements(symbol)`

All exchange filings for a listed company — results, dividends, board meetings, press releases, acquisitions, record dates, etc. Each item includes a direct PDF link.

```bash
api-anything call nseindia-in corporateAnnouncements symbol=TCS
api-anything call nseindia-in corporateAnnouncements symbol=RELIANCE
api-anything call nseindia-in corporateAnnouncements symbol=HDFCBANK
```

**Response fields per filing:** `an_dt`, `desc`, `attchmntText`, `attchmntFile` (PDF URL), `fileSize`, `sm_name`, `sm_isin`, `smIndustry`, `symbol`, `sort_date`.

## What's accessible without a session

| Data | Accessible |
|---|---|
| All indices (130+) with PE/PB/A/D | ✅ |
| Corporate announcements + PDF links | ✅ |
| Option chain (NIFTY, BANKNIFTY) | ✅ via direct HTTP |
| Live stock quote + order book | ✅ via NextApi/GetQuoteApi |
| Intraday / historical charts | ✅ |
| Market turnover summary | ✅ |
| Quarterly financials / P&L | ❌ session required |
| Shareholding patterns | ❌ returns `{}` |
| Bulk/block deals | ❌ 403 |
