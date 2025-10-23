# Features Documentation - Automated Trading Signals

Complete feature list and technical specifications for the Trading Signals Web App.

## Overview

**Company**: Maurvi Consultants  
**App Name**: Automated Trading Signals  
**Platform**: Google Apps Script Web Application  
**Design System**: Apple Liquid Glass  

---

## 🔐 Authentication & Security

### OTP-Based Login System
- **6-digit OTP** generation (format: XXX-XXX)
- Sent via email to configured address
- **3-minute expiration** with visual countdown
- Progress bar showing remaining time
- Auto-login on correct OTP entry (no submit button needed)
- **Session persistence**: No re-login required for the rest of the day
- Session tokens stored securely in browser localStorage
- Automatic session validation on page load

### Security Features
- Email-based OTP delivery
- Time-based OTP expiry
- Session token validation
- Secure backend authentication flow
- No passwords stored

---

## 🎨 Design System - Apple Liquid Glass

### Glassmorphism Effects
- **Backdrop blur**: 20px with 180% saturation
- **Semi-transparent backgrounds**: RGBA with opacity
- **Subtle borders**: Semi-transparent white/black
- **Layered shadows**: Multiple shadow levels for depth
- **Smooth gradients**: Dynamic background animations

### Color Scheme (Apple HIG Compliant)

#### Light Mode
- Primary: #007AFF (Apple Blue)
- Secondary: #5856D6 (Purple)
- Success: #34C759 (Green)
- Warning: #FF9500 (Orange)
- Danger: #FF3B30 (Red)
- Background: #FFFFFF, #F2F2F7, #E5E5EA
- Text: #000000, #3C3C43, #8E8E93

#### Dark Mode (Default)
- Primary: #0A84FF
- Secondary: #5E5CE6
- Success: #30D158
- Warning: #FF9F0A
- Danger: #FF453A
- Background: #000000, #1C1C1E, #2C2C2E
- Text: #FFFFFF, #EBEBF5, #AEAEB2

### Typography
- **Font Family**: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto
- **Font Sizes**: 12px to 48px scale
- **Font Weights**: 400 (Regular), 500 (Medium), 600 (Semi-bold), 700 (Bold)
- **Letter Spacing**: Optimized for readability

### Animations & Transitions
- **Transition Speeds**: 150ms (fast), 250ms (base), 350ms (slow)
- **Easing**: Cubic-bezier curves for natural motion
- **Hover Effects**: Subtle scale and shadow changes
- **Click Feedback**: Scale down on press
- **Modal Animations**: Slide-in with backdrop blur
- **Page Transitions**: Fade and scale effects

### Interactive Elements
- **Glass Buttons**: Hover scale 1.02, active scale 0.98
- **Cards**: Translate up on hover, shadow increase
- **Modals**: Blur background, scale animation
- **Toggles**: Smooth state transitions
- **Logo**: Floating animation, press feedback

### Scrolling
- **Hidden Scrollbars**: Functional but invisible
- **Smooth Scrolling**: Native smooth scroll behavior
- **No Visible Tracks**: Clean, minimalist appearance

---

## 🏠 Dashboard (Homepage)

### Stat Cards (4 Cards)
1. **Nifty Data Card** 📊
   - Displays latest Nifty indicator data
   - Clickable for detailed view
   - Modal shows all Nifty timestamps and reasons
   - Press feedback animation

2. **Symbols Appeared** 📈
   - Count of total symbols from Indicator 1
   - Real-time updates
   - Non-interactive (display only)

3. **Synced Signals** ✅
   - Count of successfully synced symbols
   - Updates when symbols sync
   - Non-interactive (display only)

4. **Latest Symbol** ⭐
   - Name of most recent Indicator 1 symbol
   - Triggers voice narration
   - Non-interactive (display only)

### Dynamic Tickers (2 Tickers)

#### HVD Ticker (Significant Deployed Capital)
- Shows latest 7 synced HVD signals
- Displays: Symbol name + Capital value in Cr
- Example: "RELIANCE (150.5 Cr)"
- **Gradient sizing**: Latest (largest) to oldest (smallest)
- **Infinite scroll animation**: Seamless loop
- **Pause on hover**: For reading
- **Transparent background**: Glass effect
- Synced signals only

#### Pattern Ticker (Bullish/Bearish Activity)
- Shows latest 7 synced pattern signals
- Displays: Symbol name + Pattern name
- **Visual distinction**: 
  - 📈 Border for bullish patterns
  - 📉 Border for bearish patterns
