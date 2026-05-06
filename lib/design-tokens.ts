/**
 * Design Tokens for Minimalist Notepad
 * Provides consistent spacing, typography, shadows, and sizing
 */

import { Platform } from 'react-native';

// Spacing scale - based on 4px grid
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 48,
} as const;

// Border radius - soft, rounded corners
export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 999,
} as const;

// Shadows - neumorphic, soft shadows
export const Shadows = {
  // Subtle shadow for light surfaces
  subtle: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.06,
      shadowRadius: 3,
    },
    android: {
      elevation: 1,
    },
    default: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.06,
      shadowRadius: 3,
    },
  }),

  // Standard elevation shadow
  standard: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.10,
      shadowRadius: 4,
    },
    android: {
      elevation: 3,
    },
    default: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.10,
      shadowRadius: 4,
    },
  }),

  // Elevated shadow (modals, dropdowns)
  elevated: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
    },
    android: {
      elevation: 8,
    },
    default: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
    },
  }),

  // Interactive hover shadow (buttons, cards on hover)
  interactive: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.12,
      shadowRadius: 6,
    },
    android: {
      elevation: 5,
    },
    default: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.12,
      shadowRadius: 6,
    },
  }),

  // Inset shadow (neumorphic pressed state)
  inset: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
} as const;

// Typography scales
export const FontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 28,
  huge: 32,
} as const;

export const LineHeights = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.6,
  loose: 1.75,
} as const;

export const FontWeights = {
  light: '300' as const,
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
} as const;

// Z-index scale
export const ZIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  modal: 1300,
  popover: 1400,
  tooltip: 1500,
} as const;

// Opacity values
export const Opacity = {
  disabled: 0.5,
  hover: 0.8,
  pressed: 0.7,
  light: 0.1,
  medium: 0.5,
  strong: 0.8,
} as const;

// Transition/Animation values
export const Transitions = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

// Component-specific sizing
export const ComponentSizes = {
  // Button heights
  buttonSm: 32,
  buttonMd: 40,
  buttonLg: 48,

  // Input heights
  inputSm: 32,
  inputMd: 40,
  inputLg: 48,

  // Icon sizes
  iconXs: 16,
  iconSm: 20,
  iconMd: 24,
  iconLg: 28,
  iconXl: 32,

  // Card/Panel minimum heights
  cardMinHeight: 56,
  panelMinHeight: 48,

  // Touch target minimum
  touchTarget: 44,
} as const;
