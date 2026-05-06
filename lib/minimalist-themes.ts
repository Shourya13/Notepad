import { ColorSchemeName } from 'react-native';

export type UiPalette = {
  // Core colors
  background: string;
  surface: string;           // Cards, inputs, surfaces (soft, no borders)
  surfaceHover: string;      // Hover state for cards
  surfacePressed: string;    // Pressed state for cards
  text: string;
  textSecondary: string;
  textTertiary: string;      // Muted/placeholder text
  
  // Accent colors
  accent: string;
  accentLight: string;       // Light variant for backgrounds
  
  // Semantic colors
  success: string;
  successLight: string;
  warning: string;
  warningLight: string;
  danger: string;
  dangerLight: string;
  
  // Utility
  overlay: string;
  shadow: string;            // For neumorphic shadows
};

export type MinimalistThemeId = 
  | 'pure-light'
  | 'pure-dark'
  | 'warm-neutral'
  | 'cool-modern'
  | 'monochrome-plus';

export type ThemeMode = 'system' | 'light' | 'dark';

export type ThemePreferences = {
  themeId: MinimalistThemeId;
  mode: ThemeMode;
};

export const THEME_IDS: MinimalistThemeId[] = [
  'pure-light',
  'pure-dark',
  'warm-neutral',
  'cool-modern',
  'monochrome-plus',
];

export const THEME_MODES: ThemeMode[] = ['system', 'light', 'dark'];

export const DEFAULT_THEME_PREFERENCES: ThemePreferences = {
  themeId: 'pure-light',
  mode: 'system',
};

/**
 * Minimalist design system with:
 * - Soft shadows instead of borders
 * - Neumorphic-inspired depth
 * - Clean typography hierarchy
 * - Consistent spacing and sizing
 */
export const minimalistThemes: Record<
  MinimalistThemeId,
  {
    title: string;
    subtitle: string;
    light: UiPalette;
    dark: UiPalette;
  }
