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

**Response fields per index:** `index`, `last`, `variation`, `percentChange`, `open`, `high`, `low`, `previousClose`, `yearHigh`, `yearLow`, `pe`, `pb`, `dy`, `advances`, `declines`, `unchanged`, `perChange30d`, `perChange365d`.

---

### `corporateAnnouncements(symbol)`

Recent exchange filings for a listed company — results, dividends, board meetings, press releases, etc. Each item includes a PDF link.

```bash
api-anything call nseindia-in corporateAnnouncements symbol=TCS
api-anything call nseindia-in corporateAnnouncements symbol=RELIANCE
```

**Response:** `an_dt`, `desc`, `attchmntText`, `attchmntFile` (PDF), `sm_name`, `sm_isin`, `symbol`, `sort_date`.

---

### `getquoteapi(symbol)`

Live stock quote: open, day high/low, previous close, LTP, % change, ISIN, market type.

```bash
api-anything call nseindia-in getquoteapi symbol=RELIANCE
api-anything call nseindia-in getquoteapi symbol=TCS
```

**Response fields:** `symbol`, `companyName`, `isinCode`, `open`, `dayHigh`, `dayLow`, `previousClose`, `change`, `pChange`.

---

### `marketStatus()`

Live Open/Closed/Pre-open state for all NSE segments (Capital Market, Currency, Commodity, Debt, derivatives).

```bash
api-anything call nseindia-in marketStatus
```

**Response:** array with `market`, `marketStatus`, `tradeDate`, `index`, `last`, `percentChange`.

---

### `marketTurnover()`

Yesterday's and today's turnover (volume, value, open interest) per NSE segment.

```bash
api-anything call nseindia-in marketTurnover
```

**Response:** array with `name`, `yesterday.volume`, `yesterday.value`, `yesterday.openInterest`, `today`.

---

### `indexGainers()`

Top gainers across NIFTY 50, BANK NIFTY, NIFTY NEXT 50, and all NSE securities today.

```bash
api-anything call nseindia-in indexGainers
```

**Response:** `legends`, `NIFTY`, `BANKNIFTY`, `NIFTYNEXT50`, `allSec` — each with `data[]` of `symbol`, `open_price`, `ltp`, `previousPrice`, `tradedQuantity`.

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

**Response fields per contract:** `symbol`, `instrument`, `optionType`, `strikePrice`, `expiryDate`, `latestOI`, `prevOI`, `changeInOI`, `pChangeInOI`, `ltp`, `pChange`, `underlyingValue`.

---

### `holidayMaster(type)`

NSE trading or clearing holidays for the year, by segment (CM, FO, CD, IRD…).

```bash
api-anything call nseindia-in holidayMaster type=trading
api-anything call nseindia-in holidayMaster type=clearing
```

**Response:** object keyed by segment, each an array of `{tradingDate, weekDay, description}`.

---

### `equityMaster()`

Master list of all NSE indices by category.

```bash
api-anything call nseindia-in equityMaster
```

**Response:** `Broad Market Indices`, `Sectoral Market Indices`, `Thematic Market Indices`, `Strategy Market Indices`, `Indices Eligible In Derivatives` — each an array of index names.

---

### `mostActiveSecurities(type)`

Top 20 most-active NSE equities today, by volume or rupee value.

```bash
api-anything call nseindia-in mostActiveSecurities type=volume
api-anything call nseindia-in mostActiveSecurities type=value
```

**Response fields per stock:** `symbol`, `lastPrice`, `pChange`, `quantityTraded`, `totalTradedVolume`, `totalTradedValue`, `yearHigh`, `yearLow`, `open`, `dayHigh`, `dayLow`.

---

### `priceBandHitters()`

Stocks hitting their upper or lower price circuit band today (5%, 10%, 20% bands). Returns separate sections for upper-circuit (locked up) and lower-circuit (locked down) stocks across all NSE securities.

