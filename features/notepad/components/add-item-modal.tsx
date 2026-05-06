import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useEffect, useMemo, useRef } from 'react';
import {
    Animated,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import { SectionKey } from '../types';

import { Fonts } from '@/constants/theme';
import { BorderRadius, FontSizes, Spacing } from '@/lib/design-tokens';
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
  shoppingQuantity: string;
  editingShoppingId: string | null;
  linkUrlInput: string;
  linkDescriptionInput: string;
  linkEditingId: string | null;
  setNoteTitle: (value: string) => void;
  setNoteBody: (value: string) => void;
  setTodoTitle: (value: string) => void;
  setShoppingLabel: (value: string) => void;
  setShoppingQuantity: (value: string) => void;
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
  shoppingQuantity,
  editingShoppingId,
  linkUrlInput,
  linkDescriptionInput,
  linkEditingId,
  setNoteTitle,
  setNoteBody,
  setTodoTitle,
  setShoppingLabel,
  setShoppingQuantity,
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

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(60)).current;

  useEffect(() => {
    if (visible) {
      fadeAnim.setValue(0);
      slideAnim.setValue(60);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 80,
          friction: 12,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, fadeAnim, slideAnim]);

  return (
    <Modal animationType="none" onRequestClose={onClose} transparent visible={visible}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <Animated.View style={[styles.overlay, { backgroundColor: palette.overlay, opacity: fadeAnim }]}>
          <Pressable onPress={onClose} style={styles.overlayTap} />
          <Animated.View
            style={[
              styles.sheet,
              { backgroundColor: palette.panel },
              { transform: [{ translateY: slideAnim }] },
            ]}
          >
            <View style={styles.handle} />
            <View style={styles.sheetHeader}>
              <Text style={[styles.sheetTitle, { color: palette.text }]}>{modalTitle}</Text>
              <Pressable onPress={onClose} style={[styles.closeButton, { backgroundColor: palette.panelSoft }]}>
                <MaterialIcons color={palette.text} name="close" size={18} />
              </Pressable>
            </View>

            {activeSection === 'notes' ? (
              <>
                <TextInput
                  blurOnSubmit={false}
                  onChangeText={setNoteTitle}
                  onSubmitEditing={onSubmitNote}
                  placeholder="Note title"
                  placeholderTextColor={palette.muted}
                  returnKeyType="next"
                  style={[styles.input, { color: palette.text, backgroundColor: palette.panelSoft }]}
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
                    { color: palette.text, backgroundColor: palette.panelSoft },
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
                  onSubmitEditing={onSubmitTodo}
                  placeholder="Task"
                  placeholderTextColor={palette.muted}
                  returnKeyType="done"
                  style={[styles.input, { color: palette.text, backgroundColor: palette.panelSoft }]}
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
                  blurOnSubmit={false}
                  onChangeText={setShoppingLabel}
                  onSubmitEditing={onSubmitShopping}
                  placeholder="Shopping item"
                  placeholderTextColor={palette.muted}
                  returnKeyType="next"
                  style={[styles.input, { color: palette.text, backgroundColor: palette.panelSoft }]}
                  value={shoppingLabel}
                />
                <ShoppingQuantityField
                  palette={palette}
                  value={shoppingQuantity}
                  onChange={setShoppingQuantity}
                  onSubmit={onSubmitShopping}
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
                  blurOnSubmit={false}
                  keyboardType="url"
                  onChangeText={setLinkUrlInput}
                  onSubmitEditing={onSubmitLink}
                  placeholder="https://example.com"
                  placeholderTextColor={palette.muted}
                  returnKeyType="next"
                  style={[styles.input, { color: palette.text, backgroundColor: palette.panelSoft }]}
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
                    { color: palette.text, backgroundColor: palette.panelSoft },
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
          </Animated.View>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

// ---------------------------------------------------------------------------
// Shopping quantity field: numeric input + unit chips with a "Custom" option.
// Stores the combined display value (e.g., "2 kg", "1 dozen") in a single
// string field on the parent.
// ---------------------------------------------------------------------------

const PRESET_UNITS = ['', 'pcs', 'g', 'kg', 'ml', 'l', 'pack', 'dozen'] as const;

type ShoppingQuantityFieldProps = {
  palette: UiPalette;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

function ShoppingQuantityField({
  palette,
  value,
  onChange,
  onSubmit,
}: ShoppingQuantityFieldProps) {
  // Parse incoming value into number + unit when possible.
  const parsed = useMemo(() => {
    const trimmed = value.trim();
    if (!trimmed) return { num: '', unit: '' as string, custom: false };
    const match = trimmed.match(/^(\d+(?:\.\d+)?)\s*(.*)$/);
    if (match) {
      const [, num, rest] = match;
      const unit = rest.trim();
      const isPreset = (PRESET_UNITS as readonly string[]).includes(unit);
      return { num, unit, custom: !!unit && !isPreset };
    }
    return { num: '', unit: trimmed, custom: true };
  }, [value]);

  const customMode = useRef(parsed.custom);
  customMode.current = parsed.custom;

  const setCombined = (num: string, unit: string) => {
    const n = num.trim();
    const u = unit.trim();
    if (!n && !u) {
      onChange('');
      return;
    }
    onChange(u ? `${n}${n ? ' ' : ''}${u}`.trim() : n);
  };

  if (parsed.custom) {
    return (
      <View style={modalQtyStyles.customWrap}>
        <TextInput
          autoFocus
          onChangeText={onChange}
          onSubmitEditing={onSubmit}
          placeholder="e.g. 1 dozen, 2 bunches"
          placeholderTextColor={palette.muted}
          returnKeyType="done"
          style={[styles.input, modalQtyStyles.customInput, { color: palette.text, backgroundColor: palette.panelSoft }]}
          value={value}
        />
        <Pressable
          onPress={() => onChange('')}
          style={[modalQtyStyles.customSwap, { backgroundColor: palette.panelSoft }]}
        >
          <MaterialIcons color={palette.text} name="tune" size={16} />
          <Text style={[modalQtyStyles.customSwapText, { color: palette.text }]}>
            Presets
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={modalQtyStyles.row}>
      <TextInput
        keyboardType="numeric"
        onChangeText={(t) => setCombined(t, parsed.unit)}
        onSubmitEditing={onSubmit}
        placeholder="Qty"
        placeholderTextColor={palette.muted}
        returnKeyType="done"
        style={[styles.input, modalQtyStyles.qtyInput, { color: palette.text, backgroundColor: palette.panelSoft }]}
        value={parsed.num}
      />
      <ScrollView
        contentContainerStyle={modalQtyStyles.unitRow}
        horizontal
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={false}
        style={modalQtyStyles.unitScroll}
      >
        {PRESET_UNITS.map((u) => {
          const active = u === parsed.unit;
          const label = u === '' ? '—' : u;
          return (
            <Pressable
              key={u || 'none'}
              onPress={() => setCombined(parsed.num, u)}
              style={[
                modalQtyStyles.unitChip,
                {
                  backgroundColor: active ? palette.accent : palette.panelSoft,
                },
              ]}
            >
              <Text
                style={[
                  modalQtyStyles.unitChipText,
                  { color: active ? '#fff' : palette.text },
                ]}
              >
                {label}
              </Text>
            </Pressable>
          );
        })}
        <Pressable
          onPress={() => onChange(parsed.num ? `${parsed.num} ` : ' ')}
          style={[
            modalQtyStyles.unitChip,
            modalQtyStyles.customChip,
            { borderColor: palette.border },
          ]}
        >
          <MaterialIcons color={palette.muted} name="edit" size={14} />
          <Text style={[modalQtyStyles.unitChipText, { color: palette.muted }]}>
            Custom
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const modalQtyStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  qtyInput: {
    width: 84,
    textAlign: 'center',
  },
  unitScroll: {
    flex: 1,
  },
  unitRow: {
    flexDirection: 'row',
    gap: 6,
    paddingRight: Spacing.sm,
    alignItems: 'center',
  },
  unitChip: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: BorderRadius.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  customChip: {
    borderWidth: 1,
  },
  unitChipText: {
    fontSize: FontSizes.xs + 1,
    fontFamily: Fonts.mono,
    letterSpacing: 0.3,
  },
  customWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  customInput: {
    flex: 1,
  },
  customSwap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: BorderRadius.sm,
  },
  customSwapText: {
    fontSize: FontSizes.xs + 1,
    fontFamily: Fonts.rounded,
    fontWeight: '600',
  },
});
