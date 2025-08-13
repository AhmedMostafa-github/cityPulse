import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemedCard } from "../../../components/ThemedCard";
import { useTheme } from "../../../contexts/ThemeContext";
import { LoadingCard } from "./LoadingCard";
import { FeaturedPlaceCard } from "./FeaturedPlaceCard";
import { styles } from "../styles";

interface FeaturedPlacesProps {
  featuredPlaces: Array<{
    id: string;
    name: string;
    nameAr: string;
    rating: number;
    category: string;
    categoryAr: string;
    city: string;
    state: string;
    imageUrl: string | null;
  }>;
  venuesLoading: boolean;
  searchQuery: string;
  safeTranslate: (key: string, fallback: string) => string;
  onPlacePress: (place: any) => void;
  getLocalizedName: (item: any, field: string) => string;
  isFavorite: (id: string, category: "event" | "venue") => boolean;
  addToFavorites: (item: any, category: "event" | "venue") => void;
  removeFromFavorites: (id: string, category: "event" | "venue") => void;
  venues: any[];
}

export const FeaturedPlaces: React.FC<FeaturedPlacesProps> = ({
  featuredPlaces,
  venuesLoading,
  searchQuery,
  safeTranslate,
  onPlacePress,
  getLocalizedName,
  isFavorite,
  addToFavorites,
  removeFromFavorites,
  venues,
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.featuredContainer}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        {searchQuery.trim()
          ? safeTranslate("home.searchVenues", "Venues")
          : safeTranslate("home.featuredPlaces", "Featured Places")}
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.featuredScrollContainer}
      >
        {venuesLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <LoadingCard key={`loading-${index}`} type="featured" />
          ))
        ) : featuredPlaces.length > 0 ? (
          featuredPlaces.map((place) => (
            <FeaturedPlaceCard
              key={place.id}
              place={place}
              onPress={() => onPlacePress(place)}
              getLocalizedName={getLocalizedName}
              isFavorite={isFavorite}
              addToFavorites={addToFavorites}
              removeFromFavorites={removeFromFavorites}
              venues={venues}
            />
          ))
        ) : (
          <ThemedCard style={styles.featuredCard}>
            <View
              style={[styles.featuredImage, { backgroundColor: colors.border }]}
            >
              <Ionicons name="image" size={40} color={colors.textSecondary} />
            </View>
            <Text
              style={[styles.featuredTitle, { color: colors.textSecondary }]}
            >
              No venues available
            </Text>
          </ThemedCard>
        )}
      </ScrollView>
    </View>
  );
};
