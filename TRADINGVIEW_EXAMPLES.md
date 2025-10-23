# TradingView Alert Message Examples

This document provides example alert messages for all three indicators as specified in the requirements.

## Webhook URL Format

All webhooks should use your deployed Google Apps Script URL with the indicator parameter:

```
https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?indicator=X
```

Replace `YOUR_SCRIPT_ID` with your actual script ID and `X` with 1, 2, or 3.

---

## Indicator 1: Primary Signal

**Purpose**: Main trading signal generator
**Displays In**: Live Feed, Dashboard statistics
**Fields**: `scrip`, `timestamp`, `reason`

### Alert Configuration in TradingView

**Webhook URL:**
```
https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?indicator=1
```

**Alert Message Format:**
```javascript
{
  "scrip": "{{ticker}}",
  "timestamp": "{{time}}",
  "reason": "YOUR_SIGNAL_REASON"
}
```

### Examples

**Example 1: Moving Average Crossover**
```json
{
  "scrip": "RELIANCE",
  "timestamp": "1698066600000",
  "reason": "MA Crossover 📈"
}
```

**Example 2: Support Breakout**
```json
{
  "scrip": "TCS",
  "timestamp": "1698066900000",
  "reason": "Support Break 📉"
}
```

**Example 3: Volume Spike**
```json
{
  "scrip": "INFY",
  "timestamp": "1698067200000",
  "reason": "Volume Spike"
}
```

### Pine Script Example
```pinescript
// In your Pine Script indicator
string alert_message = '{"scrip": "' + syminfo.ticker + '", "timestamp": "' + str.tostring(timenow) + '", "reason": "Your Signal Reason"}'
alert(alert_message, alert.freq_once_per_bar)
```

---

## Indicator 2: Secondary Signals (Patterns & HVD)

**Purpose**: Pattern recognition and High Volume Deployment signals
**Displays In**: Logs (5 windows), Dashboard tickers
**Types**: 
- HVD (Significant Deployed Capital)
- Bullish/Bearish Patterns
- Standalone (Oversold/Overbought)

### Type 1: HVD (High Volume Deployment)

**Webhook URL:**
```
https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?indicator=2
```

**Alert Message:**
```javascript
{
  "timestamp": "{{time}}",
  "ticker": "{{ticker}}",
  "reason": "HVD",
  "capital_deployed_cr": "VALUE_IN_CRORES"
}
```

**Examples:**

```json
{
  "timestamp": "1698066600000",
  "ticker": "RELIANCE",
  "reason": "HVD",
  "capital_deployed_cr": "150.5"
}
```

```json
{
  "timestamp": "1698066900000",
  "ticker": "HDFC",
  "reason": "HVD",
  "capital_deployed_cr": "225.8"
}
```

**Pine Script Example:**
```pinescript
var float capital_deployed_cr = volume * close / 10000000 // Example calculation

string alert_message = '{"timestamp": "' + str.tostring(timenow) + '", "ticker": "' + syminfo.ticker + '", "reason": "HVD", "capital_deployed_cr": "' + str.tostring(capital_deployed_cr, "#.##") + '"}'
```

---

### Type 2: Pattern Alerts (Bullish/Bearish)

**Webhook URL:**
```
https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?indicator=2
```

**Alert Message:**
```javascript
{
  "timestamp": "{{time}}",
  "ticker": "{{ticker}}",
  "reason": "PATTERN_NAME"
}
```

**Bullish Pattern Examples:**

```json
{
  "timestamp": "1698066600000",
  "ticker": "RELIANCE",
  "reason": "Engulfing Pattern"
}
```

```json
{
  "timestamp": "1698066900000",
  "ticker": "TCS",
  "reason": "Morning Star"
}
```

```json
{
  "timestamp": "1698067200000",
  "ticker": "INFY",
  "reason": "Hammer"
}
```

**Bearish Pattern Examples:**

```json
{
  "timestamp": "1698066600000",
  "ticker": "SBIN",
  "reason": "Shooting Star"
}
```

```json
{
  "timestamp": "1698066900000",
  "ticker": "ICICI",
  "reason": "Evening Star"
}
```

