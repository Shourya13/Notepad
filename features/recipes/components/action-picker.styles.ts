import { StyleSheet } from 'react-native';

import { Fonts } from '@/constants/theme';
import { BorderRadius, FontSizes, Shadows, Spacing } from '@/lib/design-tokens';

export const actionPickerStyles = StyleSheet.create({
  flex: { flex: 1 },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlayTap: {
    flex: 1,
  },
  sheet: {
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xxxl,
    maxHeight: '82%',
    ...Shadows.elevated,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: Spacing.md,
    opacity: 0.25,
    backgroundColor: '#888',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  headerTextWrap: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: FontSizes.xl,
    lineHeight: 28,
    fontFamily: Fonts.rounded,
    fontWeight: '600',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: FontSizes.xs,
    fontFamily: Fonts.mono,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scroll: {
    paddingBottom: Spacing.lg,
  },
  group: {
    marginTop: Spacing.lg,
    gap: Spacing.sm,
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  groupAccent: {
    width: 4,
    height: 14,
    borderRadius: 2,
  },
  groupTitle: {
    fontSize: 12,
    fontFamily: Fonts.mono,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tile: {
    width: '48.5%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    borderWidth: 1,
    ...Shadows.subtle,
  },
  tileIconWrap: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  tileTextWrap: {
    flex: 1,
    gap: 1,
  },
  tileLabel: {
    fontSize: 14,
    fontFamily: Fonts.rounded,
    fontWeight: '600',
  },
  tileMeta: {
    fontSize: 11,
    fontFamily: Fonts.mono,
    letterSpacing: 0.3,
  },
});
