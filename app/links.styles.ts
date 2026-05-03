import { Fonts } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const linksStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTextWrap: {
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
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  warningText: {
    fontSize: 13,
    fontFamily: Fonts.sans,
  },
  listArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 16,
    gap: 10,
  },
  emptyState: {
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 16,
  },
  emptyText: {
    fontSize: 14,
    lineHeight: 20,
  },
  linkCard: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 11,
    gap: 8,
    // No border for minimalist card
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  urlRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  urlText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
    fontFamily: Fonts.mono,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: Fonts.sans,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  timeText: {
    fontSize: 11,
    lineHeight: 14,
    fontFamily: Fonts.mono,
  },
  rowActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  roundAction: {
    width: 32,
    height: 32,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomDock: {
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 10,
    gap: 8,
  },
  searchInput: {
    borderRadius: 11,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    lineHeight: 20,
  },
  input: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    lineHeight: 20,
    backgroundColor: "transparent",
  },
  bottomRow: {
    flexDirection: "row",
    gap: 8,
    alignItems: "flex-end",
  },
  messageInput: {
    flex: 1,
    borderRadius: 14,
    minHeight: 48,
    maxHeight: 120,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    lineHeight: 20,
  },
  bottomActions: {
    gap: 8,
  },
  iconCta: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  iconGhost: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  fabButton: {
    position: "absolute",
    bottom: 24,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 16, // Matches your card aesthetic better than a circle
    justifyContent: "center",
    alignItems: "center",
    // Shadow to make it "float"
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 99,
  },
});
