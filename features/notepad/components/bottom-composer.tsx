import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { SectionKey } from '../types';

import { UiPalette } from '@/lib/themes';

type Props = {
  activeSection: SectionKey;
  palette: UiPalette;
  noteTitle: string;
  noteBody: string;
  noteSearch: string;
  editingNoteId: string | null;
  todoTitle: string;
  todoSearch: string;
  editingTodoId: string | null;
  shoppingLabel: string;
  shoppingSearch: string;
  editingShoppingId: string | null;
  setNoteTitle: (value: string) => void;
  setNoteBody: (value: string) => void;
  setNoteSearch: (value: string) => void;
  setTodoTitle: (value: string) => void;
  setTodoSearch: (value: string) => void;
  setShoppingLabel: (value: string) => void;
  setShoppingSearch: (value: string) => void;
  onSubmitNote: () => void;
  onCancelNoteEdit: () => void;
  onSubmitTodo: () => void;
  onCancelTodoEdit: () => void;
  onSubmitShopping: () => void;
  onCancelShoppingEdit: () => void;
};

export function BottomComposer({
  activeSection,
  palette,
  noteTitle,
  noteBody,
  noteSearch,
  editingNoteId,
  todoTitle,
  todoSearch,
  editingTodoId,
  shoppingLabel,
  shoppingSearch,
  editingShoppingId,
  setNoteTitle,
  setNoteBody,
  setNoteSearch,
  setTodoTitle,
  setTodoSearch,
  setShoppingLabel,
  setShoppingSearch,
  onSubmitNote,
  onCancelNoteEdit,
  onSubmitTodo,
  onCancelTodoEdit,
  onSubmitShopping,
  onCancelShoppingEdit,
}: Props) {
  return (
    <View style={[styles.bottomDock, { backgroundColor: palette.background, borderTopColor: palette.border }]}>
      {activeSection === 'notes' ? (
        <View style={styles.bottomContent}>
          <TextInput
            onChangeText={setNoteSearch}
            placeholder="Search notes..."
            placeholderTextColor={palette.muted}
            style={[
              styles.searchInput,
              { color: palette.text, borderColor: palette.border, backgroundColor: palette.panel },
            ]}
            value={noteSearch}
          />
          <TextInput
            onChangeText={setNoteTitle}
            placeholder="Note title"
            placeholderTextColor={palette.muted}
            style={[
              styles.inputFlat,
              { color: palette.text, borderColor: palette.border, backgroundColor: palette.panel },
            ]}
            value={noteTitle}
          />
          <View style={styles.bottomRow}>
            <TextInput
              multiline
              onChangeText={setNoteBody}
              placeholder="Write..."
              placeholderTextColor={palette.muted}
              style={[
                styles.bottomMessageInput,
                { color: palette.text, borderColor: palette.border, backgroundColor: palette.panel },
              ]}
              textAlignVertical="top"
              value={noteBody}
            />
            <View style={styles.bottomActions}>
              <Pressable onPress={onSubmitNote} style={[styles.iconCta, { backgroundColor: palette.accent }]}>
                <MaterialIcons color="#fff" name={editingNoteId ? 'save' : 'add'} size={18} />
              </Pressable>
              {editingNoteId ? (
                <Pressable
                  onPress={onCancelNoteEdit}
                  style={[styles.iconGhost, { borderColor: palette.border, backgroundColor: palette.panel }]}>
                  <MaterialIcons color={palette.text} name="close" size={18} />
                </Pressable>
              ) : null}
            </View>
          </View>
        </View>
      ) : null}

      {activeSection === 'todos' ? (
        <View style={styles.bottomContent}>
          <TextInput
            onChangeText={setTodoSearch}
            placeholder="Search tasks..."
            placeholderTextColor={palette.muted}
            style={[
              styles.searchInput,
              { color: palette.text, borderColor: palette.border, backgroundColor: palette.panel },
            ]}
            value={todoSearch}
          />
          <View style={[styles.inlineComposer, { backgroundColor: palette.panel, borderColor: palette.border }]}>
            <TextInput
              onChangeText={setTodoTitle}
              placeholder="Task"
              placeholderTextColor={palette.muted}
              style={[styles.inlineInput, { color: palette.text }]}
              value={todoTitle}
            />
            <Pressable onPress={onSubmitTodo} style={[styles.iconCta, { backgroundColor: palette.accent }]}>
              <MaterialIcons color="#fff" name={editingTodoId ? 'save' : 'add'} size={18} />
            </Pressable>
            {editingTodoId ? (
              <Pressable onPress={onCancelTodoEdit} style={[styles.iconGhost, { borderColor: palette.border }]}>
                <MaterialIcons color={palette.text} name="close" size={18} />
              </Pressable>
            ) : null}
          </View>
        </View>
      ) : null}

      {activeSection === 'shopping' ? (
        <View style={styles.bottomContent}>
          <TextInput
            onChangeText={setShoppingSearch}
            placeholder="Search shopping items..."
            placeholderTextColor={palette.muted}
            style={[
              styles.searchInput,
              { color: palette.text, borderColor: palette.border, backgroundColor: palette.panel },
            ]}
            value={shoppingSearch}
          />
          <View style={[styles.inlineComposer, { backgroundColor: palette.panel, borderColor: palette.border }]}>
            <TextInput
              onChangeText={setShoppingLabel}
              placeholder="Shopping item"
              placeholderTextColor={palette.muted}
              style={[styles.inlineInput, { color: palette.text }]}
              value={shoppingLabel}
            />
            <Pressable onPress={onSubmitShopping} style={[styles.iconCta, { backgroundColor: palette.accent }]}>
              <MaterialIcons color="#fff" name={editingShoppingId ? 'save' : 'add'} size={18} />
            </Pressable>
            {editingShoppingId ? (
              <Pressable
                onPress={onCancelShoppingEdit}
                style={[styles.iconGhost, { borderColor: palette.border }]}>
                <MaterialIcons color={palette.text} name="close" size={18} />
              </Pressable>
            ) : null}
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomDock: {
    borderTopWidth: 1,
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 10,
  },
  bottomContent: {
    gap: 8,
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 11,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    lineHeight: 20,
  },
  inputFlat: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    lineHeight: 20,
    backgroundColor: 'transparent',
  },
  bottomRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-end',
  },
  bottomMessageInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 14,
    minHeight: 48,
    maxHeight: 120,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    lineHeight: 20,
  },
  bottomActions: {
    gap: 8,
  },
  inlineComposer: {
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  inlineInput: {
    flex: 1,
    borderWidth: 0,
    fontSize: 15,
    lineHeight: 20,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  iconCta: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconGhost: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
