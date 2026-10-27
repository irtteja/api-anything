# NSE India

**Base URL:** `https://www.nseindia.in`  
**Auth required:** No — all operations are public, no session cookie needed  
**Tier:** 1 (plain HTTP, no browser)  
**Latency:** ~350–950ms

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

---

### `getquoteapi(symbol)`

Live stock quote for any NSE-listed equity: open, day high/low, previous close, LTP, % change, ISIN, market type.

```bash
api-anything call nseindia-in getquoteapi symbol=RELIANCE
api-anything call nseindia-in getquoteapi symbol=TCS
api-anything call nseindia-in getquoteapi symbol=INFY
```

**Response fields:** `symbol`, `companyName`, `isinCode`, `series`, `marketType`, `open`, `dayHigh`, `dayLow`, `previousClose`, `averagePrice`, `change`, `pChange`.

---

### `marketStatus()`

Live status of all NSE market segments — Capital Market, Currency, Commodity, Debt, and derivatives. Returns whether each segment is Open/Closed/Pre-open, the trade date, current NIFTY 50 level, and currency pair rates.

```bash
api-anything call nseindia-in marketStatus
```

**Response:** array of market state objects with fields `market`, `marketStatus`, `tradeDate`, `index`, `last`, `variation`, `percentChange`, `marketStatusMessage`.

---

### `marketTurnover()`

Yesterday's and today's turnover (volume, traded value, open interest) across all NSE market segments: Equities, Index Futures/Options, Stock Futures/Options, Currency Futures/Options, Commodity Futures/Options, Interest Rate instruments.

```bash
api-anything call nseindia-in marketTurnover
```

**Response:** array with fields per segment: `name`, `yesterday.volume`, `yesterday.value`, `yesterday.openInterest`, `today` (populated during trading hours).

---

### `indexGainers()`

Top gainers across NIFTY 50, BANK NIFTY, NIFTY NEXT 50, and all NSE securities today. Each index group has a `data` array of stocks.

```bash
api-anything call nseindia-in indexGainers
```

**Response:** object with keys `legends` (index label mapping), `NIFTY`, `BANKNIFTY`, `NIFTYNEXT50`, `allSec`, etc. Each key is an object with a `data` array containing `symbol`, `open_price`, `high_price`, `low_price`, `ltp`, `previousPrice`, `tradedQuantity`.

---

### `oiSpurts(type)`

Contracts with the largest change in open interest — useful for identifying where institutional money is flowing.

```bash
# Put-call ratio
api-anything call nseindia-in oiSpurts type=pcr

# Contracts with highest OI build-up
api-anything call nseindia-in oiSpurts type=spurtsinoi

# Contracts shedding OI fastest
api-anything call nseindia-in oiSpurts type=fallinoi
```

**Response fields per contract:** `symbol`, `instrument`, `optionType`, `strikePrice`, `expiryDate`, `latestOI`, `prevOI`, `changeInOI`, `pChangeInOI`, `ltp`, `pChange`, `underlyingValue`, `turnover`, `volume`.

---

### `holidayMaster(type)`

NSE trading or clearing holidays for the calendar year, organized by market segment (CM=Capital Market, FO=Futures & Options, CD=Currency Derivatives, etc.).

```bash
# Trading holidays
api-anything call nseindia-in holidayMaster type=trading

# Clearing holidays
api-anything call nseindia-in holidayMaster type=clearing
```

**Response:** object keyed by market segment (CM, FO, CD, CBM, IRD, etc.), each containing an array of holiday objects with `tradingDate`, `weekDay`, `description`.

---

### `equityMaster()`

Master list of all NSE indices organized by category.

```bash
api-anything call nseindia-in equityMaster
```

**Response:** object with keys `Broad Market Indices`, `Sectoral Market Indices`, `Thematic Market Indices`, `Strategy Market Indices`, `Indices Eligible In Derivatives` — each an array of index name strings.

---

### `mostActiveSecurities(type)`

Top 20 most-active NSE equities today, sorted by volume or by traded value.

```bash
# Most traded by quantity
api-anything call nseindia-in mostActiveSecurities type=volume

# Most traded by rupee value
api-anything call nseindia-in mostActiveSecurities type=value
```

**Response fields per stock:** `symbol`, `lastPrice`, `pChange`, `quantityTraded`, `totalTradedVolume`, `totalTradedValue`, `previousClose`, `yearHigh`, `yearLow`, `change`, `open`, `dayHigh`, `dayLow`, `lastUpdateTime`.

---

### `priceBandHitters()`

