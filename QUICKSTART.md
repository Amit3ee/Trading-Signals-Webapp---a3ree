# Quick Start Guide - Automated Trading Signals

Get up and running in 10 minutes! ⚡

## Prerequisites
- Google Account
- TradingView account (for webhooks)

## 5-Step Setup

### Step 1: Create Apps Script Project (2 minutes)
1. Go to [script.google.com](https://script.google.com)
2. Click "New project"
3. Name it "Trading Signals"

### Step 2: Copy Files (3 minutes)
Copy each file from this repository to Apps Script:

| File | Type | How to Add |
|------|------|------------|
| `Code.gs` | Script | Default file - replace content |
| `Index.html` | HTML | + button → HTML → name "Index" |
| `Styles.html` | HTML | + button → HTML → name "Styles" |
| `Script.html` | HTML | + button → HTML → name "Script" |

### Step 3: Configure Email (1 minute)
In `Code.gs`, line 9:
```javascript
const ADMIN_EMAIL = 'amit3ree@gmail.com';
```
Change to your email address.

### Step 4: Deploy (2 minutes)
1. Click "Deploy" → "New deployment"
2. Choose "Web app"
3. Settings:
   - Execute as: **Me**
   - Access: **Anyone**
4. Click "Deploy"
5. **Copy the Web App URL** (save it!)

### Step 5: Test (2 minutes)
1. Open the Web App URL in browser
2. Click "Generate OTP"
3. Check email and enter OTP
4. You're in! 🎉

## Configure TradingView (Optional)

### Basic Webhook Setup
In TradingView alert:
```
Webhook URL: YOUR_WEB_APP_URL?indicator=1

Message:
{
  "scrip": "{{ticker}}",
  "timestamp": "{{time}}",
  "reason": "Signal Name"
}
```

Replace `YOUR_WEB_APP_URL` with your actual URL.

## Test with Sample Data

Use curl or Postman to send test data:

```bash
curl -X POST 'YOUR_URL?indicator=1' \
  -H 'Content-Type: application/json' \
  -d '{
    "scrip": "RELIANCE",
    "timestamp": "1698066600000",
    "reason": "Test Signal"
  }'
```

Check Live Feed - signal should appear!

## Common Issues

### Issue: Authorization Required
**Fix**: Run any function in script editor, authorize when prompted.

### Issue: OTP Not Received
**Fix**: Check spam folder, verify email in `Code.gs`.

### Issue: Webhook Not Working
**Fix**: Ensure web app deployed with "Anyone" access.

## Next Steps

1. ✅ Read [README.md](README.md) for features overview
2. ✅ Read [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed setup
3. ✅ Read [TRADINGVIEW_EXAMPLES.md](TRADINGVIEW_EXAMPLES.md) for webhook examples
4. ✅ Configure your TradingView indicators
5. ✅ Customize theme and settings
6. ✅ Start trading! 📈

## Tips

- **Theme**: Toggle dark/light mode with moon icon
- **Mute**: Click speaker icon to disable voice
- **Navigation**: Click logo to return to dashboard
- **Sorting**: Use time/status buttons in each view
- **Details**: Click any card for detailed information

## Default Credentials

- **Email**: Configure in `Code.gs`
- **OTP**: Generated and sent to email
- **Session**: Lasts until end of day

## Need Help?

- 📧 Email: amit3ree@gmail.com
- 📖 Full docs: [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
- 🧪 Testing: [TESTING_GUIDE.md](TESTING_GUIDE.md)
- ✨ Features: [FEATURES.md](FEATURES.md)

---

**That's it!** You're ready to use the Trading Signals Web App. 🚀

Happy Trading! 📊
