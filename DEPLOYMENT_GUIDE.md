# Deployment Guide - Automated Trading Signals

This guide will walk you through deploying the Trading Signals Web App to Google Apps Script.

## Prerequisites

- Google Account
- Access to Google Apps Script
- TradingView account with webhook capability
- Basic understanding of JSON and webhooks

## Step-by-Step Deployment

### Step 1: Create Google Apps Script Project

1. **Open Google Apps Script**
   - Go to https://script.google.com
   - Sign in with your Google account

2. **Create New Project**
   - Click "+ New project"
   - Name it "Trading Signals" (click "Untitled project" at top left)

### Step 2: Add Project Files

1. **Add Code.gs**
   - The default `Code.gs` file should already be open
   - Delete any existing content
   - Copy the entire content from `Code.gs` in this repository
   - Paste it into the editor
   - Save (Ctrl+S or Cmd+S)

2. **Add HTML Files**
   - Click the "+" next to "Files"
   - Select "HTML"
   - Name it "Index"
   - Paste content from `Index.html`
   - Save

   Repeat for:
   - `Styles.html`
   - `Script.html`

### Step 3: Configure Project Settings

1. **Update Email Address**
   - In `Code.gs`, find line:
   ```javascript
   const ADMIN_EMAIL = 'amit3ree@gmail.com';
   ```
   - Replace with your email address

2. **Set Project Properties**
   - Click on "Project Settings" (gear icon in left sidebar)
   - Check "Show 'appsscript.json' manifest file in editor"
   - Go back to "Editor"
   - Open `appsscript.json` from files list
   - Replace content with content from `appsscript.json` in repository

### Step 4: Create Google Spreadsheet

The script will automatically create the spreadsheet on first run, but you can create it manually:

1. Go to https://sheets.google.com
2. Create a new spreadsheet named "Trading Signals Data"
3. The script will create necessary sheets automatically

### Step 5: Test the Script

1. **Test doGet Function**
   - In the editor, select `doGet` from the function dropdown
   - Click "Run" (play button)
   - Authorize the script when prompted:
     - Click "Review Permissions"
     - Choose your account
     - Click "Advanced"
     - Click "Go to Trading Signals (unsafe)"
     - Click "Allow"

2. **Verify Execution**
   - Check "Execution log" tab for any errors
   - Should complete successfully

### Step 6: Deploy as Web App

1. **Create Deployment**
   - Click "Deploy" → "New deployment"
   - Click "Select type" → "Web app"

2. **Configure Deployment**
   - Description: `Trading Signals v1.0`
   - Execute as: `Me (your-email@gmail.com)`
   - Who has access: `Anyone`

