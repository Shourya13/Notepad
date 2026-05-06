# Component Migration Guide

## Converting Components to Minimalist Design

This guide helps you update components from the old design (with borders) to the new minimalist design (with soft shadows).

---

## Quick Checklist

For each component file, follow this checklist:

- [ ] Replace `borderWidth: 1, borderColor: palette.border` with soft shadow
- [ ] Add `...Shadows.subtle` or appropriate shadow token
- [ ] Replace magic numbers with `Spacing.*` tokens
- [ ] Replace magic border radius with `BorderRadius.*` tokens
- [ ] Replace magic font sizes with `FontSizes.*` tokens
- [ ] Test in both light and dark modes
- [ ] Verify no hard borders remain
- [ ] Check shadows are visible on both platforms

---

## Migration Patterns

### Pattern 1: Card Component (Most Common)

**BEFORE:**
```typescript
import { StyleSheet } from 'react-native';

export const cardStyles = StyleSheet.create({
  card: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: palette.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: palette.panel,
  },
});
```

**AFTER:**
```typescript
import { StyleSheet } from 'react-native';
import { BorderRadius, Spacing, Shadows } from '@/lib/design-tokens';

export const cardStyles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    backgroundColor: palette.surface,
    ...Shadows.subtle,
  },
});
```

**Changes Made:**
- `borderWidth: 1, borderColor: palette.border` → `...Shadows.subtle`
- `borderRadius: 20` → `BorderRadius.lg` (16)
- `paddingHorizontal: 14` → `Spacing.md` (12)
- `paddingVertical: 12` → `Spacing.md` (12)
- `backgroundColor: palette.panel` → `palette.surface` (now meant for card backgrounds)

---

### Pattern 2: Button Component

**BEFORE:**
```typescript
submitButton: {
  marginTop: 2,
  borderRadius: 12,
  borderWidth: 0,
  paddingVertical: 12,
  backgroundColor: palette.accent,
},
```

**AFTER:**
```typescript
submitButton: {
  marginTop: Spacing.xs,
  borderRadius: BorderRadius.md,
  paddingVertical: Spacing.md,
  paddingHorizontal: Spacing.lg,
  backgroundColor: palette.accent,
  ...Shadows.subtle,
},
```

**Changes Made:**
- Added `...Shadows.subtle` for depth
- `marginTop: 2` → `Spacing.xs` (4)
- `borderRadius: 12` → `BorderRadius.md` (12, but now tokenized)
- Added `paddingHorizontal: Spacing.lg` for better button sizing
- Removed `borderWidth: 0` (unnecessary)

---

### Pattern 3: Input Field

**BEFORE:**
```typescript
input: {
  borderWidth: 1,
  borderColor: palette.border,
  borderRadius: 12,
  paddingHorizontal: 12,
  paddingVertical: 10,
  backgroundColor: palette.panel,
  fontSize: 15,
},
```

**AFTER:**
```typescript
input: {
  borderRadius: BorderRadius.md,
  paddingHorizontal: Spacing.md,
  paddingVertical: Spacing.md,
  backgroundColor: palette.surface,
  fontSize: FontSizes.base,
  ...Shadows.subtle,
},
```

**Changes Made:**
- `borderWidth: 1, borderColor: palette.border` → `...Shadows.subtle`
- `borderRadius: 12` → `BorderRadius.md` (12)
- `paddingHorizontal: 12, paddingVertical: 10` → `Spacing.md` (12)
- `backgroundColor: palette.panel` → `palette.surface`
- `fontSize: 15` → `FontSizes.base` (16)

---

### Pattern 4: Modal/Sheet

**BEFORE:**
```typescript
sheet: {
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  borderTopWidth: 1,
  borderTopColor: palette.border,
  paddingHorizontal: 16,
  paddingTop: 14,
  paddingBottom: 24,
},
```

**AFTER:**
```typescript
sheet: {
  borderTopLeftRadius: BorderRadius.xl,
  borderTopRightRadius: BorderRadius.xl,
  paddingHorizontal: Spacing.lg,
  paddingTop: Spacing.md,
  paddingBottom: Spacing.xxl,
  backgroundColor: palette.background,
  ...Shadows.elevated,
},
```

**Changes Made:**
- Removed `borderTopWidth: 1, borderTopColor: palette.border`
- Added `...Shadows.elevated` for prominent modal shadow
- `borderTopLeftRadius: 20` → `BorderRadius.xl` (20)
- `paddingHorizontal: 16` → `Spacing.lg` (16)
- `paddingTop: 14` → `Spacing.md` (12)
- `paddingBottom: 24` → `Spacing.xxl` (24)

---

### Pattern 5: Empty State