- **Gradient sizing**: Latest (largest) to oldest (smallest)
- **Infinite scroll animation**: Seamless loop
- **Pause on hover**: For reading
- **Transparent background**: Glass effect
- Synced signals only

### Synced Signals Window
- Grid layout of all synced symbols
- **Card Content**:
  - Symbol name (large, bold)
  - Synced status badge
  - Indicator 1 reason
  - Latest Indicator 2 reason (with capital if HVD)
  - Older Indicator 2 reasons (chronological)
- **Click Interaction**: 
  - Opens modal with full sync timeline
  - Shows all timestamps for both indicators
  - Background blurs, card comes to front
- **Real-time Updates**: Auto-refresh every 30 seconds

---

## 📡 Live Feed Tab

### Features
- Displays all signals from **Indicator 1**
- Real-time status: "Synced" or "Awaiting"
- Card layout with glass effect

### Card Information
- **Symbol Name**: Large, prominent
- **Status Badge**: 
  - Green "Synced" if matched with Indicator 2
  - Orange "Awaiting" if not yet matched
- **Timestamp**: Human-readable format
- **Reason**: Pattern/signal reason from Indicator 1

### Sorting Controls
- **Sort Type Toggle**: 
  - Time (default)
  - Status
- **Sort Order Button**:
  - Ascending ⬆
  - Descending ⬇ (default)
- Active state highlighting
- Smooth re-ordering animation

### Interactions
- **Card Click**: Opens detailed modal
  - Shows all Indicator 1 entries
  - Shows all Indicator 2 entries (if synced)
  - Displays exact sync timestamps
  - Background blur effect

---

## 📝 Logs Tab

### Layout Structure
Five-window layout with glass effects:

#### Left Half (Vertical Full Height)
**Significant Deployed Capital (HVD)**
- Shows all HVD alerts from Indicator 2
- Displays capital deployed in Crores
- Format: "Symbol (XXX.XX Cr)"
- Sync status indicators
- Scrollable if needed

#### Right Half (4 Quadrants)

1. **Bullish Activity** 📈 (Top-Left)
   - All bullish pattern alerts
   - Pattern names without "bullish" prefix
   - Green accent color
   - Synced/unsynced status

2. **Bearish Activity** 📉 (Top-Right)
   - All bearish pattern alerts
   - Pattern names without "bearish" prefix
   - Red accent color
   - Synced/unsynced status

3. **Oversold** 💹 (Bottom-Left)
   - Bullish standalone signals
   - RSI oversold, etc.
   - Prefix: "standalone_"
   - Bullish characteristics

4. **Overbought** 📊 (Bottom-Right)
   - Bearish standalone signals
   - RSI overbought, etc.
   - Prefix: "standalone_"
   - Bearish characteristics

### Features
- Auto-categorization based on reason keywords
- Click any card for detailed view
- Sorting controls (same as Live Feed)
- Real-time updates
- Compact card layout for space efficiency

---

## 📅 Historical Tab

### Date Selection
- Grid of date cards
- **Date Format**: "3rd March 1995" style
- Most recent dates first
- Glass card effect
- Hover animations

### Historical Signals View
- Appears below date grid after selection
- Shows all Indicator 1 signals from selected date
- **Card Information**:
  - Symbol name
  - Timestamp
  - Reason
  - Sync status (Synced/Unsynced)
- Click for detailed sync timeline

### Features
- Date-based filtering
- Full sync history
- Modal detail views
- Sorting controls
- Persistent date selection until changed

---

## 🔊 Audio Features (Text-to-Speech)

### Voice Narration
- **Trigger**: New synced symbol appears
- **Voice**: Hindi female (if available)
- **Rate**: 0.9 (slightly slower for clarity)
- **Pitch**: 1.2 (higher, feminine)

### Pronunciation Rules
1. **Acronyms (≤4 letters)**: Spell out first word
   - Example: "HDFC Bank" → "H, D, F, C Bank"
   - Example: "TCS" → "T, C, S"

2. **Full Words**: Speak normally
   - Example: "RELIANCE" → "Reliance"
   - Second word always spoken as word

### Mute Control
- Toggle button in header
- Icon changes: 🔊 ⟷ 🔇
- State persists during session
- No narration when muted

---

## 🌓 Theme Switching

### Dark Mode (Default)
- Low-light optimized
- High contrast
- Easy on eyes
- Professional appearance

### Light Mode
- Bright, clean
- High visibility
- Good for daylight use

