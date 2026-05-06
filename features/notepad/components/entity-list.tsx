import * as Linking from "expo-linking";
import { ScrollView, Text, View } from "react-native";

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
import { SwipeableCard } from "./swipeable-card";

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
        {/* Loading State */}
        {!isHydrated && (
          <View
            style={[
              styles.emptyState,
              { backgroundColor: palette.panel },
            ]}
          >
            <Text style={[styles.emptyText, { color: palette.muted }]}>
              Loading saved data...
            </Text>
          </View>
        )}

        {/* NOTES SECTION */}
        {isHydrated && activeSection === "notes" && (
          <>
            {notes.length === 0 ? (
              <View
                style={[
                  styles.emptyState,
                  { backgroundColor: palette.panel },
                ]}
              >
                <Text style={[styles.emptyText, { color: palette.muted }]}>
                  {deferredNoteSearch
                    ? "No notes match this search."
                    : "No notes yet. Tap + to add your first note."}
                </Text>
              </View>
            ) : (
              notes.map((item) => (
                <SwipeableCard
                  key={item.id}
                  id={item.id}
                  icon="sticky-note-2"
                  iconColor={palette.accent}
                  title={item.title || "Untitled Note"}
                  subtitle={item.body?.slice(0, 50) || "No content"}
                  timestamp={formatTime(item.updatedAt)}
                  palette={palette}
                  onPress={() => onEditNote(item)}
                  onLeftSwipe={() => onDeleteNote(item.id)}
                  showDoneAction={false}
                />
              ))
            )}
          </>
        )}

        {/* TODOS SECTION */}
        {isHydrated && activeSection === "todos" && (
          <>
            {todos.length === 0 ? (
              <View
                style={[
                  styles.emptyState,
                  { backgroundColor: palette.panel },
                ]}
              >
                <Text style={[styles.emptyText, { color: palette.muted }]}>
                  {deferredTodoSearch
                    ? "No tasks match this search."
                    : "No tasks yet. Tap + to add your first task."}
                </Text>
              </View>
            ) : (
              todos.map((item) => (
                <SwipeableCard
                  key={item.id}
                  id={item.id}
                  icon="checklist"
                  iconColor={item.done ? palette.success : palette.accent}
                  title={item.title || "Untitled Task"}
                  subtitle={item.done ? "Completed" : "Pending"}
                  timestamp={formatTime(item.updatedAt)}
                  palette={palette}
                  isDone={item.done}
                  onPress={() => onEditTodo(item)}
                  onLeftSwipe={() => onDeleteTodo(item.id)}
                  onRightSwipe={() => onToggleTodo(item.id)}
                  showDoneAction={true}
                />
              ))
            )}
          </>
        )}

        {/* SHOPPING SECTION */}
        {isHydrated && activeSection === "shopping" && (
          <>
            {shoppingItems.length === 0 ? (
              <View
                style={[
                  styles.emptyState,
                  { backgroundColor: palette.panel },
                ]}
              >
                <Text style={[styles.emptyText, { color: palette.muted }]}>
                  {deferredShoppingSearch
                    ? "No shopping items match this search."
                    : "No shopping items yet. Tap + to add your first item."}
                </Text>
              </View>
            ) : (
              shoppingItems.map((item) => (
                <SwipeableCard
                  key={item.id}
                  id={item.id}
                  icon="shopping-cart"
                  iconColor={palette.accent}
                  title={item.label || "Untitled Item"}
                  subtitle="Shopping item"
                  timestamp={formatTime(item.updatedAt)}
                  palette={palette}
                  onPress={() => onEditShopping(item)}
                  onLeftSwipe={() => onDeleteShopping(item.id)}
                  showDoneAction={false}
                />
              ))
            )}
          </>
        )}

        {/* LINKS SECTION */}
        {isHydrated && activeSection === "links" && (
          <>
            {links.length === 0 ? (
              <View
                style={[
                  styles.emptyState,
                  { backgroundColor: palette.panel },
                ]}
              >
                <Text style={[styles.emptyText, { color: palette.muted }]}>
                  {deferredLinkSearch
                    ? "No links match this search."
                    : "No links yet. Tap + to add your first link."}
                </Text>
              </View>
            ) : (
              links.map((item) => (
                <SwipeableCard
                  key={item.id}
                  id={item.id}
                  icon="link"
                  iconColor={palette.accent}
                  title={item.url || "No URL"}
                  subtitle={item.description?.slice(0, 50) || "No description"}
                  timestamp={formatTime(item.updatedAt)}
                  palette={palette}
                  onPress={() => onEditLink(item)}
                  onLeftSwipe={() => onDeleteLink(item.id)}
                  showDoneAction={false}
                />
              ))
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}
