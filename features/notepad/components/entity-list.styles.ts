import { StyleSheet } from 'react-native';

import { Fonts } from '@/constants/theme';
import { BorderRadius, FontSizes, Spacing } from '@/lib/design-tokens';

export const entityListStyles = StyleSheet.create({
  listArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: 116,
    gap: Spacing.sm + 2,
  },
  emptyState: {
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
    alignItems: 'center',
    gap: Spacing.sm,
  },
  emptyText: {
    fontSize: FontSizes.sm,
    lineHeight: 20,
    fontFamily: Fonts.sans,
    textAlign: 'center',
    opacity: 0.7,
  },
});