Stocks hitting their upper or lower price circuit band today (5%, 10%, 20% bands). Returns separate sections for upper-circuit (locked up) and lower-circuit (locked down) stocks across all NSE securities.

```bash
api-anything call nseindia-in priceBandHitters
```

**Response fields:** `upper.AllSec.data[]` and `lower.AllSec.data[]` — each item: `symbol`, `series`, `ltp`, `pChange`, `priceBand`, `highPrice`, `lowPrice`, `yearHigh`, `yearLow`, `turnover`. Also `count.TOTAL/UPPER/LOWER/BOTH`.

---

### `fiidiiTrade()`

Previous trading day's net buy/sell activity by FII/FPI and DII.

```bash
api-anything call nseindia-in fiidiiTrade
```

**Response:** array of 2 objects — one for `DII`, one for `FII/FPI`. Fields: `category`, `date`, `buyValue`, `sellValue`, `netValue` (all in crores).

---

### `etf()`

Live prices and NAV for all NSE-listed ETFs.

```bash
api-anything call nseindia-in etf
```

**Response fields per ETF:** `symbol`, `assets` (underlying), `open`, `high`, `low`, `ltP` (LTP), `chn` (change), `per` (% change), `nav`, `qty`, `trdVal`, `wkhi`, `wklo`, `prevClose`, `perChange30d`, `perChange365d`, `timestamp`, `advances`, `declines`, `unchanged`.

---

### `circulars()`

Recent NSE exchange circulars and notices, with direct PDF/ZIP links.

```bash
api-anything call nseindia-in circulars
```

**Response fields per circular:** `cirDate`, `cirDisplayDate`, `circCategory`, `circCompany`, `circDepartment`, `circDisplayNo`, `circFileSize`, `circFilelink` (PDF/ZIP URL), `sub` (subject), `fromDate`, `toDate`.

---

### `topCorpInfo(symbol)`

Company snapshot: latest announcements, upcoming corporate actions (dividends, splits, bonus), recent financial results, and upcoming board meetings.

```bash
api-anything call nseindia-in topCorpInfo symbol=RELIANCE
api-anything call nseindia-in topCorpInfo symbol=TCS
api-anything call nseindia-in topCorpInfo symbol=INFY
```

**Response sections:**
- `latest_announcements.data[]` — `symbol`, `broadcastdate`, `subject`
- `corporate_actions.data[]` — `symbol`, `exdate`, `purpose`
- `financial_results.data[]` — `from_date`, `to_date`, `income`, `expenditure`, `reDilEPS`
- `borad_meeting.data[]` — `symbol`, `purpose`, `meetingdate`

---

### `preOpenMarket(key)`

Pre-open session data: indicative equilibrium prices (IEP) and order details for each stock. Shows IEP, IEQ, final quantity, and total turnover. Available during and after the pre-open session.

```bash
# All ~2000 equities
api-anything call nseindia-in preOpenMarket key=ALL

# ~200 futures-eligible stocks
api-anything call nseindia-in preOpenMarket key=FO

# ~40 SME-segment stocks
api-anything call nseindia-in preOpenMarket key=SME
```

**Response fields per stock:** `metadata.symbol`, `metadata.lastPrice`, `metadata.change`, `metadata.pChange`, `metadata.previousClose`, `metadata.finalQuantity`, `metadata.totalTurnover`, `metadata.yearHigh`, `metadata.yearLow`, `metadata.iep`. Top-level: `advances`, `declines`, `unchanged`.

---

## What's accessible without a session

| Data | Accessible |
|---|---|
| All indices (130+) with PE/PB/A-D | ✅ |
| Corporate announcements + PDF links | ✅ |
| Live stock quote (LTP, OHLC, pChange) | ✅ via getquoteapi |
| Market status (all segments) | ✅ |
| Market turnover by segment | ✅ |
| Today's NIFTY gainers | ✅ |
| OI spurts / PCR / falling OI | ✅ |
| Trading and clearing holidays | ✅ |
| Index master / all index names | ✅ |
| Most active stocks by volume / value | ✅ |
| Price circuit band hitters (upper/lower) | ✅ |
| FII/DII daily net buy/sell data | ✅ |
| All ETFs with live price + NAV | ✅ |
| NSE circulars + PDF links | ✅ |
| Company snapshot (announcements, results, board meetings) | ✅ |
| Pre-open IEP / order book | ✅ |
| Option chain data | ❌ returns empty records |
| Historical charts (intraday) | ❌ returns empty grapthData |
| Quarterly financials / P&L | ❌ session required |
| Shareholding patterns | ❌ returns `{}` |
| Bulk/block deals | ❌ 403 |
