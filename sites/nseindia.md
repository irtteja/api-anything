# NSE India

**Base URL:** `https://www.nseindia.in`  
**Auth required:** No — all operations are public, no session cookie needed  
**Tier:** 1 (plain HTTP, no browser)  
**Latency:** ~350–1600ms

> Note: use `nseindia.in` (not `.com`). The `.com` domain blocks non-India IPs; `.in` is accessible from anywhere.

## Operations

### `allindices(type)`
All NSE indices with live price, PE, PB, dividend yield, and advances/declines. `type=all` returns all 130+.

```bash
api-anything call nseindia-in allindices type=all
api-anything call nseindia-in allindices type="NIFTY BANK"
```

### `corporateAnnouncements(symbol)`
Recent exchange filings for a listed company — results, dividends, board meetings. Each item includes a PDF link.

```bash
api-anything call nseindia-in corporateAnnouncements symbol=TCS
```

### `announcementSearch(index, symbol?, from_date?, to_date?)`
Full historical search across corporate announcements. `index`: `equities`, `debt`, `sme`, `mf`.

```bash
api-anything call nseindia-in announcementSearch index=equities symbol=TCS
```

### `getquoteapi(symbol)`
Live stock quote: LTP, OHLC, % change, ISIN, order book depth, trade info, margin data.

```bash
api-anything call nseindia-in getquoteapi symbol=RELIANCE
```

### `indexConstituents(index)` / `indexSnapshot(index)`
`indexConstituents`: live price for every stock in an index (100+ indices). `indexSnapshot`: compact OHLC + advance/decline.

```bash
api-anything call nseindia-in indexConstituents index="NIFTY 50"
api-anything call nseindia-in indexSnapshot index="NIFTY BANK"
```

### `chartIntraday(index)`
Today's intraday ticks — 10,000+ `[timestamp_ms, price, marker]` points.

```bash
api-anything call nseindia-in chartIntraday index="NIFTY 50"
```

### `stockSearch(q)` / `refRates(type)` / `currencyDerivativesStats()`
`stockSearch`: find equities/ETFs by name or ticker. `refRates`: currency spot or g-sec yields (`currencyspotrates`/`interates`). `currencyDerivativesStats`: live CD segment volume/OI.

```bash
api-anything call nseindia-in stockSearch q=RELIANCE
api-anything call nseindia-in refRates type=currencyspotrates
api-anything call nseindia-in currencyDerivativesStats
```

### `marketStatus()` / `marketTurnover()` / `marketTurnoverDetail()`
Market open/closed state, per-segment turnover, per-instrument live stats.

```bash
api-anything call nseindia-in marketStatus
api-anything call nseindia-in marketTurnover
api-anything call nseindia-in marketTurnoverDetail
```

### `indexGainers()` / `derivativeGainers()` / `oiSpurts(type)` / `mostActiveSecurities(type)`
Top gainers by index or F&O, OI changes (`spurtsinoi`/`fallinoi`/`pcr`/`loosening`), most active by `volume`/`value`.

```bash
api-anything call nseindia-in indexGainers
api-anything call nseindia-in oiSpurts type=spurtsinoi
api-anything call nseindia-in mostActiveSecurities type=volume
```

### `priceBandHitters()` / `fiidiiTrade()` / `etf()` / `circulars()`
Circuit hitters (5%/10%/20%), FII/DII net buy-sell, ETF live NAV, NSE circulars with PDF links.

```bash
api-anything call nseindia-in priceBandHitters
api-anything call nseindia-in fiidiiTrade
api-anything call nseindia-in etf
api-anything call nseindia-in circulars
```

### `topCorpInfo(symbol)` / `preOpenMarket(key)` / `holidayMaster(type)` / `equityMaster()` / `indexNames()`
Company snapshot; pre-open IEP (`ALL`/`FO`/`SME`); trading/clearing holidays; index master; name mapping.

```bash
api-anything call nseindia-in topCorpInfo symbol=RELIANCE
api-anything call nseindia-in preOpenMarket key=ALL
api-anything call nseindia-in holidayMaster type=trading
```

### `commodityFutures()` / `marketTurnoverDetail()` / `nsEvents()`
Top commodity F&O by volume; per-instrument live stats; NSE listing ceremonies and events.

