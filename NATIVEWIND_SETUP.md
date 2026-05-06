# NativeWind Setup Guide

## What is NativeWind?

NativeWind is a React Native styling library that brings Tailwind CSS utilities to React Native. It allows you to use familiar Tailwind class names instead of writing StyleSheet objects.

### Benefits

- **Familiar Syntax**: Write Tailwind classes like `className="p-4 rounded-lg"`
- **Consistency**: Enforces design tokens across the app
- **Faster Development**: Less boilerplate, more productivity
- **Better DX**: IntelliSense for style utilities
- **Maintainability**: Changes in one place affect all components

### Optional?

**NativeWind is OPTIONAL** for your project. You can:
- ✅ Use design tokens with StyleSheet (current approach)
- ✅ Use NativeWind with Tailwind classes
- ✅ Mix both approaches

The design system works great with **or without** NativeWind.

---

## Installation

### Step 1: Install Dependencies

```bash
cd c:\Users\shourya13\Desktop\Notepad

# Install NativeWind
npm install nativewind

# Install Tailwind CSS
npm install --save-dev tailwindcss
```

### Step 2: Initialize Tailwind

```bash
npx tailwindcss init
```

This creates `tailwind.config.js` in your project root.

---

## Configuration

### Step 1: Update `tailwind.config.js`

Replace the generated content with:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './features/**/*.{js,jsx,ts,tsx}',
    './hooks/**/*.{js,jsx,ts,tsx}',
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
      fontSize: {
        xs: '12px',
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '20px',
        xxl: '24px',
        xxxl: '28px',
        huge: '32px',
      },
      colors: {
        // Pure Light Theme (as example)
        primary: {
          light: '#f8f9fa',
          DEFAULT: '#3b82f6',
          dark: '#1a1a1a',
        },
        surface: {
          light: '#f8f9fa',
          lighter: '#f1f3f5',
          dark: '#1a1a1a',
        },
        text: {
          primary: '#1a1a1a',
          secondary: '#4a4a4a',
          tertiary: '#9ca3af',
        },
        success: {
          light: '#d1fae5',
          DEFAULT: '#10b981',
        },
        warning: {
          light: '#fef3c7',
          DEFAULT: '#f59e0b',
        },
        danger: {
          light: '#fee2e2',
          DEFAULT: '#ef4444',
        },
      },
      boxShadow: {
        subtle: '0 1px 3px rgba(0, 0, 0, 0.06)',
        standard: '0 2px 4px rgba(0, 0, 0, 0.10)',
        elevated: '0 4px 8px rgba(0, 0, 0, 0.15)',
        interactive: '0 3px 6px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
};
```

### Step 2: Create NativeWind Setup File

Create `lib/nativewind.ts`:

```typescript
import { useWindowDimensions } from 'react-native';

export function useNativewindClasses() {
  const { width, height } = useWindowDimensions();

  // Helper to conditionally apply classes based on screen size
  const getResponsiveClasses = (mobile: string, tablet: string) => {
    return width < 768 ? mobile : tablet;
  };

  return { getResponsiveClasses };
}

// Common class combinations (DRY)
export const commonClasses = {
  card: 'bg-surface rounded-lg p-md shadow-subtle',
  button: 'bg-accent rounded-md px-lg py-md shadow-subtle',
  input: 'bg-surface rounded-md px-md py-md shadow-subtle',
  modal: 'bg-background rounded-t-xl px-lg py-xxl shadow-elevated',
  emptyState: 'bg-surface rounded-lg px-lg py-lg shadow-subtle',
};
```

### Step 3: Enable NativeWind in Babel Config

Update `babel.config.js`:

```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'nativewind/babel',
        {
          web: true, // Enable for web
        },
      ],
    ],
  };
};
```

### Step 4: Update `tsconfig.json`

Add type declarations:

```json
{
  "compilerOptions": {
    // ... other options
    "types": ["nativewind/types"]
  }
}
```

---

## Usage Examples

### Before & After Comparison

#### Example 1: Card Component

**Before (StyleSheet only):**
```typescript
import { StyleSheet, View, Text } from 'react-native';
import { Spacing, BorderRadius, Shadows } from '@/lib/design-tokens';

export function NoteCard({ note, palette }) {
  return (
    <View style={[styles.card, { backgroundColor: palette.surface }]}>
      <Text style={[styles.title, { color: palette.text }]}>
        {note.title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    ...Shadows.subtle,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
});
```

**After (NativeWind):**
```typescript
import { View, Text } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';

export function NoteCard({ note }) {
  const bgColor = useThemeColor({}, 'surface');
  const textColor = useThemeColor({}, 'text');
  
  return (
    <View 
      className="bg-surface rounded-lg p-md shadow-subtle"
      style={{ backgroundColor: bgColor }}
    >
      <Text 
        className="text-lg font-semibold"
        style={{ color: textColor }}
      >
        {note.title}
      </Text>
    </View>
  );
}
```

#### Example 2: Button Component

**Before (StyleSheet):**
```typescript
const styles = StyleSheet.create({
  button: {
    backgroundColor: palette.accent,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    ...Shadows.subtle,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: '#fff',
  },
});
```

**After (NativeWind):**
```typescript
<Pressable className="bg-accent rounded-md px-lg py-md shadow-subtle justify-center items-center">
  <Text className="text-base font-semibold text-white">
    Submit
  </Text>
</Pressable>
```

#### Example 3: Complex Layout

**Before (StyleSheet):**
```typescript
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
  },
  header: {
    marginBottom: Spacing.lg,
  },
  list: {
    gap: Spacing.md,
  },
  card: {
    backgroundColor: palette.surface,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    ...Shadows.subtle,
  },
});

