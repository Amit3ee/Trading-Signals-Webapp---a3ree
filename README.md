# Automated Trading Signals - Maurvi Consultants

A professional Google Apps Script web application for collecting and displaying trading signals from multiple TradingView indicators with Apple Liquid Glass design.

## Features

### 🔐 Secure Authentication
- OTP-based login system (6-digit OTP sent via email)
- OTP expires after 3 minutes with visual countdown
- Session persistence (no re-login required for the day)
- Auto-login when correct OTP is entered

### 📊 Dashboard (Homepage)
- **Nifty Data Card**: Displays Nifty indicator data (clickable for details)
- **Statistics Cards**: 
  - Total symbols appeared (Indicator 1)
  - Synced signals count
  - Latest symbol name
- **Dynamic Tickers**:
  - Latest 7 HVD synced signals with capital deployed
  - Latest 7 Pattern synced signals (Bullish/Bearish)
  - Gradient sizing (largest to smallest)
- **Synced Signals Window**: All synced signals with sync reasons and timestamps

### 📡 Live Feed Tab
- Shows all symbols from Indicator 1
- Real-time sync status (Synced/Awaiting)
- Click symbol cards for detailed sync timeline
- Sortable by time/status with ascending/descending order

### 📝 Logs Tab
Five-window layout:
1. **Significant Deployed Capital (HVD)**: Left half, shows all HVD signals
2. **Bullish Activity**: Top-right, shows bullish patterns (📈)
3. **Bearish Activity**: Top-right, shows bearish patterns (📉)
4. **Oversold**: Bottom-right, shows bullish standalone signals
5. **Overbought**: Bottom-right, shows bearish standalone signals

### 📅 Historical Tab
- View historical data by date
- Date cards in human-readable format (e.g., "3rd March 1995")
- Click date to see all signals from that day
- Full sync status and details available

### 🎨 Apple Liquid Glass Design
- Glassmorphism effects with blur and transparency
- Dynamic gradient backgrounds
- Smooth animations and transitions
- Hover effects on cards
- Touch/click feedback
- No visible scrollbars (hidden but functional)
- Apple color scheme (Light & Dark modes)
- Professional typography and spacing

### 🔊 Audio Features
- Text-to-speech for latest synced symbols
- Hindi female voice pronunciation
- Smart pronunciation (spells out acronyms ≤4 letters)
- Mute/unmute toggle

### 🌓 Theme Switching
- Dark mode (default)
- Light mode
- Smooth theme transitions
- Available on both login and main screens

### 🔄 Real-time Updates
- Auto-polling every 30 seconds
- Instant sync status updates
- Live ticker updates

## Setup Instructions

### 1. Create Google Apps Script Project

1. Go to [Google Apps Script](https://script.google.com)
2. Create a new project named "Trading Signals"
3. Copy the following files from this repository:
   - `Code.gs` → Script editor
   - `Index.html` → HTML file
   - `Styles.html` → HTML file
   - `Script.html` → HTML file

### 2. Create Google Spreadsheet

1. Create a new Google Spreadsheet named "Trading Signals Data"
2. In `Code.gs`, update the spreadsheet ID if needed
3. The script will automatically create sheets: `AlertData` and `SyncStatus`

### 3. Deploy as Web App

1. Click "Deploy" → "New deployment"
2. Choose "Web app"
3. Set:
   - Description: "Trading Signals v1.0"
   - Execute as: "Me"
   - Who has access: "Anyone"
4. Click "Deploy"
5. Copy the web app URL

### 4. Configure TradingView Webhooks

#### Indicator 1 (Primary Signal)
```json
{
  "scrip": "{{ticker}}",
  "timestamp": "{{time}}",
  "reason": "Your reason here"
}
```

Webhook URL: `YOUR_WEB_APP_URL?indicator=1`

#### Indicator 2 (Secondary Signal with Patterns)
For HVD alerts:
```json
{
  "timestamp": "{{time}}",
  "ticker": "{{ticker}}",
  "reason": "HVD",
  "capital_deployed_cr": "VALUE"
}
```

For pattern alerts:
```json
{
  "timestamp": "{{time}}",
  "ticker": "{{ticker}}",
  "reason": "PATTERN_NAME"
}
```

For standalone alerts:
```json
{
  "timestamp": "{{time}}",
  "ticker": "{{ticker}}",
  "reason": "standalone_PATTERN_NAME"
}
```

Webhook URL: `YOUR_WEB_APP_URL?indicator=2`

#### Indicator 3 (Nifty Only)
```json
{
  "timestamp": "{{time}}",
  "ticker": "{{ticker}}",
  "reason": "REASON"
}
```

Webhook URL: `YOUR_WEB_APP_URL?indicator=3`

### 5. Configure Email

In `Code.gs`, update the email address:
```javascript
const ADMIN_EMAIL = 'your-email@gmail.com';
```

## Usage

### Login
1. Open the web app URL
2. Click "Generate OTP"
3. Check your email for the 6-digit OTP
4. Enter the OTP (auto-submits when complete)
5. Access granted for the rest of the day

### Navigation
- **Logo Button**: Returns to Dashboard
- **View Toggle**: Switch between Dashboard, Live Feed, Logs, Historical
- **Mute Toggle**: Control audio narration
- **Theme Toggle**: Switch between dark/light mode

### Sorting
- Click "Time" or "Status" button to change sort type
- Click arrow button to toggle ascending/descending order

### Card Interactions
- Click any signal card to see detailed information
- Modal popup shows timestamps and sync details
- Click backdrop or X button to close modal

## Technical Details

### Data Structure

**AlertData Sheet**:
| Timestamp | Symbol | Reason | Capital Deployed (Cr) | Indicator | Received At |
|-----------|--------|--------|----------------------|-----------|-------------|

**SyncStatus Sheet**:
| Symbol | Synced | Updated At |
|--------|--------|------------|

### Sync Logic
- A symbol is marked "Synced" when it appears in both Indicator 1 and Indicator 2
- Timing doesn't matter (can be before or after)
- Sync status updates in real-time

### Browser Compatibility
- Chrome (recommended)
- Safari
- Firefox
- Edge
- Mobile browsers supported

## Design Philosophy

Based on Apple's Human Interface Guidelines:
- Materials and glassmorphism
- Hierarchy and spacing
- Typography and readability
- Color and contrast
- Motion and animation
- Feedback and interaction

## Logo Design

The Maurvi Consultants logo represents growth and momentum:
- "M" shape with ascending peaks
- Right peak higher than left (upward trend)
- Gradient colors for modern look

## Support

For issues or questions, contact: amit3ree@gmail.com

## License

Proprietary - Maurvi Consultants © 2024