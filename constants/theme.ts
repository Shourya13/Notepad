/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

// Font families — loaded via expo-google-fonts in _layout.tsx
export const FontFamily = {
  sans: 'Inter_400Regular',
  sansMedium: 'Inter_500Medium',
  sansSemibold: 'Inter_600SemiBold',
  sansBold: 'Inter_700Bold',
  mono: 'JetBrainsMono_400Regular',
  monoBold: 'JetBrainsMono_700Bold',
} as const;

// Fallback fonts when custom fonts haven't loaded yet
export const FontFamilyFallback = Platform.select({
  ios: {
    sans: 'system-ui',
    sansMedium: 'system-ui',
    sansSemibold: 'system-ui',
    sansBold: 'system-ui',
    mono: 'ui-monospace',
    monoBold: 'ui-monospace',
  },
  android: {
    sans: 'Roboto',
    sansMedium: 'Roboto',
    sansSemibold: 'Roboto',
    sansBold: 'Roboto',
    mono: 'monospace',
    monoBold: 'monospace',
  },
  default: {
    sans: 'normal',
    sansMedium: 'normal',
    sansSemibold: 'normal',
    sansBold: 'normal',
    mono: 'monospace',
    monoBold: 'monospace',
  },
}) as unknown as typeof FontFamily;

// Legacy Fonts alias — kept for backward compatibility
export const Fonts = Platform.select({
  ios: {
    sans: 'Inter_400Regular',
    serif: 'Georgia',
    rounded: 'Inter_600SemiBold',
    mono: 'JetBrainsMono_400Regular',
  },
  android: {
    sans: 'Inter_400Regular',
    serif: 'serif',
    rounded: 'Inter_600SemiBold',
    mono: 'JetBrainsMono_400Regular',
  },
  web: {
    sans: 'Inter_400Regular',
    serif: "Georgia, 'Times New Roman', serif",
    rounded: 'Inter_600SemiBold',
    mono: 'JetBrainsMono_400Regular',
  },
  default: {
    sans: 'Inter_400Regular',
    serif: 'serif',
    rounded: 'Inter_600SemiBold',
    mono: 'JetBrainsMono_400Regular',
  },
}) as { sans: string; serif: string; rounded: string; mono: string };