### Features
- **Toggle Button**: Available on login and main app
- **Smooth Transition**: 300ms animated change
- **Persistence**: Theme saved to localStorage
- **Consistent**: All views respect theme
- **Icon Animation**: Rotation on toggle

---

## 📊 Data Collection & Webhooks

### Indicator 1 (Primary Signal)
**Purpose**: Main trading signals  
**Webhook**: `YOUR_URL?indicator=1`  
**Format**:
```json
{
  "scrip": "SYMBOL_NAME",
  "timestamp": "UNIX_TIMESTAMP",
  "reason": "SIGNAL_REASON"
}
```

### Indicator 2 (Patterns & HVD)
**Purpose**: Secondary signals, patterns, volume  
**Webhook**: `YOUR_URL?indicator=2`  

**HVD Format**:
```json
{
  "timestamp": "UNIX_TIMESTAMP",
  "ticker": "SYMBOL_NAME",
  "reason": "HVD",
  "capital_deployed_cr": "150.5"
}
```

**Pattern Format**:
```json
{
  "timestamp": "UNIX_TIMESTAMP",
  "ticker": "SYMBOL_NAME",
  "reason": "PATTERN_NAME"
}
```

**Standalone Format**:
```json
{
  "timestamp": "UNIX_TIMESTAMP",
  "ticker": "SYMBOL_NAME",
  "reason": "standalone_INDICATOR_CONDITION"
}
```

### Indicator 3 (Nifty Only)
**Purpose**: Nifty index signals  
**Webhook**: `YOUR_URL?indicator=3`  
**Format**:
```json
{
  "timestamp": "UNIX_TIMESTAMP",
  "ticker": "NIFTY",
  "reason": "SIGNAL_REASON"
}
```

---

## 🔄 Sync Logic

### How Syncing Works
A symbol is marked "Synced" when:
1. It appears in Indicator 1 (any time)
2. AND it appears in Indicator 2 (any time)

**Time Order Doesn't Matter**:
- Indicator 2 can come before Indicator 1
- Indicator 1 can come before Indicator 2
- Result is the same: Symbol is synced

### Sync Examples

**Scenario 1**: Indicator 1 First
```
9:25 AM - RELIANCE in Indicator 1 → Status: Awaiting
12:45 PM - RELIANCE in Indicator 2 → Status: Synced ✅
```

**Scenario 2**: Indicator 2 First
```
9:21 AM - RELIANCE in Indicator 2 → (Not shown yet)
9:27 AM - RELIANCE in Indicator 1 → Status: Synced ✅
```

**Scenario 3**: Multiple Indicator 2 Signals
```
9:25 AM - RELIANCE in Indicator 1
10:30 AM - RELIANCE in Indicator 2 (Pattern)
2:15 PM - RELIANCE in Indicator 2 (HVD)
Result: One synced card showing both Pattern and HVD
```

---

## 🎯 Logo Design

### Maurvi Consultants Logo
- **Concept**: Growth and momentum
- **Shape**: Letter "M" with peaks
- **Design Elements**:
  - Left peak: Lower
  - Right peak: Higher (represents upward trend)
  - Smooth curves connecting peaks
  - Gradient fill (purple to blue)
- **Format**: SVG (scalable)
- **Animations**:
  - Floating animation (3s loop)
  - Press feedback on click
  - Rotation effect on interaction

---

## 📱 Responsive Design

### Desktop (≥1200px)
- Full layout with all features
- Multi-column grids
- 5-window Logs layout
- Large cards and spacing

### Tablet (768px - 1199px)
- Adaptive grid columns
- Logs windows stack vertically
- Touch-friendly sizing
- Maintained functionality

### Mobile (≤767px)
- Single column layout
- Stacked views
- Touch-optimized buttons
- Full feature access
- Smaller card sizing

---

## ⚡ Performance Features

### Auto-Refresh
- **Interval**: 30 seconds
- **Method**: Polling backend
- **Smooth Updates**: No flicker or jump
- **Efficient**: Only fetches changed data

### Caching
- Session token cached
- Theme preference cached
- Voice synthesis voices cached
- No redundant API calls

### Optimization
- Minimal re-renders
- Efficient DOM updates
- CSS animations (GPU accelerated)
- Lazy loading where possible

---

## 🔔 Notifications

### Types
- Success (green border)
- Error (red border)
- Info (blue border)

### Features
- Slide-in from right
- Auto-dismiss after 3 seconds
- Glass effect background
- Click to dismiss early
- Queue multiple notifications

