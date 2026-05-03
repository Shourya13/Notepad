import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { ThemeMode, minimalThemes } from '@/lib/themes';

export type SectionKey = 'notes' | 'todos' | 'shopping';

export type NoteItem = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
};

export type TodoItem = {
  id: string;
  title: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ShoppingItem = {
  id: string;
  label: string;
  createdAt: string;
  updatedAt: string;
};

export type LinkItem = {
  id: string;
  url: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type ThemePreferences = {
  themeId: keyof typeof minimalThemes;
  mode: ThemeMode;
};

export type AppStore = {
  notes: NoteItem[];
  todos: TodoItem[];
  shopping: ShoppingItem[];
  links: LinkItem[];
  preferences: ThemePreferences;
};

export const sectionMeta: Record<
  SectionKey,
  { title: string; icon: keyof typeof MaterialIcons.glyphMap }
> = {
  notes: {
    title: 'Notepad',
    icon: 'sticky-note-2',
  },
  todos: {
    title: 'Todo List',
    icon: 'checklist',
  },
  shopping: {
    title: 'Shopping List',
    icon: 'shopping-cart',
  },
};
