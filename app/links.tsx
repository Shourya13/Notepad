import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { startTransition, useDeferredValue, useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { linksStyles as styles } from "./links.styles";

import { Fonts } from "@/constants/theme";
import { LinkItem } from "@/features/notepad/types";
import { useNotepadStore } from "@/features/notepad/use-notepad-store";
import { createId, nowIso, reorderWithUpdate } from "@/features/notepad/utils";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { minimalThemes, resolveThemeMode } from "@/lib/themes";

const toOpenableUrl = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) {
    return "";
  }
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return `https://${trimmed}`;
};

export default function LinksScreen() {
  const router = useRouter();
  const systemColorScheme = useColorScheme();

  const { store, setStore, isHydrated, storageError } = useNotepadStore();

  const [urlInput, setUrlInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const deferredSearch = useDeferredValue(search.trim().toLowerCase());

  const preferences = store.preferences;
  const resolvedThemeMode = resolveThemeMode(
    preferences.mode,
    systemColorScheme,
  );
  const activeTheme = minimalThemes[preferences.themeId];
  const palette = activeTheme[resolvedThemeMode];
  const isDark = resolvedThemeMode === "dark";

  const links = useMemo(
    () =>
      store.links
        .filter((item) => {
          if (!deferredSearch) {
            return true;
          }
          return (
            item.url.toLowerCase().includes(deferredSearch) ||
            item.description.toLowerCase().includes(deferredSearch)
          );
        })
        .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt)),
    [deferredSearch, store.links],
  );

  const clearComposer = () => {
    setUrlInput("");
    setDescriptionInput("");
    setEditingId(null);
  };

  const onSubmit = () => {
    const cleanUrl = toOpenableUrl(urlInput);
    const cleanDescription = descriptionInput.trim();
    if (!cleanUrl) {
      return;
    }

    if (editingId) {
      setStore((currentStore) => {
        const existing = currentStore.links.find(
          (item) => item.id === editingId,
        );
        if (!existing) {
          return currentStore;
        }
        const updated: LinkItem = {
          ...existing,
          url: cleanUrl,
          description: cleanDescription,
          updatedAt: nowIso(),
        };
        return {
          ...currentStore,
          links: reorderWithUpdate(currentStore.links, updated),
        };
      });
    } else {
      const timestamp = nowIso();
      const nextItem: LinkItem = {
        id: createId(),
        url: cleanUrl,
        description: cleanDescription,
        createdAt: timestamp,
        updatedAt: timestamp,
      };
      setStore((currentStore) => ({
        ...currentStore,
        links: [nextItem, ...currentStore.links],
      }));
    }

    clearComposer();
  };

  const onEdit = (item: LinkItem) => {
    setUrlInput(item.url);
    setDescriptionInput(item.description);
    setEditingId(item.id);
  };

  const onDelete = (id: string) => {
    setStore((currentStore) => ({
      ...currentStore,
      links: currentStore.links.filter((item) => item.id !== id),
    }));
    if (editingId === id) {
      clearComposer();
    }
  };

  const onOpen = async (url: string) => {
    const target = toOpenableUrl(url);
    if (!target) {
      return;
    }

    try {
      await Linking.openURL(target);
    } catch {
      startTransition(() => {
        // Keep this silent for now; invalid links are editable and removable.
      });
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
          default: undefined,
        })}
      >
        <View style={styles.headerRow}>
          <Pressable
            onPress={() => router.back()}
            style={[styles.backButton, { backgroundColor: palette.panel }]}
            accessibilityLabel="Go back"
          >
            <MaterialIcons color={palette.text} name="arrow-back" size={18} />
          </Pressable>
          <View style={styles.headerTextWrap}>
            <Text
              style={[
                styles.headerTitle,
                { color: palette.text, fontFamily: Fonts.rounded },
              ]}
            >
              Links
            </Text>
            <Text style={[styles.headerSubtitle, { color: palette.muted }]}>
              {store.links.length} saved links
            </Text>
          </View>
        </View>

        {storageError ? (
          <View
            style={[styles.warningBox, { backgroundColor: palette.dangerSoft }]}
          >
            <Text style={[styles.warningText, { color: palette.danger }]}>
              {storageError}
            </Text>
          </View>
        ) : null}

        <View style={styles.listArea}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {!isHydrated ? (
              <View
                style={[styles.emptyState, { backgroundColor: palette.panel }]}
              >
                <Text style={[styles.emptyText, { color: palette.muted }]}>
                  Loading saved links...
                </Text>
              </View>
            ) : null}

            {isHydrated && links.length === 0 ? (
              <View
                style={[styles.emptyState, { backgroundColor: palette.panel }]}
              >
                <Text style={[styles.emptyText, { color: palette.muted }]}>
                  {deferredSearch
                    ? "No links match this search."
                    : "No links yet. Add your first link below."}
                </Text>
              </View>
            ) : null}

            {links.map((item) => (
              <View
                key={item.id}
                style={[styles.linkCard, { backgroundColor: palette.panel }]}
              >
                <Pressable
                  onPress={() => void onOpen(item.url)}
                  style={styles.urlRow}
                >
                  <MaterialIcons color={palette.accent} name="link" size={16} />
                  <Text
                    numberOfLines={1}
                    style={[styles.urlText, { color: palette.accent }]}
                  >
                    {item.url}
                  </Text>
                </Pressable>
                <Text style={[styles.descriptionText, { color: palette.text }]}>
                  {item.description || "No description"}
                </Text>
                <View style={styles.cardFooter}>
                  <Text style={[styles.timeText, { color: palette.muted }]}>
                    {new Date(item.updatedAt).toLocaleString()}
                  </Text>
                  <View style={styles.rowActions}>
                    <Pressable
                      onPress={() => onEdit(item)}
                      style={styles.roundAction}
                    >
                      <MaterialIcons
                        color={palette.text}
                        name="edit"
                        size={16}
                      />
                    </Pressable>
                    <Pressable
                      onPress={() => onDelete(item.id)}
                      style={styles.roundAction}
                    >
                      <MaterialIcons
                        color={palette.danger}
                        name="delete-outline"
                        size={16}
                      />
                    </Pressable>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Floating Action Button for Add */}
        <Pressable
          onPress={() => setEditingId(null)}
          style={[styles.fabButton, { backgroundColor: palette.accent }]}
          accessibilityLabel="Add new link"
        >
          <MaterialIcons color="#fff" name="add" size={26} />
        </Pressable>

        {/* Bottom composer for adding/editing links */}
        {(editingId !== null || urlInput || descriptionInput) && (
          <View
            style={[styles.bottomDock, { backgroundColor: palette.background }]}
          >
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="url"
              onChangeText={setUrlInput}
              placeholder="https://example.com"
              placeholderTextColor={palette.muted}
              style={[
                styles.input,
                { color: palette.text, backgroundColor: palette.panel },
              ]}
              value={urlInput}
            />
            <View style={styles.bottomRow}>
              <TextInput
                multiline
                onChangeText={setDescriptionInput}
                placeholder="Short description..."
                placeholderTextColor={palette.muted}
                style={[
                  styles.messageInput,
                  { color: palette.text, backgroundColor: palette.panel },
                ]}
                textAlignVertical="top"
                value={descriptionInput}
              />
              <View style={styles.bottomActions}>
                <Pressable
                  onPress={onSubmit}
                  style={[styles.iconCta, { backgroundColor: palette.accent }]}
                >
                  <MaterialIcons
                    color="#fff"
                    name={editingId ? "save" : "add"}
                    size={18}
                  />
                </Pressable>
                {editingId ? (
                  <Pressable
                    onPress={clearComposer}
                    style={[
                      styles.iconGhost,
                      { backgroundColor: palette.panel },
                    ]}
                  >
                    <MaterialIcons
                      color={palette.text}
                      name="close"
                      size={18}
                    />
                  </Pressable>
                ) : null}
              </View>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
