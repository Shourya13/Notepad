import { StyleSheet } from 'react-native';

import { Fonts } from '@/constants/theme';
import { BorderRadius, Spacing, Shadows, FontSizes, ComponentSizes } from '@/lib/design-tokens';

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
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxl,
    gap: Spacing.md,
    ...Shadows.elevated,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  sheetTitle: {
    fontSize: FontSizes.xl,
    lineHeight: 26,
    fontFamily: Fonts.rounded,
    fontWeight: '600',
  },
  closeButton: {
    width: ComponentSizes.buttonMd,
    height: ComponentSizes.buttonMd,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.subtle,
  },
  input: {
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    fontSize: FontSizes.base,
    lineHeight: 20,
    ...Shadows.subtle,
  },
  textArea: {
    minHeight: 120,
    maxHeight: 180,
  },
  submitButton: {
    marginTop: Spacing.xs,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.subtle,
  },
  submitText: {
    fontSize: FontSizes.base,
    lineHeight: 20,
    fontFamily: Fonts.sans,
    fontWeight: '600',
  },
});
