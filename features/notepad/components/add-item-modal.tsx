import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Modal, Pressable, Text, TextInput, View } from 'react-native';

import { SectionKey } from '../types';

import { UiPalette } from '@/lib/themes';
import { addItemModalStyles as styles } from './add-item-modal.styles';

type Props = {
  visible: boolean;
  activeSection: SectionKey;
  palette: UiPalette;
  noteTitle: string;
  noteBody: string;
  editingNoteId: string | null;
  todoTitle: string;
  editingTodoId: string | null;
  shoppingLabel: string;
  editingShoppingId: string | null;
  linkUrlInput: string;
  linkDescriptionInput: string;
  linkEditingId: string | null;
  setNoteTitle: (value: string) => void;
  setNoteBody: (value: string) => void;
  setTodoTitle: (value: string) => void;
  setShoppingLabel: (value: string) => void;
  setLinkUrlInput: (value: string) => void;
  setLinkDescriptionInput: (value: string) => void;
  onClose: () => void;
  onSubmitNote: () => void;
  onSubmitTodo: () => void;
  onSubmitShopping: () => void;
  onSubmitLink: () => void;
};

export function AddItemModal({
  visible,
  activeSection,
  palette,
  noteTitle,
  noteBody,
  editingNoteId,
  todoTitle,
  editingTodoId,
  shoppingLabel,
  editingShoppingId,
  linkUrlInput,
  linkDescriptionInput,
  linkEditingId,
  setNoteTitle,
  setNoteBody,
  setTodoTitle,
  setShoppingLabel,
  setLinkUrlInput,
  setLinkDescriptionInput,
  onClose,
  onSubmitNote,
  onSubmitTodo,
  onSubmitShopping,
  onSubmitLink,
}: Props) {
  const modalTitle =
    activeSection === 'notes' ? (editingNoteId ? 'Edit Note' : 'Add Note') : activeSection === 'todos'
      ? (editingTodoId ? 'Edit Task' : 'Add Task')
      : activeSection === 'shopping'
        ? editingShoppingId
          ? 'Edit Item'
          : 'Add Item'
        : linkEditingId
          ? 'Edit Link'
          : 'Add Link';

  return (
    <Modal animationType="slide" onRequestClose={onClose} transparent visible={visible}>
      <View style={[styles.overlay, { backgroundColor: palette.overlay }]}>
        <Pressable onPress={onClose} style={styles.overlayTap} />
        <View style={[styles.sheet, { backgroundColor: palette.background, borderColor: palette.border }]}>
          <View style={styles.handle} />
          <View style={styles.sheetHeader}>
            <Text style={[styles.sheetTitle, { color: palette.text }]}>{modalTitle}</Text>
            <Pressable onPress={onClose} style={[styles.closeButton, { borderColor: palette.border }]}>
              <MaterialIcons color={palette.text} name="close" size={18} />
            </Pressable>
          </View>

          {activeSection === 'notes' ? (
            <>
              <TextInput
                onChangeText={setNoteTitle}
                placeholder="Note title"
                placeholderTextColor={palette.muted}
                style={[styles.input, { color: palette.text, borderColor: palette.border, backgroundColor: palette.panel }]}
                value={noteTitle}
              />
              <TextInput
                multiline
                onChangeText={setNoteBody}
                placeholder="Write..."
                placeholderTextColor={palette.muted}
                style={[
                  styles.input,
                  styles.textArea,
                  { color: palette.text, borderColor: palette.border, backgroundColor: palette.panel },
                ]}
                textAlignVertical="top"
                value={noteBody}
              />
              <Pressable
                onPress={() => {
                  onSubmitNote();
                }}
                style={[styles.submitButton, { backgroundColor: palette.accent }]}>
                <Text style={styles.submitText}>{editingNoteId ? 'Save' : 'Add'}</Text>
              </Pressable>
            </>
          ) : null}

          {activeSection === 'todos' ? (
            <>
              <TextInput
                onChangeText={setTodoTitle}
                placeholder="Task"
                placeholderTextColor={palette.muted}
                style={[styles.input, { color: palette.text, borderColor: palette.border, backgroundColor: palette.panel }]}
                value={todoTitle}
              />
              <Pressable
                onPress={() => {
                  onSubmitTodo();
                }}
                style={[styles.submitButton, { backgroundColor: palette.accent }]}>
                <Text style={styles.submitText}>{editingTodoId ? 'Save' : 'Add'}</Text>
              </Pressable>
            </>
          ) : null}

          {activeSection === 'shopping' ? (
            <>
              <TextInput
                onChangeText={setShoppingLabel}
                placeholder="Shopping item"
                placeholderTextColor={palette.muted}
                style={[styles.input, { color: palette.text, borderColor: palette.border, backgroundColor: palette.panel }]}
                value={shoppingLabel}
              />
              <Pressable
                onPress={() => {
                  onSubmitShopping();
                }}
                style={[styles.submitButton, { backgroundColor: palette.accent }]}>
                <Text style={styles.submitText}>{editingShoppingId ? 'Save' : 'Add'}</Text>
              </Pressable>
            </>
          ) : null}

          {activeSection === 'links' ? (
            <>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="url"
                onChangeText={setLinkUrlInput}
                placeholder="https://example.com"
                placeholderTextColor={palette.muted}
                style={[styles.input, { color: palette.text, borderColor: palette.border, backgroundColor: palette.panel }]}
                value={linkUrlInput}
              />
              <TextInput
                multiline
                onChangeText={setLinkDescriptionInput}
                placeholder="Short description..."
                placeholderTextColor={palette.muted}
                style={[
                  styles.input,
                  styles.textArea,
                  { color: palette.text, borderColor: palette.border, backgroundColor: palette.panel },
                ]}
                textAlignVertical="top"
                value={linkDescriptionInput}
              />
              <Pressable
                onPress={() => {
                  onSubmitLink();
                }}
                style={[styles.submitButton, { backgroundColor: palette.accent }]}>
                <Text style={styles.submitText}>{linkEditingId ? 'Save' : 'Add'}</Text>
              </Pressable>
            </>
          ) : null}
        </View>
      </View>
    </Modal>
  );
}
