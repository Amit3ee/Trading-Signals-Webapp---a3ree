# Changelog

All notable changes to the Trading Signals Web App will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-10-23

### Added

#### Authentication & Security
- OTP-based login system with 6-digit code (XXX-XXX format)
- OTP sent via email with 3-minute expiration
- Visual countdown timer with progress bar
- Auto-login when correct OTP is entered (no submit button)
- Session persistence for rest of the day
- Secure session token management

#### Dashboard (Homepage)
- Four statistics cards:
  - Nifty Data (clickable for details)
  - Total Symbols Appeared
  - Synced Signals Count
  - Latest Symbol Name
- Two dynamic tickers with infinite scroll:
  - HVD ticker (capital deployed in Cr)
  - Pattern ticker (bullish/bearish indicators)
- Synced signals window with comprehensive view
- Gradient sizing for ticker items (largest to smallest)

#### Live Feed Tab
- Display all Indicator 1 signals
- Real-time sync status (Synced/Awaiting)
- Sortable by time and status
- Ascending/descending order toggle
- Click cards for detailed modal view
- Auto-refresh every 30 seconds

#### Logs Tab
- Five-window layout:
  - Significant Deployed Capital (left half, full height)
  - Bullish Activity (top-right quadrant)
  - Bearish Activity (top-right quadrant)
  - Oversold (bottom-right quadrant)
  - Overbought (bottom-right quadrant)
- Auto-categorization of signals
- Sync status indicators
- Modal detail views

#### Historical Tab
- Date-based filtering with human-readable format
- Date card grid layout
- Historical signal display on date selection
- Full sync history with timestamps
- Sort and filter capabilities

#### Design System (Apple Liquid Glass)
- Glassmorphism effects with backdrop blur and saturation
- Semi-transparent backgrounds with depth
- Dynamic gradient backgrounds with animation
- Smooth transitions and animations
- Hover effects on all interactive elements
- Touch/click feedback
- Hidden scrollbars (functional but invisible)
- Apple color scheme (light and dark modes)
- Professional typography system

#### Theme System
- Dark mode (default)
- Light mode
- Toggle button on login and main screens
- Smooth theme transitions
- Theme preference persistence
- Consistent across all views

#### Audio Features
- Text-to-speech for latest synced symbols
- Hindi female voice (when available)
- Smart pronunciation rules:
  - Acronyms ≤4 letters spelled out
  - Second word spoken normally
- Mute/unmute toggle with icon change
- State persistence during session

#### Data Collection & Webhooks
- Three indicator webhook endpoints
- Indicator 1: Primary signals
- Indicator 2: Patterns and HVD
- Indicator 3: Nifty-specific signals
- JSON data validation
- Error handling and logging

#### Sync Logic
- Time-agnostic symbol matching
- Indicator 1 + Indicator 2 = Synced
- Order doesn't matter (before/after)
- Multiple Indicator 2 signals supported
- Real-time status updates

#### Visual Elements
- Maurvi Consultants logo (M with ascending peaks)
- SVG-based scalable logo
- Logo animations (float, press feedback)
- Status badges (synced, awaiting, unsynced)
- Pattern indicators (📈 bullish, 📉 bearish)
- Modal popups with blur backgrounds

#### Navigation
- View toggle (Dashboard, Live Feed, Logs, Historical)
- Logo button returns to dashboard
- Sticky header with glass effect
- Smooth view transitions
- Active state highlighting

#### User Experience
- Modal detail views with full information
- Background blur when modal open
- Click anywhere to close modal
- Sort controls on all data views
- Responsive grid layouts
- Touch-friendly interfaces

#### Performance
- Auto-refresh every 30 seconds
- Efficient data polling
- Minimal re-renders
- CSS animations (GPU accelerated)
- No external dependencies
- Lightweight codebase

#### Documentation
- Comprehensive README.md
- Step-by-step DEPLOYMENT_GUIDE.md
- TradingView webhook examples (TRADINGVIEW_EXAMPLES.md)
- Complete testing guide (TESTING_GUIDE.md)
- Detailed features documentation (FEATURES.md)
- Design specifications (DESIGN_SPEC.md)
- Quick start guide (QUICKSTART.md)
- License file

#### Backend Features
- Google Apps Script backend
- Google Sheets data storage
- OTP generation and email delivery
- Session management
- Webhook data processing
- Sync status tracking
- Dashboard statistics calculation
- Data retrieval functions

#### Accessibility
- High contrast color ratios
- Readable font sizes
- Touch-friendly target sizes (44px minimum)
- Keyboard navigation support
- Clear error messages
- Visual feedback on all interactions

#### Responsive Design
- Desktop optimized (1200px+)
- Tablet support (768px-1199px)
- Mobile friendly (≤767px)
- Adaptive grid layouts
- Touch-optimized controls
- Full feature access on all devices

### Technical Stack
- Frontend: HTML5, CSS3, Vanilla JavaScript (ES6+)
- Backend: Google Apps Script (V8 runtime)
- Storage: Google Sheets
- Email: Gmail API
- Voice: Web Speech API
- No external dependencies

### Browser Support
- Chrome 90+
- Safari 14+
- Firefox 88+
- Edge 90+
- Mobile Safari (iOS 14+)
- Chrome Mobile 90+

### Design Philosophy
- Based on Apple Human Interface Guidelines
- Clarity, Deference, Depth principles
- Liquid Glass material design
- Professional, modern aesthetic
- Intuitive user experience

## [Unreleased]

### Planned Features
- Export data to CSV/PDF
- Advanced analytics dashboard
- Custom alert filters
- Multi-user support with roles
- Push notifications
- Telegram/WhatsApp integration
- Custom webhook builders
- Pattern backtesting tools

### Known Issues
- Voice synthesis varies by browser and language support
- Google Apps Script daily quotas apply
- Session expires at end of day (by design)

### Future Improvements
- PWA (Progressive Web App) support
- Offline mode with sync
- More language support
- Custom pattern definitions
- Historical data analytics
- Performance monitoring dashboard

## Version History

### Version Numbering
- Major: Breaking changes or major feature additions
- Minor: New features, backwards compatible
- Patch: Bug fixes and minor improvements

### Release Notes
- **1.0.0** (2024-10-23): Initial release with full feature set

---

## Migration Guide

### From Previous Versions
N/A - This is the initial release

### Updating
1. Make code changes in script editor
2. Save all files
3. Deploy → Manage deployments
4. Edit → New version → Deploy
5. Users automatically get updates

## Support

For issues, questions, or feature requests:
- Email: amit3ree@gmail.com
- Check documentation for guidance
- Review Apps Script logs for errors

## Contributing

This is a proprietary application for Maurvi Consultants.
Contributions are not accepted from external sources.

## License

Proprietary - Maurvi Consultants © 2024

---

**Current Version**: 1.0.0  
**Last Updated**: 2024-10-23  
**Maintained By**: Maurvi Consultants
