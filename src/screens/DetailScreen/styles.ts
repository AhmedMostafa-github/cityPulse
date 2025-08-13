import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
  },
  imageContainer: {
    position: "relative",
  },
  mainImage: {
    width: "100%",
    height: 250,
  },
  imageIndicators: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  thumbnailContainer: {
    position: "absolute",
    bottom: 60,
    left: 0,
    right: 0,
  },
  thumbnailContent: {
    paddingHorizontal: 16,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    borderWidth: 2,
    marginRight: 8,
    overflow: "hidden",
  },
  thumbnailImage: {
    width: "100%",
    height: "100%",
  },
  content: {
    padding: 16,
  },
  headerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    flex: 1,
    marginRight: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 4,
  },
  metaSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 12,
  },
  categoryText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
  },
  descriptionCard: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  locationCard: {
    marginBottom: 16,
  },
  location: {
    fontSize: 16,
    marginBottom: 16,
    lineHeight: 22,
  },
  mapContainer: {
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
  },
  map: {
    flex: 1,
  },
  locationDisplay: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
  },
  locationText: {
    fontSize: 16,
    marginLeft: 12,
    fontWeight: "500",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  actionButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
  },
  eventInfoCard: {
    marginBottom: 16,
  },
  eventInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  eventInfoText: {
    fontSize: 16,
    marginLeft: 12,
  },
  tagsCard: {
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "500",
  },
});
