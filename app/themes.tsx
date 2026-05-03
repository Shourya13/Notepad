import * as FileSystem from 'expo-file-system/legacy';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import {
  DEFAULT_THEME_PREFERENCES,
  THEME_IDS,
  THEME_MODES,
  ThemeMode,
  ThemePreferences,
  minimalThemes,
  normalizeThemePreferences,
  resolveThemeMode,
} from '@/lib/themes';

type PersistedStore = {
  notes: unknown[];
  todos: unknown[];
  shopping: unknown[];
  links: unknown[];
  preferences: ThemePreferences;
};

const STORAGE_KEY = 'notepad-data-v1';
const STORAGE_FILE_URI = FileSystem.documentDirectory
  ? `${FileSystem.documentDirectory}${STORAGE_KEY}.json`
  : null;

const createEmptyStore = (): PersistedStore => ({
  notes: [],
  todos: [],
  shopping: [],
  links: [],
  preferences: DEFAULT_THEME_PREFERENCES,
});

const tryParseStore = (rawValue: string | null): PersistedStore => {
  if (!rawValue) {
    return createEmptyStore();
  }

  try {
    const parsed = JSON.parse(rawValue) as Partial<PersistedStore>;
    return {
      notes: Array.isArray(parsed.notes) ? parsed.notes : [],
      todos: Array.isArray(parsed.todos) ? parsed.todos : [],
      shopping: Array.isArray(parsed.shopping) ? parsed.shopping : [],
      links: Array.isArray(parsed.links) ? parsed.links : [],
      preferences: normalizeThemePreferences(parsed.preferences),
    };
  } catch {
    return createEmptyStore();
  }
};

const readPersistedStore = async (): Promise<PersistedStore> => {
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

const persistStore = async (value: PersistedStore) => {
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

export default function ThemeSettingsScreen() {
  const router = useRouter();
  const systemColorScheme = useColorScheme();

  const [store, setStore] = useState<PersistedStore>(createEmptyStore);
  const [isHydrated, setIsHydrated] = useState(false);

  const resolvedMode = resolveThemeMode(store.preferences.mode, systemColorScheme);
  const activeTheme = minimalThemes[store.preferences.themeId];
  const palette = activeTheme[resolvedMode];
  const isDark = resolvedMode === 'dark';

  useEffect(() => {
    let cancelled = false;

    const hydrate = async () => {
      const persisted = await readPersistedStore();
      if (cancelled) {
        return;
      }
      setStore(persisted);
      setIsHydrated(true);
    };

    void hydrate();

    return () => {
      cancelled = true;
    };
  }, []);

  const savePreferences = async (preferences: ThemePreferences) => {
    const nextStore = { ...store, preferences };
    setStore(nextStore);
    await persistStore(nextStore);
  };

  const setMode = async (mode: ThemeMode) => {
    if (mode === store.preferences.mode) {
      return;
    }
    await savePreferences({
      ...store.preferences,
      mode,
    });
  };

  const setTheme = async (themeId: ThemePreferences['themeId']) => {
    if (themeId === store.preferences.themeId) {
      return;
    }
    await savePreferences({
      ...store.preferences,
      themeId,
    });
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: palette.background }]} edges={['top']}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      <View style={styles.headerRow}>
        <Pressable
          onPress={() => router.back()}
          style={[styles.backButton, { borderColor: palette.border, backgroundColor: palette.panel }]}>
          <Text style={[styles.backButtonText, { color: palette.text }]}>Back</Text>
        </Pressable>
        <View style={styles.headerTextWrap}>
          <Text style={[styles.headerTitle, { color: palette.text }]}>Theme Settings</Text>
          <Text style={[styles.headerSubtext, { color: palette.muted }]}>
            Minimal palettes with light and dark variants
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={[styles.card, { borderColor: palette.border, backgroundColor: palette.panel }]}>
          <Text style={[styles.cardTitle, { color: palette.text }]}>Mode</Text>
          <View style={styles.modeRow}>
            {THEME_MODES.map((modeKey) => {
              const active = store.preferences.mode === modeKey;
              const modeLabel =
                modeKey === 'system' ? 'System' : modeKey === 'light' ? 'Light' : 'Dark';
              return (
                <Pressable
                  key={modeKey}
                  onPress={() => void setMode(modeKey)}
                  style={[
                    styles.modeChip,
                    {
                      borderColor: active ? palette.accent : palette.border,
                      backgroundColor: active ? palette.accentSoft : palette.panelSoft,
                    },
                  ]}>
                  <Text style={[styles.modeChipText, { color: active ? palette.text : palette.muted }]}>
                    {modeLabel}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          <Text style={[styles.helpText, { color: palette.muted }]}>
            Active: {resolvedMode.toUpperCase()}
          </Text>
        </View>

        <View style={[styles.card, { borderColor: palette.border, backgroundColor: palette.panel }]}>
          <Text style={[styles.cardTitle, { color: palette.text }]}>Palettes</Text>
          {THEME_IDS.map((themeId) => {
            const item = minimalThemes[themeId];
            const active = store.preferences.themeId === themeId;
            const swatch = item[resolvedMode];

            return (
              <Pressable
                key={themeId}
                onPress={() => void setTheme(themeId)}
                style={[
                  styles.themeItem,
                  {
                    borderColor: active ? palette.accent : palette.border,
                    backgroundColor: active ? palette.accentSoft : palette.panelSoft,
                  },
                ]}>
                <View style={styles.themeTopRow}>
                  <Text style={[styles.themeTitle, { color: active ? palette.text : palette.muted }]}>
                    {item.title}
                  </Text>
                  <Text style={[styles.themeSource, { color: palette.muted }]}>{item.sourceLabel}</Text>
                </View>
                <Text style={[styles.themeSubtext, { color: palette.muted }]}>{item.subtitle}</Text>
                <View style={styles.swatchRow}>
                  <View style={[styles.swatch, { backgroundColor: swatch.background }]} />
                  <View style={[styles.swatch, { backgroundColor: swatch.panel }]} />
                  <View style={[styles.swatch, { backgroundColor: swatch.accent }]} />
                  <View style={[styles.swatch, { backgroundColor: swatch.text }]} />
                </View>
              </Pressable>
            );
          })}
        </View>

        {!isHydrated ? (
          <Text style={[styles.loadingText, { color: palette.muted }]}>Loading preferences...</Text>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  backButton: {
    borderWidth: 1,
    borderRadius: 11,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  backButtonText: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: Fonts.sans,
  },
  headerTextWrap: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    lineHeight: 30,
    fontFamily: Fonts.rounded,
  },
  headerSubtext: {
    fontSize: 13,
    lineHeight: 18,
    marginTop: 2,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
    gap: 12,
  },
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    gap: 10,
  },
  cardTitle: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: Fonts.rounded,
  },
  modeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  modeChip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  modeChipText: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: Fonts.sans,
  },
  helpText: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: Fonts.mono,
  },
  themeItem: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 11,
    gap: 6,
  },
  themeTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  themeTitle: {
    fontSize: 15,
    lineHeight: 20,
    fontFamily: Fonts.rounded,
  },
  themeSource: {
    fontSize: 11,
    lineHeight: 15,
    fontFamily: Fonts.mono,
    textTransform: 'uppercase',
  },
  themeSubtext: {
    fontSize: 12,
    lineHeight: 16,
  },
  swatchRow: {
    flexDirection: 'row',
    gap: 6,
  },
  swatch: {
    flex: 1,
    height: 10,
    borderRadius: 999,
  },
  loadingText: {
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
  },
});
