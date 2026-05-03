import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, Text, View } from 'react-native';

import { appFooterStyles as styles } from './app-footer.styles';

import { UiPalette } from '@/lib/themes';

export type FooterKey = 'notes' | 'todos' | 'shopping' | 'links';

type Props = {
  activeKey: FooterKey;
  palette: UiPalette;
  onPress: (key: FooterKey) => void;
};

const meta: Record<FooterKey, { label: string; icon: keyof typeof MaterialIcons.glyphMap }> = {
  notes: { label: 'Notepad', icon: 'sticky-note-2' },
  todos: { label: 'Todo', icon: 'checklist' },
  shopping: { label: 'Shopping', icon: 'shopping-cart' },
  links: { label: 'Links', icon: 'link' },
};

export function AppFooter({ activeKey, palette, onPress }: Props) {
  return (
    <View style={[styles.footer, { borderTopColor: palette.border, backgroundColor: palette.background }]}>
      {(Object.keys(meta) as FooterKey[]).map((key) => {
        const active = key === activeKey;
        return (
          <Pressable key={key} onPress={() => onPress(key)} style={styles.item}>
            <MaterialIcons color={active ? palette.accent : palette.muted} name={meta[key].icon} size={20} />
            <Text style={[styles.label, { color: active ? palette.accent : palette.muted }]}>{meta[key].label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
