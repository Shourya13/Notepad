import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useRef, useState } from 'react';

import { BottomComposer } from '@/features/notepad/components/bottom-composer';
import { EntityList } from '@/features/notepad/components/entity-list';
import { SectionKey, sectionMeta } from '@/features/notepad/types';
import { useNotepadEntities } from '@/features/notepad/use-notepad-entities';
import { useNotepadStore } from '@/features/notepad/use-notepad-store';
import { Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { minimalThemes, resolveThemeMode } from '@/lib/themes';

export default function NotepadApp() {
  const systemColorScheme = useColorScheme();
  const router = useRouter();

  const [activeSection, setActiveSection] = useState<SectionKey>('notes');
  const [menuOpen, setMenuOpen] = useState(false);
  const menuProgress = useRef(new Animated.Value(0)).current;

  const { store, setStore, isHydrated, storageError } = useNotepadStore();
  const entities = useNotepadEntities(store, setStore);

  const preferences = store.preferences;
  const resolvedThemeMode = resolveThemeMode(preferences.mode, systemColorScheme);
  const activeTheme = minimalThemes[preferences.themeId];
  const palette = activeTheme[resolvedThemeMode];
  const isDark = resolvedThemeMode === 'dark';

  useEffect(() => {
    Animated.timing(menuProgress, {
      toValue: menuOpen ? 1 : 0,
      duration: menuOpen ? 240 : 180,
      easing: menuOpen ? Easing.out(Easing.cubic) : Easing.in(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, [menuOpen, menuProgress]);

  const menuTranslateX = menuProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [-280, 0],
  });

  const menuOverlayOpacity = menuProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const todoDoneCount = store.todos.filter((item) => item.done).length;
  const todoOpenCount = store.todos.length - todoDoneCount;
  const activeCountLabel =
    activeSection === 'notes'
      ? `${store.notes.length} notes`
      : activeSection === 'todos'
        ? `${todoOpenCount} open | ${todoDoneCount} done`
        : `${store.shopping.length} items`;

  const activeMeta = sectionMeta[activeSection];

  const switchSection = (section: SectionKey) => {
    setActiveSection(section);
    setMenuOpen(false);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: palette.background }]} edges={['top', 'bottom']}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.select({
          ios: 'padding',
          default: undefined,
        })}>
        <View style={styles.headerRow}>
          <Pressable
            accessibilityLabel="Open functionality menu"
            onPress={() => setMenuOpen(true)}
            style={[styles.iconButton, { backgroundColor: palette.panel, borderColor: palette.border }]}>
            <MaterialIcons color={palette.text} name="menu" size={22} />
          </Pressable>

          <View style={styles.headerTitleWrap}>
            <Text style={[styles.headerTitle, { color: palette.text, fontFamily: Fonts.rounded }]}>
              {activeMeta.title}
            </Text>
            <Text style={[styles.headerSubtitle, { color: palette.muted }]}>{activeCountLabel}</Text>
          </View>
        </View>

        {storageError ? (
          <View style={[styles.warningBox, { backgroundColor: palette.dangerSoft, borderColor: palette.danger }]}>
            <Text style={[styles.warningText, { color: palette.danger }]}>{storageError}</Text>
          </View>
        ) : null}

        <EntityList
          activeSection={activeSection}
          isHydrated={isHydrated}
          palette={palette}
          notes={entities.notes}
          todos={entities.todos}
          shoppingItems={entities.shoppingItems}
          deferredNoteSearch={entities.deferredNoteSearch}
          deferredTodoSearch={entities.deferredTodoSearch}
          deferredShoppingSearch={entities.deferredShoppingSearch}
          onEditNote={entities.editNote}
          onDeleteNote={entities.deleteNote}
          onEditTodo={entities.editTodo}
          onDeleteTodo={entities.deleteTodo}
          onToggleTodo={entities.toggleTodo}
          onEditShopping={entities.editShopping}
          onDeleteShopping={entities.deleteShopping}
        />

        <BottomComposer
          activeSection={activeSection}
          palette={palette}
          noteTitle={entities.noteTitle}
          noteBody={entities.noteBody}
          noteSearch={entities.noteSearch}
          editingNoteId={entities.editingNoteId}
          todoTitle={entities.todoTitle}
          todoSearch={entities.todoSearch}
          editingTodoId={entities.editingTodoId}
          shoppingLabel={entities.shoppingLabel}
          shoppingSearch={entities.shoppingSearch}
          editingShoppingId={entities.editingShoppingId}
          setNoteTitle={entities.setNoteTitle}
          setNoteBody={entities.setNoteBody}
          setNoteSearch={entities.setNoteSearch}
          setTodoTitle={entities.setTodoTitle}
          setTodoSearch={entities.setTodoSearch}
          setShoppingLabel={entities.setShoppingLabel}
          setShoppingSearch={entities.setShoppingSearch}
          onSubmitNote={entities.handleNoteSubmit}
          onCancelNoteEdit={entities.cancelNoteEdit}
          onSubmitTodo={entities.handleTodoSubmit}
          onCancelTodoEdit={entities.cancelTodoEdit}
          onSubmitShopping={entities.handleShoppingSubmit}
          onCancelShoppingEdit={entities.cancelShoppingEdit}
        />

        <View pointerEvents={menuOpen ? 'auto' : 'none'} style={StyleSheet.absoluteFill}>
          <Animated.View style={[styles.menuOverlay, { backgroundColor: palette.overlay, opacity: menuOverlayOpacity }]}>
            <Pressable onPress={() => setMenuOpen(false)} style={styles.flex} />
          </Animated.View>
          <Animated.View
            style={[
              styles.drawer,
              {
                backgroundColor: palette.panel,
                borderColor: palette.border,
                transform: [{ translateX: menuTranslateX }],
              },
            ]}>
            <Text style={[styles.drawerTitle, { color: palette.text, fontFamily: Fonts.rounded }]}>
              Functionalities
            </Text>
            {(Object.keys(sectionMeta) as SectionKey[]).map((sectionKey) => {
              const active = sectionKey === activeSection;
              const meta = sectionMeta[sectionKey];
              return (
                <Pressable
                  key={sectionKey}
                  onPress={() => switchSection(sectionKey)}
                  style={[
                    styles.drawerItem,
                    {
                      borderColor: active ? palette.accent : palette.border,
                      backgroundColor: active ? palette.accentSoft : palette.panelSoft,
                    },
                  ]}>
                  <MaterialIcons color={active ? palette.accent : palette.muted} name={meta.icon} size={20} />
                  <Text style={[styles.drawerItemText, { color: active ? palette.text : palette.muted }]}>
                    {meta.title}
                  </Text>
                </Pressable>
              );
            })}

            <View style={[styles.drawerBlock, { borderTopColor: palette.border }]}>
              <Text style={[styles.drawerBlockTitle, { color: palette.text }]}>Theme</Text>
              <Pressable
                onPress={() => {
                  setMenuOpen(false);
                  router.push('/themes');
                }}
                style={[
                  styles.drawerItem,
                  {
                    borderColor: palette.border,
                    backgroundColor: palette.panelSoft,
                  },
                ]}>
                <MaterialIcons color={palette.muted} name="palette" size={20} />
                <View style={styles.drawerThemeActionTextWrap}>
                  <Text style={[styles.drawerItemText, { color: palette.text }]}>Theme Settings</Text>
                  <Text style={[styles.drawerThemeActionSubtext, { color: palette.muted }]}>
                    {activeTheme.title} | {preferences.mode}
                  </Text>
                </View>
              </Pressable>
            </View>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleWrap: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    lineHeight: 30,
  },
  headerSubtitle: {
    marginTop: 2,
    fontSize: 13,
  },
  warningBox: {
    marginHorizontal: 16,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  warningText: {
    fontSize: 13,
    fontFamily: Fonts.sans,
  },
  menuOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 280,
    borderRightWidth: 1,
    paddingTop: 52,
    paddingHorizontal: 14,
    gap: 10,
  },
  drawerTitle: {
    fontSize: 20,
    lineHeight: 26,
    marginBottom: 6,
  },
  drawerItem: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  drawerItemText: {
    fontSize: 15,
    lineHeight: 20,
    fontFamily: Fonts.sans,
  },
  drawerBlock: {
    borderTopWidth: 1,
    marginTop: 6,
    paddingTop: 10,
    gap: 8,
  },
  drawerBlockTitle: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: Fonts.mono,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  drawerThemeActionTextWrap: {
    flex: 1,
  },
  drawerThemeActionSubtext: {
    fontSize: 12,
    lineHeight: 16,
  },
});
