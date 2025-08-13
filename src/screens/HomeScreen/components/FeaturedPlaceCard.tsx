import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemedCard } from "../../../components/ThemedCard";
import { useTheme } from "../../../contexts/ThemeContext";
import { useLanguage } from "../../../contexts/LanguageContext";
import { useFavoritesStore } from "../../../stores/favoritesStore";
import { styles } from "../styles";

interface FeaturedPlaceCardProps {
  place: {
    id: string;
    name: string;
    nameAr: string;
    rating: number;
    category: string;
    categoryAr: string;
    city: string;
    state: string;
    imageUrl: string | null;
  };
  onPress: () => void;
  getLocalizedName: (item: any, field: string) => string;
  isFavorite: (id: string, category: "event" | "venue") => boolean;
  addToFavorites: (item: any, category: "event" | "venue") => void;
  removeFromFavorites: (id: string, category: "event" | "venue") => void;
  venues: any[];
}

export const FeaturedPlaceCard: React.FC<FeaturedPlaceCardProps> = ({
  place,
  onPress,
  getLocalizedName,
  isFavorite,
  addToFavorites,
  removeFromFavorites,
  venues,
}) => {
  const { colors } = useTheme();
  const { isRTL } = useLanguage();

  return (
    <TouchableOpacity onPress={onPress}>
      <ThemedCard style={styles.featuredCard}>
        <View style={styles.featuredCardHeader}>
          <View
            style={[styles.featuredImage, { backgroundColor: colors.border }]}
          >
            {place.imageUrl ? (
              <Image
                source={{ uri: place.imageUrl }}
                style={styles.featuredImage}
                resizeMode="cover"
              />
            ) : (
              <Ionicons name="image" size={40} color={colors.textSecondary} />
            )}
          </View>
          <TouchableOpacity
            style={[
              styles.favoriteButton,
              {
                [isRTL ? "left" : "right"]: 8,
              },
            ]}
            onPress={() => {
              const venue = venues.find((v) => v.id === place.id);
              if (venue) {
                if (isFavorite(place.id, "venue")) {
                  removeFromFavorites(place.id, "venue");
                } else {
                  addToFavorites(venue, "venue");
                }
              }
            }}
          >
            <Ionicons
              name={isFavorite(place.id, "venue") ? "heart" : "heart-outline"}
              size={20}
              color={
                isFavorite(place.id, "venue")
                  ? colors.primary
                  : colors.textSecondary
              }
            />
          </TouchableOpacity>
        </View>
        <View style={styles.featuredCardContent}>
          <Text
            style={[styles.featuredTitle, { color: colors.text }]}
            numberOfLines={2}
          >
            {getLocalizedName(place, "name")}
          </Text>
          <Text
            style={[styles.featuredSubtitle, { color: colors.textSecondary }]}
            numberOfLines={1}
          >
            {place.rating} events • {place.city}, {place.state}
          </Text>
        </View>
      </ThemedCard>
    </TouchableOpacity>
  );
};
