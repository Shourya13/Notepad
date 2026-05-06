import { Platform, StyleSheet } from 'react-native';

import { Fonts } from '@/constants/theme';
import { BorderRadius, Spacing, Shadows, FontSizes } from '@/lib/design-tokens';

export const entityListStyles = StyleSheet.create({
  listArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: 110,
    gap: Spacing.md,
  },
  emptyState: {
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    ...Shadows.subtle,
  },
  emptyText: {
    fontSize: FontSizes.sm,
    lineHeight: 20,
    fontFamily: Fonts.sans,
  },
  card: {
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md + 2,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
    ...Shadows.subtle,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  leadingIconWrap: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTextWrap: {
    flex: 1,
    gap: Spacing.xs,
  },
  cardTitle: {
    fontSize: FontSizes.lg,
    lineHeight: 24,
    fontFamily: Fonts.rounded,
    fontWeight: '600',
  },
  cardSubtext: {
    fontSize: FontSizes.sm,
    lineHeight: 18,
    fontFamily: Fonts.sans,
  },
  actionsCol: {
    gap: Spacing.xs,
  },
  iconTapArea: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 11,
    lineHeight: 14,
    fontFamily: Fonts.mono,
  },
});
