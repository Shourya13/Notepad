# 🎨 Minimalist Design System Guide

A modern, clean, and accessible design system for the Notepad application built with React Native and Expo.

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Color Themes](#color-themes)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Shadows & Depth](#shadows--depth)
6. [Components](#components)
7. [Installation & Setup](#installation--setup)
8. [Usage Examples](#usage-examples)

---

## Design Philosophy

This design system embraces **minimalism** through:

- **No Hard Borders**: Replaced with soft shadows and background colors
- **Neumorphic Depth**: Subtle shadow layers for visual hierarchy
- **Clean Typography**: Modern fonts with clear hierarchy
- **Consistent Spacing**: 4px grid system for alignment
- **Accessibility First**: Touch targets, contrast ratios, and color-blind safe colors
- **User-Friendly**: Intuitive interactions and predictable behavior

### Key Principles

1. **Simplicity Over Decoration** - Every element has a purpose
2. **Consistent Patterns** - Predictable interactions throughout
3. **Soft Transitions** - Smooth, non-intrusive animations (150-300ms)
4. **Subtle Feedback** - Shadows, color changes, not harsh borders
5. **Adaptive Design** - Works seamlessly on light and dark modes

---

## Color Themes

### 5 Curated Minimalist Themes

#### 1. **Pure Light** (Default)
The cleanest option with pure whites and subtle blues.
- **Best for**: All-day use, minimal distraction
- **Accent**: Bright blue (#3b82f6)
- **Use Case**: Default, professional, clean

#### 2. **Warm Neutral**
Cream, beige, and sand tones for a cozy feel.
- **Best for**: Extended reading, warm ambiance
- **Accent**: Warm orange-brown (#c4743d)
- **Use Case**: Relaxing note-taking, journaling

#### 3. **Cool Modern**
Blues, teals, and modern accents for a contemporary look.
- **Best for**: Contemporary aesthetic, tech-focused
- **Accent**: Cyan (#0ea5e9)
- **Use Case**: Modern design, sleek interface

#### 4. **Monochrome+**
Grayscale with vibrant accent colors.
- **Best for**: Maximum focus, minimal visual noise
- **Accent**: Vibrant Red (#d32f2f)
- **Use Case**: Distraction-free writing

#### 5. **Pure Dark**
Deep dark backgrounds for evening use.
- **Best for**: Night mode, reduced eye strain
- **Accent**: Soft purple (#6366f1)
- **Use Case**: Dark mode default, OLED optimization

### Color Palette Structure

Each theme has 14 colors organized by purpose:

```typescript
{
  background,        // Main background
  surface,          // Cards, inputs, surfaces
  surfaceHover,     // Hover state
  surfacePressed,   // Pressed state
  text,             // Primary text
  textSecondary,    // Secondary text
  textTertiary,     // Muted, placeholder text
  accent,           // Primary action color
  accentLight,      // Light variant for backgrounds
  success,          // Success state (#10b981, etc)
  successLight,     // Light success background
  warning,          // Warning state
  warningLight,     // Light warning background
  danger,           // Error/destructive actions
  dangerLight,      // Light error background
  overlay,          // Modal overlay
  shadow,           // For shadow colors
}
```

---

## Typography

### Font Families

**Recommended Setup** (Install via `expo-font`):

```typescript
// Installed fonts
const fonts = {
  inter: 'Inter',           // Body text, labels (400, 500, 600, 700)
  poppins: 'Poppins',       // Headings (600, 700)
  'jetbrains-mono': 'JetBrains Mono',  // Code/timestamps (400)
};
```

**Current Fallbacks** (System fonts):
- iOS: system-ui, ui-rounded, ui-monospace
- Android: sans-serif, serif, monospace
- Web: -apple-system, BlinkMacSystemFont, Segoe UI, etc.

### Font Sizes

```typescript
const FontSizes = {
  xs: 12,    // Small labels, captions
  sm: 14,    // Body small, form labels
  base: 16,  // Body default, input text
  lg: 18,    // Subheadings, card titles
  xl: 20,    // Section headers
  xxl: 24,   // Modal titles
  xxxl: 28,  // Main headings
  huge: 32,  // Page titles
};
```

### Font Weights

```typescript
const FontWeights = {
  light: '300',
  normal: '400',
  medium: '500',    // Slightly emphasized text
  semibold: '600',  // Labels, card titles
  bold: '700',      // Headings
  extrabold: '800', // Prominent headings
};
```

### Typography Examples

| Element | Font | Size | Weight | Line Height | Usage |
|---------|------|------|--------|-------------|-------|
| Page Title | Poppins | 32 | Bold | 1.2 | Main screen title |
| Section Header | Poppins | 24 | Bold | 1.2 | Modal title |
| Card Title | Poppins | 20 | Semibold | 1.5 | Note/todo title |
| Body Text | Inter | 16 | Regular | 1.5 | Note content |
| Form Label | Inter | 14 | Semibold | 1.5 | Input label |
| Button Text | Inter | 16 | Semibold | 1.5 | Action button |
| Caption | Inter | 12 | Regular | 1.5 | Timestamp, helper text |
| Mono Text | Jetbrains Mono | 14 | Regular | 1.5 | Code, timestamps |

---

## Spacing & Layout

### Spacing Scale (4px Grid)

```typescript
const Spacing = {
  xs: 4,      // Micro spacing
  sm: 8,      // Small gaps between elements
  md: 12,     // Default spacing between components
  lg: 16,     // Large gaps, container padding
  xl: 20,     // Extra large spacing
  xxl: 24,    // Double spacing
  xxxl: 32,   // Triple spacing
  huge: 48,   // Large sections
};
```

### Common Layout Patterns

**Dense (Compact)**: xs + sm spacing
```
- List items with tight spacing
- Form fields in modal
- Navigation tabs
```

**Standard (Default)**: md + lg spacing
```
- Card padding: lg (16px)
- Card gaps: md (12px)
- List gaps: md (12px)
```

**Spacious**: lg + xl + xxl spacing
```
- Page sections
- Major component gaps
- Bottom padding (110px for FAB clearance)
```

### Border Radius (Soft Corners)

```typescript
const BorderRadius = {
  sm: 8,      // Subtle rounding, buttons, small inputs
  md: 12,     // Standard, cards, modals, close button
  lg: 16,     // Large panels, full cards
  xl: 20,     // Extra large, modal top
  full: 999,  // Circular (icons, avatars)
};
```

**Usage Guide**:
- Buttons: `sm` (8px)
- Card close button: `md` (12px)
- Card/Panel: `lg` (16px)
- Modal top: `xl` (20px)
- Icon badges: `full` (circular)

---

## Shadows & Depth

### Shadow Tokens

Replace **borders** with **soft shadows** for neumorphic depth.

#### 1. **Subtle** (Default Cards)
```typescript
iOS: {
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.06,
  shadowRadius: 3,
}
Android: elevation: 1
```
- Use for: Cards, list items, empty states
- Effect: Barely noticeable, very soft

#### 2. **Standard** (Elevated Surfaces)
```typescript
iOS: {
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.10,
  shadowRadius: 4,
}
Android: elevation: 3
```
- Use for: Buttons, inputs on surfaces
- Effect: Clear separation from background

#### 3. **Elevated** (Modals, Dropdowns)
```typescript
iOS: {
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.15,
  shadowRadius: 8,
}
Android: elevation: 8
```
- Use for: Bottom sheet modals, menu overlays
- Effect: Strong depth, clear prominence

#### 4. **Interactive** (Hover State)
```typescript
iOS: {
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.12,
  shadowRadius: 6,
}
Android: elevation: 5
```
- Use for: Buttons on hover, card elevation
- Effect: Interactive feedback

### No Borders - Use Surfaces Instead

**BEFORE (Hard Border):**
```typescript
{
  borderWidth: 1,
  borderColor: palette.border,
  borderRadius: 12,
  padding: 12,
}
```

**AFTER (Soft Surface):**
```typescript
{
  backgroundColor: palette.surface,
  borderRadius: 12,
  padding: 12,
  ...Shadows.subtle,
}
```

**Benefit**: Softer, more modern appearance without hard lines

---

## Components

### Card Component

**Design**: Soft surface with subtle shadow, no border

```typescript
// StyleSheet
card: {
  backgroundColor: palette.surface,
  borderRadius: BorderRadius.lg,
  paddingHorizontal: Spacing.md,
  paddingVertical: Spacing.md,
  ...Shadows.subtle,
}

// Usage
<View style={[styles.card, { backgroundColor: palette.surface }]}>
  {/* Card content */}
</View>
```

### Button Component

**Design**: Solid accent background, no border

```typescript
// Primary Button
primary: {
  backgroundColor: palette.accent,
  borderRadius: BorderRadius.md,
  paddingVertical: Spacing.md,
  paddingHorizontal: Spacing.lg,
  ...Shadows.subtle,
}

// Secondary Button (background color variant)
secondary: {
  backgroundColor: palette.accentLight,
  borderRadius: BorderRadius.md,
  paddingVertical: Spacing.md,
  paddingHorizontal: Spacing.lg,
  ...Shadows.subtle,
}
```

### Input Field

**Design**: Soft surface background, no visible border

```typescript
input: {
  backgroundColor: palette.surface,
  borderRadius: BorderRadius.md,
  paddingHorizontal: Spacing.md,
  paddingVertical: Spacing.md,
  fontSize: FontSizes.base,
  color: palette.text,
  ...Shadows.subtle,
}

// On focus: Use accentLight or shadow elevation
// Placeholder: Use palette.textTertiary
```

### Modal/Sheet

**Design**: Large rounded top corners, elevated shadow

```typescript
sheet: {
  backgroundColor: palette.background,
  borderTopLeftRadius: BorderRadius.xl,
  borderTopRightRadius: BorderRadius.xl,
  paddingHorizontal: Spacing.lg,
  paddingVertical: Spacing.xxl,
  ...Shadows.elevated,
}
```

### List Item/Note Card

**Design**: Surface with icon, title, and meta information

```typescript
noteCard: {
  backgroundColor: palette.surface,
  borderRadius: BorderRadius.lg,
  paddingHorizontal: Spacing.md,
  paddingVertical: Spacing.md,
  ...Shadows.subtle,
  // Layout:
  // - Icon (circular, md) | Title + Meta | Actions
}
```

### Empty State

**Design**: Centered card with icon and message

```typescript
emptyState: {
  backgroundColor: palette.surface,
  borderRadius: BorderRadius.lg,
  paddingHorizontal: Spacing.lg,
  paddingVertical: Spacing.lg,
  ...Shadows.subtle,
  // Centered icon + text message
}
```

---

## Installation & Setup

### 1. Install Modern Fonts

Install `expo-font` to add Inter and Poppins:

```bash
npm install expo-font
npx expo install expo-font
```

**Add fonts to your Expo project:**

Create/update `fonts/` directory with font files or download:

```bash
# Option A: Manual download
# Download from Google Fonts:
# - Inter: https://fonts.google.com/specimen/Inter
# - Poppins: https://fonts.google.com/specimen/Poppins
# - JetBrains Mono: https://fonts.google.com/specimen/JetBrains+Mono
```

**Load fonts in app entry point:**

```typescript
// app/_layout.tsx
import * as Font from 'expo-font';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Inter': require('../assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium': require('../assets/fonts/Inter-Medium.ttf'),
    'Inter-SemiBold': require('../assets/fonts/Inter-SemiBold.ttf'),
    'Poppins': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'JetBrains-Mono': require('../assets/fonts/JetBrainsMono-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return <Stack />;
}
```

### 2. Setup NativeWind (Optional but Recommended)

NativeWind adds Tailwind CSS utilities to React Native:

```bash
npm install nativewind
npm install --save-dev tailwindcss
npx tailwindcss init
```

**Configure `tailwind.config.js`:**

```javascript
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './features/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        xxl: '24px',
        xxxl: '32px',
        huge: '48px',
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
      },
    },
  },
};
```

### 3. Update Theme System

The new minimalist themes are in `lib/minimalist-themes.ts`. Update your theme context to use them:

```typescript
import { 
  minimalistThemes, 
  MinimalistThemeId,
  DEFAULT_THEME_PREFERENCES,
  THEME_IDS,
} from '@/lib/minimalist-themes';
```

---

## Usage Examples

### Example: Creating a Styled Card

**Before (with borders):**
```typescript
<View style={{
  borderWidth: 1,
  borderColor: palette.border,
  borderRadius: 20,
  padding: 14,
}}>
  <Text>{note.title}</Text>
</View>
```

**After (minimalist):**
```typescript
import { Shadows, BorderRadius, Spacing } from '@/lib/design-tokens';

<View style={{
  backgroundColor: palette.surface,
  borderRadius: BorderRadius.lg,
  paddingHorizontal: Spacing.md,
  paddingVertical: Spacing.md,
  ...Shadows.subtle,
}}>
  <Text style={{ color: palette.text }}>{note.title}</Text>
</View>
```

### Example: Modal Sheet

```typescript
<View style={{
  backgroundColor: palette.background,
  borderTopLeftRadius: BorderRadius.xl,
  borderTopRightRadius: BorderRadius.xl,
  paddingHorizontal: Spacing.lg,
  paddingVertical: Spacing.xxl,
  ...Shadows.elevated,
}}>
  <Text style={{
    fontSize: FontSizes.xxl,
    fontWeight: '600',
    color: palette.text,
  }}>
    Add New Note
  </Text>
</View>
```

### Example: Button with States

```typescript
const [isPressed, setIsPressed] = useState(false);

<Pressable
  onPress={() => handleSubmit()}
  style={{
    backgroundColor: isPressed 
      ? palette.surfacePressed 
      : palette.accent,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    ...(isPressed ? Shadows.inset : Shadows.subtle),
  }}
>
  <Text style={{
    color: isPressed ? palette.textSecondary : '#fff',
    fontSize: FontSizes.base,
    fontWeight: '600',
  }}>
    Submit
  </Text>
</Pressable>
```

---

## Best Practices

### ✅ Do's

- ✅ Use `Spacing.*` tokens for all padding/margin
- ✅ Use `BorderRadius.*` tokens for all rounding
- ✅ Use `Shadows.*` for depth instead of borders
- ✅ Use `FontSizes.*` for text sizing
- ✅ Use semantic color names (`palette.accent`, `palette.danger`)
- ✅ Test light/dark mode switching
- ✅ Keep shadows subtle (opacity < 0.15)

### ❌ Don'ts

- ❌ Don't use hard `borderWidth: 1` lines
- ❌ Don't use magic numbers (use tokens instead)
- ❌ Don't create new colors (use palette colors)
- ❌ Don't use harsh shadows (opacity > 0.2)
- ❌ Don't mix rounding values (use BorderRadius tokens)

---

## Troubleshooting

### Issue: Shadows not showing on Android

**Solution**: Ensure `elevation` is set correctly in shadow token.

```typescript
Android: { elevation: 3 } // Required for shadows
```

### Issue: Text not visible on dark background

**Solution**: Use `palette.text` or `palette.textSecondary` explicitly.

```typescript
<Text style={{ color: palette.text }}>Visible text</Text>
```

### Issue: Buttons blend into background

**Solution**: Ensure button has distinct `backgroundColor` from `palette.surface`.

```typescript
button: { backgroundColor: palette.accent } // Distinct from surface
```

---

## Support & Feedback

For design system questions or improvements, please update:
- `lib/minimalist-themes.ts` - Color themes
- `lib/design-tokens.ts` - Spacing, typography, shadows
- This guide document

---

**Design System Version**: 1.0.0
**Last Updated**: 2026
**Status**: 🟢 Production Ready
