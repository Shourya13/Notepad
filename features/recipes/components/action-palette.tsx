import { ScrollView, Text, View } from 'react-native';

import { UiPalette } from '@/lib/themes';
import { ACTION_CONFIG, ACTION_ORDER } from '../action-config';
import { ActionKind } from '../types';

import { actionPaletteStyles as styles } from './action-palette.styles';
import { DraggableActionChip } from './draggable-action-chip';

type Props = {
  palette: UiPalette;
  onTap: (action: ActionKind) => void;
  onDragStart: (kind: ActionKind, x: number, y: number) => void;
  onDragMove: (x: number, y: number) => void;
  onDragEnd: () => void;
};

const TONE_COLORS = (palette: UiPalette) => ({
  heat: palette.danger,
  prep: palette.muted,
  wait: palette.accent,
  serve: palette.success,
});

export function ActionPalette({ palette, onTap, onDragStart, onDragMove, onDragEnd }: Props) {
  const tones = TONE_COLORS(palette);

  return (
    <View style={[styles.wrap, { backgroundColor: palette.panel }]}>
      <Text style={[styles.title, { color: palette.muted }]}>Actions · drag onto timeline</Text>
      <ScrollView
        contentContainerStyle={styles.scroll}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {ACTION_ORDER.map((kind) => {
          const meta = ACTION_CONFIG[kind];
          const tint = tones[meta.tone];
          return (
            <DraggableActionChip
              key={kind}
              kind={kind}
              palette={palette}
              tint={tint}
              onTap={() => onTap(kind)}
              onDragStart={onDragStart}
              onDragMove={onDragMove}
              onDragEnd={onDragEnd}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}
