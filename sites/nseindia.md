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
Full historical search across corporate announcements. `index` is the segment: `equities`, `debt`, `sme`, or `mf`.

```bash
api-anything call nseindia-in announcementSearch index=equities symbol=TCS
api-anything call nseindia-in announcementSearch index=equities from_date=01-10-2026 to_date=27-10-2026
```

### `getquoteapi(symbol)`
Live stock quote: LTP, OHLC, % change, ISIN, order book depth, trade info, margin data.

```bash
api-anything call nseindia-in getquoteapi symbol=RELIANCE
```

### `indexConstituents(index)`
Live price snapshot for every stock in an NSE index. Works for 100+ indices. Use spaces in the name.

```bash
api-anything call nseindia-in indexConstituents index="NIFTY 50"
api-anything call nseindia-in indexConstituents index="NIFTY IT"
api-anything call nseindia-in indexConstituents index="NIFTY 500"
```

**Response per stock:** `symbol`, `lastPrice`, `change`, `pChange`, `open`, `dayHigh`, `dayLow`, `totalTradedVolume`, `totalTradedValue`, `yearHigh`, `yearLow`, `perChange30d`, `perChange365d`.

### `indexSnapshot(index)`
Compact index summary: OHLC, current level, % change, 30d/365d performance, yearHigh/Low, volume, advance/decline counts. Lighter than `indexConstituents`.

```bash
api-anything call nseindia-in indexSnapshot index="NIFTY 50"
api-anything call nseindia-in indexSnapshot index="NIFTY MIDCAP 100"
```

### `chartIntraday(index)`
Today's intraday price ticks for any NSE index. Returns 10,000+ `[timestamp_ms, price, marker]` points.

```bash
api-anything call nseindia-in chartIntraday index="NIFTY 50"
api-anything call nseindia-in chartIntraday index="NIFTY BANK"
```

### `stockSearch(q)`
Search NSE-listed equities and ETFs by name or ticker symbol.

```bash
api-anything call nseindia-in stockSearch q=RELIANCE
api-anything call nseindia-in stockSearch q=Infosys
```

**Response:** `companyName`, `symbol`, `series`, `segment`, `lastPrice`, `change`, `pChange`, `url`, `webUrl`.

### `refRates(type)`
NSE reference rates. `currencyspotrates` → USD/YEN/GBP/EUR vs INR. `interates` → g-sec bond yields.

```bash
api-anything call nseindia-in refRates type=currencyspotrates
api-anything call nseindia-in refRates type=interates
```

### `currencyDerivativesStats()`
Live CD segment stats — per instrument (USDINR/EURINR/GBPINR/JPYINR futures and options): volume, notional/premium turnover, open interest, and segment totals.

```bash
api-anything call nseindia-in currencyDerivativesStats
```

### `marketStatus()`
Live Open/Closed/Pre-open state for all NSE segments (CM, Currency, Commodity, Debt, derivatives).

```bash
api-anything call nseindia-in marketStatus
```

### `marketTurnover()`
Yesterday's and today's turnover (volume, value, open interest) per NSE segment.

```bash
api-anything call nseindia-in marketTurnover
```

### `indexGainers()`
Top gainers across NIFTY 50, BANK NIFTY, NIFTY NEXT 50, and all NSE securities today.

```bash
api-anything call nseindia-in indexGainers
```

### `derivativeGainers()`
Top gainers among F&O-eligible stocks. Like `indexGainers` but adds `FOSec` (~200 futures stocks).

```bash
api-anything call nseindia-in derivativeGainers
```

### `oiSpurts(type)`
Contracts with the largest change in open interest. Types: `spurtsinoi`, `fallinoi`, `pcr`, `loosening`.

```bash
api-anything call nseindia-in oiSpurts type=spurtsinoi
api-anything call nseindia-in oiSpurts type=pcr
```

**Response per contract:** `symbol`, `instrument`, `optionType`, `strikePrice`, `expiryDate`, `latestOI`, `prevOI`, `changeInOI`, `pChangeInOI`, `ltp`, `pChange`, `underlyingValue`.

### `mostActiveSecurities(type)`
Top 20 most-active NSE equities today by `volume` or `value`.

