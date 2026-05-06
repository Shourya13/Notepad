import { StyleSheet } from 'react-native';

import { Fonts } from '@/constants/theme';

const DOT_SIZE = 12;
const GUTTER_WIDTH = 28;

export const timelineStyles = StyleSheet.create({
  container: {
    gap: 12,
  },
  emptyState: {
    paddingVertical: 28,
    paddingHorizontal: 22,
    borderRadius: 16,
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  emptyTitle: {
    fontSize: 14,
    fontFamily: Fonts.rounded,
    fontWeight: '600',
  },
  emptyText: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: Fonts.sans,
    textAlign: 'center',
  },
  stepList: {
    gap: 0,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 10,
    paddingBottom: 10,
  },
  gutter: {
    width: GUTTER_WIDTH,
    alignItems: 'center',
    paddingTop: 14,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
  },
  connector: {
    width: 2,
    flex: 1,
    marginTop: 4,
    minHeight: 14,
  },
  ingredientPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingLeft: 14,
    paddingRight: 4,
    paddingVertical: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  ingredientText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 19,
    fontFamily: Fonts.sans,
  },
  deleteHit: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 14,
    paddingRight: 4,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  actionContent: {
    flex: 1,
    gap: 4,
  },
  actionRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  draggingRow: {
    opacity: 0.3,
  },
  actionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionTitle: {
    fontSize: 14,
    fontFamily: Fonts.rounded,
    fontWeight: '600',
  },
  actionMeta: {
    fontSize: 12,
    fontFamily: Fonts.mono,
  },
  actionNote: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: Fonts.sans,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 4,
  },
  addButtonText: {
    fontSize: 14,
    fontFamily: Fonts.rounded,
    fontWeight: '600',
  },
  dropIndicator: {
    height: 3,
    borderRadius: 2,
    marginVertical: 4,
    marginLeft: 38,
    marginRight: 4,
  },
});