<View style={styles.container}>
  <View style={styles.header}>
    <Text>Title</Text>
  </View>
  <View style={styles.list}>
    {items.map(item => (
      <View key={item.id} style={styles.card}>
        <Text>{item.name}</Text>
      </View>
    ))}
  </View>
</View>
```

**After (NativeWind):**
```typescript
<View className="px-lg py-md gap-md">
  <View className="mb-lg">
    <Text>Title</Text>
  </View>
  <View className="gap-md">
    {items.map(item => (
      <View key={item.id} className="bg-surface rounded-lg p-md shadow-subtle">
        <Text>{item.name}</Text>
      </View>
    ))}
  </View>
</View>
```

---

## Advanced NativeWind Usage

### Creating Custom Classes

Create `styles/nativewind-classes.ts`:

```typescript
// Common component patterns
export const cardClass = 'bg-surface rounded-lg p-md shadow-subtle';
export const buttonClass = 'bg-accent rounded-md px-lg py-md shadow-subtle justify-center items-center';
export const inputClass = 'bg-surface rounded-md px-md py-md shadow-subtle';
export const emptyStateClass = 'bg-surface rounded-lg px-lg py-lg shadow-subtle items-center';

// Responsive helpers
export const getResponsiveClass = (width: number) => {
  return width < 600 ? 'px-md' : 'px-lg';
};
```

### Using Custom Classes

```typescript
import { cardClass } from '@/styles/nativewind-classes';

<View className={cardClass}>
  {/* Content */}
</View>
```

### With Conditional Styling

```typescript
<View className={`
  ${cardClass}
  ${isSelected ? 'bg-accent' : ''}
  ${isLoading ? 'opacity-50' : ''}
`}>
  {/* Content */}
</View>
```

---

## Migration Path

### Option 1: Pure NativeWind (Modern)

Use NativeWind for new components, gradually migrate old ones:

```
Week 1: New components only
Week 2-3: Migrate high-use components
Week 4: Finish remaining components
```

### Option 2: Hybrid (Recommended)

Mix StyleSheet with NativeWind based on complexity:

- ✅ Simple layouts → NativeWind classes
- ✅ Complex styling → StyleSheet with design tokens
- ✅ Platform-specific → StyleSheet (easier to read)

### Option 3: Keep StyleSheet (Current)

Continue using StyleSheet with design tokens:

- ✅ No build step required
- ✅ Maximum control
- ✅ Easy to understand
- ❌ More verbose

---

## Troubleshooting

### Issue: Classes Not Recognized

**Problem**: NativeWind classes don't apply styles.

**Solution**: 
1. Restart dev server: `npm start -- --clear`
2. Clear cache: `rm -rf node_modules/.cache`
3. Verify `babel.config.js` has NativeWind plugin

### Issue: Type Errors with `className`

**Problem**: TypeScript doesn't recognize `className` prop.

**Solution**: Update component to accept className:

```typescript
import { View, ViewProps } from 'react-native';

interface MyViewProps extends ViewProps {
  className?: string;
}

export function MyView({ className, ...props }: MyViewProps) {
  return <View className={className} {...props} />;
}
```

### Issue: Tailwind IntelliSense Not Working

**Problem**: VS Code doesn't autocomplete Tailwind classes.

**Solution**:
1. Install Tailwind CSS IntelliSense extension
2. Add to `settings.json`:

```json
{
  "tailwindCSS.classAttributes": ["className", "class"]
}
```

---

## Performance Considerations

NativeWind adds:
- Minimal bundle size (~50KB)
- Small runtime overhead
- Same performance as StyleSheet in most cases

**No performance concerns** for this use case.

---

## When to Use NativeWind vs StyleSheet

| Aspect | NativeWind | StyleSheet |
|--------|-----------|-----------|
| Learning Curve | Medium (Tailwind knowledge needed) | Low |
| Development Speed | Fast (classes pre-defined) | Medium |
| Debugging | Medium (classes vs objects) | Easy (clear objects) |
| File Size | Slightly larger | Smaller |
| Type Safety | Good | Excellent |
| Customization | Good (extend config) | Excellent |
| Platform Support | Good | Excellent |

---

## Recommendation

**For this project**: Use **Hybrid approach**

1. **Keep design tokens** for consistency
2. **Use NativeWind** for layouts and common patterns
3. **Use StyleSheet** for complex or platform-specific styling
4. **Document both** approaches in components

---

## Next Steps

1. ✅ Install NativeWind and Tailwind
2. ✅ Update `babel.config.js` and `tsconfig.json`
3. ✅ Create `tailwind.config.js` with custom tokens
4. ✅ Create helper file for common classes
5. ✅ Start using in new components
6. ✅ Gradually migrate existing components

---

**Setup Version**: 1.0.0
**Status**: 🟢 Ready