### Triggers
- OTP sent
- Login successful
- Login failed
- Session expired
- Data update errors

---

## 🛠 Technical Stack

### Frontend
- HTML5
- CSS3 (Custom properties, Grid, Flexbox)
- Vanilla JavaScript (ES6+)
- No external dependencies

### Backend
- Google Apps Script (JavaScript V8 runtime)
- Google Sheets for data storage
- Gmail API for email sending
- Properties Service for configuration

### APIs Used
- Google Apps Script Web App
- Gmail (for OTP emails)
- Spreadsheet Service
- Properties Service (script and user)
- Web Speech API (text-to-speech)

---

## 📊 Data Storage

### Spreadsheet Structure

**Sheet: AlertData**
| Column | Type | Description |
|--------|------|-------------|
| Timestamp | Number | Alert timestamp |
| Symbol | String | Stock symbol |
| Reason | String | Signal reason |
| Capital Deployed (Cr) | String | HVD capital value |
| Indicator | String | Indicator number |
| Received At | Number | Server receipt time |

**Sheet: SyncStatus**
| Column | Type | Description |
|--------|------|-------------|
| Symbol | String | Stock symbol |
| Synced | Boolean | Sync status |
| Updated At | Number | Last update time |

---

## 🔒 Privacy & Security

### Data Privacy
- All data stored in user's Google Spreadsheet
- No third-party data sharing
- No external analytics
- Session data in browser only

### Email Security
- OTP sent via Gmail API
- 3-minute expiry
- One-time use
- Encrypted transmission

### Access Control
- Web app accessible to anyone (with OTP)
- Script modifications require owner access
- Spreadsheet readable by script only

---

## 📈 Limitations & Quotas

### Google Apps Script Limits
- **Email quota**: 100-1500 emails/day (account dependent)
- **Execution time**: 6 minutes per execution
- **Triggers**: 20 time-based triggers
- **Script size**: 50 MB total
- **Spreadsheet**: 5 million cells

### Browser Limitations
- **localStorage**: ~5-10 MB
- **Speech Synthesis**: Browser-dependent voices
- **Concurrent requests**: Browser throttling

---

## 🎓 User Experience Highlights

### Professional Feel
- Clean, minimalist design
- Consistent spacing and alignment
- Professional color scheme
- Smooth animations throughout
- No jarring transitions

### Intuitive Navigation
- Clear view labels
- Persistent header
- Logo returns to dashboard
- Visual feedback on all actions
- Tooltips where needed

### Accessibility
- High contrast ratios
- Readable font sizes
- Touch-friendly targets
- Keyboard navigation support
- Clear error messages

---

## 🚀 Future Enhancement Possibilities

While not in current scope, potential additions:
- Export data to CSV/PDF
- Custom alert filters
- Advanced analytics dashboard
- Multi-user support with roles
- Mobile app (React Native/Flutter)
- Push notifications
- Telegram/WhatsApp integration
- Custom webhook builders
- Pattern backtesting

---

## 📝 Documentation

Available guides:
- **README.md**: Overview and setup
- **DEPLOYMENT_GUIDE.md**: Step-by-step deployment
- **TRADINGVIEW_EXAMPLES.md**: Webhook examples
- **TESTING_GUIDE.md**: Testing procedures
- **FEATURES.md**: This document
- **LICENSE**: Usage terms

---

## 💡 Design Philosophy

Following Apple's Human Interface Guidelines:
1. **Clarity**: Clear visual hierarchy
2. **Deference**: Content-first design
3. **Depth**: Layered interface with depth cues
4. **Consistency**: Predictable interactions
5. **Feedback**: Visual and audio responses
6. **Metaphors**: Familiar UI patterns
7. **User Control**: Easy navigation and control

---

## 🏆 Key Differentiators

1. **Apple Liquid Glass Design**: Modern, premium feel
2. **Intelligent Sync Logic**: Time-agnostic matching
3. **Hindi Voice Narration**: Localized experience
4. **Session Persistence**: Convenient authentication
5. **Real-time Updates**: Always current data
6. **Five-Window Logs**: Organized categorization
7. **Responsive Design**: Works everywhere
8. **Zero Dependencies**: Fast, lightweight
9. **Easy Deployment**: Google Apps Script platform
10. **Comprehensive Documentation**: Well-documented

---

**Version**: 1.0  
**Last Updated**: 2024  
**Company**: Maurvi Consultants  
**Contact**: amit3ree@gmail.com
