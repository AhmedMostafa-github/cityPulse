import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  fallbackText: {
    fontSize: 18,
    color: "#666",
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
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    margin: 20,
    padding: 15,
  },
  searchText: {
    marginLeft: 10,
    fontSize: 16,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "left",
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryCard: {
    width: "48%",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 15,
  },
  categoryText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "600",
  },
  featuredContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  featuredScrollContainer: {
    paddingRight: 20,
  },
  featuredCard: {
    width: 200,
    marginRight: 15,
  },
  featuredImage: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  featuredTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  featuredSubtitle: {
    fontSize: 14,
  },
  eventsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  eventCard: {
    flexDirection: "row",
    marginBottom: 15,
  },
  eventDate: {
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginRight: 15,
    minWidth: 50,
  },
  eventDay: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  eventMonth: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    width: "90%",
  },
  eventLocation: {
    fontSize: 14,
  },
  loadingTextContainer: {
    marginTop: 8,
  },
  loadingText: {
    height: 12,
    borderRadius: 6,
    marginBottom: 4,
    width: "100%",
  },
  featuredCardHeader: {
    position: "relative",
  },
  favoriteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 20,
    padding: 6,
    zIndex: 1,
  },
  eventFavoriteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 16,
    padding: 4,
    zIndex: 1,
  },
});
