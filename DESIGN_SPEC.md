# Design Specifications - Automated Trading Signals

Visual design system and UI specifications based on Apple Liquid Glass design.

## Design Philosophy

Following Apple's Human Interface Guidelines:
- **Clarity**: Text is legible, icons are precise, functionality is obvious
- **Deference**: Fluid motion and crisp interface help people understand content
- **Depth**: Layers convey hierarchy and position

## Color System

### Light Mode Palette

```css
Primary Colors:
--color-primary: #007AFF      /* Apple Blue */
--color-secondary: #5856D6    /* Purple */
--color-success: #34C759      /* Green */
--color-warning: #FF9500      /* Orange */
--color-danger: #FF3B30       /* Red */

Background Colors:
--color-bg-primary: #FFFFFF
--color-bg-secondary: #F2F2F7
--color-bg-tertiary: #E5E5EA

Text Colors:
--color-text-primary: #000000
--color-text-secondary: #3C3C43
--color-text-tertiary: #8E8E93

Special:
--color-separator: rgba(60, 60, 67, 0.29)
```

### Dark Mode Palette

```css
Primary Colors:
--color-primary: #0A84FF
--color-secondary: #5E5CE6
--color-success: #30D158
--color-warning: #FF9F0A
--color-danger: #FF453A

Background Colors:
--color-bg-primary: #000000
--color-bg-secondary: #1C1C1E
--color-bg-tertiary: #2C2C2E

Text Colors:
--color-text-primary: #FFFFFF
--color-text-secondary: #EBEBF5
--color-text-tertiary: #AEAEB2

Special:
--color-separator: rgba(235, 235, 245, 0.29)
```

### Gradient Colors

```css
--gradient-start: #667eea      /* Purple-Blue */
--gradient-end: #764ba2        /* Deep Purple */

Usage: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
```

## Glass Morphism

### Glass Card Effect

```css
background: rgba(255, 255, 255, 0.7)     /* Light mode */
background: rgba(28, 28, 30, 0.7)        /* Dark mode */
backdrop-filter: blur(20px) saturate(180%)
border: 1px solid rgba(255, 255, 255, 0.3)
border-radius: 16px
box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1)
```

### Glass Button Effect

```css
background: semi-transparent
backdrop-filter: blur(10px) saturate(180%)
border: 1px solid semi-transparent white/black
border-radius: 9999px (full rounded)
```

## Typography

### Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, 
             'Segoe UI', Roboto, 'Helvetica Neue', 
             Arial, sans-serif;
```

### Font Scale

| Size | Value | Usage |
|------|-------|-------|
| 3xl | 48px | Hero headings |
| 2xl | 32px | Page titles |
| xl | 24px | Section headings |
| lg | 18px | Subsection headings |
| base | 16px | Body text |
| sm | 14px | Small text |
| xs | 12px | Captions, labels |

### Font Weights

| Weight | Value | Usage |
|--------|-------|-------|
| Regular | 400 | Body text |
| Medium | 500 | Emphasized text |
| Semi-bold | 600 | Headings, buttons |
| Bold | 700 | Titles, important text |

## Spacing System

### Scale

```css
--spacing-xs: 4px
--spacing-sm: 8px
--spacing-md: 16px
--spacing-lg: 24px
--spacing-xl: 32px
--spacing-2xl: 48px
```

### Usage Guidelines

- **Between Cards**: 24px (lg)
- **Card Padding**: 24px (lg)
- **Section Margins**: 32px (xl)
- **Text Line Height**: 1.5
- **Button Padding**: 16px horizontal, 12px vertical

## Border Radius

```css
--radius-sm: 8px      /* Small elements */
--radius-md: 12px     /* Medium elements */
--radius-lg: 16px     /* Cards */
--radius-xl: 24px     /* Large cards */
--radius-full: 9999px /* Buttons, badges */
```

## Shadows

### Elevation Levels

```css
/* Level 1 - Cards at rest */
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

/* Level 2 - Cards on hover */
box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);

/* Level 3 - Modals */
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.16);

