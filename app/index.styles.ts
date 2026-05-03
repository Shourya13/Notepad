import { StyleSheet } from 'react-native';

import { Fonts } from '@/constants/theme';

export const indexStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleWrap: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    lineHeight: 30,
  },
  headerSubtitle: {
    marginTop: 2,
    fontSize: 13,
  },
  warningBox: {
    marginHorizontal: 16,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  warningText: {
    fontSize: 13,
    fontFamily: Fonts.sans,
  },
  searchWrap: {
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 4,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    lineHeight: 18,
    fontFamily: Fonts.sans,
    padding: 0,
  },
  fabButton: {
    position: 'absolute',
    bottom: 74,
    alignSelf: 'center',
    width: 62,
    height: 62,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 8,
  },
  menuOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 280,
    borderRightWidth: 1,
    paddingTop: 52,
    paddingHorizontal: 14,
    gap: 10,
  },
  drawerTitle: {
    fontSize: 20,
    lineHeight: 26,
    marginBottom: 6,
  },
  drawerItem: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  drawerItemText: {
    fontSize: 15,
    lineHeight: 20,
    fontFamily: Fonts.sans,
  },
  drawerBlock: {
    borderTopWidth: 1,
    marginTop: 6,
    paddingTop: 10,
    gap: 8,
  },
  drawerBlockTitle: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: Fonts.mono,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  drawerThemeActionTextWrap: {
    flex: 1,
  },
  drawerThemeActionSubtext: {
    fontSize: 12,
    lineHeight: 16,
  },
});
