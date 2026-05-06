import { StyleSheet } from 'react-native';

import { Fonts } from '@/constants/theme';

export const actionPaletteStyles = StyleSheet.create({
  wrap: {
    paddingTop: 10,
    paddingBottom: 14,
    paddingHorizontal: 18,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 11,
    fontFamily: Fonts.mono,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  scroll: {
    flexDirection: 'row',
    gap: 8,
    paddingRight: 18,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  chipLabel: {
    fontSize: 13,
    fontFamily: Fonts.rounded,
    fontWeight: '600',
  },
});
