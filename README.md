# Trading Signals Webapp 📊

A beautiful trading signals web application with Apple Glass (Glassmorphism) theme and OTP login system. Receives webhook data from TradingView and displays organized trading signals.

## ✨ Features

- 🎨 **Apple Glass Theme**: Beautiful glassmorphism UI design with blur effects
- 🔐 **OTP Login System**: Secure 6-digit OTP authentication
- 📡 **TradingView Webhook**: Receives real-time signals from TradingView
- 📊 **Dashboard**: View all trading signals with statistics
- 📱 **Responsive Design**: Works seamlessly on all devices
- ⚡ **Real-time Updates**: Auto-refresh every 30 seconds

## 🚀 Demo

### Login Page
- Enter 6-digit OTP: `123456` (demo)
- Beautiful animated input fields
- Error handling and validation

### Dashboard
- Total signals counter
- Buy/Sell signal statistics
- Last update timestamp
- Detailed signal cards with:
  - Symbol (e.g., BTCUSDT)
  - Action (BUY/SELL)
  - Price
  - Timeframe
  - Strategy
  - Stop Loss / Take Profit

## 📁 Project Structure

```
Trading-Signals-Webapp---a3ree/
├── index.html          # Login page with OTP
├── dashboard.html      # Main dashboard
├── styles.css          # Glassmorphism theme styles
├── script.js           # Client-side JavaScript
├── Code.gs             # Google Apps Script (webhook handler)
└── README.md           # Documentation
```

## 🛠️ Setup Instructions

### Option 1: Standalone Web App (Local Testing)

1. **Clone the repository**
   ```bash
   git clone https://github.com/Amit3ee/Trading-Signals-Webapp---a3ree.git
   cd Trading-Signals-Webapp---a3ree
   ```

2. **Open in browser**
   - Open `index.html` in your web browser
   - Use OTP: `123456` to login
   - View demo signals on the dashboard

### Option 2: Google Apps Script Deployment (Production)

1. **Create Google Sheet**
   - Go to [Google Sheets](https://sheets.google.com)
   - Create a new spreadsheet named "Trading Signals"
   - Copy the spreadsheet ID from the URL

2. **Deploy Apps Script**
   - Open Google Apps Script: [script.google.com](https://script.google.com)
   - Create a new project
   - Copy content from `Code.gs` into the script editor
   - Update `SPREADSHEET_ID` with your sheet ID
   - Save the project

3. **Add HTML Files**
   - In Apps Script, go to Files > + > HTML
   - Create `index.html` and paste the content
   - Create `dashboard.html` and paste the content
   - Create `styles.css` as HTML file and paste content
   - Create `script.js` as HTML file and paste content
   - Include CSS and JS in HTML files using script tags

4. **Deploy as Web App**
   - Click "Deploy" > "New deployment"
   - Select "Web app"
   - Set "Execute as": Your account
   - Set "Who has access": Anyone
   - Click "Deploy"
   - Copy the web app URL

5. **Configure TradingView Webhook**
   - In TradingView, create an alert
   - Set webhook URL to your Apps Script web app URL
   - Use JSON format:
   ```json
   {
     "symbol": "{{ticker}}",
     "action": "{{strategy.order.action}}",
     "price": "{{close}}",
     "timeframe": "{{interval}}",
     "strategy": "Your Strategy Name",
     "stopLoss": "{{plot_0}}",
     "takeProfit": "{{plot_1}}"
   }
   ```

## 🎨 Customization

### Change OTP Code
Edit `script.js`:
```javascript
const DEMO_OTP = '123456'; // Change to your OTP
```

### Modify Theme Colors
Edit `styles.css`:
```css
:root {
    --primary-color: #007AFF;      /* Main color */
    --secondary-color: #5856D6;    /* Secondary color */
    --success-color: #34C759;      /* Buy signals */
    --danger-color: #FF3B30;       /* Sell signals */
}
```

### Update Background Gradient
Edit `styles.css` body styles:
```css
body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

## 📡 Webhook Format

TradingView webhook should send POST request with JSON:

```json
{
  "symbol": "BTCUSDT",
  "action": "BUY",
  "price": "43500.00",
  "timeframe": "1H",
  "strategy": "EMA Crossover",
  "stopLoss": "42800",
  "takeProfit": "44500",
  "volume": "1.5",
  "notes": "Optional notes"
}
```

## 🔒 Security Notes

- Default OTP (`123456`) is for demo only - change in production
- Use HTTPS for webhook endpoints
- Implement proper authentication for production
- Consider adding API key validation for webhooks
- Session expires after 24 hours

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Troubleshooting

**Signals not appearing?**
- Check localStorage is enabled
- Verify webhook is sending correct JSON format
- Check Google Apps Script logs

**OTP not working?**
- Clear browser cache
- Check console for errors
- Verify OTP is `123456` for demo

**Styling issues?**
- Ensure all CSS files are loaded
- Check browser supports backdrop-filter
- Try clearing cache and hard refresh

## 📄 License

MIT License - feel free to use and modify

## 👨‍💻 Author

Amit3ee

## 🙏 Acknowledgments

- Apple Design Guidelines for glassmorphism inspiration
- TradingView for webhook functionality
- Google Apps Script for backend hosting