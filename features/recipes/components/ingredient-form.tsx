import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useEffect, useState } from 'react';
import {
    Animated,
    Easing,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from 'react-native';

import { createId } from '@/features/notepad/utils';
import { UiPalette } from '@/lib/themes';
import { Ingredient, Unit, UNITS } from '../types';

import { ingredientFormStyles as styles } from './ingredient-form.styles';

type Props = {
  visible: boolean;
  palette: UiPalette;
  initial?: Ingredient | null;
  onClose: () => void;
  onSubmit: (ingredient: Ingredient) => void;
};

export function IngredientForm({ visible, palette, initial, onClose, onSubmit }: Props) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState<Unit | undefined>(undefined);
  const [prep, setPrep] = useState('');

  const slideAnim = useState(() => new Animated.Value(0))[0];
  const fadeAnim = useState(() => new Animated.Value(0))[0];

  useEffect(() => {
    if (visible) {
      setName(initial?.name ?? '');
      setQuantity(initial?.quantity != null ? String(initial.quantity) : '');
      setUnit(initial?.unit);
      setPrep(initial?.prep ?? '');
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
  }, [visible, initial?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const submit = () => {
    const trimmedName = name.trim();
    if (!trimmedName) return;
    const parsedQty = parseFloat(quantity);
    onSubmit({
      id: initial?.id ?? createId(),
      name: trimmedName,
      quantity: Number.isFinite(parsedQty) && parsedQty > 0 ? parsedQty : undefined,
      unit,
      prep: prep.trim() || undefined,
    });
    onClose();
  };

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [400, 0],
  });

  return (
    <Modal animationType="none" onRequestClose={onClose} transparent visible={visible}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
              <Text style={[styles.title, { color: palette.text }]}>
                {initial ? 'Edit ingredient' : 'Add ingredient'}
              </Text>
              <Pressable
                onPress={onClose}
                style={[styles.closeButton, { backgroundColor: palette.panelSoft }]}
              >
                <MaterialIcons color={palette.text} name="close" size={18} />
              </Pressable>
            </View>

            <TextInput
              autoFocus
              blurOnSubmit={false}
              onChangeText={setName}
              onSubmitEditing={submit}
              placeholder="Ingredient (e.g. onion)"
              placeholderTextColor={palette.muted}
              returnKeyType="done"
              style={[styles.input, { color: palette.text, backgroundColor: palette.panelSoft }]}
              value={name}
            />

            <View style={styles.row}>
              <TextInput
                keyboardType="numeric"
                onChangeText={setQuantity}
                placeholder="Qty"
                placeholderTextColor={palette.muted}
                style={[
                  styles.input,
                  styles.qtyInput,
                  { color: palette.text, backgroundColor: palette.panelSoft },
                ]}
                value={quantity}
              />
              <ScrollView
                contentContainerStyle={styles.unitRow}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.unitScroll}
              >
                {UNITS.map((u) => {
                  const active = u === unit;
                  return (
                    <Pressable
                      key={u}
                      onPress={() => setUnit(active ? undefined : u)}
                      style={[
                        styles.unitChip,
                        {
                          backgroundColor: active ? palette.accent : palette.panelSoft,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.unitChipText,
                          { color: active ? '#fff' : palette.text },
                        ]}
                      >
                        {u}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>

            <TextInput
              onChangeText={setPrep}
              placeholder="Prep note (optional, e.g. diced)"
              placeholderTextColor={palette.muted}
              style={[styles.input, { color: palette.text, backgroundColor: palette.panelSoft }]}
              value={prep}
            />

            <Pressable
              onPress={submit}
              style={[styles.submitButton, { backgroundColor: palette.accent }]}
            >
              <Text style={styles.submitText}>{initial ? 'Save' : 'Add ingredient'}</Text>
            </Pressable>
          </Animated.View>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
