# Testing Guide - Automated Trading Signals

This guide provides instructions for testing the Trading Signals Web App.

## Pre-Deployment Testing

Before deploying to Google Apps Script, you can review the code structure and design.

### Code Review Checklist

#### Backend (Code.gs)
- ✅ Webhook endpoints (doGet, doPost)
- ✅ OTP generation and email sending
- ✅ OTP verification with expiry
- ✅ Session management
- ✅ Data storage functions
- ✅ Sync logic implementation
- ✅ Dashboard statistics calculation

#### Frontend (HTML Files)
- ✅ **Index.html**: Main structure with all views
- ✅ **Styles.html**: Apple Liquid Glass CSS
- ✅ **Script.html**: All JavaScript functionality

### Design Review

#### Apple Liquid Glass Elements
- ✅ Glassmorphism effects (backdrop-filter, blur, transparency)
- ✅ Dynamic gradient backgrounds
- ✅ Smooth animations and transitions
- ✅ Hover effects on interactive elements
- ✅ Hidden scrollbars (functional but invisible)
- ✅ Apple color scheme (light and dark modes)
- ✅ Professional typography (SF Pro, system fonts)

#### Logo Design
- ✅ "M" shape with ascending peaks
- ✅ Right peak higher than left
- ✅ Gradient colors
- ✅ SVG format for scalability

## Post-Deployment Testing

After deploying to Google Apps Script, perform these tests:

### 1. Authentication Testing

#### Test OTP Generation
1. Open web app URL
2. Click "Generate OTP"
3. **Expected**: 
   - Button shows loading spinner
   - Email received within 1 minute
   - OTP format: XXX-XXX (6 digits)
   - Progress bar appears
   - Timer starts counting down from 3:00

#### Test OTP Entry
1. Enter valid OTP
2. **Expected**:
   - Auto-submits after 6th digit
   - Login screen fades out
   - Dashboard appears with animation
   - No errors in console

3. Test invalid OTP
4. **Expected**:
   - Error notification appears
   - OTP inputs clear
   - Can try again

#### Test OTP Expiry
1. Generate OTP
2. Wait 3 minutes
3. Try to enter OTP
4. **Expected**:
   - Error: "OTP expired"
   - Progress bar disappears
   - Must generate new OTP

#### Test Session Persistence
1. Login successfully
2. Refresh page
3. **Expected**:
   - No login required
   - Dashboard loads immediately

4. Clear localStorage
5. Refresh page
6. **Expected**:
   - Login screen appears
   - Must enter OTP again

### 2. Theme Testing

#### Dark Mode (Default)
1. Check color scheme
2. **Expected**:
   - Dark background
   - Light text
   - Proper contrast
   - Glass effects visible

#### Light Mode
1. Click theme toggle button
2. **Expected**:
   - Smooth transition
   - Light background
   - Dark text
   - Glass effects still visible
   - Theme persists on refresh

#### Theme Toggle on Login
1. Logout or clear session
2. Toggle theme on login screen
3. **Expected**:
   - Theme changes immediately
   - Smooth animation
   - Icon rotates/animates

### 3. Dashboard Testing

#### Stat Cards
1. Check all 4 stat cards
2. **Expected**:
   - Nifty Data (clickable)
   - Symbols Appeared (number)
   - Synced Signals (number)
   - Latest Symbol (symbol name)

#### Nifty Card Click
1. Click Nifty Data card
2. **Expected**:
   - Modal opens
   - Background blurs
   - Shows Nifty data with timestamps
   - Close button works
   - Backdrop click closes modal

#### Tickers
1. Check HVD ticker
2. **Expected**:
   - Shows latest 7 HVD signals
   - Capital deployed in Cr shown
   - Scrolling animation
   - Gradient sizing (largest to smallest)
   - Pause on hover

3. Check Pattern ticker
4. **Expected**:
   - Shows latest 7 pattern signals
   - Pattern names displayed
   - Bullish (📈) and Bearish (📉) distinguished
   - Scrolling animation

#### Synced Signals Window
1. Check synced signals grid
2. **Expected**:
   - Shows all synced symbols
   - Cards display symbol, status, reasons
   - Click opens modal with details
   - Modal shows sync timeline

### 4. Live Feed Testing

