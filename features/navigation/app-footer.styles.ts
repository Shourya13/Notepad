import { StyleSheet } from 'react-native';

import { Fonts } from '@/constants/theme';
import { BorderRadius, Shadows, Spacing } from '@/lib/design-tokens';

export const appFooterStyles = StyleSheet.create({
  footer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm + 2,
    paddingBottom: Spacing.sm + 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    ...Shadows.elevated,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  label: {
    fontSize: 10,
    lineHeight: 13,
    fontFamily: Fonts.sans,
    fontWeight: '500',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
});