3. **Deploy**
   - Click "Deploy"
   - Copy the "Web app URL" (you'll need this)
   - Format: `https://script.google.com/macros/s/SCRIPT_ID/exec`

4. **Important**: Save this URL securely!

### Step 7: Test Web App

1. **Open in Browser**
   - Paste the web app URL in a new browser tab
   - You should see the login screen with Maurvi Consultants logo

2. **Test Login**
   - Click "Generate OTP"
   - Check your email for the OTP
   - Enter the OTP
   - You should be logged in and see the dashboard

### Step 8: Configure TradingView Webhooks

#### For Indicator 1 (Primary Signal)

1. **In TradingView**
   - Open your indicator
   - Edit the alert
   - In "Alert actions", check "Webhook URL"

2. **Webhook URL**
   ```
   YOUR_WEB_APP_URL?indicator=1
   ```
   (Replace YOUR_WEB_APP_URL with the URL from Step 6)

3. **Message Format**
   ```json
   {
     "scrip": "{{ticker}}",
     "timestamp": "{{time}}",
     "reason": "YOUR_REASON_HERE"
   }
   ```

#### For Indicator 2 (Patterns & HVD)

**HVD Alert:**
```
URL: YOUR_WEB_APP_URL?indicator=2

Message:
{
  "timestamp": "{{time}}",
  "ticker": "{{ticker}}",
  "reason": "HVD",
  "capital_deployed_cr": "10.5"
}
```

**Pattern Alert (Bullish/Bearish):**
```
URL: YOUR_WEB_APP_URL?indicator=2

Message:
{
  "timestamp": "{{time}}",
  "ticker": "{{ticker}}",
  "reason": "Engulfing Pattern"
}
```

**Standalone Alert (Oversold/Overbought):**
```
URL: YOUR_WEB_APP_URL?indicator=2

Message:
{
  "timestamp": "{{time}}",
  "ticker": "{{ticker}}",
  "reason": "standalone_RSI_Oversold"
}
```

#### For Indicator 3 (Nifty Only)

```
URL: YOUR_WEB_APP_URL?indicator=3

Message:
{
  "timestamp": "{{time}}",
  "ticker": "{{ticker}}",
  "reason": "Nifty_Pattern_Name"
}
```

### Step 9: Test Webhook Integration

1. **Manual Webhook Test**
   - Use a tool like Postman or curl
   - Send POST request to: `YOUR_WEB_APP_URL?indicator=1`
   - Body:
   ```json
   {
     "scrip": "RELIANCE",
     "timestamp": "1234567890000",
     "reason": "Test Signal"
   }
   ```

2. **Verify Data**
   - Open your Google Spreadsheet "Trading Signals Data"
   - Check "AlertData" sheet
   - You should see the test data

3. **Check Web App**
   - Refresh the web app
   - The signal should appear in Live Feed

### Step 10: Monitor and Maintain

1. **View Logs**
   - In Apps Script editor: View → Logs
   - Or: View → Executions

2. **Update Deployment**
   - Make changes to code
   - Deploy → Manage deployments
   - Click edit (pencil icon)
   - Change version to "New version"
   - Click "Deploy"

3. **Backup**
   - Regularly export your spreadsheet data
   - Keep a copy of your script code

## Troubleshooting

### Issue: Script Authorization Error
**Solution**: 
- Go to script editor
- Run any function manually
- Complete authorization process

### Issue: OTP Not Received
**Solution**:
- Check spam folder
- Verify email address in `Code.gs`
- Check Apps Script execution logs for errors

### Issue: Webhook Not Working
**Solution**:
- Verify webhook URL is correct
- Check JSON format is valid
- View Apps Script executions for POST errors
- Ensure web app is deployed with "Anyone" access

### Issue: Data Not Syncing
**Solution**:
- Check both indicators are sending data
- Verify symbol names match exactly
- Check `SyncStatus` sheet in spreadsheet

### Issue: Session Expired
**Solution**:
- Sessions last until end of day
- Generate new OTP next day
- Clear browser cache if issues persist

## Security Notes

1. **Email OTPs**: OTPs are sent via email and expire in 3 minutes
2. **Session Storage**: Session tokens stored in browser localStorage
3. **Script Permissions**: Script has access to:
   - Send emails
   - Read/write spreadsheets
   - Receive webhook data

4. **Data Privacy**: All data stored in your Google Spreadsheet
5. **Access Control**: Only you can modify the script and data

## Performance Optimization

1. **Data Cleanup**: Periodically archive old data to new sheets
2. **Spreadsheet Limits**: Google Sheets has 5 million cell limit
3. **Execution Limits**: Apps Script has daily quotas
4. **Polling Interval**: Default 30 seconds, adjust in `Script.html` if needed

## Advanced Configuration

### Custom Polling Interval
In `Script.html`, find:
```javascript
setInterval(() => {
  loadData();
}, 30000); // 30 seconds
```
Change `30000` to desired milliseconds

### Custom Theme Colors
In `Styles.html`, modify CSS variables under `:root`

### Add More Indicators
1. Update `Code.gs` to handle new indicator numbers
2. Add webhook URL: `YOUR_WEB_APP_URL?indicator=4`
3. Update frontend logic in `Script.html` as needed

## Support

For issues or questions:
- Email: amit3ree@gmail.com
- Check Apps Script logs for errors
- Review TradingView webhook logs

## Updates and Versions

To update the web app:
1. Make changes in script editor
2. Save all files
3. Deploy → Manage deployments
4. Edit deployment → New version → Deploy
5. Users will automatically get the update

---

**Congratulations!** Your Trading Signals Web App is now deployed and ready to use.