#### View Display
1. Switch to Live Feed
2. **Expected**:
   - Shows all Indicator 1 signals
   - Each card shows: symbol, time, reason, status
   - Status: "Synced" or "Awaiting"

#### Sorting
1. Click "Time" sort button
2. **Expected**: Active state shows

3. Click sort arrow
4. **Expected**: 
   - Arrow rotates
   - Order reverses (asc/desc)

5. Click "Status" sort button
6. **Expected**:
   - Sorts by synced/awaiting
   - Arrow toggles order

#### Card Interaction
1. Click any signal card
2. **Expected**:
   - Modal opens
   - Background blurs
   - Shows detailed sync information
   - Lists Indicator 1 timestamps
   - Lists Indicator 2 timestamps (if synced)

### 5. Logs Tab Testing

#### Window Layout
1. Switch to Logs tab
2. **Expected**:
   - Left half: HVD (Significant Deployed Capital)
   - Right half: 4 quadrants
     - Top-left: Bullish Activity 📈
     - Top-right: Bearish Activity 📉
     - Bottom-left: Oversold 💹
     - Bottom-right: Overbought 📊

#### Data Distribution
1. Check each window
2. **Expected**:
   - HVD shows only HVD alerts with capital_deployed_cr
   - Bullish shows bullish patterns
   - Bearish shows bearish patterns
   - Oversold shows standalone bullish
   - Overbought shows standalone bearish

#### Card Clicks
1. Click any card in any window
2. **Expected**:
   - Modal opens with details
   - Shows sync status
   - Lists all related alerts

### 6. Historical Tab Testing

#### Date Display
1. Switch to Historical tab
2. **Expected**:
   - Shows unique dates
   - Format: "3rd March 1995" style
   - Most recent dates first
   - Cards have glass effect

#### Date Selection
1. Click any date card
2. **Expected**:
   - Signals grid appears below
   - Shows all Indicator 1 signals from that date
   - Each signal shows sync status
   - Can click for details

#### Historical Modal
1. Click any historical signal card
2. **Expected**:
   - Modal shows all sync details
   - Includes timestamps from both indicators
   - Shows reasons for sync

### 7. Webhook Testing

#### Test Indicator 1
```bash
curl -X POST \
  'YOUR_WEB_APP_URL?indicator=1' \
  -H 'Content-Type: application/json' \
  -d '{
    "scrip": "TESTSTOCK",
    "timestamp": "1698066600000",
    "reason": "Test Signal"
  }'
```

**Expected**:
- Response: `{"status":"success","message":"Alert received"}`
- Data appears in Live Feed
- Status: "Awaiting"

#### Test Indicator 2
```bash
curl -X POST \
  'YOUR_WEB_APP_URL?indicator=2' \
  -H 'Content-Type: application/json' \
  -d '{
    "timestamp": "1698066900000",
    "ticker": "TESTSTOCK",
    "reason": "Test Pattern"
  }'
```

**Expected**:
- Response: success
- Previous "TESTSTOCK" status changes to "Synced"
- Appears in synced signals

#### Test HVD
```bash
curl -X POST \
  'YOUR_WEB_APP_URL?indicator=2' \
  -H 'Content-Type: application/json' \
  -d '{
    "timestamp": "1698067200000",
    "ticker": "HDFC",
    "reason": "HVD",
    "capital_deployed_cr": "150.5"
  }'
```

**Expected**:
- Appears in HVD window in Logs
- Shows capital value "150.5 Cr"
- If HDFC exists in Indicator 1, status becomes "Synced"

#### Test Standalone
```bash
curl -X POST \
  'YOUR_WEB_APP_URL?indicator=2' \
  -H 'Content-Type: application/json' \
  -d '{
    "timestamp": "1698067500000",
    "ticker": "RELIANCE",
    "reason": "standalone_RSI Oversold"
  }'
```

**Expected**:
- Appears in "Oversold" window
- Marked as bullish standalone
- Syncs with Indicator 1 if exists

#### Test Nifty (Indicator 3)
```bash
curl -X POST \
  'YOUR_WEB_APP_URL?indicator=3' \
  -H 'Content-Type: application/json' \
  -d '{
    "timestamp": "1698067800000",
    "ticker": "NIFTY",
    "reason": "Trend Change"
  }'
```

