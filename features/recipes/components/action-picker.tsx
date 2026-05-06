import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as Haptics from 'expo-haptics';
import { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { UiPalette } from '@/lib/themes';
import { ACTION_CONFIG } from '../action-config';
import { ActionKind } from '../types';

import { actionPickerStyles as styles } from './action-picker.styles';

type GroupKey = 'prep' | 'heat' | 'wait' | 'serve';

const ACTION_GROUPS: {
  key: GroupKey;
  title: string;
  tone: 'prep' | 'heat' | 'wait' | 'serve';
  actions: ActionKind[];
}[] = [
  { key: 'prep', title: 'Prep', tone: 'prep', actions: ['chop', 'mix'] },
  {
    key: 'heat',
    title: 'Heat',
    tone: 'heat',
    actions: ['saute', 'fry', 'boil', 'simmer', 'bake', 'roast'],
  },
  { key: 'wait', title: 'Wait', tone: 'wait', actions: ['rest', 'marinate'] },
  { key: 'serve', title: 'Finish', tone: 'serve', actions: ['serve'] },
];

const toneColor = (
  palette: UiPalette,
  tone: 'prep' | 'heat' | 'wait' | 'serve',
): string => {
  switch (tone) {
    case 'heat':
      return palette.danger;
    case 'wait':
      return palette.accent;
    case 'serve':
      return palette.success;
    case 'prep':
    default:
      return palette.muted;
  }
};

type Props = {
  visible: boolean;
  palette: UiPalette;
  insertIndex: number | null;
  totalSteps: number;
  onClose: () => void;
  onSelect: (action: ActionKind) => void;
};

export function ActionPicker({
  visible,
  palette,
  insertIndex,
  totalSteps,
  onClose,
  onSelect,
}: Props) {
  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(60)).current;

  useEffect(() => {
    if (visible) {
      fade.setValue(0);
      slide.setValue(60);
      Animated.parallel([
        Animated.timing(fade, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.spring(slide, {
          toValue: 0,
          tension: 90,
          friction: 13,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.timing(fade, {
        toValue: 0,
        duration: 140,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }).start();
    }
  }, [visible, fade, slide]);

  const positionLabel = (() => {
    if (insertIndex == null) return 'Append to end';
    if (insertIndex <= 0) return 'Insert at start';
    if (insertIndex >= totalSteps) return 'Append to end';
    return `Insert at position ${insertIndex + 1}`;
  })();

  const handleSelect = (action: ActionKind) => {
    Haptics.selectionAsync().catch(() => {});
    onSelect(action);
    onClose();
  };

  return (
    <Modal
      animationType="none"
      onRequestClose={onClose}
      transparent
      visible={visible}
    >
      <Animated.View
        style={[styles.overlay, { backgroundColor: palette.overlay, opacity: fade }]}
      >
        <Pressable onPress={onClose} style={styles.overlayTap} />
        <Animated.View
          style={[
            styles.sheet,
            { backgroundColor: palette.background, transform: [{ translateY: slide }] },
          ]}
        >
          <View style={styles.handle} />
          <View style={styles.header}>
            <View style={styles.headerTextWrap}>
              <Text style={[styles.subtitle, { color: palette.muted }]}>
                {positionLabel}
              </Text>
              <Text style={[styles.title, { color: palette.text }]}>Add action</Text>
            </View>
            <Pressable
              onPress={onClose}
              style={[styles.closeButton, { backgroundColor: palette.panelSoft }]}
            >
              <MaterialIcons color={palette.text} name="close" size={18} />
            </Pressable>
          </View>

          <ScrollView
            contentContainerStyle={styles.scroll}
            showsVerticalScrollIndicator={false}
          >
            {ACTION_GROUPS.map((group) => {
              const tint = toneColor(palette, group.tone);
              return (
                <View key={group.key} style={styles.group}>
                  <View style={styles.groupHeader}>
                    <View
                      style={[styles.groupAccent, { backgroundColor: tint }]}
                    />
                    <Text style={[styles.groupTitle, { color: palette.muted }]}>
                      {group.title}
                    </Text>
                  </View>
                  <View style={styles.grid}>
                    {group.actions.map((kind) => {
                      const meta = ACTION_CONFIG[kind];
                      return (
                        <Pressable
                          key={kind}
                          accessibilityLabel={`Add ${meta.label} action`}
                          android_ripple={{ color: palette.border }}
                          onPress={() => handleSelect(kind)}
                          style={[
                            styles.tile,
                            {
                              backgroundColor: palette.panel,
                              borderColor: palette.border,
                            },
                          ]}
                        >
                          <View
                            style={[
                              styles.tileIconWrap,
                              { backgroundColor: palette.panelSoft },
                            ]}
                          >
                            <MaterialIcons
                              color={tint}
                              name={meta.icon}
                              size={20}
                            />
                          </View>
                          <View style={styles.tileTextWrap}>
                            <Text
                              style={[styles.tileLabel, { color: palette.text }]}
                              numberOfLines={1}
                            >
                              {meta.label}
                            </Text>
                            <Text
                              style={[styles.tileMeta, { color: palette.muted }]}
                              numberOfLines={1}
                            >
                              {meta.defaultMin > 0 ? `~${meta.defaultMin} min` : 'instant'}
                            </Text>
                          </View>
                        </Pressable>
                      );
                    })}
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}
