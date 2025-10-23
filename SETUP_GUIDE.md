# Trading Signals Web App - Setup Guide

## Quick Start (5 Minutes)

### Local Testing
1. Clone the repository
2. Open `index.html` in a web browser
3. Enter OTP: `123456`
4. View demo signals on the dashboard

That's it! The app works standalone without any backend setup for testing.

## Google Apps Script Deployment (Full Setup)

### Step 1: Prepare Google Sheets
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet named "Trading Signals"
3. Note the spreadsheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit
   ```

### Step 2: Setup Google Apps Script
1. Go to [script.google.com](https://script.google.com)
2. Click "New Project"
3. Name it "Trading Signals Webhook"
4. Replace default code with content from `Code.gs`
5. Update the `SPREADSHEET_ID` constant with your sheet ID:
   ```javascript
   const SPREADSHEET_ID = 'your-spreadsheet-id-here';
   ```

### Step 3: Add HTML Files to Apps Script
Since Apps Script needs HTML files to be uploaded directly:

1. **Create index.html in Apps Script:**
   - Click the "+" next to "Files"
   - Select "HTML"
   - Name it `index`
   - Copy content from `index.html`
   - Paste into the editor

2. **Create dashboard.html:**
   - Click the "+" again
   - Select "HTML"
   - Name it `dashboard`
   - Copy content from `dashboard.html`
   - Paste into the editor

3. **Include CSS and JS:**
   - In `index.html`, add a `<style>` tag with content from `styles.css`
   - In `index.html`, add a `<script>` tag with content from `script.js`
   - Repeat for `dashboard.html`

### Step 4: Deploy as Web App
1. Click "Deploy" > "New deployment"
2. Click gear icon > Select "Web app"
3. Fill in:
   - **Description:** Trading Signals Webhook
   - **Execute as:** Me (your email)
   - **Who has access:** Anyone
4. Click "Deploy"
5. Authorize the app (grant permissions)
6. Copy the web app URL (you'll need this for TradingView)

### Step 5: Configure TradingView Webhook

#### Create Alert in TradingView
1. Open your chart in TradingView
2. Click on "Create Alert" (alarm icon)
3. Set your conditions
4. In the "Notifications" tab:
   - Check "Webhook URL"
   - Paste your Google Apps Script web app URL
   - Set message to JSON format (see below)

#### TradingView Webhook JSON Format

**Basic Format:**
```json
{
  "symbol": "{{ticker}}",
  "action": "{{strategy.order.action}}",
  "price": "{{close}}",
  "timeframe": "{{interval}}",
  "strategy": "My Strategy Name"
}
```

**Full Format with Stop Loss and Take Profit:**
```json
{
  "symbol": "{{ticker}}",
  "action": "{{strategy.order.action}}",
  "price": "{{close}}",
  "timeframe": "{{interval}}",
  "strategy": "EMA Crossover",
  "stopLoss": "{{plot_0}}",
  "takeProfit": "{{plot_1}}",
  "volume": "{{volume}}",
  "notes": "Signal from {{timenow}}"
}
```

**Example with Fixed Values:**
```json
{
  "symbol": "BTCUSDT",
  "action": "BUY",
  "price": "{{close}}",
  "timeframe": "1H",
  "strategy": "RSI Divergence",
  "stopLoss": "42000",
  "takeProfit": "45000"
}
```

### TradingView Placeholders Reference

Common placeholders you can use:
- `{{ticker}}` - Symbol name (e.g., BTCUSDT)
- `{{close}}` - Current close price
- `{{open}}` - Current open price
- `{{high}}` - Current high price
- `{{low}}` - Current low price
- `{{volume}}` - Current volume
- `{{interval}}` - Chart timeframe
- `{{timenow}}` - Current timestamp
- `{{strategy.order.action}}` - BUY or SELL (for strategies)
- `{{plot_0}}`, `{{plot_1}}`, etc. - Your indicator plots

## Testing the Webhook

### Method 1: Using cURL
```bash
curl -X POST [YOUR_WEB_APP_URL] \
  -H "Content-Type: application/json" \
  -d '{
    "symbol": "BTCUSDT",
    "action": "BUY",
    "price": "43500.00",
    "timeframe": "1H",
    "strategy": "Test Signal"
  }'
```

### Method 2: Using Postman
1. Set method to POST
2. Enter your web app URL
3. Set Headers: `Content-Type: application/json`
4. Set Body (raw JSON):
```json
{
  "symbol": "ETHUSDT",
  "action": "SELL",
  "price": "2280.00",
  "timeframe": "4H",
  "strategy": "Test"
}
```

### Method 3: Use Apps Script Test Function
In your Apps Script editor:
1. Select function: `testWebhook`
2. Click "Run"
3. Check your spreadsheet for the test signal

## Customization

### Change OTP Code
Edit `script.js`:
```javascript
const DEMO_OTP = '123456'; // Change to your desired OTP
```

### Modify Theme Colors
Edit the CSS `:root` section:
```css
:root {
    --primary-color: #007AFF;
    --secondary-color: #5856D6;
    --success-color: #34C759;
    --danger-color: #FF3B30;
}
```

### Add More Signal Fields
1. Update Google Sheet headers in `Code.gs`
2. Add fields to the `storeSignal` function
3. Update the dashboard HTML to display new fields

## Troubleshooting

### Webhook Not Working
- Check the web app URL is correct
- Verify "Who has access" is set to "Anyone"
- Check Google Apps Script logs (View > Logs)
- Ensure JSON format is valid
- Check TradingView alert history

### Signals Not Appearing on Dashboard
- Verify spreadsheet ID is correct in `Code.gs`
- Check sheet name is "Signals"
- Ensure sheet has been created
- Check browser console for errors

### OTP Not Working
- Default OTP is `123456`
- Check browser console for errors
- Try clearing browser cache
- Ensure JavaScript is enabled

### Styling Issues
- Clear browser cache
- Check browser supports CSS backdrop-filter
- Try different browser (Chrome recommended)
- Verify all CSS is included

## Security Best Practices

1. **Change Default OTP**: Don't use `123456` in production
2. **Add API Key**: Implement API key validation for webhooks
3. **Use HTTPS**: Always use secure connections
4. **Limit Access**: Restrict who can access the spreadsheet
5. **Rate Limiting**: Add rate limiting to webhook endpoint
6. **Input Validation**: Validate all incoming webhook data

## Advanced Features (Optional)

### Add Email Notifications
Add to `Code.gs`:
```javascript
function sendEmailNotification(signal) {
  MailApp.sendEmail({
    to: 'your@email.com',
    subject: `New ${signal.action} Signal: ${signal.symbol}`,
    body: `Signal received at ${signal.timestamp}\n\nDetails:\n${JSON.stringify(signal, null, 2)}`
  });
}
```

### Add Telegram Notifications
```javascript
function sendTelegramNotification(signal) {
  var token = 'YOUR_BOT_TOKEN';
  var chatId = 'YOUR_CHAT_ID';
  var message = `🔔 New ${signal.action} Signal\n\n📊 ${signal.symbol}\n💰 Price: ${signal.price}`;
  
  UrlFetchApp.fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'post',
    payload: {
      chat_id: chatId,
      text: message
    }
  });
}
```

## Support

For issues, questions, or contributions:
- GitHub Issues: [Create an issue](https://github.com/Amit3ee/Trading-Signals-Webapp---a3ree/issues)
- Email: Check repository for contact info

## License

MIT License - Free to use and modify