/* Level 4 - Popups */
box-shadow: 0 12px 48px rgba(0, 0, 0, 0.24);
```

## Animation System

### Timing Functions

```css
--transition-fast: 150ms cubic-bezier(0.4, 0.0, 0.2, 1)
--transition-base: 250ms cubic-bezier(0.4, 0.0, 0.2, 1)
--transition-slow: 350ms cubic-bezier(0.4, 0.0, 0.2, 1)
```

### Animation Patterns

#### Hover Effect (Cards)
```css
transition: all 250ms cubic-bezier(0.4, 0.0, 0.2, 1);
hover: transform: translateY(-2px);
hover: box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
```

#### Press Effect (Buttons)
```css
active: transform: scale(0.98);
transition: transform 150ms cubic-bezier(0.4, 0.0, 0.2, 1);
```

#### Fade In
```css
@keyframes fadeIn {
  from: opacity: 0; transform: translateY(20px);
  to: opacity: 1; transform: translateY(0);
}
animation: fadeIn 500ms ease-out;
```

#### Slide In
```css
@keyframes slideIn {
  from: opacity: 0; transform: scale(0.95);
  to: opacity: 1; transform: scale(1);
}
animation: slideIn 500ms ease-out;
```

## Component Specifications

### Login Card

```
Dimensions: max-width 450px
Padding: 48px
Background: Glass effect
Border Radius: 16px
Text Align: center
```

### OTP Input Boxes

```
Size: 50px × 60px each
Font Size: 24px
Border: 2px solid (glass-border)
Border Radius: 12px
Gap: 8px between boxes
Separator: "-" (24px font)
```

### Stat Cards (Dashboard)

```
Grid: 4 columns (auto-fit, min 250px)
Padding: 24px
Text Align: center
Icon Size: 48px
Label: 14px uppercase
Value: 32px bold
```

### Signal Cards

```
Min Width: 300px
Padding: 24px
Border Radius: 16px
Header: Space-between layout
Symbol: 24px bold
Status Badge: 12px, rounded-full
Time: 14px tertiary color
Reason: 14px secondary color
```

### Modal

```
Max Width: 600px
Max Height: 80vh
Padding: 32px
Border Radius: 16px
Backdrop: rgba(0, 0, 0, 0.5) + blur(10px)
Animation: Scale + fade in
```

### Header

```
Height: auto
Padding: 16px 24px
Position: sticky, top 16px
Z-index: 100
Display: flex, space-between
```

### Tickers

```
Height: auto
Padding: 16px
Overflow: hidden
Animation: Scroll 30s linear infinite
Pause on hover: yes
Background: Transparent glass
```

## Logo Specifications

### Maurvi Consultants Logo

```
Type: SVG
ViewBox: 0 0 100 100
Path: M shape with peaks
  - Start: (20, 80)
  - Peak 1: (35, 55)
  - Valley: (50, 35)
  - Peak 2: (65, 60)
  - Peak 3: (80, 20) ← Highest
  - End: (80, 80)
Stroke Width: 6
Stroke: Linear gradient (purple to blue)
Fill: None
Stroke Linecap: Round
Stroke Linejoin: Round
```

### Logo Sizes

| Context | Size |
|---------|------|
| Login | 80px × 80px |
| Header | 40px × 40px |
| Favicon | 32px × 32px |

### Logo Animation

```css
@keyframes logoFloat {
  0%, 100%: transform: translateY(0);
  50%: transform: translateY(-10px);
}
animation: logoFloat 3s ease-in-out infinite;
```

## Icon System

### Icon Sizes

| Size | Value | Usage |
|------|-------|-------|
| xs | 16px | Inline icons |
| sm | 20px | Small buttons |
| base | 24px | Standard icons |
| lg | 32px | Large buttons |
| xl | 48px | Feature icons |

### Status Indicators

```css
/* Synced */
background: rgba(52, 199, 89, 0.2)
color: #34C759 (light) / #30D158 (dark)
text: "SYNCED"

/* Awaiting */
background: rgba(255, 149, 0, 0.2)
color: #FF9500 (light) / #FF9F0A (dark)
text: "AWAITING"

/* Unsynced */
background: rgba(255, 59, 48, 0.2)
color: #FF3B30 (light) / #FF453A (dark)
text: "UNSYNCED"
```

### Pattern Indicators

```css
/* Bullish */
symbol: 📈
border-left: 3px solid var(--color-success)

