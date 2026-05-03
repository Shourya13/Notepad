import { StyleSheet } from 'react-native';

import { Fonts } from '@/constants/theme';

export const entityListStyles = StyleSheet.create({
  listArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 110,
    gap: 12,
  },
  emptyState: {
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  emptyText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: Fonts.sans,
  },
  card: {
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  leadingIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTextWrap: {
    flex: 1,
    gap: 2,
  },
  cardTitle: {
    fontSize: 20,
    lineHeight: 24,
    fontFamily: Fonts.rounded,
  },
  cardSubtext: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: Fonts.sans,
  },
  actionsCol: {
    gap: 4,
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
