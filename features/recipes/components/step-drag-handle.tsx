import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRef } from 'react';
import { View } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

import { UiPalette } from '@/lib/themes';

import { stepDragHandleStyles as styles } from './step-drag-handle.styles';

type Props = {
  stepId: string;
  palette: UiPalette;
  onDragStart: (stepId: string, x: number, y: number) => void;
  onDragMove: (x: number, y: number) => void;
  onDragEnd: () => void;
};

export function StepDragHandle({
  stepId,
  palette,
  onDragStart,
  onDragMove,
  onDragEnd,
}: Props) {
  const dragging = useRef(false);

  const onGestureEvent = (event: any) => {
    const { absoluteX, absoluteY } = event.nativeEvent;
    if (!dragging.current) {
      dragging.current = true;
      onDragStart(stepId, absoluteX, absoluteY);
    } else {
      onDragMove(absoluteX, absoluteY);
    }
  };

  const onHandlerStateChange = (event: any) => {
    const { state } = event.nativeEvent;
    if (state === State.END || state === State.CANCELLED || state === State.FAILED) {
      if (dragging.current) {
        onDragEnd();
      }
      dragging.current = false;
    }
  };

  return (
    <PanGestureHandler
      activeOffsetX={[-2, 2]}
      activeOffsetY={[-2, 2]}
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
    >
      <View style={styles.handle} hitSlop={6}>
        <MaterialIcons color={palette.muted} name="drag-indicator" size={20} />
      </View>
    </PanGestureHandler>
  );
}