```json
{
  "timestamp": "1698067200000",
  "ticker": "AXIS",
  "reason": "Dark Cloud Cover"
}
```

**Note**: Don't include "Bullish" or "Bearish" in reason - the app automatically detects and shows 📈 for bullish or 📉 for bearish.

**Pine Script Example:**
```pinescript
// Bullish Engulfing detection
bool bullish_engulfing = close[1] < open[1] and close > open and open <= close[1] and close >= open[1]

string alert_reason = bullish_engulfing ? "Engulfing Pattern" : ""

if bullish_engulfing
    string alert_message = '{"timestamp": "' + str.tostring(time_close) + '", "ticker": "' + syminfo.ticker + '", "reason": "' + alert_reason + '"}'
    alert(alert_message, alert.freq_once_per_bar)
```

---

### Type 3: Standalone Alerts (Oversold/Overbought)

**Webhook URL:**
```
https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?indicator=2
```

**Alert Message:**
```javascript
{
  "timestamp": "{{time}}",
  "ticker": "{{ticker}}",
  "reason": "standalone_INDICATOR_CONDITION"
}
```

**Oversold Examples (Bullish Standalone):**

```json
{
  "timestamp": "1698066600000",
  "ticker": "RELIANCE",
  "reason": "standalone_RSI Oversold"
}
```

```json
{
  "timestamp": "1698066900000",
  "ticker": "TCS",
  "reason": "standalone_Stochastic Oversold"
}
```

```json
{
  "timestamp": "1698067200000",
  "ticker": "INFY",
  "reason": "standalone_CCI Extreme Low"
}
```

**Overbought Examples (Bearish Standalone):**

```json
{
  "timestamp": "1698066600000",
  "ticker": "HDFC",
  "reason": "standalone_RSI Overbought"
}
```

```json
{
  "timestamp": "1698066900000",
  "ticker": "SBIN",
  "reason": "standalone_Stochastic Overbought"
}
```

```json
{
  "timestamp": "1698067200000",
  "ticker": "ICICI",
  "reason": "standalone_CCI Extreme High"
}
```

**Pine Script Example:**
```pinescript
// RSI Standalone
rsi_value = ta.rsi(close, 14)

bool rsi_oversold = rsi_value < 30
bool rsi_overbought = rsi_value > 70

string standalone_alert_reason = ""
if rsi_oversold
    standalone_alert_reason := "standalone_RSI Oversold"
else if rsi_overbought
    standalone_alert_reason := "standalone_RSI Overbought"

if standalone_alert_reason != ""
    string standalone_alert_message = '{"timestamp": "' + str.tostring(time_close) + '", "ticker": "' + syminfo.ticker + '", "reason": "' + standalone_alert_reason + '"}'
    alert(standalone_alert_message, alert.freq_once_per_bar)
```

---

## Indicator 3: Nifty-Specific Signals

**Purpose**: Nifty index-specific signals
**Displays In**: Dashboard Nifty card
**Fields**: `timestamp`, `ticker`, `reason`

### Alert Configuration

**Webhook URL:**
```
https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?indicator=3
```

**Alert Message:**
```javascript
{
  "timestamp": "{{time}}",
  "ticker": "{{ticker}}",
  "reason": "SIGNAL_REASON"
}
```

### Examples

**Example 1: Nifty Trend Change**
```json
{
  "timestamp": "1698066600000",
  "ticker": "NIFTY",
  "reason": "Trend Reversal"
}
```

**Example 2: Nifty Support/Resistance**
```json
{
  "timestamp": "1698066900000",
  "ticker": "NIFTY50",
  "reason": "Support Bounce"
}
```

**Example 3: Nifty Momentum**
```json
{
  "timestamp": "1698067200000",
  "ticker": "NIFTY",
  "reason": "Momentum Shift 📈"
}
```

**Pine Script Example:**
```pinescript
// For Nifty-specific indicator
if syminfo.ticker == "NIFTY" or syminfo.ticker == "NIFTY50"
    string standalone_alert_reason = "Your Nifty Signal"
    string standalone_alert_message = '{"timestamp": "' + str.tostring(time_close) + '", "ticker": "' + syminfo.ticker + '", "reason": "' + standalone_alert_reason + '"}'
    alert(standalone_alert_message, alert.freq_once_per_bar)
```

