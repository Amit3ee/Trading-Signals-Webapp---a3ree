# Deployment Checklist

Use this checklist to ensure your Trading Signals Web App is properly deployed and configured.

## Pre-Deployment

- [ ] Review all code files
- [ ] Test locally by opening `index.html`
- [ ] Verify OTP login works (default: 123456)
- [ ] Check dashboard displays demo signals
- [ ] Test responsive design on different screen sizes
- [ ] Customize OTP code if needed (change in `script.js`)
- [ ] Customize colors/theme if needed (change in `styles.css`)

## Google Sheets Setup

- [ ] Create new Google Sheet named "Trading Signals"
- [ ] Copy the Spreadsheet ID from URL
- [ ] Sheet will auto-create when first webhook is received
- [ ] Verify you have edit permissions on the sheet

## Google Apps Script Setup

- [ ] Create new Apps Script project
- [ ] Copy `Code.gs` content to Apps Script
- [ ] Update `SPREADSHEET_ID` with your sheet ID
- [ ] Add `index.html` as HTML file
- [ ] Add `dashboard.html` as HTML file
- [ ] Include `styles.css` content in HTML files (in `<style>` tags)
- [ ] Include `script.js` content in HTML files (in `<script>` tags)
- [ ] Save all files

## Apps Script Deployment

- [ ] Click "Deploy" > "New deployment"
- [ ] Select type: "Web app"
- [ ] Set "Execute as": Me (your account)
- [ ] Set "Who has access": Anyone
- [ ] Click "Deploy"
- [ ] Authorize the app (grant required permissions)
- [ ] Copy the web app URL
- [ ] Test the URL in browser (should show login page)

## Testing Webhook

### Test Method 1: Apps Script Function
- [ ] Run `testWebhook()` function in Apps Script
- [ ] Check "Signals" sheet for test data
- [ ] Verify timestamp is correct
- [ ] Check all fields are populated

### Test Method 2: cURL Command
- [ ] Open terminal/command prompt
- [ ] Run cURL command with webhook URL (see `webhook-examples.json`)
- [ ] Check response is successful
- [ ] Verify data appears in sheet
- [ ] Check dashboard shows new signal

### Test Method 3: Postman/API Client
- [ ] Create POST request to webhook URL
- [ ] Set header: `Content-Type: application/json`
- [ ] Use example payload from `webhook-examples.json`
- [ ] Send request
- [ ] Verify 200 OK response
- [ ] Check data in spreadsheet

## TradingView Integration

- [ ] Open TradingView chart
- [ ] Add your strategy/indicator
- [ ] Create new alert
- [ ] Set alert conditions
- [ ] Enable "Webhook URL" in notifications
- [ ] Paste your Google Apps Script web app URL
- [ ] Configure alert message with JSON format
- [ ] Test with example from `webhook-examples.json`
- [ ] Verify alert triggers correctly
- [ ] Check signal appears in dashboard

## Security & Production

- [ ] Change default OTP from "123456" to secure code
- [ ] Consider adding API key validation to webhook
- [ ] Limit spreadsheet access to authorized users only
- [ ] Enable 2-factor authentication on Google account
- [ ] Document your OTP code securely
- [ ] Set up backup of spreadsheet data
- [ ] Consider adding rate limiting to webhook

## Optional Enhancements

- [ ] Add email notifications (see `SETUP_GUIDE.md`)
- [ ] Add Telegram notifications
- [ ] Implement multiple user support
- [ ] Add signal history charts
- [ ] Create export functionality
- [ ] Add signal performance tracking
- [ ] Implement dark/light theme toggle

## Monitoring & Maintenance

- [ ] Check Google Apps Script logs regularly
- [ ] Monitor spreadsheet size (clean old data periodically)
- [ ] Test webhook after any code changes
- [ ] Keep backup of your code
- [ ] Document any customizations
- [ ] Test on different browsers occasionally
- [ ] Update documentation as needed

## Troubleshooting Checklist

If something doesn't work:

- [ ] Check all URLs are correct
- [ ] Verify web app is deployed as "Anyone" can access
- [ ] Check Google Apps Script logs for errors
- [ ] Verify JSON format is valid
- [ ] Test with simple payload first
- [ ] Check browser console for JavaScript errors
- [ ] Verify spreadsheet ID is correct
- [ ] Ensure sheet permissions are set
- [ ] Try different browser
- [ ] Clear browser cache
- [ ] Check TradingView alert history

## Success Criteria

Your deployment is successful when:

- [ ] Login page loads with glassmorphism theme
- [ ] OTP authentication works
- [ ] Dashboard displays correctly
- [ ] Demo signals are visible
- [ ] Test webhook creates entry in spreadsheet
- [ ] Dashboard shows webhook data
- [ ] TradingView alerts trigger correctly
- [ ] Mobile responsive design works
- [ ] All statistics update properly
- [ ] Refresh button works
- [ ] No console errors
- [ ] Performance is acceptable

## Post-Deployment

- [ ] Share web app URL with team (if applicable)
- [ ] Document OTP code securely
- [ ] Set up monitoring/alerts
- [ ] Create user guide if needed
- [ ] Plan for updates and maintenance
- [ ] Consider feedback mechanism

---

**Need Help?**
- See `SETUP_GUIDE.md` for detailed instructions
- See `webhook-examples.json` for payload examples
- Check GitHub issues for common problems
- Review Apps Script logs for errors

**Deployment Date:** ___________

**Deployed By:** ___________

**Web App URL:** ___________

**Notes:** ___________
