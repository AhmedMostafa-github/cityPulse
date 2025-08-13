import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { useEventsStore } from "../../stores/eventsStore";
import { useVenuesStore } from "../../stores/venuesStore";
import { useFavoritesStore } from "../../stores/favoritesStore";
import { styles } from "./styles";
import { HomeScreenProps } from "../../navigation/types";
import { useHomeData } from "./hooks/useHomeData";
import {
  Header,
  SearchBar,
  SearchResultsHeader,
  Categories,
  FeaturedPlaces,
  Events,
} from "./components";

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const { events, loading, fetchEvents } = useEventsStore();
  const { venues, loading: venuesLoading, fetchVenues } = useVenuesStore();
  const { addToFavorites, removeFromFavorites, isFavorite } =
    useFavoritesStore();

  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    filteredEvents,
    filteredVenues,
    categories,
    featuredPlaces,
    upcomingEvents,
    safeTranslate,
    getLocalizedName,
  } = useHomeData(events, venues, searchQuery);

  useEffect(() => {
    fetchEvents();
    fetchVenues();
  }, [fetchEvents, fetchVenues]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([fetchEvents(), fetchVenues()]);
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const handlePlacePress = (place: any) => {
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
          address: `${venue.city?.name || "Unknown"}, ${
            venue.state?.name || "Unknown"
          }`,
          addressAr: `${venue.city?.name || "غير معروف"}, ${
            venue.state?.name || "غير معروف"
          }`,
          coordinates: {
            latitude: (venue as any).location
              ? parseFloat((venue as any).location.latitude)
              : 24.7136,
            longitude: (venue as any).location
              ? parseFloat((venue as any).location.longitude)
              : 46.6753,
          },
          images: venue.images?.map((img) => img.url) || [],
          isOpen: true,
          isFavorite: isFavorite(venue.id, "venue"),
          tags: [venue.type],
        },
        type: "venue",
      });
    }
  };

  const handleEventPress = (event: any) => {
    const eventData = events.find((e) => e.id === event.id);
    if (eventData) {
      navigation.navigate("Detail", {
        item: {
          id: eventData.id,
          title: eventData.name,
          titleAr: eventData.name,
          description: eventData.info || "Event details coming soon",
          descriptionAr: eventData.info || "تفاصيل الحدث قريباً",
          date: eventData.dates.start.localDate,
          time: eventData.dates.start.localTime || "TBD",
          location: eventData._embedded?.venues?.[0]?.name || "Location TBD",
          locationAr:
            eventData._embedded?.venues?.[0]?.name || "الموقع قيد التحديد",
          category: eventData.classifications?.[0]?.segment?.name || "Event",
          price: "Free",
          images: eventData.images?.map((img) => img.url) || [],
          isFavorite: isFavorite(eventData.id, "event"),
          coordinates: {
            latitude:
              eventData?._embedded?.venues?.[0]?.location?.latitude || 24.7136,
            longitude:
              eventData?._embedded?.venues?.[0]?.location?.longitude || 46.6753,
          },
        },
        type: "event",
      });
    }
  };

  const handleEventFavoritePress = (event: any) => {
    const eventData = events.find((e) => e.id === event.id);
    if (eventData) {
      if (isFavorite(event.id, "event")) {
        removeFromFavorites(event.id, "event");
      } else {
        addToFavorites(eventData, "event");
      }
    }
  };

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
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[colors.primary]}
          tintColor={colors.primary}
        />
      }
    >
      <Header safeTranslate={safeTranslate} />

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        safeTranslate={safeTranslate}
      />

      <SearchResultsHeader
        searchQuery={searchQuery}
        filteredEvents={filteredEvents}
        filteredVenues={filteredVenues}
      />

      {!searchQuery.trim() && <Categories categories={categories} />}

      {(filteredVenues.length > 0 || venuesLoading) && (
        <FeaturedPlaces
          featuredPlaces={featuredPlaces}
          venuesLoading={venuesLoading}
          searchQuery={searchQuery}
          safeTranslate={safeTranslate}
          onPlacePress={handlePlacePress}
          getLocalizedName={getLocalizedName}
          isFavorite={isFavorite}
          addToFavorites={addToFavorites}
          removeFromFavorites={removeFromFavorites}
          venues={venues}
        />
      )}

      {(filteredEvents.length > 0 || loading) && (
        <Events
          upcomingEvents={upcomingEvents}
          loading={loading}
          searchQuery={searchQuery}
          safeTranslate={safeTranslate}
          onEventPress={handleEventPress}
          onEventFavoritePress={handleEventFavoritePress}
          getLocalizedName={getLocalizedName}
          isFavorite={isFavorite}
        />
      )}
    </ScrollView>
  );
};
