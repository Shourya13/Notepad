import { useFocusEffect } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system/legacy';
import { startTransition, useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';

import { AppStore } from './types';
import { createEmptyStore } from './utils';

import { normalizeThemePreferences } from '@/lib/themes';

const STORAGE_KEY = 'notepad-data-v1';
const STORAGE_FILE_URI = FileSystem.documentDirectory
  ? `${FileSystem.documentDirectory}${STORAGE_KEY}.json`
  : null;

const tryParseStore = (rawValue: string | null): AppStore => {
  if (!rawValue) {
    return createEmptyStore();
  }

  try {
    const parsed = JSON.parse(rawValue) as Partial<AppStore>;
    return {
      notes: Array.isArray(parsed.notes) ? parsed.notes : [],
      todos: Array.isArray(parsed.todos) ? parsed.todos : [],
      shopping: Array.isArray(parsed.shopping) ? parsed.shopping : [],
      links: Array.isArray(parsed.links) ? parsed.links : [],
      recipes: Array.isArray(parsed.recipes) ? parsed.recipes : [],
      preferences: normalizeThemePreferences(parsed.preferences),
    };
  } catch {
    return createEmptyStore();
  }
};

const readPersistedStore = async (): Promise<AppStore> => {
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
    return tryParseStore(window.localStorage.getItem(STORAGE_KEY));
  }

  if (!STORAGE_FILE_URI) {
    return createEmptyStore();
  }

  const info = await FileSystem.getInfoAsync(STORAGE_FILE_URI);
  if (!info.exists) {
    return createEmptyStore();
  }

  const fileContent = await FileSystem.readAsStringAsync(STORAGE_FILE_URI);
  return tryParseStore(fileContent);
};

const persistStore = async (value: AppStore) => {
  const payload = JSON.stringify(value);

  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.setItem(STORAGE_KEY, payload);
    return;
  }

  if (!STORAGE_FILE_URI) {
    return;
  }

  await FileSystem.writeAsStringAsync(STORAGE_FILE_URI, payload);
};

export function useNotepadStore() {
  const [store, setStore] = useState<AppStore>(createEmptyStore);
  const [isHydrated, setIsHydrated] = useState(false);
  const [storageError, setStorageError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const hydrate = async () => {
      try {
        const persisted = await readPersistedStore();
        if (cancelled) {
          return;
        }
        startTransition(() => {
          setStore(persisted);
          setStorageError(null);
          setIsHydrated(true);
        });
      } catch {
        if (cancelled) {
          return;
        }
        startTransition(() => {
          setStore(createEmptyStore());
          setStorageError('Saved data could not be loaded. New changes will still work.');
          setIsHydrated(true);
        });
      }
    };

    void hydrate();

    return () => {
      cancelled = true;
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;

      const syncStore = async () => {
        try {
          const persisted = await readPersistedStore();
          if (cancelled) {
            return;
          }
          startTransition(() => {
            setStore(persisted);
          });
        } catch {
          // Keep in-memory state if sync fails.
        }
      };

      void syncStore();

      return () => {
        cancelled = true;
      };
    }, [])
  );

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    let cancelled = false;

    const save = async () => {
      try {
        await persistStore(store);
        if (cancelled) {
          return;
        }
        startTransition(() => {
          setStorageError(null);
        });
      } catch {
        if (cancelled) {
          return;
        }
        startTransition(() => {
          setStorageError('Saved data could not be updated. Try again after this change.');
        });
      }
    };

    void save();

    return () => {
      cancelled = true;
    };
  }, [isHydrated, store]);

  return {
    store,
    setStore,
    isHydrated,
    storageError,
  };
}
