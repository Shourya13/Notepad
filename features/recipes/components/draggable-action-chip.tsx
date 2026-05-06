import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRef } from 'react';
import { Text, View } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

import { UiPalette } from '@/lib/themes';
import { ACTION_CONFIG } from '../action-config';
import { ActionKind } from '../types';

import { actionPaletteStyles as styles } from './action-palette.styles';

type Props = {
  kind: ActionKind;
  palette: UiPalette;
  tint: string;
  onTap: () => void;
  onDragStart: (kind: ActionKind, x: number, y: number) => void;
  onDragMove: (x: number, y: number) => void;
  onDragEnd: () => void;
};

const DRAG_ACTIVATION_THRESHOLD = 6;

export function DraggableActionChip({
  kind,
  palette,
  tint,
  onTap,
  onDragStart,
  onDragMove,
  onDragEnd,
}: Props) {
  const meta = ACTION_CONFIG[kind];
  const draggingRef = useRef(false);
  const movedRef = useRef(false);

  const onGestureEvent = (event: any) => {
    const { absoluteX, absoluteY, translationX, translationY } = event.nativeEvent;
    const moved = Math.abs(translationX) + Math.abs(translationY) > DRAG_ACTIVATION_THRESHOLD;
    if (moved) {
      movedRef.current = true;
    }
    if (!draggingRef.current && moved) {
      draggingRef.current = true;
      onDragStart(kind, absoluteX, absoluteY);
    }
    if (draggingRef.current) {
      onDragMove(absoluteX, absoluteY);
    }
  };

  const onHandlerStateChange = (event: any) => {
    const { state } = event.nativeEvent;
    if (state === State.BEGAN) {
      movedRef.current = false;
      draggingRef.current = false;
    }
    if (state === State.END) {
      if (draggingRef.current) {
        onDragEnd();
      } else if (!movedRef.current) {
        onTap();
      }
      draggingRef.current = false;
      movedRef.current = false;
    }
    if (state === State.CANCELLED || state === State.FAILED) {
      if (draggingRef.current) {
        onDragEnd();
      }
      draggingRef.current = false;
      movedRef.current = false;
    }
  };

  return (
    <PanGestureHandler
      activeOffsetX={[-DRAG_ACTIVATION_THRESHOLD, DRAG_ACTIVATION_THRESHOLD]}
      activeOffsetY={[-DRAG_ACTIVATION_THRESHOLD, DRAG_ACTIVATION_THRESHOLD]}
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
    >
      <View style={[styles.chip, { backgroundColor: palette.panelSoft }]}>
        <MaterialIcons color={tint} name={meta.icon} size={18} />
        <Text style={[styles.chipLabel, { color: palette.text }]}>{meta.label}</Text>
      </View>
    </PanGestureHandler>
  );
}
