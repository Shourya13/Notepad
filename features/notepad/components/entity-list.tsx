import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ScrollView, Text, View, Pressable, StyleSheet } from 'react-native';

import { NoteItem, SectionKey, ShoppingItem, TodoItem } from '../types';
import { formatTime } from '../utils';

import { Fonts } from '@/constants/theme';
import { UiPalette } from '@/lib/themes';

type Props = {
  activeSection: SectionKey;
  isHydrated: boolean;
  palette: UiPalette;
  notes: NoteItem[];
  todos: TodoItem[];
  shoppingItems: ShoppingItem[];
  deferredNoteSearch: string;
  deferredTodoSearch: string;
  deferredShoppingSearch: string;
  onEditNote: (item: NoteItem) => void;
  onDeleteNote: (id: string) => void;
  onEditTodo: (item: TodoItem) => void;
  onDeleteTodo: (id: string) => void;
  onToggleTodo: (id: string) => void;
  onEditShopping: (item: ShoppingItem) => void;
  onDeleteShopping: (id: string) => void;
};

export function EntityList({
  activeSection,
  isHydrated,
  palette,
  notes,
  todos,
  shoppingItems,
  deferredNoteSearch,
  deferredTodoSearch,
  deferredShoppingSearch,
  onEditNote,
  onDeleteNote,
  onEditTodo,
  onDeleteTodo,
  onToggleTodo,
  onEditShopping,
  onDeleteShopping,
}: Props) {
  return (
    <View style={styles.listArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        {!isHydrated ? (
          <View style={[styles.emptyState, { backgroundColor: palette.panel, borderColor: palette.border }]}>
            <Text style={[styles.emptyText, { color: palette.muted }]}>Loading saved data...</Text>
          </View>
        ) : null}

        {isHydrated && activeSection === 'notes'
          ? notes.length === 0
            ? (
                <View style={[styles.emptyState, { backgroundColor: palette.panel, borderColor: palette.border }]}>
                  <Text style={[styles.emptyText, { color: palette.muted }]}>
                    {deferredNoteSearch ? 'No notes match this search.' : 'No notes yet. Add your first note.'}
                  </Text>
                </View>
              )
            : notes.map((item) => (
                <View key={item.id} style={[styles.rowItem, { backgroundColor: palette.panel, borderColor: palette.border }]}>
                  <View style={styles.rowMain}>
                    <Text style={[styles.itemTitle, { color: palette.text }]}>{item.title}</Text>
                    <Text style={[styles.itemBody, { color: palette.muted }]} numberOfLines={2}>
                      {item.body || 'No content'}
                    </Text>
                    <Text style={[styles.itemTime, { color: palette.muted }]}>{formatTime(item.updatedAt)}</Text>
                  </View>
                  <View style={styles.rowActions}>
                    <Pressable onPress={() => onEditNote(item)} style={[styles.roundAction, { borderColor: palette.border }]}>
                      <MaterialIcons color={palette.text} name="edit" size={16} />
                    </Pressable>
                    <Pressable onPress={() => onDeleteNote(item.id)} style={[styles.roundAction, { borderColor: palette.danger }]}>
                      <MaterialIcons color={palette.danger} name="delete-outline" size={16} />
                    </Pressable>
                  </View>
                </View>
              ))
          : null}

        {isHydrated && activeSection === 'todos'
          ? todos.length === 0
            ? (
                <View style={[styles.emptyState, { backgroundColor: palette.panel, borderColor: palette.border }]}>
                  <Text style={[styles.emptyText, { color: palette.muted }]}>
                    {deferredTodoSearch ? 'No tasks match this search.' : 'No tasks yet. Add your first task.'}
                  </Text>
                </View>
              )
            : todos.map((item) => (
                <View key={item.id} style={[styles.rowItem, { backgroundColor: palette.panel, borderColor: palette.border }]}>
                  <View style={styles.todoTitleRow}>
                    <Text
                      style={[
                        styles.itemTitle,
                        {
                          color: item.done ? palette.muted : palette.text,
                          textDecorationLine: item.done ? 'line-through' : 'none',
                        },
                      ]}>
                      {item.title}
                    </Text>
                    <Pressable
                      onPress={() => onToggleTodo(item.id)}
                      style={[styles.statusChip, { backgroundColor: item.done ? palette.successSoft : palette.accentSoft }]}>
                      <Text style={[styles.statusChipText, { color: item.done ? palette.success : palette.accent }]}>
                        {item.done ? 'Done' : 'Open'}
                      </Text>
                    </Pressable>
                  </View>

                  <View style={styles.rowFooter}>
                    <Text style={[styles.itemTime, { color: palette.muted }]}>{formatTime(item.updatedAt)}</Text>
                    <View style={styles.rowActions}>
                      <Pressable onPress={() => onEditTodo(item)} style={[styles.roundAction, { borderColor: palette.border }]}>
                        <MaterialIcons color={palette.text} name="edit" size={16} />
                      </Pressable>
                      <Pressable onPress={() => onDeleteTodo(item.id)} style={[styles.roundAction, { borderColor: palette.danger }]}>
                        <MaterialIcons color={palette.danger} name="delete-outline" size={16} />
                      </Pressable>
                    </View>
                  </View>
                </View>
              ))
          : null}

        {isHydrated && activeSection === 'shopping'
          ? shoppingItems.length === 0
            ? (
                <View style={[styles.emptyState, { backgroundColor: palette.panel, borderColor: palette.border }]}>
                  <Text style={[styles.emptyText, { color: palette.muted }]}>
                    {deferredShoppingSearch
                      ? 'No shopping items match this search.'
                      : 'No shopping items yet. Add your first item.'}
                  </Text>
                </View>
              )
            : shoppingItems.map((item) => (
                <View key={item.id} style={[styles.rowItem, { backgroundColor: palette.panel, borderColor: palette.border }]}>
                  <View style={styles.rowMain}>
                    <Text style={[styles.itemTitle, { color: palette.text }]}>{item.label}</Text>
                    <Text style={[styles.itemTime, { color: palette.muted }]}>{formatTime(item.updatedAt)}</Text>
                  </View>
                  <View style={styles.rowActions}>
                    <Pressable onPress={() => onEditShopping(item)} style={[styles.roundAction, { borderColor: palette.border }]}>
                      <MaterialIcons color={palette.text} name="edit" size={16} />
                    </Pressable>
                    <Pressable onPress={() => onDeleteShopping(item.id)} style={[styles.roundAction, { borderColor: palette.danger }]}>
                      <MaterialIcons color={palette.danger} name="delete-outline" size={16} />
                    </Pressable>
                  </View>
                </View>
              ))
          : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  listArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 16,
    gap: 10,
  },
  emptyState: {
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 16,
  },
  emptyText: {
    fontSize: 14,
    lineHeight: 20,
  },
  rowItem: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 11,
    gap: 8,
  },
  rowMain: {
    flex: 1,
    gap: 4,
  },
  rowFooter: {
    marginTop: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  itemTitle: {
    fontSize: 15,
    lineHeight: 20,
    fontFamily: Fonts.sans,
  },
  itemBody: {
    fontSize: 13,
    lineHeight: 18,
  },
  itemTime: {
    fontSize: 11,
    lineHeight: 14,
    fontFamily: Fonts.mono,
  },
  rowActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  roundAction: {
    width: 32,
    height: 32,
    borderWidth: 1,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  todoTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  statusChip: {
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  statusChipText: {
    fontSize: 11,
    lineHeight: 14,
    fontFamily: Fonts.mono,
  },
});