```bash
api-anything call nseindia-in priceBandHitters
```

**Response:** `upper.AllSec.data[]` and `lower.AllSec.data[]` each with `symbol`, `ltp`, `pChange`, `priceBand`, `yearHigh`, `yearLow`, `turnover`. Also `count.TOTAL/UPPER/LOWER/BOTH`.

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

**Response fields per ETF:** `symbol`, `assets`, `open`, `high`, `low`, `ltP`, `chn`, `per`, `nav`, `qty`, `trdVal`, `wkhi`, `wklo`, `prevClose`, `perChange30d`, `perChange365d`. Top-level: `timestamp`, `advances`, `declines`, `unchanged`.

---

### `circulars()`

Recent NSE exchange circulars and notices, with direct PDF/ZIP links.

```bash
api-anything call nseindia-in circulars
```

**Response fields per circular:** `cirDate`, `circCategory`, `circDepartment`, `circDisplayNo`, `circFilelink` (PDF/ZIP URL), `sub` (subject).

---

### `topCorpInfo(symbol)`

Company snapshot: latest announcements, upcoming corporate actions (dividends, splits, bonus), recent financial results, and upcoming board meetings.

```bash
api-anything call nseindia-in topCorpInfo symbol=RELIANCE
api-anything call nseindia-in topCorpInfo symbol=TCS
api-anything call nseindia-in topCorpInfo symbol=INFY
```

**Response:** `latest_announcements.data[]` (`symbol`, `broadcastdate`, `subject`), `corporate_actions.data[]` (`exdate`, `purpose`), `financial_results.data[]` (`income`, `expenditure`, `reDilEPS`), `borad_meeting.data[]` (`purpose`, `meetingdate`).

---

### `preOpenMarket(key)`

Pre-open session indicative equilibrium prices (IEP), final quantity, and total turnover per stock.

```bash
# All ~2000 equities
api-anything call nseindia-in preOpenMarket key=ALL

# ~200 futures-eligible stocks
api-anything call nseindia-in preOpenMarket key=FO

# ~40 SME-segment stocks
api-anything call nseindia-in preOpenMarket key=SME
```

**Response fields per stock:** `metadata.symbol`, `metadata.lastPrice`, `metadata.pChange`, `metadata.iep`, `metadata.finalQuantity`, `metadata.yearHigh`, `metadata.yearLow`. Top-level: `advances`, `declines`, `unchanged`.

---

### `indexNames()`

Short-name ↔ full-name mapping for all 150 NSE indices.

```bash
api-anything call nseindia-in indexNames
```

**Response:** `{stn: [[shortName, fullName], ...], nts: [[fullName, shortName], ...]}` — 150 pairs each.

---

### `announcementSearch(index, symbol?, from_date?, to_date?)`

Full historical search across NSE corporate announcements. Unlike `corporateAnnouncements` (recent only), this returns every filing ever made. Supports segment filtering (equities/debt/sme/mf), symbol, and date range.

```bash
api-anything call nseindia-in announcementSearch index=equities symbol=TCS
api-anything call nseindia-in announcementSearch index=debt from_date=01-10-2026 to_date=27-10-2026
api-anything call nseindia-in announcementSearch index=sme
```

**Response:** `an_dt`, `desc`, `attchmntText`, `attchmntFile` (PDF), `sm_name`, `sm_isin`, `symbol`, `sort_date`.

---

### `derivativeGainers()`

Top gainers among F&O-eligible stocks today. Like `indexGainers` but adds `FOSec` key (~200 futures-eligible stocks).

```bash
api-anything call nseindia-in derivativeGainers
```

**Response:** `legends`, `NIFTY`, `BANKNIFTY`, `NIFTYNEXT50`, `FOSec`, `allSec` — each with `data[]` of `symbol`, `ltp`, `net_price`, `tradedQuantity`.

---

## Maintainer notes

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
