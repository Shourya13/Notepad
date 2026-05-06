import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Linking from "expo-linking";
import { Pressable, ScrollView, Text, View } from "react-native";

import {
  LinkItem,
  NoteItem,
  SectionKey,
  ShoppingItem,
  TodoItem,
} from "../types";
import { formatTime, toOpenableUrl } from "../utils";

import { UiPalette } from "@/lib/themes";
import { entityListStyles as styles } from "./entity-list.styles";

type Props = {
  activeSection: SectionKey;
  isHydrated: boolean;
  palette: UiPalette;
  notes: NoteItem[];
  todos: TodoItem[];
  links: LinkItem[];
  shoppingItems: ShoppingItem[];
  deferredNoteSearch: string;
  deferredTodoSearch: string;
  deferredShoppingSearch: string;
  deferredLinkSearch: string;
  onEditNote: (item: NoteItem) => void;
  onDeleteNote: (id: string) => void;
  onEditTodo: (item: TodoItem) => void;
  onDeleteTodo: (id: string) => void;
  onToggleTodo: (id: string) => void;
  onEditShopping: (item: ShoppingItem) => void;
  onDeleteShopping: (id: string) => void;
  onEditLink: (item: LinkItem) => void;
  onDeleteLink: (id: string) => void;
};

export function EntityList({
  activeSection,
  isHydrated,
  palette,
  notes,
  todos,
  links,
  shoppingItems,
  deferredNoteSearch,
  deferredTodoSearch,
  deferredShoppingSearch,
  deferredLinkSearch,
  onEditNote,
  onDeleteNote,
  onEditTodo,
  onDeleteTodo,
  onToggleTodo,
  onEditShopping,
  onDeleteShopping,
  onEditLink,
  onDeleteLink,
}: Props) {
  const openLink = async (url: string) => {
    const target = toOpenableUrl(url);
    if (!target) {
      return;
    }

    try {
      await Linking.openURL(target);
    } catch {
      // Invalid or unsupported links can still be edited or removed.
    }
  };

  return (
    <View style={styles.listArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {!isHydrated ? (
          <View
            style={[
              styles.emptyState,
              { backgroundColor: palette.panel, borderColor: palette.border },
            ]}
          >
            <Text style={[styles.emptyText, { color: palette.text }]}>
              Loading saved data...
            </Text>
          </View>
        ) : null}

        {isHydrated && activeSection === "notes" ? (
          notes.length === 0 ? (
            <View
              style={[
                styles.emptyState,
                { backgroundColor: palette.panel, borderColor: palette.border },
              ]}
            >
              <Text style={[styles.emptyText, { color: palette.text }]}>
                {deferredNoteSearch
                  ? "No notes match this search."
                  : "No notes yet. Tap + to add your first note."}
              </Text>
            </View>
          ) : (
            notes.map((item) => (
              <View
                key={item.id}
                style={[
                  styles.card,
                  {
                    backgroundColor: palette.panel,
                    borderColor: palette.border,
                  },
                ]}
              >
                <View style={styles.cardTopRow}>
                  <View
                    style={[
                      styles.leadingIconWrap,
                      { backgroundColor: "#ffffff" },
                    ]}
                  >
                    <MaterialIcons
                      color={palette.accent}
                      name="sticky-note-2"
                      size={18}
                    />
                  </View>
                  <View style={styles.cardTextWrap}>
                    <Text
                      style={[styles.cardTitle, { color: palette.text }]}
                      numberOfLines={1}
                    >
                      {item.title}
                    </Text>
                    <Text
                      style={[styles.cardSubtext, { color: palette.muted }]}
                      numberOfLines={2}
                    >
                      {item.body || "No content"}
                    </Text>
                  </View>
                  <View style={styles.actionsCol}>
                    <Pressable
                      onPress={() => onEditNote(item)}
                      style={styles.iconTapArea}
                    >
                      <MaterialIcons
                        color={palette.text}
                        name="edit"
                        size={18}
                      />
                    </Pressable>
                    <Pressable
                      onPress={() => onDeleteNote(item.id)}
                      style={styles.iconTapArea}
                    >
                      <MaterialIcons
                        color={palette.danger}
                        name="close"
                        size={18}
                      />
                    </Pressable>
                  </View>
                </View>
                <Text style={[styles.timeText, { color: palette.muted }]}>
                  {formatTime(item.updatedAt)}
                </Text>
              </View>
            ))
          )
        ) : null}

        {isHydrated && activeSection === "todos" ? (
          todos.length === 0 ? (
            <View
              style={[
                styles.emptyState,
                { backgroundColor: palette.panel, borderColor: palette.border },
              ]}
            >
              <Text style={[styles.emptyText, { color: palette.text }]}>
                {deferredTodoSearch
                  ? "No tasks match this search."
                  : "No tasks yet. Tap + to add your first task."}
              </Text>
            </View>
          ) : (
            todos.map((item) => (
              <View
                key={item.id}
                style={[
                  styles.card,
                  {
                    backgroundColor: palette.panel,
                    borderColor: palette.border,
                  },
                ]}
              >
                <View style={styles.cardTopRow}>
                  <View
                    style={[
                      styles.leadingIconWrap,
                      { backgroundColor: "#ffffff" },
                    ]}
                  >
                    <MaterialIcons
                      color={item.done ? palette.success : palette.accent}
                      name="checklist"
                      size={18}
                    />
                  </View>
                  <View style={styles.cardTextWrap}>
                    <Text
                      style={[
                        styles.cardTitle,
                        {
                          color: palette.text,
                          textDecorationLine: item.done
                            ? "line-through"
                            : "none",
                        },
                      ]}
                      numberOfLines={1}
                    >
                      {item.title}
                    </Text>
                    <Text
                      style={[styles.cardSubtext, { color: palette.muted }]}
                    >
                      {item.done ? "Done" : "Open"}
                    </Text>
                  </View>
                  <View style={styles.actionsCol}>
                    <Pressable
                      onPress={() => onToggleTodo(item.id)}
                      style={styles.iconTapArea}
                    >
                      <MaterialIcons
                        color={item.done ? palette.success : palette.accent}
                        name="done"
                        size={18}
                      />
                    </Pressable>
                    <Pressable
                      onPress={() => onEditTodo(item)}
                      style={styles.iconTapArea}
                    >
                      <MaterialIcons
                        color={palette.text}
                        name="edit"
                        size={18}
                      />
                    </Pressable>
                    <Pressable
                      onPress={() => onDeleteTodo(item.id)}
                      style={styles.iconTapArea}
                    >
                      <MaterialIcons
                        color={palette.danger}
                        name="close"
                        size={18}
                      />
                    </Pressable>
                  </View>
                </View>
                <Text style={[styles.timeText, { color: palette.muted }]}>
                  {formatTime(item.updatedAt)}
                </Text>
              </View>
            ))
          )
        ) : null}

        {isHydrated && activeSection === "shopping" ? (
          shoppingItems.length === 0 ? (
            <View
              style={[
                styles.emptyState,
                { backgroundColor: palette.panel, borderColor: palette.border },
              ]}
            >
              <Text style={[styles.emptyText, { color: palette.text }]}>
                {deferredShoppingSearch
                  ? "No shopping items match this search."
                  : "No shopping items yet. Tap + to add your first item."}
              </Text>
            </View>
          ) : (
            shoppingItems.map((item) => (
              <View
                key={item.id}
                style={[
                  styles.card,
                  {
                    backgroundColor: palette.panel,
                    borderColor: palette.border,
                  },
                ]}
              >
                <View style={styles.cardTopRow}>
                  <View
                    style={[
                      styles.leadingIconWrap,
                      { backgroundColor: "#ffffff" },
                    ]}
                  >
                    <MaterialIcons
                      color={palette.accent}
                      name="shopping-cart"
                      size={18}
                    />
                  </View>
                  <View style={styles.cardTextWrap}>
                    <Text
                      style={[styles.cardTitle, { color: palette.text }]}
                      numberOfLines={1}
                    >
                      {item.label}
                    </Text>
                    <Text
                      style={[styles.cardSubtext, { color: palette.muted }]}
                    >
                      Shopping item
                    </Text>
                  </View>
                  <View style={styles.actionsCol}>
                    <Pressable
                      onPress={() => onEditShopping(item)}
                      style={styles.iconTapArea}
                    >
                      <MaterialIcons
                        color={palette.text}
                        name="edit"
                        size={18}
                      />
                    </Pressable>
                    <Pressable
                      onPress={() => onDeleteShopping(item.id)}
                      style={styles.iconTapArea}
                    >
                      <MaterialIcons
                        color={palette.danger}
                        name="close"
                        size={18}
                      />
                    </Pressable>
                  </View>
                </View>
                <Text style={[styles.timeText, { color: palette.muted }]}>
                  {formatTime(item.updatedAt)}
                </Text>
              </View>
            ))
          )
        ) : null}

        {isHydrated && activeSection === "links" ? (
          links.length === 0 ? (
            <View
              style={[
                styles.emptyState,
                { backgroundColor: palette.panel, borderColor: palette.border },
              ]}
            >
              <Text style={[styles.emptyText, { color: palette.text }]}>
                {deferredLinkSearch
                  ? "No links match this search."
                  : "No links yet. Tap + to add your first link."}
              </Text>
            </View>
          ) : (
            links.map((item) => (
              <View
                key={item.id}
                style={[
                  styles.card,
                  {
                    backgroundColor: palette.panel,
                    borderColor: palette.border,
                  },
                ]}
              >
                <View style={styles.cardTopRow}>
                  <View
                    style={[
                      styles.leadingIconWrap,
                      { backgroundColor: "#ffffff" },
                    ]}
                  >
                    <MaterialIcons
                      color={palette.accent}
                      name="link"
                      size={18}
                    />
                  </View>
                  <View style={styles.cardTextWrap}>
                    <Pressable onPress={() => void openLink(item.url)}>
                      <Text
                        style={[styles.cardTitle, { color: palette.accent }]}
                        numberOfLines={1}
                      >
                        {item.url}
                      </Text>
                    </Pressable>
                    <Text
                      style={[styles.cardSubtext, { color: palette.muted }]}
                      numberOfLines={2}
                    >
                      {item.description || "No description"}
                    </Text>
                  </View>
                  <View style={styles.actionsCol}>
                    <Pressable
                      onPress={() => onEditLink(item)}
                      style={styles.iconTapArea}
                    >
                      <MaterialIcons
                        color={palette.text}
                        name="edit"
                        size={18}
                      />
                    </Pressable>
                    <Pressable
                      onPress={() => onDeleteLink(item.id)}
                      style={styles.iconTapArea}
                    >
                      <MaterialIcons
                        color={palette.danger}
                        name="close"
                        size={18}
                      />
                    </Pressable>
                  </View>
                </View>
                <Text style={[styles.timeText, { color: palette.muted }]}>
                  {formatTime(item.updatedAt)}
                </Text>
              </View>
            ))
          )
        ) : null}
      </ScrollView>
    </View>
  );
}
