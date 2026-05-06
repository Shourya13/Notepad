import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
    Animated,
    Easing,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Fonts } from "@/constants/theme";
import { AppFooter, FooterKey } from "@/features/navigation/app-footer";
import { AddItemModal } from "@/features/notepad/components/add-item-modal";
import { EntityList } from "@/features/notepad/components/entity-list";
import { SectionKey, sectionMeta } from "@/features/notepad/types";
import { useNotepadEntities } from "@/features/notepad/use-notepad-entities";
import { useNotepadStore } from "@/features/notepad/use-notepad-store";
import { RecipeList } from "@/features/recipes/components/recipe-list";
import { useRecipes } from "@/features/recipes/use-recipes";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { minimalThemes, resolveThemeMode } from "@/lib/themes";
import { indexStyles as styles } from "./index.styles";

export default function NotepadApp() {
  const systemColorScheme = useColorScheme();
  const router = useRouter();

  const [activeSection, setActiveSection] = useState<SectionKey>("notes");
  const [menuOpen, setMenuOpen] = useState(false);
  const [itemModalOpen, setItemModalOpen] = useState(false);
  const menuProgress = useRef(new Animated.Value(0)).current;

  const { store, setStore, isHydrated, storageError } = useNotepadStore();
  const entities = useNotepadEntities(store, setStore);
  const recipesApi = useRecipes(store, setStore);

  const preferences = store.preferences;
  const resolvedThemeMode = resolveThemeMode(
    preferences.mode,
    systemColorScheme,
  );
  const activeTheme = minimalThemes[preferences.themeId];
  const palette = activeTheme[resolvedThemeMode];
  const isDark = resolvedThemeMode === "dark";

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
    activeSection === "notes"
      ? `${store.notes.length} notes`
      : activeSection === "todos"
        ? `${todoOpenCount} open | ${todoDoneCount} done`
        : activeSection === "shopping"
          ? `${store.shopping.length} items`
          : activeSection === "recipes"
            ? `${store.recipes.length} recipes`
            : `${store.links.length} links`;

  const activeMeta = sectionMeta[activeSection];

  const switchSection = (section: SectionKey) => {
    setActiveSection(section);
    setMenuOpen(false);
  };

  const onFooterPress = (key: FooterKey) => {
    setActiveSection(key);
  };

  const openComposer = () => {
    if (activeSection === "recipes") {
      const recipe = recipesApi.createRecipe();
      router.push({ pathname: "/recipe/[id]", params: { id: recipe.id } });
      return;
    }
    setItemModalOpen(true);
  };

  const closeComposer = () => {
    if (activeSection === "notes") {
      entities.cancelNoteEdit();
    } else if (activeSection === "todos") {
      entities.cancelTodoEdit();
    } else if (activeSection === "shopping") {
      entities.cancelShoppingEdit();
    } else {
      entities.cancelLinkEdit();
    }
    setItemModalOpen(false);
  };

  const submitFromModal = () => {
    if (activeSection === "notes") {
      const isEditing = !!entities.editingNoteId;
      const saved = entities.handleNoteSubmit();
      // Close only when saving an existing note, not when adding new ones
      if (saved && isEditing) {
        setItemModalOpen(false);
      }
      return;
    }
    if (activeSection === "todos") {
      const isEditing = !!entities.editingTodoId;
      const saved = entities.handleTodoSubmit();
      if (saved && isEditing) {
        setItemModalOpen(false);
      }
      return;
    }

    if (activeSection === "shopping") {
      const isEditing = !!entities.editingShoppingId;
      const saved = entities.handleShoppingSubmit();
      if (saved && isEditing) {
        setItemModalOpen(false);
      }
      return;
    }

    const isEditing = !!entities.linkEditingId;
    const saved = entities.handleLinkSubmit();
    if (saved && isEditing) {
      setItemModalOpen(false);
    }
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: palette.background }]}
      edges={["top", "bottom"]}
    >
      <StatusBar style={isDark ? "light" : "dark"} />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.select({
          ios: "padding",
          default: "height",
        })}
      >
        <View style={styles.headerRow}>
          <Pressable
            accessibilityLabel="Open functionality menu"
            onPress={() => setMenuOpen(true)}
            style={[
              styles.iconButton,
              { backgroundColor: palette.panel },
            ]}
          >
            <MaterialIcons color={palette.text} name="menu" size={22} />
          </Pressable>

          <View style={styles.headerTitleWrap}>
            <Text
              style={[
                styles.headerTitle,
                { color: palette.text, fontFamily: Fonts.rounded },
              ]}
            >
              {activeMeta.title}
            </Text>
            <Text style={[styles.headerSubtitle, { color: palette.muted }]}>
              {activeCountLabel}
            </Text>
          </View>
        </View>

        {storageError ? (
          <View
            style={[
              styles.warningBox,
              {
                backgroundColor: palette.dangerSoft,
                borderColor: palette.danger,
              },
            ]}
          >
            <Text style={[styles.warningText, { color: palette.danger }]}>
              {storageError}
            </Text>
          </View>
        ) : null}

        {activeSection !== "recipes" ? (
          <View
            style={[
              styles.searchWrap,
              { backgroundColor: palette.panel },
            ]}
          >
            <MaterialIcons color={palette.muted} name="search" size={18} />
            {activeSection === "notes" ? (
            <TextInput
              onChangeText={entities.setNoteSearch}
              placeholder="Search notes..."
              placeholderTextColor={palette.muted}
              style={[styles.searchInput, { color: palette.text }]}
              value={entities.noteSearch}
            />
          ) : null}
          {activeSection === "todos" ? (
            <TextInput
              onChangeText={entities.setTodoSearch}
              placeholder="Search tasks..."
              placeholderTextColor={palette.muted}
              style={[styles.searchInput, { color: palette.text }]}
              value={entities.todoSearch}
            />
          ) : null}
          {activeSection === "shopping" ? (
            <TextInput
              onChangeText={entities.setShoppingSearch}
              placeholder="Search shopping..."
              placeholderTextColor={palette.muted}
              style={[styles.searchInput, { color: palette.text }]}
              value={entities.shoppingSearch}
            />
          ) : null}
          {activeSection === "links" ? (
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={entities.setLinkSearch}
              placeholder="Search links..."
              placeholderTextColor={palette.muted}
              style={[styles.searchInput, { color: palette.text }]}
              value={entities.linkSearch}
            />
          ) : null}
          </View>
        ) : null}

        {activeSection === "recipes" ? (
          <RecipeList
            recipes={recipesApi.recipes}
            isHydrated={isHydrated}
            palette={palette}
            onOpen={(recipe) =>
              router.push({ pathname: "/recipe/[id]", params: { id: recipe.id } })
            }
            onDelete={recipesApi.deleteRecipe}
          />
        ) : (
          <EntityList
          activeSection={activeSection}
          isHydrated={isHydrated}
          palette={palette}
          notes={entities.notes}
          todos={entities.todos}
          links={entities.links}
          shoppingItems={entities.shoppingItems}
          deferredNoteSearch={entities.deferredNoteSearch}
          deferredTodoSearch={entities.deferredTodoSearch}
          deferredLinkSearch={entities.deferredLinkSearch}
          deferredShoppingSearch={entities.deferredShoppingSearch}
          onEditNote={(item) => {
            entities.editNote(item);
            setItemModalOpen(true);
          }}
          onDeleteNote={entities.deleteNote}
          onEditTodo={(item) => {
            entities.editTodo(item);
            setItemModalOpen(true);
          }}
          onDeleteTodo={entities.deleteTodo}
          onToggleTodo={entities.toggleTodo}
          onEditShopping={(item) => {
            entities.editShopping(item);
            setItemModalOpen(true);
          }}
          onDeleteShopping={entities.deleteShopping}
          onEditLink={(item) => {
            entities.editLink(item);
            setItemModalOpen(true);
          }}
          onDeleteLink={entities.deleteLink}
        />
        )}

        <Pressable
          onPress={openComposer}
          style={[styles.fabButton, { backgroundColor: palette.accent }]}
        >
          <MaterialIcons color="#fff" name="add" size={26} />
        </Pressable>

        <AppFooter
          activeKey={activeSection}
          palette={palette}
          onPress={onFooterPress}
        />

        <AddItemModal
          visible={itemModalOpen}
          activeSection={activeSection}
          palette={palette}
          noteTitle={entities.noteTitle}
          noteBody={entities.noteBody}
          editingNoteId={entities.editingNoteId}
          todoTitle={entities.todoTitle}
          editingTodoId={entities.editingTodoId}
          shoppingLabel={entities.shoppingLabel}
          shoppingQuantity={entities.shoppingQuantity}
          editingShoppingId={entities.editingShoppingId}
          linkUrlInput={entities.linkUrlInput}
          linkDescriptionInput={entities.linkDescriptionInput}
          linkEditingId={entities.linkEditingId}
          setNoteTitle={entities.setNoteTitle}
          setNoteBody={entities.setNoteBody}
          setTodoTitle={entities.setTodoTitle}
          setShoppingLabel={entities.setShoppingLabel}
          setShoppingQuantity={entities.setShoppingQuantity}
          setLinkUrlInput={entities.setLinkUrlInput}
          setLinkDescriptionInput={entities.setLinkDescriptionInput}
          onClose={closeComposer}
          onSubmitNote={submitFromModal}
          onSubmitTodo={submitFromModal}
          onSubmitShopping={submitFromModal}
          onSubmitLink={submitFromModal}
        />

        <View
          pointerEvents={menuOpen ? "auto" : "none"}
          style={StyleSheet.absoluteFill}
        >
          <Animated.View
            style={[
              styles.menuOverlay,
              { backgroundColor: palette.overlay, opacity: menuOverlayOpacity },
            ]}
          >
            <Pressable onPress={() => setMenuOpen(false)} style={styles.flex} />
          </Animated.View>
          <Animated.View
            style={[
              styles.drawer,
              {
                backgroundColor: palette.panel,
                shadowColor: '#000',
                shadowOffset: { width: 4, height: 0 },
                shadowOpacity: 0.14,
                shadowRadius: 16,
                elevation: 10,
                transform: [{ translateX: menuTranslateX }],
              },
            ]}
          >
            <Text
              style={[
                styles.drawerTitle,
                { color: palette.text, fontFamily: Fonts.rounded },
              ]}
            >
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
                      backgroundColor: active
                        ? palette.accentSoft
                        : palette.panelSoft,
                    },
                  ]}
                >
                  <MaterialIcons
                    color={active ? palette.accent : palette.muted}
                    name={meta.icon}
                    size={20}
                  />
                  <Text
                    style={[
                      styles.drawerItemText,
                      { color: active ? palette.text : palette.muted },
                    ]}
                  >
                    {meta.title}
                  </Text>
                </Pressable>
              );
            })}

            <View
              style={[styles.drawerBlock, { borderTopColor: palette.border }]}
            >
              <Text style={[styles.drawerBlockTitle, { color: palette.text }]}>
                Theme
              </Text>
              <Pressable
                onPress={() => {
                  setMenuOpen(false);
                  router.push("/themes");
                }}
                style={[
                  styles.drawerItem,
                  { backgroundColor: palette.panelSoft },
                ]}
              >
                <MaterialIcons color={palette.muted} name="palette" size={20} />
                <View style={styles.drawerThemeActionTextWrap}>
                  <Text
                    style={[styles.drawerItemText, { color: palette.text }]}
                  >
                    Theme Settings
                  </Text>
                  <Text
                    style={[
                      styles.drawerThemeActionSubtext,
                      { color: palette.muted },
                    ]}
                  >
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
