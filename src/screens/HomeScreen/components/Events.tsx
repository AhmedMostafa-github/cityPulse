import React from "react";
import { View, Text } from "react-native";
import { ThemedCard } from "../../../components/ThemedCard";
import { useTheme } from "../../../contexts/ThemeContext";
import { LoadingCard } from "./LoadingCard";
import { EventCard } from "./EventCard";
import { styles } from "../styles";

interface EventsProps {
  upcomingEvents: Array<{
    id: string;
    title: string;
    titleAr: string;
    date: string;
    month: string;
    monthAr: string;
    location: string;
    locationAr: string;
    time: string;
  }>;
  loading: boolean;
  searchQuery: string;
  safeTranslate: (key: string, fallback: string) => string;
  onEventPress: (event: any) => void;
  onEventFavoritePress: (event: any) => void;
  getLocalizedName: (item: any, field: string) => string;
  isFavorite: (id: string, category: "event" | "venue") => boolean;
}

export const Events: React.FC<EventsProps> = ({
  upcomingEvents,
  loading,
  searchQuery,
  safeTranslate,
  onEventPress,
  onEventFavoritePress,
  getLocalizedName,
  isFavorite,
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.eventsContainer}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        {searchQuery.trim()
          ? safeTranslate("home.searchEvents", "Events")
          : safeTranslate("home.upcomingEvents", "Upcoming Events")}
      </Text>
      {loading ? (
        Array.from({ length: 3 }).map((_, index) => (
          <LoadingCard key={`event-loading-${index}`} type="event" />
        ))
      ) : upcomingEvents.length > 0 ? (
        upcomingEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onPress={() => onEventPress(event)}
            onFavoritePress={() => onEventFavoritePress(event)}
            getLocalizedName={getLocalizedName}
            isFavorite={isFavorite}
          />
        ))
      ) : (
        <ThemedCard style={styles.eventCard}>
          <Text style={[styles.eventTitle, { color: colors.textSecondary }]}>
            No events available
          </Text>
        </ThemedCard>
      )}
    </View>
  );
};
