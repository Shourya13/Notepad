import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useEffect, useState } from 'react';
import {
    Animated,
    Easing,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    Text,
    TextInput,
    View,
} from 'react-native';

import { UiPalette } from '@/lib/themes';
import { ACTION_CONFIG } from '../action-config';
import { ActionStep } from '../types';

import { actionEditSheetStyles as styles } from './action-edit-sheet.styles';

type Props = {
  visible: boolean;
  palette: UiPalette;
  step: ActionStep | null;
  onClose: () => void;
  onSave: (patch: Partial<ActionStep>) => void;
  onDelete: () => void;
};

export function ActionEditSheet({ visible, palette, step, onClose, onSave, onDelete }: Props) {
  const [duration, setDuration] = useState('');
  const [temp, setTemp] = useState('');
  const [note, setNote] = useState('');

  const slideAnim = useState(() => new Animated.Value(0))[0];
  const fadeAnim = useState(() => new Animated.Value(0))[0];

  useEffect(() => {
    if (visible && step) {
      setDuration(step.durationMin != null ? String(step.durationMin) : '');
      setTemp(step.tempC != null ? String(step.tempC) : '');
      setNote(step.note ?? '');
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 1,
          damping: 20,
          stiffness: 200,
          mass: 0.6,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 140,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 160,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, step?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const submit = () => {
    const parsedDuration = parseInt(duration, 10);
    const parsedTemp = parseInt(temp, 10);
    onSave({
      durationMin: Number.isFinite(parsedDuration) && parsedDuration > 0 ? parsedDuration : undefined,
      tempC: Number.isFinite(parsedTemp) && parsedTemp > 0 ? parsedTemp : undefined,
      note: note.trim() || undefined,
    });
    onClose();
  };

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [400, 0],
  });

  const meta = step ? ACTION_CONFIG[step.action] : null;

  return (
    <Modal animationType="none" onRequestClose={onClose} transparent visible={visible}>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding', default: undefined })}
        style={styles.flex}
      >
        <Animated.View style={[styles.overlay, { backgroundColor: palette.overlay, opacity: fadeAnim }]}>
          <Pressable onPress={onClose} style={styles.overlayTap} />
          <Animated.View
            style={[
              styles.sheet,
              { backgroundColor: palette.background, transform: [{ translateY }] },
            ]}
          >
            <View style={styles.handle} />
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                {meta ? (
                  <MaterialIcons color={palette.accent} name={meta.icon} size={22} />
                ) : null}
                <Text style={[styles.title, { color: palette.text }]}>
                  {meta?.label ?? 'Action'}
                </Text>
              </View>
              <Pressable
                onPress={onClose}
                style={[styles.closeButton, { backgroundColor: palette.panelSoft }]}
              >
                <MaterialIcons color={palette.text} name="close" size={18} />
              </Pressable>
            </View>

            <View style={styles.row}>
              <View style={[styles.field, { backgroundColor: palette.panelSoft }]}>
                <Text style={[styles.fieldLabel, { color: palette.muted }]}>
                  Duration (min)
                </Text>
                <TextInput
                  keyboardType="number-pad"
                  onChangeText={setDuration}
                  placeholder="0"
                  placeholderTextColor={palette.muted}
                  style={[styles.fieldInput, { color: palette.text }]}
                  value={duration}
                />
              </View>
              <View style={[styles.field, { backgroundColor: palette.panelSoft }]}>
                <Text style={[styles.fieldLabel, { color: palette.muted }]}>
                  Temp (°C)
                </Text>
                <TextInput
                  keyboardType="number-pad"
                  onChangeText={setTemp}
                  placeholder="—"
                  placeholderTextColor={palette.muted}
                  style={[styles.fieldInput, { color: palette.text }]}
                  value={temp}
                />
              </View>
            </View>

            <TextInput
              multiline
              onChangeText={setNote}
              placeholder="Note (optional)"
              placeholderTextColor={palette.muted}
              style={[styles.textArea, { color: palette.text, backgroundColor: palette.panelSoft }]}
              textAlignVertical="top"
              value={note}
            />

            <View style={styles.actions}>
              <Pressable
                onPress={() => {
                  onDelete();
                  onClose();
                }}
                style={[styles.deleteButton, { backgroundColor: palette.dangerSoft }]}
              >
                <MaterialIcons color={palette.danger} name="delete-outline" size={18} />
                <Text style={[styles.deleteText, { color: palette.danger }]}>Remove</Text>
              </Pressable>
              <Pressable
                onPress={submit}
                style={[styles.saveButton, { backgroundColor: palette.accent }]}
              >
                <Text style={styles.saveText}>Save</Text>
              </Pressable>
            </View>
          </Animated.View>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
