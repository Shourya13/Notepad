import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { ActionKind } from './types';

type ActionMeta = {
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  defaultMin: number;
  tone: 'heat' | 'prep' | 'wait' | 'serve';
};

export const ACTION_CONFIG: Record<ActionKind, ActionMeta> = {
  saute: { label: 'Sauté', icon: 'local-fire-department', defaultMin: 5, tone: 'heat' },
  fry: { label: 'Fry', icon: 'outdoor-grill', defaultMin: 8, tone: 'heat' },
  boil: { label: 'Boil', icon: 'water-drop', defaultMin: 10, tone: 'heat' },
  bake: { label: 'Bake', icon: 'cake', defaultMin: 30, tone: 'heat' },
  simmer: { label: 'Simmer', icon: 'whatshot', defaultMin: 20, tone: 'heat' },
  roast: { label: 'Roast', icon: 'whatshot', defaultMin: 25, tone: 'heat' },
  mix: { label: 'Mix', icon: 'blender', defaultMin: 2, tone: 'prep' },
  chop: { label: 'Chop', icon: 'content-cut', defaultMin: 3, tone: 'prep' },
  rest: { label: 'Rest', icon: 'schedule', defaultMin: 10, tone: 'wait' },
  marinate: { label: 'Marinate', icon: 'hourglass-bottom', defaultMin: 30, tone: 'wait' },
  serve: { label: 'Serve', icon: 'restaurant', defaultMin: 0, tone: 'serve' },
};

export const ACTION_ORDER: ActionKind[] = [
  'chop',
  'mix',
  'saute',
  'fry',
  'boil',
  'simmer',
  'bake',
  'roast',
  'marinate',
  'rest',
  'serve',
];
