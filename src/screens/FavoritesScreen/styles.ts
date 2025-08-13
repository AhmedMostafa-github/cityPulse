import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 30,
  },
  startExploringButton: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  startExploringButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  tabsContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginVertical: 20,
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 25,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 21,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
  },
  activeTab: {},
  activeTabText: {},
  inactiveTabText: {},
  contentContainer: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "left",
  },
  favoriteItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  favoriteImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  favoriteInfo: {
    flex: 1,
  },
  favoriteTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  favoriteSubtitle: {
    fontSize: 14,
  },
  favoriteActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    padding: 8,
    marginLeft: 10,
  },
});