**BEFORE:**
```typescript
emptyState: {
  borderRadius: 20,
  borderWidth: 1,
  borderColor: palette.border,
  paddingHorizontal: 16,
  paddingVertical: 16,
  backgroundColor: palette.panel,
},
```

**AFTER:**
```typescript
emptyState: {
  borderRadius: BorderRadius.lg,
  paddingHorizontal: Spacing.lg,
  paddingVertical: Spacing.lg,
  backgroundColor: palette.surface,
  ...Shadows.subtle,
},
```

---

## Component Files to Update

### Priority 1 (Already Updated ✅)
- ✅ `features/notepad/components/entity-list.styles.ts`
- ✅ `features/notepad/components/add-item-modal.styles.ts`
- ✅ `features/navigation/app-footer.styles.ts`

### Priority 2 (Check These)
- [ ] `features/links/components/link-item-modal.styles.ts`
- [ ] Any other `.styles.ts` files with borders

### Priority 3 (Review)
- [ ] Inline styles in `.tsx` files (should use StyleSheet)
- [ ] Any component with `borderColor: palette.border`

---

## Testing Checklist

After updating each component:

1. **Visual Test**
   - [ ] Component renders without errors
   - [ ] Shadows are visible
   - [ ] Text is readable (good contrast)
   - [ ] Spacing looks balanced

2. **Light Mode**
   - [ ] All elements visible
   - [ ] Shadows not too harsh
   - [ ] Colors match theme

3. **Dark Mode**
   - [ ] All elements visible
   - [ ] Shadows not too strong
   - [ ] Colors match theme

4. **Interaction**
   - [ ] Buttons are pressable
   - [ ] Inputs are focusable
   - [ ] No visual glitches on press

5. **Cross-Platform**
   - [ ] iOS looks correct (shadows)
   - [ ] Android looks correct (elevation)
   - [ ] Web looks correct (shadows)

---

## Common Issues & Solutions

### Issue: Shadows Don't Appear

**Problem**: The shadow is there but not visible.

**Solution**: Check shadow opacity and ensure contrast with background.

```typescript
// Check if background color is too dark
// Light background: subtle shadow works
// Dark background: may need stronger shadow

// Ensure the platform supports shadows
// Android: elevation must be > 0
// iOS: shadowOpacity must be > 0
```

### Issue: Spacing Looks Wrong

**Problem**: Components have inconsistent spacing.

**Solution**: Use `Spacing.*` consistently.

```typescript
// ✅ CORRECT - Consistent spacing scale
padding: Spacing.md,
gap: Spacing.md,
marginTop: Spacing.lg,

// ❌ WRONG - Mixed spacing styles
padding: 12,
gap: 10,
marginTop: 16,
```

### Issue: Border Radius Inconsistent

**Problem**: Different components have different rounding.

**Solution**: Use `BorderRadius.*` tokens.

```typescript
// ✅ CORRECT - Consistent rounding
borderRadius: BorderRadius.md,  // 12px

// ❌ WRONG - Inconsistent rounding
borderRadius: 10,  // Different everywhere
borderRadius: 14,
borderRadius: 12,
```

---

## Style File Template

Use this template when creating new `.styles.ts` files:

```typescript
import { StyleSheet } from 'react-native';
import { Fonts } from '@/constants/theme';
import { 
  Spacing, 
  BorderRadius, 
  Shadows, 
  FontSizes,
  ComponentSizes 
} from '@/lib/design-tokens';

export const myComponentStyles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
  },
  card: {
    backgroundColor: '#placeholder-use-palette-color',
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    ...Shadows.subtle,
  },
  heading: {
    fontSize: FontSizes.xl,
    fontWeight: '600',
    fontFamily: Fonts.rounded,
    marginBottom: Spacing.md,
  },
  button: {
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    minHeight: ComponentSizes.buttonMd,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.subtle,
  },
});
```

---

## Gradual Migration Strategy

If updating all components at once is overwhelming:

### Phase 1 (Week 1): Core Components
- Update card and list item styles
- Update modal/sheet styles
- Update button styles

### Phase 2 (Week 2): Forms
- Update input field styles
- Update form container styles
- Add proper focus states

### Phase 3 (Week 3): Polish
- Update remaining components
- Test all interactions
- Fine-tune shadows and spacing
- Update app footer and navigation

### Phase 4 (Week 4): QA
- Full app testing
- Cross-platform testing
- User feedback collection

---

## Need Help?

Refer to:
- `DESIGN_SYSTEM.md` - Full design system documentation
- `lib/design-tokens.ts` - Token definitions
- `lib/minimalist-themes.ts` - Theme definitions
- Already updated components as examples

---

**Version**: 1.0.0
**Status**: 🟢 Ready to Use