> = {
  'pure-light': {
    title: 'Pure Light',
    subtitle: 'Clean and minimal whites',
    light: {
      // Light Mode
      background: '#ffffff',
      surface: '#f8f9fa',
      surfaceHover: '#f1f3f5',
      surfacePressed: '#e9ecef',
      text: '#1a1a1a',
      textSecondary: '#4a4a4a',
      textTertiary: '#9ca3af',
      accent: '#3b82f6',
      accentLight: '#dbeafe',
      success: '#10b981',
      successLight: '#d1fae5',
      warning: '#f59e0b',
      warningLight: '#fef3c7',
      danger: '#ef4444',
      dangerLight: '#fee2e2',
      overlay: 'rgba(0, 0, 0, 0.12)',
      shadow: 'rgba(0, 0, 0, 0.08)',
    },
    dark: {
      // Dark Mode
      background: '#0f0f0f',
      surface: '#1a1a1a',
      surfaceHover: '#262626',
      surfacePressed: '#2d2d2d',
      text: '#ffffff',
      textSecondary: '#d4d4d4',
      textTertiary: '#6b7280',
      accent: '#60a5fa',
      accentLight: '#1e3a8a',
      success: '#34d399',
      successLight: '#064e3b',
      warning: '#fbbf24',
      warningLight: '#78350f',
      danger: '#f87171',
      dangerLight: '#7f1d1d',
      overlay: 'rgba(0, 0, 0, 0.40)',
      shadow: 'rgba(0, 0, 0, 0.30)',
    },
  },

  'warm-neutral': {
    title: 'Warm Neutral',
    subtitle: 'Cream, beige, and sand tones',
    light: {
      background: '#fef9f3',
      surface: '#faf6f0',
      surfaceHover: '#f5f1ea',
      surfacePressed: '#f0ece5',
      text: '#2d2420',
      textSecondary: '#5a4a40',
      textTertiary: '#a89987',
      accent: '#c4743d',
      accentLight: '#ead5c1',
      success: '#6b8e23',
      successLight: '#e8f0d6',
      warning: '#d97706',
      warningLight: '#fef3c7',
      danger: '#d1401c',
      dangerLight: '#fee2e2',
      overlay: 'rgba(45, 36, 32, 0.12)',
      shadow: 'rgba(45, 36, 32, 0.08)',
    },
    dark: {
      background: '#1a1410',
      surface: '#252220',
      surfaceHover: '#2f2b28',
      surfacePressed: '#3a3531',
      text: '#faf6f0',
      textSecondary: '#e8ddd2',
      textTertiary: '#998e7f',
      accent: '#e5a868',
      accentLight: '#5d3d1f',
      success: '#b8d448',
      successLight: '#3d4925',
      warning: '#fbbf24',
      warningLight: '#78350f',
      danger: '#f97316',
      dangerLight: '#7c2d12',
      overlay: 'rgba(0, 0, 0, 0.40)',
      shadow: 'rgba(0, 0, 0, 0.30)',
    },
  },

  'cool-modern': {
    title: 'Cool Modern',
    subtitle: 'Blues, teals, and modern accents',
    light: {
      background: '#f0f7ff',
      surface: '#f5faff',
      surfaceHover: '#ecf2ff',
      surfacePressed: '#e3ebf8',
      text: '#0c1f3a',
      textSecondary: '#1f3a52',
      textTertiary: '#7a8fa3',
      accent: '#0ea5e9',
      accentLight: '#cffafe',
      success: '#059669',
      successLight: '#d1fae5',
      warning: '#f59e0b',
      warningLight: '#fef3c7',
      danger: '#dc2626',
      dangerLight: '#fee2e2',
      overlay: 'rgba(12, 31, 58, 0.12)',
      shadow: 'rgba(12, 31, 58, 0.08)',
    },
    dark: {
      background: '#0a1628',
      surface: '#0f1f35',
      surfaceHover: '#1a2f48',
      surfacePressed: '#243a52',
      text: '#f0f7ff',
      textSecondary: '#d4e1f0',
      textTertiary: '#7a91a8',
      accent: '#38bdf8',
      accentLight: '#082f49',
      success: '#6ee7b7',
      successLight: '#0f3d2f',
      warning: '#fbbf24',
      warningLight: '#78350f',
      danger: '#f87171',
      dangerLight: '#7f1d1d',
      overlay: 'rgba(0, 0, 0, 0.40)',
      shadow: 'rgba(0, 0, 0, 0.30)',
    },
  },

  'monochrome-plus': {
    title: 'Monochrome+',
    subtitle: 'Grayscale with vibrant accent',
    light: {
      background: '#fafafa',
      surface: '#f5f5f5',
      surfaceHover: '#eeeeee',
      surfacePressed: '#e8e8e8',
      text: '#212121',
      textSecondary: '#424242',
      textTertiary: '#9e9e9e',
      accent: '#d32f2f',
      accentLight: '#ffebee',
      success: '#388e3c',
      successLight: '#e8f5e9',
      warning: '#f57f17',
      warningLight: '#fff8e1',
      danger: '#c62828',
      dangerLight: '#ffebee',
      overlay: 'rgba(33, 33, 33, 0.12)',
      shadow: 'rgba(33, 33, 33, 0.08)',
    },
    dark: {
      background: '#121212',
      surface: '#1e1e1e',
      surfaceHover: '#2a2a2a',
      surfacePressed: '#333333',
      text: '#ffffff',
      textSecondary: '#e0e0e0',
      textTertiary: '#757575',
      accent: '#ff6b6b',
      accentLight: '#4a1515',
      success: '#81c784',
      successLight: '#1b5e20',
      warning: '#ffb74d',
      warningLight: '#f57f17',
      danger: '#ef5350',
      dangerLight: '#5a0000',
      overlay: 'rgba(0, 0, 0, 0.40)',
      shadow: 'rgba(0, 0, 0, 0.30)',
    },
  },

  'pure-dark': {
    title: 'Pure Dark',
    subtitle: 'Deep dark with soft accents',
    light: {
      background: '#f5f5f5',
      surface: '#ffffff',
      surfaceHover: '#f9f9f9',
      surfacePressed: '#f0f0f0',
      text: '#1a1a1a',
      textSecondary: '#4a4a4a',
      textTertiary: '#9ca3af',
      accent: '#6366f1',
      accentLight: '#e0e7ff',
      success: '#16a34a',
      successLight: '#dcfce7',
      warning: '#ea580c',
      warningLight: '#fed7aa',
      danger: '#dc2626',
      dangerLight: '#fee2e2',
      overlay: 'rgba(0, 0, 0, 0.12)',
      shadow: 'rgba(0, 0, 0, 0.08)',
    },
    dark: {
      background: '#000000',
      surface: '#0a0a0a',
      surfaceHover: '#1a1a1a',
      surfacePressed: '#262626',
      text: '#f5f5f5',
      textSecondary: '#d4d4d4',
      textTertiary: '#737373',
      accent: '#818cf8',
      accentLight: '#312e81',
      success: '#4ade80',
      successLight: '#15803d',
      warning: '#fb923c',
      warningLight: '#7c2d12',
      danger: '#fca5a5',
      dangerLight: '#7f1d1d',
      overlay: 'rgba(0, 0, 0, 0.50)',
      shadow: 'rgba(0, 0, 0, 0.40)',
    },
  },
};

export const normalizeThemePreferences = (
  value: Partial<ThemePreferences> | null | undefined
): ThemePreferences => {
  const themeId = value?.themeId;
  const mode = value?.mode;

  return {
    themeId: THEME_IDS.includes(themeId as MinimalistThemeId)
      ? (themeId as MinimalistThemeId)
      : DEFAULT_THEME_PREFERENCES.themeId,
    mode: THEME_MODES.includes(mode as ThemeMode) ? (mode as ThemeMode) : DEFAULT_THEME_PREFERENCES.mode,
  };
};

export const resolveThemeMode = (
  mode: ThemeMode,
  systemColorScheme: ColorSchemeName
): Exclude<ThemeMode, 'system'> => {
  if (mode === 'system') {
    return systemColorScheme === 'dark' ? 'dark' : 'light';
  }
  return mode;
};
