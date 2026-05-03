import { StyleSheet } from 'react-native';

import { Fonts } from '@/constants/theme';

export const appFooterStyles = StyleSheet.create({
  footer: {
    borderTopWidth: 1,
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  item: {
    width: 74,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    paddingVertical: 4,
    borderRadius: 10,
  },
  label: {
    fontSize: 11,
    lineHeight: 14,
    fontFamily: Fonts.sans,
  },
});