---

## Pattern Name Guidelines

### DO Use These Pattern Names:
- ✅ Engulfing Pattern
- ✅ Morning Star
- ✅ Evening Star
- ✅ Hammer
- ✅ Shooting Star
- ✅ Doji
- ✅ Harami
- ✅ Piercing Line
- ✅ Dark Cloud Cover
- ✅ Three White Soldiers
- ✅ Three Black Crows

### DON'T Use These:
- ❌ Bullish Engulfing (remove "Bullish")
- ❌ Bearish Hammer (remove "Bearish")
- ❌ Bull Flag (use "Flag Pattern" instead)
- ❌ Bear Pennant (use "Pennant Pattern" instead)

**Reason**: The app automatically adds 📈 or 📉 symbols based on pattern context.

---

## Testing Your Webhooks

### Using TradingView:
1. Create alert with your indicator
2. Configure webhook URL
3. Set alert message
4. Test by triggering the alert condition

### Using curl (Command Line):
```bash
curl -X POST \
  'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?indicator=1' \
  -H 'Content-Type: application/json' \
  -d '{
    "scrip": "TEST",
    "timestamp": "1698066600000",
    "reason": "Test Signal"
  }'
```

### Using Postman:
1. Method: POST
2. URL: Your webhook URL with indicator parameter
3. Headers: `Content-Type: application/json`
4. Body: Raw JSON with alert data
5. Send request

---

## Common Patterns

### Symbol Name Formatting
- Use exchange ticker symbols: RELIANCE, TCS, INFY
- For Nifty: NIFTY or NIFTY50
- Consistent naming ensures proper syncing

### Timestamp Formatting
- Use Unix timestamp in milliseconds
- TradingView `{{time}}` provides this automatically
- Example: `1698066600000`

### Reason Guidelines
- Keep concise and descriptive
- Use emojis sparingly (app adds them automatically)
- Avoid special characters that might break JSON

---

## Sync Behavior

### When Does Syncing Happen?
A symbol shows "Synced" when:
1. It appears in **Indicator 1** (any time)
2. AND appears in **Indicator 2** (any time - before or after doesn't matter)

### Examples:

**Scenario 1**: Indicator 1 first
- 9:25 AM - RELIANCE appears in Indicator 1 → Status: "Awaiting"
- 12:45 PM - RELIANCE appears in Indicator 2 → Status: "Synced" ✅

**Scenario 2**: Indicator 2 first
- 9:21 AM - RELIANCE appears in Indicator 2 → (Not shown in Live Feed yet)
- 9:27 AM - RELIANCE appears in Indicator 1 → Status: "Synced" ✅

**Scenario 3**: Multiple Indicator 2 signals
- 9:25 AM - RELIANCE in Indicator 1
- 10:30 AM - RELIANCE in Indicator 2 (Pattern)
- 2:15 PM - RELIANCE in Indicator 2 (HVD)
- Result: Shows both Pattern and HVD in sync details

---

## Troubleshooting

### Alert Not Appearing
1. Check webhook URL has correct indicator parameter
2. Verify JSON format is valid
3. Check Google Apps Script execution logs
4. Ensure symbol name is consistent

### Wrong Window in Logs
- HVD must have `"reason": "HVD"` and `capital_deployed_cr` field
- Standalone must have `"reason": "standalone_..."` prefix
- Pattern detection based on keywords

### Not Syncing
- Verify exact symbol name match between indicators
- Check both indicators are sending data
- Look at SyncStatus sheet in Google Spreadsheet

---

## Best Practices

1. **Test First**: Always test webhooks with sample data before live deployment
2. **Consistent Naming**: Use same symbol names across all indicators
3. **Valid JSON**: Ensure alert messages are valid JSON (use validators)
4. **Monitor Logs**: Regularly check Apps Script execution logs
5. **Backup Data**: Periodically export spreadsheet data
6. **Rate Limits**: Be aware of TradingView and Apps Script rate limits

---

For more information, see the main [README.md](README.md) and [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md).
