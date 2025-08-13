import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { ThemedCard } from "../../components/ThemedCard";

import { useEventsStore } from "../../stores/eventsStore";
import { useVenuesStore } from "../../stores/venuesStore";
import { useFavoritesStore } from "../../stores/favoritesStore";
import { styles } from "./styles";
import { HomeScreenProps } from "../../navigation/types";

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const { colors, theme } = useTheme();
  const { isRTL } = useLanguage();
  const { events, loading, fetchEvents } = useEventsStore();
  const { venues, loading: venuesLoading, fetchVenues } = useVenuesStore();
  const { addToFavorites, removeFromFavorites, isFavorite } =
    useFavoritesStore();

  // Fetch events and venues when component mounts
  useEffect(() => {
    fetchEvents();
    fetchVenues();
  }, [fetchEvents, fetchVenues]);

  // Safe fallback if translations aren't ready
  const safeTranslate = (key: string, fallback: string) => {
    try {
      return t(key) || fallback;
    } catch {
      return fallback;
    }
  };

  const categories = [
    {
      icon: "restaurant",
      name: safeTranslate("home.restaurants", "Restaurants"),
      color: "#FF6B6B",
    },
    {
      icon: "cafe",
      name: safeTranslate("home.cafes", "Cafes"),
      color: "#4ECDC4",
    },
    {
      icon: "beer",
      name: safeTranslate("home.bars", "Bars"),
      color: "#45B7D1",
    },
    {
      icon: "film",
      name: safeTranslate("home.entertainment", "Entertainment"),
      color: "#96CEB4",
    },
  ];

  const featuredPlaces = venues.slice(0, 5).map((venue) => ({
    id: venue.id,
    name: venue.name,
    nameAr: venue.name, // Using English name as fallback for Arabic
    rating: venue.upcomingEvents._total || 0,
    category: venue.type,
    categoryAr: venue.type === "venue" ? "مكان" : venue.type,
    city: venue.city.name,
    state: venue.state.name,
    imageUrl: venue.images?.[0]?.url || null,
  }));

  const upcomingEvents = events.slice(0, 12).map((event) => {
    const eventDate = new Date(event.dates.start.localDate);
    const day = eventDate.getDate().toString().padStart(2, "0");
    const month = eventDate
      .toLocaleDateString("en-US", { month: "short" })
      .toUpperCase();
    const monthAr = eventDate.toLocaleDateString("ar-SA", { month: "long" });

    return {
      id: event.id,
      title: event.name,
      titleAr: event.name, // Using English name as fallback for Arabic
      date: day,
      month: month,
      monthAr: monthAr,
      location: event._embedded?.venues?.[0]?.name || "Location TBD",
      locationAr: event._embedded?.venues?.[0]?.name || "الموقع قيد التحديد",
      time: event.dates.start.localTime || "TBD",
    };
  });

  const getLocalizedName = (item: any, field: string) => {
    try {
      const arField = `${field}Ar` as keyof typeof item;
      const defaultField = field as keyof typeof item;

      if (isRTL && arField in item) {
        return (item as any)[arField] || (item as any)[defaultField];
      }
      return (item as any)[defaultField];
    } catch (error) {
      // Fallback to default field if there's an error
      return (item as any)[field] || "";
    }
  };

  // Safe render with fallback
  if (!colors) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={[styles.header, { backgroundColor: colors.surface }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          {safeTranslate("home.title", "City Pulse")}
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
          {safeTranslate("home.subtitle", "Discover Your City")}
        </Text>
      </View>

      <ThemedCard style={styles.searchBar}>
        <Ionicons name="search" size={20} color={colors.textSecondary} />
        <Text style={[styles.searchText, { color: colors.textSecondary }]}>
          {safeTranslate(
            "home.searchPlaceholder",
            "Search places, events, restaurants..."
          )}
        </Text>
      </ThemedCard>

      <View style={styles.categoriesContainer}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: colors.text,
            },
          ]}
        >
          {safeTranslate("home.categories", "Categories")}
        </Text>
        <View style={styles.categoriesGrid}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.categoryCard, { backgroundColor: colors.surface }]}
            >
              <Ionicons
                name={category.icon as any}
                size={32}
                color={category.color}
              />
              <Text
                style={[
                  styles.categoryText,
                  {
                    color: colors.text,
                    textAlign: isRTL ? "right" : "center",
                  },
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.featuredContainer}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: colors.text,
            },
          ]}
        >
          {safeTranslate("home.featuredPlaces", "Featured Places")}
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredScrollContainer}
        >
          {venuesLoading ? (
            // Show multiple loading cards
            Array.from({ length: 5 }).map((_, index) => (
              <ThemedCard key={`loading-${index}`} style={styles.featuredCard}>
                <View
                  style={[
                    styles.featuredImage,
                    { backgroundColor: colors.border },
                  ]}
                >
                  <Ionicons
                    name="image"
                    size={40}
                    color={colors.textSecondary}
                  />
                </View>
                <View style={styles.featuredCardContent}>
                  <View
                    style={[
                      styles.loadingText,
                      { backgroundColor: colors.border },
                    ]}
                  />
                  <View
                    style={[
                      styles.loadingText,
                      { backgroundColor: colors.border, width: "60%" },
                    ]}
                  />
                </View>
              </ThemedCard>
            ))
          ) : featuredPlaces.length > 0 ? (
            featuredPlaces.map((place) => (
              <TouchableOpacity
                key={place.id}
                onPress={() => {
                  const venue = venues.find((v) => v.id === place.id);
                  if (venue) {
                    navigation.navigate("Detail", {
                      item: {
                        id: venue.id,
                        name: venue.name,
                        nameAr: venue.name,
                        description: venue.type,
                        descriptionAr: venue.type,
                        category: venue.type,
                        rating: venue.upcomingEvents._total || 0,
                        price: "Free",
                        address: `${venue.city.name}, ${venue.state.name}`,
                        addressAr: `${venue.city.name}, ${venue.state.name}`,
                        coordinates: {
                          latitude: 24.7136, // Default coordinates
                          longitude: 46.6753,
                        },
                        images: venue.images?.map((img) => img.url) || [],
                        isOpen: true,
                        isFavorite: isFavorite(venue.id, "venue"),
                        tags: [venue.type],
                      },
                      type: "venue",
                    });
                  }
                }}
              >
                <ThemedCard style={styles.featuredCard}>
                  <View style={styles.featuredCardHeader}>
                    <View
                      style={[
                        styles.featuredImage,
                        { backgroundColor: colors.border },
                      ]}
                    >
                      {place.imageUrl ? (
                        <Image
                          source={{ uri: place.imageUrl }}
                          style={styles.featuredImage}
                          resizeMode="cover"
                        />
                      ) : (
                        <Ionicons
                          name="image"
                          size={40}
                          color={colors.textSecondary}
                        />
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
                        name={
                          isFavorite(place.id, "venue")
                            ? "heart"
                            : "heart-outline"
                        }
                        size={20}
                        color={
                          isFavorite(place.id, "venue")
                            ? "#FF6B6B"
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
                      style={[
                        styles.featuredSubtitle,
                        { color: colors.textSecondary },
                      ]}
                      numberOfLines={1}
                    >
                      {place.rating} events • {place.city}, {place.state}
                    </Text>
                  </View>
                </ThemedCard>
              </TouchableOpacity>
            ))
          ) : (
            <ThemedCard style={styles.featuredCard}>
              <View
                style={[
                  styles.featuredImage,
                  { backgroundColor: colors.border },
                ]}
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

      <View style={styles.eventsContainer}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: colors.text,
            },
          ]}
        >
          {safeTranslate("home.upcomingEvents", "Upcoming Events")}
        </Text>
        {loading ? (
          // Show multiple loading cards for events
          Array.from({ length: 3 }).map((_, index) => (
            <ThemedCard key={`event-loading-${index}`} style={styles.eventCard}>
              <View
                style={[styles.eventDate, { backgroundColor: colors.border }]}
              >
                <View
                  style={[
                    styles.loadingText,
                    { backgroundColor: colors.surface, height: 16 },
                  ]}
                />
                <View
                  style={[
                    styles.loadingText,
                    {
                      backgroundColor: colors.surface,
                      height: 12,
                      width: "80%",
                    },
                  ]}
                />
              </View>
              <View style={styles.eventInfo}>
                <View
                  style={[
                    styles.loadingText,
                    {
                      backgroundColor: colors.border,
                      height: 16,
                      marginBottom: 8,
                    },
                  ]}
                />
                <View
                  style={[
                    styles.loadingText,
                    {
                      backgroundColor: colors.border,
                      height: 12,
                      width: "70%",
                    },
                  ]}
                />
              </View>
            </ThemedCard>
          ))
        ) : upcomingEvents.length > 0 ? (
          upcomingEvents.map((event) => (
            <TouchableOpacity
              key={event.id}
              onPress={() => {
                const eventData = events.find((e) => e.id === event.id);
                if (eventData) {
                  navigation.navigate("Detail", {
                    item: {
                      id: eventData.id,
                      title: eventData.name,
                      titleAr: eventData.name,
                      description:
                        eventData.info || "Event details coming soon",
                      descriptionAr: eventData.info || "تفاصيل الحدث قريباً",
                      date: eventData.dates.start.localDate,
                      time: eventData.dates.start.localTime || "TBD",
                      location:
                        eventData._embedded?.venues?.[0]?.name ||
                        "Location TBD",
                      locationAr:
                        eventData._embedded?.venues?.[0]?.name ||
                        "الموقع قيد التحديد",
                      category:
                        eventData.classifications?.[0]?.segment?.name ||
                        "Event",
                      price: "Free",
                      images: eventData.images?.map((img) => img.url) || [],
                      isFavorite: isFavorite(eventData.id, "event"),
                    },
                    type: "event",
                  });
                }
              }}
            >
              <ThemedCard style={styles.eventCard}>
                <View
                  style={[
                    styles.eventDate,
                    { backgroundColor: colors.primary },
                  ]}
                >
                  <Text style={styles.eventDay}>{event.date}</Text>
                  <Text style={styles.eventMonth}>
                    {getLocalizedName(event, "month")}
                  </Text>
                </View>
                <View style={styles.eventInfo}>
                  <Text style={[styles.eventTitle, { color: colors.text }]}>
                    {getLocalizedName(event, "title")}
                  </Text>
                  <Text
                    style={[
                      styles.eventLocation,
                      { color: colors.textSecondary },
                    ]}
                  >
                    {getLocalizedName(event, "location")} • {event.time}
                  </Text>
                </View>
                <TouchableOpacity
                  style={[
                    styles.eventFavoriteButton,
                    {
                      [isRTL ? "left" : "right"]: 8,
                    },
                  ]}
                  onPress={() => {
                    const eventData = events.find((e) => e.id === event.id);
                    if (eventData) {
                      if (isFavorite(event.id, "event")) {
                        removeFromFavorites(event.id, "event");
                      } else {
                        addToFavorites(eventData, "event");
                      }
                    }
                  }}
                >
                  <Ionicons
                    name={
                      isFavorite(event.id, "event") ? "heart" : "heart-outline"
                    }
                    size={18}
                    color={
                      isFavorite(event.id, "event")
                        ? "#FF6B6B"
                        : colors.textSecondary
                    }
                  />
                </TouchableOpacity>
              </ThemedCard>
            </TouchableOpacity>
          ))
        ) : (
          <ThemedCard style={styles.eventCard}>
            <Text style={[styles.eventTitle, { color: colors.textSecondary }]}>
              No events available
            </Text>
          </ThemedCard>
        )}
      </View>
    </ScrollView>
  );
};
