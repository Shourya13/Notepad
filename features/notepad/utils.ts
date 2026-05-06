import { AppStore } from './types';

import { DEFAULT_THEME_PREFERENCES } from '@/lib/themes';

export const createEmptyStore = (): AppStore => ({
  notes: [],
  todos: [],
  shopping: [],
  links: [],
  preferences: DEFAULT_THEME_PREFERENCES,
});

export const nowIso = () => new Date().toISOString();

export const createId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export const reorderWithUpdate = <T extends { id: string }>(collection: T[], updatedItem: T): T[] => [
  updatedItem,
  ...collection.filter((item) => item.id !== updatedItem.id),
];

export const formatTime = (isoDate: string) => {
  const date = new Date(isoDate);
  return date.toLocaleString();
};

export const toOpenableUrl = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) {
    return "";
  }
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return `https://${trimmed}`;
};
