import MaterialIcons from '@expo/vector-icons/MaterialIcons';
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
          <MaterialIcons name="arrow-back" size={18} color={palette.text} />
        </Pressable>
        <View style={styles.headerTextWrap}>
          <Text style={[styles.headerTitle, { color: palette.text, fontFamily: Fonts.rounded }]}>
            Appearance
          </Text>
          <Text style={[styles.headerSubtext, { color: palette.muted, fontFamily: Fonts.sans }]}>
            5 curated palettes · Inter typeface
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>

        {/* Mode selector */}
        <View style={styles.sectionLabel}>
          <Text style={[styles.sectionLabelText, { color: palette.muted, fontFamily: Fonts.mono }]}>
            COLOR MODE
          </Text>
        </View>
        <View style={[styles.card, { borderColor: palette.border, backgroundColor: palette.panel }]}>
          <View style={styles.modeRow}>
            {THEME_MODES.map((modeKey) => {
              const active = store.preferences.mode === modeKey;
              const icons = { system: 'brightness-auto', light: 'light-mode', dark: 'dark-mode' } as const;
              const modeLabel = modeKey === 'system' ? 'Auto' : modeKey === 'light' ? 'Light' : 'Dark';
              return (
                <Pressable
                  key={modeKey}
                  onPress={() => void setMode(modeKey)}
                  style={[
                    styles.modeChip,
                    {
                      borderColor: active ? palette.accent : palette.border,
                      backgroundColor: active ? palette.accentSoft : 'transparent',
                    },
                  ]}>
                  <MaterialIcons
                    name={icons[modeKey]}
                    size={16}
                    color={active ? palette.accent : palette.muted}
                  />
                  <Text style={[
                    styles.modeChipText,
                    {
                      color: active ? palette.text : palette.muted,
                      fontFamily: Fonts.sans,
                      fontWeight: active ? '600' : '400',
                    },
                  ]}>
                    {modeLabel}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Theme list */}
        <View style={styles.sectionLabel}>
          <Text style={[styles.sectionLabelText, { color: palette.muted, fontFamily: Fonts.mono }]}>
            PALETTE
          </Text>
        </View>
        <View style={styles.themeList}>
          {THEME_IDS.map((themeId) => {
            const item = minimalThemes[themeId];
            const active = store.preferences.themeId === themeId;
            const lightSwatch = item.light;
            const darkSwatch = item.dark;

            return (
              <Pressable
                key={themeId}
                onPress={() => void setTheme(themeId)}
                style={[
                  styles.themeItem,
                  {
                    borderColor: active ? palette.accent : palette.border,
                    backgroundColor: active ? palette.accentSoft : palette.panel,
                  },
                ]}>
                <View style={styles.themeTopRow}>
                  <View style={styles.themeTitleWrap}>
                    <Text style={[
                      styles.themeTitle,
                      { color: palette.text, fontFamily: Fonts.rounded, fontWeight: active ? '700' : '500' }
                    ]}>
                      {item.title}
                    </Text>
                    <Text style={[styles.themeSubtext, { color: palette.muted, fontFamily: Fonts.sans }]}>
                      {item.subtitle}
                    </Text>
                  </View>
                  {active && (
                    <MaterialIcons name="check-circle" size={20} color={palette.accent} />
                  )}
                </View>

                {/* Light + Dark swatch pair */}
                <View style={styles.swatchPair}>
                  <View style={styles.swatchHalf}>
                    <View style={[styles.swatchDot, { backgroundColor: lightSwatch.background }]} />
                    <View style={[styles.swatchDot, { backgroundColor: lightSwatch.panel }]} />
                    <View style={[styles.swatchDot, styles.swatchDotLarge, { backgroundColor: lightSwatch.accent }]} />
                    <View style={[styles.swatchDot, { backgroundColor: lightSwatch.text }]} />
                  </View>
                  <View style={[styles.swatchDivider, { backgroundColor: palette.border }]} />
                  <View style={styles.swatchHalf}>
                    <View style={[styles.swatchDot, { backgroundColor: darkSwatch.background }]} />
                    <View style={[styles.swatchDot, { backgroundColor: darkSwatch.panel }]} />
                    <View style={[styles.swatchDot, styles.swatchDotLarge, { backgroundColor: darkSwatch.accent }]} />
                    <View style={[styles.swatchDot, { backgroundColor: darkSwatch.text }]} />
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>

        {!isHydrated ? (
          <Text style={[styles.loadingText, { color: palette.muted, fontFamily: Fonts.mono }]}>
            Loading...
          </Text>
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
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 6,
  },
  backButton: {
    width: 38,
    height: 38,
    borderWidth: 1,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextWrap: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '600',
    letterSpacing: -0.4,
  },
  headerSubtext: {
    fontSize: 12,
    lineHeight: 17,
    marginTop: 1,
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 6,
    paddingBottom: 40,
    gap: 6,
  },
  sectionLabel: {
    paddingHorizontal: 4,
    paddingTop: 14,
    paddingBottom: 6,
  },
  sectionLabelText: {
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 1.4,
    fontWeight: '600',
  },
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 6,
  },
  modeRow: {
    flexDirection: 'row',
    gap: 6,
  },
  modeChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  modeChipText: {
    fontSize: 13,
    lineHeight: 18,
  },
  themeList: {
    gap: 8,
  },
  themeItem: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    gap: 12,
  },
  themeTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  themeTitleWrap: {
    flex: 1,
    gap: 2,
  },
  themeTitle: {
    fontSize: 16,
    lineHeight: 22,
  },
  themeSubtext: {
    fontSize: 12,
    lineHeight: 16,
    opacity: 0.8,
  },
  swatchPair: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  swatchHalf: {
    flex: 1,
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  swatchDivider: {
    width: 1,
    height: 20,
    borderRadius: 1,
    opacity: 0.4,
  },
  swatchDot: {
    width: 18,
    height: 18,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(128,128,128,0.15)',
  },
  swatchDotLarge: {
    width: 26,
    height: 26,
  },
  loadingText: {
    fontSize: 11,
    lineHeight: 16,
    textAlign: 'center',
    marginTop: 16,
    letterSpacing: 0.5,
  },
});