```bash
api-anything call nseindia-in mostActiveSecurities type=volume
```

### `priceBandHitters()`
Stocks hitting upper or lower price circuit bands today (5%, 10%, 20%).

```bash
api-anything call nseindia-in priceBandHitters
```

### `fiidiiTrade()`
Previous day's net buy/sell by FII/FPI and DII (values in crores).

```bash
api-anything call nseindia-in fiidiiTrade
```

### `etf()`
Live prices and NAV for all NSE-listed ETFs with 30d/365d performance.

```bash
api-anything call nseindia-in etf
```

### `circulars()`
Recent NSE circulars and notices with direct PDF/ZIP links.

```bash
api-anything call nseindia-in circulars
```

### `topCorpInfo(symbol)`
Company snapshot: latest announcements, upcoming corporate actions, recent financial results, and board meetings.

```bash
api-anything call nseindia-in topCorpInfo symbol=RELIANCE
```

### `preOpenMarket(key)`
Pre-open IEP, final quantity, and turnover per stock. `key=ALL` (~2000 stocks), `FO` (~200), `SME` (~40).

```bash
api-anything call nseindia-in preOpenMarket key=ALL
```

### `holidayMaster(type)`
NSE trading or clearing holidays by segment (CM, FO, CD, etc.). `type=trading` or `type=clearing`.

```bash
api-anything call nseindia-in holidayMaster type=trading
```

### `equityMaster()`
Master list of all NSE indices by category (Broad Market, Sectoral, Thematic, Strategy, Derivatives-eligible).

```bash
api-anything call nseindia-in equityMaster
```

### `indexNames()`
Short-name ↔ full-name mapping for all 150 NSE indices.

```bash
api-anything call nseindia-in indexNames
```

### `commodityFutures()`
Top 20 most-active NSE commodity futures and options by volume and value. Covers CRUDEOIL, GOLD, SILVER, NATURALGAS, COPPER, etc. Per-contract: OHLC, LTP, change, pChange, OI, turnover, lot size, expiry, spot price.

```bash
api-anything call nseindia-in commodityFutures
```

### `marketTurnoverDetail()`
Per-instrument live stats across all NSE segments — Equities, Index/Stock Futures/Options, Currency, Commodity, Interest Rate. Volume, value, OI, orders, trades, plus previous session values.

```bash
api-anything call nseindia-in marketTurnoverDetail
```

### `nsEvents()`
NSE event calendar — listing ceremonies, conferences, training sessions. Fields: title, category, dates, slug URL, thumbnail.

```bash
api-anything call nseindia-in nsEvents
```

---

### `dailyReports(key)`
Daily report files per segment. Returns `{CurrentDay,PreviousDay,FutureDay}`; each item: `displayName`, `tradingDate`, `fileSize`, download = `filePath+fileActlName`. Keys: `CM` equities, `INDEX` indices, `FO` F&O, `COM` commodity, `CD` currency, `WDM` debt, plus `SLBS`, `SME`, `NBF`, `TRI-PARTY`, `EGR`.

```bash
api-anything call nseindia-in dailyReports key=INDEX
api-anything call nseindia-in dailyReports key=CM
```

### `monthlyReports(key)`
Monthly PDFs/spreadsheets. Keys: `CM`, `INDICES`, `FO`, `CD`, `COM`, `IRD`, `WDM`, `CBM`, `SLBS`, `EGR`.

```bash
api-anything call nseindia-in monthlyReports key=CM
```

---

## What's accessible without a session

| Data | Accessible |
|---|---|
| All indices (130+) with PE/PB/A-D | ✅ |
| Corporate announcements + PDF links | ✅ |
| Live stock quote (LTP, OHLC, pChange) | ✅ |
| Index constituents with live prices | ✅ |
| Intraday chart ticks | ✅ |
| Stock search by name/symbol | ✅ |
| Currency spot rates / G-sec yields | ✅ |
| Market status / turnover | ✅ |
| Gainers, OI spurts, circuit hitters | ✅ |
| FII/DII, ETFs, circulars, pre-open | ✅ |
| Daily + monthly report files | ✅ |
| Option chain / quarterly financials | ❌ session or empty |
