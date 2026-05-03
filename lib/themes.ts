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

export type ThemeId =
  | 'nord'
  | 'everforest'
  | 'catppuccin'
  | 'gruvbox'
  | 'ash-mauve'
  | 'charcoal-sand'
  | 'forest-clay'
  | 'storm-teal';

export type ThemeMode = 'system' | 'light' | 'dark';

export type ThemePreferences = {
  themeId: ThemeId;
  mode: ThemeMode;
};

export const THEME_IDS: ThemeId[] = [
  'nord',
  'everforest',
  'catppuccin',
  'gruvbox',
  'ash-mauve',
  'charcoal-sand',
  'forest-clay',
  'storm-teal',
];

export const THEME_MODES: ThemeMode[] = ['system', 'light', 'dark'];

export const DEFAULT_THEME_PREFERENCES: ThemePreferences = {
  themeId: 'nord',
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
  nord: {
    title: 'Nord',
    subtitle: 'Arctic minimal blues',
    sourceLabel: 'Nord',
    light: {
      background: '#eceff4',
      panel: '#e5e9f0',
      panelSoft: '#d8dee9',
      border: '#4c566a',
      text: '#2e3440',
      muted: '#4c566a',
      accent: '#5e81ac',
      accentSoft: '#d8dee9',
      danger: '#bf616a',
      dangerSoft: '#f2dfe2',
      success: '#a3be8c',
      successSoft: '#e3eddc',
      overlay: 'rgba(46, 52, 64, 0.34)',
    },
    dark: {
      background: '#2e3440',
      panel: '#3b4252',
      panelSoft: '#434c5e',
      border: '#4c566a',
      text: '#eceff4',
      muted: '#d8dee9',
      accent: '#88c0d0',
      accentSoft: '#434c5e',
      danger: '#bf616a',
      dangerSoft: '#5a2d33',
      success: '#a3be8c',
      successSoft: '#364732',
      overlay: 'rgba(16, 19, 24, 0.55)',
    },
  },
  everforest: {
    title: 'Everforest',
    subtitle: 'Warm low-contrast greens',
    sourceLabel: 'Everforest',
    light: {
      background: '#fffbef',
      panel: '#f8f5e4',
      panelSoft: '#f2efdf',
      border: '#bec5b2',
      text: '#5c6a72',
      muted: '#939f91',
      accent: '#3a94c5',
      accentSoft: '#ecf5ed',
      danger: '#f85552',
      dangerSoft: '#ffe7de',
      success: '#8da101',
      successSoft: '#f3f5d9',
      overlay: 'rgba(26, 36, 31, 0.3)',
    },
    dark: {
      background: '#272e33',
      panel: '#2e383c',
      panelSoft: '#374145',
      border: '#495156',
      text: '#d3c6aa',
      muted: '#859289',
      accent: '#7fbbb3',
      accentSoft: '#384b55',
      danger: '#e67e80',
      dangerSoft: '#4c3743',
      success: '#a7c080',
      successSoft: '#3c4841',
      overlay: 'rgba(9, 12, 13, 0.54)',
    },
  },
  catppuccin: {
    title: 'Catppuccin',
    subtitle: 'Soft pastel minimalism',
    sourceLabel: 'Catppuccin',
    light: {
      background: '#eff1f5',
      panel: '#e6e9ef',
      panelSoft: '#dce0e8',
      border: '#bcc0cc',
      text: '#4c4f69',
      muted: '#6c6f85',
      accent: '#1e66f5',
      accentSoft: '#ccd0da',
      danger: '#d20f39',
      dangerSoft: '#f2d7de',
      success: '#40a02b',
      successSoft: '#d6ecd1',
      overlay: 'rgba(76, 79, 105, 0.3)',
    },
    dark: {
      background: '#1e1e2e',
      panel: '#181825',
      panelSoft: '#313244',
      border: '#45475a',
      text: '#cdd6f4',
      muted: '#a6adc8',
      accent: '#89b4fa',
      accentSoft: '#313244',
      danger: '#f38ba8',
      dangerSoft: '#4c2e39',
      success: '#a6e3a1',
      successSoft: '#304836',
      overlay: 'rgba(8, 8, 14, 0.58)',
    },
  },
  gruvbox: {
    title: 'Gruvbox',
    subtitle: 'Retro warm minimal tones',
    sourceLabel: 'Gruvbox',
    light: {
      background: '#fbf1c7',
      panel: '#f2e5bc',
      panelSoft: '#ebdbb2',
      border: '#d5c4a1',
      text: '#3c3836',
      muted: '#7c6f64',
      accent: '#d65d0e',
      accentSoft: '#f2e5bc',
      danger: '#cc241d',
      dangerSoft: '#f4d6c4',
      success: '#98971a',
      successSoft: '#e8e4b0',
      overlay: 'rgba(60, 56, 54, 0.3)',
    },
    dark: {
      background: '#1d2021',
      panel: '#282828',
      panelSoft: '#32302f',
      border: '#504945',
      text: '#ebdbb2',
      muted: '#a89984',
      accent: '#fe8019',
      accentSoft: '#3c3836',
      danger: '#fb4934',
      dangerSoft: '#5f2f29',
      success: '#b8bb26',
      successSoft: '#3b4420',
      overlay: 'rgba(16, 14, 12, 0.56)',
    },
  },
  'ash-mauve': {
    title: 'Ash Mauve',
    subtitle: 'Muted plum neutrals',
    sourceLabel: 'Color Hunt',
    light: {
      background: '#d3dad9',
      panel: '#c6cecd',
      panelSoft: '#bcc4c3',
      border: '#715a5a',
      text: '#37353e',
      muted: '#44444e',
      accent: '#715a5a',
      accentSoft: '#b8c0bf',
      danger: '#b84f4f',
      dangerSoft: '#ecd8d8',
      success: '#4c6b59',
      successSoft: '#d8e4de',
      overlay: 'rgba(55, 53, 62, 0.28)',
    },
    dark: {
      background: '#37353e',
      panel: '#44444e',
      panelSoft: '#4f4f59',
      border: '#715a5a',
      text: '#d3dad9',
      muted: '#b7bfbe',
      accent: '#d3dad9',
      accentSoft: '#555560',
      danger: '#d27b7b',
      dangerSoft: '#5e4448',
      success: '#9bc7ab',
      successSoft: '#3c4b47',
      overlay: 'rgba(18, 18, 21, 0.56)',
    },
  },
  'charcoal-sand': {
    title: 'Charcoal Sand',
    subtitle: 'Smoky slate with warm sand',
    sourceLabel: 'Color Hunt',
    light: {
      background: '#dfd0b8',
      panel: '#d5c6af',
      panelSoft: '#ccbea8',
      border: '#948979',
      text: '#222831',
      muted: '#393e46',
      accent: '#393e46',
      accentSoft: '#c7ba9f',
      danger: '#b45145',
      dangerSoft: '#f0dbd2',
      success: '#486056',
      successSoft: '#dce8df',
      overlay: 'rgba(34, 40, 49, 0.3)',
    },
    dark: {
      background: '#222831',
      panel: '#393e46',
      panelSoft: '#454b55',
      border: '#948979',
      text: '#dfd0b8',
      muted: '#c5b8a2',
      accent: '#dfd0b8',
      accentSoft: '#4d545f',
      danger: '#e2877c',
      dangerSoft: '#5e3e3b',
      success: '#9ec8b9',
      successSoft: '#374a46',
      overlay: 'rgba(8, 10, 13, 0.58)',
    },
  },
  'forest-clay': {
    title: 'Forest Clay',
    subtitle: 'Earthy green minimal set',
    sourceLabel: 'Color Hunt',
    light: {
      background: '#d6bd98',
      panel: '#cdb48f',
      panelSoft: '#c2aa86',
      border: '#677d6a',
      text: '#1a3636',
      muted: '#40534c',
      accent: '#40534c',
      accentSoft: '#bfa57f',
      danger: '#ad544f',
      dangerSoft: '#edd5cd',
      success: '#4f7058',
      successSoft: '#d5e2d6',
      overlay: 'rgba(26, 54, 54, 0.32)',
    },
    dark: {
      background: '#1a3636',
      panel: '#40534c',
      panelSoft: '#4b5f57',
      border: '#677d6a',
      text: '#d6bd98',
      muted: '#c6af8f',
      accent: '#d6bd98',
      accentSoft: '#566a61',
      danger: '#de8a7f',
      dangerSoft: '#62443f',
      success: '#9ac8a2',
      successSoft: '#345145',
      overlay: 'rgba(5, 14, 14, 0.56)',
    },
  },
  'storm-teal': {
    title: 'Storm Teal',
    subtitle: 'Cool graphite with muted teal',
    sourceLabel: 'Color Hunt',
    light: {
      background: '#78a083',
      panel: '#739a7d',
      panelSoft: '#6e9377',
      border: '#50727b',
      text: '#35374b',
      muted: '#344955',
      accent: '#344955',
      accentSoft: '#6a8f75',
      danger: '#a84646',
      dangerSoft: '#e6d1cf',
      success: '#2f6f5a',
      successSoft: '#cde2d7',
      overlay: 'rgba(36, 44, 59, 0.32)',
    },
    dark: {
      background: '#35374b',
      panel: '#344955',
      panelSoft: '#3f5965',
      border: '#50727b',
      text: '#78a083',
      muted: '#afc7b5',
      accent: '#78a083',
      accentSoft: '#3f5b66',
      danger: '#d78282',
      dangerSoft: '#5b3d43',
      success: '#9dd2bb',
      successSoft: '#32534f',
      overlay: 'rgba(15, 18, 26, 0.56)',
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
