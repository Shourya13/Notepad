import { StyleSheet } from 'react-native';

import { Fonts } from '@/constants/theme';
import { Spacing, BorderRadius, Shadows, FontSizes } from '@/lib/design-tokens';

export const appFooterStyles = StyleSheet.create({
  footer: {
    paddingHorizontal: Spacing.md + 2,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    ...Shadows.elevated,
  },
  item: {
    width: 74,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  label: {
    fontSize: FontSizes.xs,
    lineHeight: 14,
    fontFamily: Fonts.sans,
    fontWeight: '500',
  },
});