```bash
api-anything call nseindia-in commodityFutures
api-anything call nseindia-in nsEvents
```

---

### `dailyReports(key)`
Daily report files. Returns `{CurrentDay,PreviousDay,FutureDay}`; download = `filePath+fileActlName`. Keys: `CM`, `INDEX`, `FO`, `COM`, `CD`, `WDM`, `SLBS`, `SME`, `NBF`, `TRI-PARTY`, `EGR`.

```bash
api-anything call nseindia-in dailyReports key=CM
```

### `monthlyReports(key)`
Monthly PDFs/spreadsheets. Keys: `CM`, `INDICES`, `FO`, `CD`, `COM`, `IRD`, `WDM`, `CBM`, `SLBS`, `EGR`.

```bash
api-anything call nseindia-in monthlyReports key=CM
```

---

### `corporatesFinancialResults(symbol, period, from_date, to_date)`
Result filings with XBRL links. `period`: `Quarterly`, `Annual`, `Half-Yearly`. `index`: `equities`, `sme`, `debt`, `reitsinvits`.

```bash
api-anything call nseindia-in corporatesFinancialResults symbol=TCS period=Quarterly from_date=01-01-2025 to_date=31-10-2026
```

### `annualReportsXbrl(symbol)`
Annual report XBRL — ~4 years, standalone + consolidated. Each item: `fromYr`, `toYr`, `report_type`, `fileName` (XML link).

```bash
api-anything call nseindia-in annualReportsXbrl symbol=TCS
```

---

### `eventCalendar(from_date, to_date, fo_sec?)`
Board meetings, results, AGMs, dividends, splits. Each item: `symbol`, `company`, `purpose`, `bm_desc`, `date`. Dates DD-MM-YYYY. `fo_sec=true` restricts to F&O stocks.

```bash
api-anything call nseindia-in eventCalendar from_date=01-10-2026 to_date=31-10-2026
```

### `corporateActions(symbol, from_date?, to_date?)`
Dividend, bonus, split, rights history. Fields: `exDate`, `recDate`, `subject`, `faceVal`, `isin`.

```bash
api-anything call nseindia-in corporateActions symbol=TCS from_date=01-01-2024 to_date=28-10-2026
```

### `underlyingInfo()`
All 225 F&O-eligible underlyings: 6 indices + 219 stocks, each with `symbol`, `underlying` name, `serialNumber`.

```bash
api-anything call nseindia-in underlyingInfo
```

### `stocksTraded()`
Live snapshot of all 3200+ NSE equities — LTP, change, volume, market cap, advance/decline counts.

```bash
api-anything call nseindia-in stocksTraded
```

### `mostActiveUnderlying()`
Top 223 F&O underlyings by volume today — futures/options volume, turnover, OI, spot price.

```bash
api-anything call nseindia-in mostActiveUnderlying
```

### `optionChainInfo(symbol)`
Available expiry dates and strike prices for any F&O underlying.

```bash
api-anything call nseindia-in optionChainInfo symbol=NIFTY
api-anything call nseindia-in optionChainInfo symbol=TCS
```

### `vixHistory(from_date, to_date)`
Historical daily OHLC for India VIX. Fields: date, open/high/low/close, prev close, points and % change.

```bash
api-anything call nseindia-in vixHistory from_date=01-01-2026 to_date=28-10-2026
```

---

## What's accessible without a session

| Data | Accessible |
|---|---|
| All indices (130+) with PE/PB/A-D | ✅ |
| Corporate announcements + PDF links | ✅ |
| Live stock quote / index constituents | ✅ |
| Intraday ticks / stock search | ✅ |
| Currency rates / G-sec yields | ✅ |
| Market status / turnover / gainers | ✅ |
| OI spurts, circuit hitters, FII/DII | ✅ |
| ETFs, circulars, pre-open, holidays | ✅ |
| Daily + monthly report files | ✅ |
| Financial results + XBRL XML | ✅ |
| Corporate event calendar (646+ events) | ✅ |
| Corporate actions (dividends, splits, bonuses) | ✅ |
| F&O underlyings / option chain expiries+strikes | ✅ |
| All stocks traded today (3200+) | ✅ |
| Most active F&O underlyings | ✅ |
| India VIX history | ✅ |
| Option chain / inline financials | ❌ session or empty |
