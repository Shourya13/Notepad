import { ColorSchemeName } from 'react-native';

export type UiPalette = {
  background: string;
  panel: string;
  panelSoft: string;
  border: string;
  text: string;
  muted: string;
  accent: string;
  accentSoft: string;
  danger: string;
  dangerSoft: string;
  success: string;
  successSoft: string;
  overlay: string;
};

export type ThemeId = 'noir' | 'nord' | 'catppuccin' | 'ember' | 'sage';

export type ThemeMode = 'system' | 'light' | 'dark';

export type ThemePreferences = {
  themeId: ThemeId;
  mode: ThemeMode;
};

export const THEME_IDS: ThemeId[] = ['noir', 'nord', 'catppuccin', 'ember', 'sage'];

export const THEME_MODES: ThemeMode[] = ['system', 'light', 'dark'];

export const DEFAULT_THEME_PREFERENCES: ThemePreferences = {
  themeId: 'noir',
  mode: 'system',
};

export const minimalThemes: Record<
  ThemeId,
  {
    title: string;
    subtitle: string;
    sourceLabel: string;
    light: UiPalette;
    dark: UiPalette;
  }
> = {
  noir: {
    title: 'Noir',
    subtitle: 'Pure monochrome minimal',
    sourceLabel: 'Curated',
    light: {
      background: '#F2F2F4',
      panel: '#FFFFFF',
      panelSoft: '#F7F7F9',
      border: '#E8E8EC',
      text: '#111111',
      muted: '#888888',
      accent: '#3D5AFE',
      accentSoft: '#EEF0FF',
      danger: '#E53935',
      dangerSoft: '#FDECEA',
      success: '#2E7D32',
      successSoft: '#E8F5E9',
      overlay: 'rgba(0, 0, 0, 0.40)',
    },
    dark: {
      background: '#0D0D0D',
      panel: '#1A1A1A',
      panelSoft: '#252525',
      border: '#333333',
      text: '#F2F2F2',
      muted: '#6E6E6E',
      accent: '#8FA8FF',
      accentSoft: '#1A2040',
      danger: '#EF5350',
      dangerSoft: '#2D1212',
      success: '#66BB6A',
      successSoft: '#0E2812',
      overlay: 'rgba(0, 0, 0, 0.70)',
    },
  },
  nord: {
    title: 'Nord',
    subtitle: 'Arctic minimal blues',
    sourceLabel: 'Nord Project',
    light: {
      background: '#ECF0F8',
      panel: '#FFFFFF',
      panelSoft: '#F4F6FB',
      border: '#D8DEE9',
      text: '#2E3440',
      muted: '#60697A',
      accent: '#5E81AC',
      accentSoft: '#DDE7F5',
      danger: '#BF616A',
      dangerSoft: '#F5E0E2',
      success: '#4C7A4E',
      successSoft: '#E0EEE0',
      overlay: 'rgba(46, 52, 64, 0.45)',
    },
    dark: {
      background: '#2E3440',
      panel: '#3B4252',
      panelSoft: '#434C5E',
      border: '#4C566A',
      text: '#ECEFF4',
      muted: '#8B95A5',
      accent: '#88C0D0',
      accentSoft: '#374050',
      danger: '#BF616A',
      dangerSoft: '#5A2D33',
      success: '#A3BE8C',
      successSoft: '#364732',
      overlay: 'rgba(16, 19, 24, 0.60)',
    },
  },
  catppuccin: {
    title: 'Catppuccin',
    subtitle: 'Soft pastel warmth',
    sourceLabel: 'Catppuccin',
    light: {
      background: '#ECEEF5',
      panel: '#FFFFFF',
      panelSoft: '#F5F5FA',
      border: '#D0D3E0',
      text: '#4C4F69',
      muted: '#6C6F85',
      accent: '#1E66F5',
      accentSoft: '#DDE5FF',
      danger: '#D20F39',
      dangerSoft: '#FADDDF',
      success: '#40A02B',
      successSoft: '#D6ECD1',
      overlay: 'rgba(76, 79, 105, 0.45)',
    },
    dark: {
      background: '#1E1E2E',
      panel: '#181825',
      panelSoft: '#313244',
      border: '#45475A',
      text: '#CDD6F4',
      muted: '#A6ADC8',
      accent: '#89B4FA',
      accentSoft: '#2A3050',
      danger: '#F38BA8',
      dangerSoft: '#3D1520',
      success: '#A6E3A1',
      successSoft: '#1E3622',
      overlay: 'rgba(8, 8, 14, 0.65)',
    },
  },
  ember: {
    title: 'Ember',
    subtitle: 'Warm amber earth tones',
    sourceLabel: 'Curated',
    light: {
      background: '#F5EFE4',
      panel: '#FFFFFF',
      panelSoft: '#FDFAF4',
      border: '#E8D8BB',
      text: '#2C1A06',
      muted: '#8A7055',
      accent: '#C87000',
      accentSoft: '#FFF0CC',
      danger: '#C43820',
      dangerSoft: '#FDE8E2',
      success: '#4A8C2C',
      successSoft: '#E4F2DA',
      overlay: 'rgba(44, 26, 6, 0.45)',
    },
    dark: {
      background: '#1C1208',
      panel: '#28190A',
      panelSoft: '#34220E',
      border: '#4A3418',
      text: '#F0DCA0',
      muted: '#A08448',
      accent: '#E8A020',
      accentSoft: '#382608',
      danger: '#DC5A3C',
      dangerSoft: '#341410',
      success: '#70B84A',
      successSoft: '#162608',
      overlay: 'rgba(0, 0, 0, 0.70)',
    },
  },
  sage: {
    title: 'Sage',
    subtitle: 'Green forest calm',
    sourceLabel: 'Curated',
    light: {
      background: '#E8F0EA',
      panel: '#FFFFFF',
      panelSoft: '#F4F9F5',
      border: '#C4DAC8',
      text: '#1A2E1E',
      muted: '#5A7860',
      accent: '#2C7A44',
      accentSoft: '#D4EEE0',
      danger: '#C43040',
      dangerSoft: '#FCE4E8',
      success: '#24884C',
      successSoft: '#D4EEE0',
      overlay: 'rgba(26, 46, 30, 0.45)',
    },
    dark: {
      background: '#0E1A12',
      panel: '#162018',
      panelSoft: '#1E2E22',
      border: '#2C4834',
      text: '#C0DCC4',
      muted: '#5C8464',
      accent: '#5CBA78',
      accentSoft: '#14301C',
      danger: '#E05864',
      dangerSoft: '#2C1018',
      success: '#70D49A',
      successSoft: '#0E2E1E',
      overlay: 'rgba(0, 0, 0, 0.70)',
    },
  },
};

export const normalizeThemePreferences = (
  value: Partial<ThemePreferences> | null | undefined
): ThemePreferences => {
  const themeId = value?.themeId;
  const mode = value?.mode;

  return {
    themeId: THEME_IDS.includes(themeId as ThemeId)
      ? (themeId as ThemeId)
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
