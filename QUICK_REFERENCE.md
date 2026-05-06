# ⚡ Design System Quick Reference

**Keep this open while updating components!**

---

## 🚀 Three-Line Fix Pattern

```typescript
import { Spacing, BorderRadius, Shadows, FontSizes } from '@/lib/design-tokens';

// Replace: borderWidth: 1, borderColor: palette.border
// With: ...Shadows.subtle

// All magic numbers → design tokens
```

---

## 📏 Spacing Tokens

| Value | Token | Use |
|-------|-------|-----|
| 4px | `Spacing.xs` | Tiny gaps |
| 8px | `Spacing.sm` | Small gaps |
| 12px | `Spacing.md` | **Most common** |
| 16px | `Spacing.lg` | **Container padding** |
| 20px | `Spacing.xl` | Large gaps |
| 24px | `Spacing.xxl` | Double spacing |
| 32px | `Spacing.xxxl` | Section gaps |
| 48px | `Spacing.huge` | Large sections |

### Common Combinations
```typescript
// Card/container padding
paddingHorizontal: Spacing.lg (16px)
paddingVertical: Spacing.md (12px)

// List/group spacing
gap: Spacing.md (12px)

// Large section spacing
marginVertical: Spacing.xxl (24px)
```

---

## 🎨 Border Radius Tokens

| Value | Token | Use |
|-------|-------|-----|
| 8px | `BorderRadius.sm` | **Buttons** |
| 12px | `BorderRadius.md` | **Inputs, close button** |
| 16px | `BorderRadius.lg` | **Cards, panels** |
| 20px | `BorderRadius.xl` | **Modal tops** |
| 999px | `BorderRadius.full` | **Circular (badges)** |

### Quick Map
```
Small elements (button, close) → BorderRadius.sm/md
Cards/containers → BorderRadius.lg
Modal sheets → BorderRadius.xl
Round avatars → BorderRadius.full
```

---

## 🌑 Shadow Tokens

```typescript
...Shadows.subtle      // Cards, list items (default)
...Shadows.standard    // Buttons, elevated surfaces
...Shadows.elevated    // Modals, dropdowns (strong)
...Shadows.interactive // Hover states
...Shadows.inset       // Pressed states
```

### Rule of Thumb
```
NO borders!
Replace: borderWidth: 1, borderColor: palette.border
With: ...Shadows.subtle
```

---

## 🔤 Font Sizes

| Size | Token | Use |
|------|-------|-----|
| 12px | `FontSizes.xs` | Captions, timestamps |
| 14px | `FontSizes.sm` | Labels, small text |
| **16px** | `FontSizes.base` | **Body text (default)** |
| 18px | `FontSizes.lg` | Card titles |
| 20px | `FontSizes.xl` | Section headers |
| 24px | `FontSizes.xxl` | Modal titles |
| 28px | `FontSizes.xxxl` | Headings |
| 32px | `FontSizes.huge` | Page titles |

---

## ⚖️ Font Weights

```typescript
fontWeight: '300'  // Light
fontWeight: '400'  // Normal
fontWeight: '500'  // Medium (FontWeights.medium)
fontWeight: '600'  // Semibold (FontWeights.semibold) - Use for titles
fontWeight: '700'  // Bold (FontWeights.bold) - Use for headings
fontWeight: '800'  // Extrabold
```

---

## 🎯 5-Minute Component Update

### Before You Start
```typescript
import { Spacing, BorderRadius, Shadows, FontSizes } from '@/lib/design-tokens';
```

### Find & Replace (in order)

**1. Remove all borders**
```
Find: borderWidth: 1,
Replace: (nothing - delete it)

Find: borderColor: palette.border,
Replace: (nothing - delete it)

Find: borderTopWidth: 1,
Replace: (nothing - delete it)
```

**2. Add soft shadows**
```
After last padding line, add: ...Shadows.subtle,
```

**3. Replace magic numbers with spacing**
```
paddingHorizontal: 16  → paddingHorizontal: Spacing.lg
paddingVertical: 12    → paddingVertical: Spacing.md
gap: 10                → gap: Spacing.md
margin*: 20            → margin*: Spacing.xl
```

**4. Replace border radius with tokens**
```
borderRadius: 20  → borderRadius: BorderRadius.lg
borderRadius: 12  → borderRadius: BorderRadius.md
borderRadius: 999 → borderRadius: BorderRadius.full
```

**5. Replace font sizes with tokens**
```
fontSize: 16  → fontSize: FontSizes.base
fontSize: 14  → fontSize: FontSizes.sm
fontSize: 20  → fontSize: FontSizes.lg
```

---

## 📋 Update Checklist (Copy/Paste)

For each component:

- [ ] Import design tokens at top
- [ ] Remove all `borderWidth` lines
- [ ] Remove all `borderColor` lines
- [ ] Add `...Shadows.subtle` to card styles
- [ ] Replace padding numbers with `Spacing.*`
- [ ] Replace border radius with `BorderRadius.*`
- [ ] Replace font sizes with `FontSizes.*`
- [ ] Test in light mode
- [ ] Test in dark mode
- [ ] Check shadows are visible
- [ ] Verify spacing looks balanced

---

## 🔍 Example Before/After

### BEFORE
```typescript
card: {
  borderRadius: 20,
  borderWidth: 1,
  borderColor: palette.border,
  paddingHorizontal: 14,
  paddingVertical: 12,
  gap: 10,
  backgroundColor: palette.panel,
},
```

### AFTER
```typescript
card: {
  borderRadius: BorderRadius.lg,
  paddingHorizontal: Spacing.md,
  paddingVertical: Spacing.md,
  gap: Spacing.md,
  backgroundColor: palette.surface,
  ...Shadows.subtle,
},
```

---

## 🎨 Color Palette Quick Pick

### Light Theme Colors
```typescript
palette.background    // Main background (white)
palette.surface       // Card/input surface (light gray)
palette.text          // Primary text (dark)
palette.textSecondary // Secondary text
palette.textTertiary  // Muted text (placeholders)
palette.accent        // Primary action color (blue)
palette.accentLight   // Light accent background
palette.success       // Success state (green)
palette.danger        // Error/danger (red)
palette.warning       // Warning state (orange)
```

### Dark Theme Colors
```typescript
palette.background    // Main background (very dark)
palette.surface       // Card surface (dark gray)
palette.text          // Primary text (white)
palette.textSecondary // Secondary text
palette.textTertiary  // Muted text
palette.accent        // Primary action (light blue)
palette.accentLight   // Light accent variant
palette.success       // Success (light green)
palette.danger        // Error (light red)
palette.warning       // Warning (light orange)
```

---

## 🎯 Component Type Shortcuts

### Cards
```typescript
backgroundColor: palette.surface,
borderRadius: BorderRadius.lg,
paddingHorizontal: Spacing.md,
paddingVertical: Spacing.md,
...Shadows.subtle,
```

### Buttons
```typescript
backgroundColor: palette.accent,
borderRadius: BorderRadius.md,
paddingVertical: Spacing.md,
paddingHorizontal: Spacing.lg,
...Shadows.subtle,
```

### Inputs
```typescript
backgroundColor: palette.surface,
borderRadius: BorderRadius.md,
paddingHorizontal: Spacing.md,
paddingVertical: Spacing.md,
fontSize: FontSizes.base,
...Shadows.subtle,
```

### Modals
```typescript
backgroundColor: palette.background,
borderTopLeftRadius: BorderRadius.xl,
borderTopRightRadius: BorderRadius.xl,
paddingHorizontal: Spacing.lg,
paddingVertical: Spacing.xxl,
...Shadows.elevated,
```

### Empty States
```typescript
backgroundColor: palette.surface,
borderRadius: BorderRadius.lg,
paddingHorizontal: Spacing.lg,
paddingVertical: Spacing.lg,
...Shadows.subtle,
```

---

## 🧪 Quick Test

After updating, check:

1. **No Borders?** ✅ Removed all `borderWidth: 1`
2. **Has Shadow?** ✅ Added `...Shadows.subtle`
3. **Uses Tokens?** ✅ No magic numbers
4. **Light Mode?** ✅ Test & verify colors
5. **Dark Mode?** ✅ Test & verify colors
6. **Consistency?** ✅ Compare with similar components

---

## 🆘 Quick Help

**Problem**: Text not visible
**Solution**: Use `color: palette.text` or `palette.textSecondary`

**Problem**: Shadows not showing
**Solution**: Add `...Shadows.subtle` or use stronger shadow

**Problem**: Spacing looks weird
**Solution**: Use same `Spacing.*` token as similar components

**Problem**: Component looks different from theme
**Solution**: Make sure using `palette.surface`, `palette.text`, etc.

**Problem**: Border still visible
**Solution**: Check you removed `borderWidth` AND `borderColor`

---

## 📚 Reference Files

Keep these open:
1. `lib/design-tokens.ts` - All available tokens
2. `lib/minimalist-themes.ts` - All colors/themes
3. Already updated components - Use as examples
   - `features/notepad/components/entity-list.styles.ts`
   - `features/notepad/components/add-item-modal.styles.ts`
   - `features/navigation/app-footer.styles.ts`

---

## 💡 Pro Tips

1. **Update in batches** - Do similar components together (all cards first)
2. **Use Find/Replace** - Much faster for common replacements
3. **Compare before/after** - Check your file against example files
4. **Test each mode** - Always check both light and dark
5. **Copy good examples** - Don't reinvent, use existing patterns

---

**Time per component**: 2-5 minutes
**Total project**: 2-3 days
**Result**: Professional minimalist design ✨

---

**Version**: 1.0.0
**Print**: Yes! Keep this handy while working.