**Expected**:
- Updates Nifty card on Dashboard
- Click Nifty card shows this data

### 8. Audio Testing

#### Voice Narration
1. Ensure unmuted (speaker icon)
2. Trigger new synced signal
3. **Expected**:
   - Hindi female voice speaks symbol name
   - Acronyms (≤4 letters) spelled out
   - Second word spoken normally
   - Example: "HDFC Bank" → "H, D, F, C Bank"

#### Mute Toggle
1. Click mute button
2. **Expected**:
   - Icon changes to muted
   - No narration for new signals

3. Click again to unmute
4. **Expected**:
   - Icon changes back
   - Narration resumes

### 9. Responsive Design Testing

#### Desktop (1920x1080)
- ✅ All elements properly spaced
- ✅ Cards grid nicely
- ✅ Logs 5-window layout works

#### Tablet (768px)
- ✅ Cards stack properly
- ✅ Logs windows stack vertically
- ✅ Navigation remains accessible

#### Mobile (375px)
- ✅ Single column layout
- ✅ Touch-friendly buttons
- ✅ Modal fits screen

### 10. Performance Testing

#### Load Time
1. Measure initial page load
2. **Expected**: < 2 seconds

#### Data Refresh
1. Check auto-refresh (30 seconds)
2. **Expected**: 
   - Smooth update
   - No flicker
   - Minimal API calls

#### Animation Performance
1. Check card hover effects
2. Check modal transitions
3. Check ticker scrolling
4. **Expected**: 60fps, smooth

### 11. Browser Compatibility

Test on:
- ✅ Chrome (latest)
- ✅ Safari (latest)
- ✅ Firefox (latest)
- ✅ Edge (latest)
- ✅ Mobile Safari (iOS)
- ✅ Chrome Mobile (Android)

### 12. Error Handling

#### Network Error
1. Disconnect internet
2. Try to generate OTP
3. **Expected**: Error notification

#### Invalid Data
1. Send malformed webhook
2. **Expected**: 
   - Script handles gracefully
   - Error logged
   - User not affected

#### Session Timeout
1. Manually clear session
2. Try to use app
3. **Expected**: Redirect to login

## Bug Reporting Template

If you find issues, report using this format:

```
### Bug Description
[Clear description]

### Steps to Reproduce
1. Step one
2. Step two
3. Step three

### Expected Behavior
[What should happen]

### Actual Behavior
[What actually happens]

### Environment
- Browser: [e.g., Chrome 120]
- OS: [e.g., Windows 11]
- Device: [e.g., Desktop]

### Screenshots
[If applicable]

### Console Errors
[If any]
```

## Performance Benchmarks

### Expected Performance
- Initial load: < 2 seconds
- OTP generation: < 5 seconds
- Data refresh: < 1 second
- Animation frame rate: 60fps
- Modal open/close: < 300ms

### Data Limits
- Test with 100+ signals
- Test with 10+ synced symbols
- Check memory usage
- Monitor spreadsheet size

## Automated Testing Checklist

While manual testing is primary, consider:

1. **Webhook endpoint testing**: Use curl or Postman
2. **Load testing**: Multiple concurrent webhooks
3. **Data integrity**: Verify sync logic with various scenarios
4. **Session testing**: Multiple browser tabs/windows

## Known Limitations

1. **Google Apps Script Quotas**:
   - Daily email limit
   - Execution time limits
   - Concurrent executions

2. **Browser Compatibility**:
   - Voice synthesis varies by browser
   - Some animations may differ

3. **Mobile Considerations**:
   - Touch interactions tested
   - Voice may require user gesture

## Final Checklist Before Production

- [ ] All core features tested
- [ ] Authentication works perfectly
- [ ] Data syncing is accurate
- [ ] UI/UX is smooth and professional
- [ ] No console errors
- [ ] All browsers tested
- [ ] Mobile responsive
- [ ] Performance acceptable
- [ ] Error handling works
- [ ] Documentation reviewed
- [ ] Webhook URLs configured
- [ ] Email address updated
- [ ] Production spreadsheet created

## Support

For testing assistance:
- Email: amit3ree@gmail.com
- Check Apps Script logs for backend errors
- Use browser DevTools for frontend debugging

---

Happy Testing! 🚀