/* Bearish */
symbol: 📉
border-left: 3px solid var(--color-danger)
```

## Layout Specifications

### Dashboard Layout

```
Grid: Single column
Card Grid: 4 columns, auto-fit
Tickers: Full width
Synced Signals: Grid, 3 columns
Gap: 24px
```

### Live Feed Layout

```
Header: Flex, space-between
Grid: Auto-fill, min 300px
Gap: 24px
```

### Logs Layout

```
Grid: 2 columns (50% each)
Left: HVD (full height)
Right: 4 quadrants (2×2 grid)
Gap: 24px
Height: calc(100vh - 250px)
```

### Historical Layout

```
Dates Grid: Auto-fill, min 200px
Signals Grid: Auto-fill, min 300px
Gap: 24px
```

## Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 767px) {
  grid-template-columns: 1fr;
  padding: 16px;
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1199px) {
  grid-template-columns: repeat(2, 1fr);
  padding: 20px;
}

/* Desktop */
@media (min-width: 1200px) {
  grid-template-columns: repeat(4, 1fr);
  padding: 24px;
}
```

## Accessibility

### Color Contrast Ratios

- **Normal Text**: Minimum 4.5:1
- **Large Text**: Minimum 3:1
- **Interactive Elements**: Minimum 3:1

### Touch Targets

```
Minimum: 44px × 44px
Recommended: 48px × 48px
Spacing: 8px minimum between targets
```

### Focus States

```css
focus: outline: none;
focus: box-shadow: 0 0 0 4px rgba(10, 132, 255, 0.3);
focus: border-color: var(--color-primary);
```

## Interactive States

### Button States

```css
/* Default */
background: gradient
opacity: 1

/* Hover */
transform: translateY(-2px)
box-shadow: increased

/* Active/Pressed */
transform: translateY(0) scale(0.98)

/* Disabled */
opacity: 0.5
cursor: not-allowed
```

### Card States

```css
/* Default */
transform: none

/* Hover */
transform: translateY(-2px) scale(1.02)

/* Active/Clicked */
transform: translateY(0) scale(0.98)

/* Loading */
opacity: 0.6
pointer-events: none
```

## Z-Index Layers

```css
/* Base */
--z-base: 0

/* Glass Cards */
--z-cards: 1

/* Sticky Header */
--z-header: 100

/* Modal Backdrop */
--z-modal-backdrop: 1000

/* Modal Content */
--z-modal: 1001

/* Notifications */
--z-notification: 2000
```

## Performance Optimization

### CSS Best Practices

```css
/* Use transform instead of top/left */
transform: translateX(10px);  /* Good */
left: 10px;                   /* Avoid */

/* Use opacity for fades */
opacity: 0;                   /* Good */
visibility: hidden;           /* When needed */

/* Hardware acceleration */
transform: translateZ(0);     /* When needed */
will-change: transform;       /* Sparingly */
```

### Animation Performance

- Use `transform` and `opacity` (GPU accelerated)
- Avoid animating `width`, `height`, `top`, `left`
- Limit simultaneous animations
- Remove `will-change` after animation

## Scrollbar Styling

```css
/* Hide scrollbar but keep functionality */
::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}

body {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
```

## Print Styles (Future)

```css
@media print {
  .no-print { display: none; }
  .glass-card { 
    background: white;
    border: 1px solid #ccc;
  }
}
```

## Browser Support

- **Chrome**: 90+
- **Safari**: 14+
- **Firefox**: 88+
- **Edge**: 90+
- **Mobile Safari**: iOS 14+
- **Chrome Mobile**: 90+

## Design Assets

### Required Assets
- ✅ Logo SVG (inline)
- ✅ Icon set (SVG inline)
- ✅ Gradient backgrounds (CSS)
- ✅ No external images needed

### Future Assets
- Favicon (generate from logo)
- OG image for social sharing
- App icons for PWA (if converted)

## Implementation Notes

### CSS Organization
1. CSS Variables (colors, spacing)
2. Reset & Base Styles
3. Layout Utilities
4. Components
5. Animations
6. Responsive Overrides

### Naming Convention
- BEM-style: `.component__element--modifier`
- Utility classes: `.glass-card`, `.icon-btn`
- State classes: `.active`, `.loading`, `.error`

### File Structure
```
Index.html      - Structure
Styles.html     - All CSS
Script.html     - All JavaScript
Code.gs         - Backend
```

---

**Design System Version**: 1.0  
**Last Updated**: 2024  
**Based On**: Apple Human Interface Guidelines  
**Maintained By**: Maurvi Consultants
