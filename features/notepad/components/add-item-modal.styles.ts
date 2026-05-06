import { StyleSheet } from 'react-native';

import { Fonts } from '@/constants/theme';
import { BorderRadius, FontSizes, Shadows, Spacing } from '@/lib/design-tokens';

export const addItemModalStyles = StyleSheet.create({
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
    gap: Spacing.md,
    ...Shadows.elevated,
    // Handle bar indicator
    borderTopWidth: 0,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: Spacing.sm,
    opacity: 0.25,
    backgroundColor: '#888',
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  sheetTitle: {
    fontSize: FontSizes.xl,
    lineHeight: 28,
    fontFamily: Fonts.rounded,
    fontWeight: '600',
    letterSpacing: -0.3,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 1,
  },
  input: {
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    fontSize: FontSizes.base,
    lineHeight: 22,
    fontFamily: Fonts.sans,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 3,
    elevation: 1,
  },
  textArea: {
    minHeight: 110,
    maxHeight: 180,
  },
  submitButton: {
    marginTop: Spacing.xs,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.md + 2,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.subtle,
  },
  submitText: {
    fontSize: FontSizes.base,
    lineHeight: 22,
    fontFamily: Fonts.rounded,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: 0.2,
  },
});
