import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { ThemedCard } from "../../components/ThemedCard";
import { ThemedButton } from "../../components/ThemedButton";
import { mockPlaces, mockEvents } from "../../services/mockData";
import { useEventsStore } from "../../stores/eventsStore";
import { styles } from "./styles";

const { width } = Dimensions.get("window");

export const HomeScreen: React.FC = () => {
  const { t } = useTranslation();
  const { colors, theme } = useTheme();
  const { isRTL } = useLanguage();
  const { events, loading, error, fetchEvents } = useEventsStore();

  // Fetch events when component mounts
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Console log the events data
  useEffect(() => {
    console.log("Events data from API:", events);
    console.log("Events count:", events.length);
    if (events.length > 0) {
      console.log("First event:", events[0]);
      console.log("Event name:", events[0].name);
      console.log("Event date:", events[0].dates.start.localDate);
      console.log("Event time:", events[0].dates.start.localTime);
    }
    if (error) {
      console.error("Error fetching events:", error);
    }
  }, [events, error]);

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

  const featuredPlaces = mockPlaces.slice(0, 3).map((place) => ({
    id: place.id,
    name: place.name,
    nameAr: place.nameAr,
    rating: place.rating,
    category: place.category,
    categoryAr:
      place.category === "cafe"
        ? "مقهى"
        : place.category === "outdoor"
        ? "مساحة خارجية"
        : place.category === "cultural"
        ? "ثقافي"
        : place.category === "restaurant"
        ? "مطعم"
        : place.category,
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
          {featuredPlaces.map((place) => (
            <ThemedCard key={place.id} style={styles.featuredCard}>
              <View
                style={[
                  styles.featuredImage,
                  { backgroundColor: colors.border },
                ]}
              >
                <Ionicons name="image" size={40} color={colors.textSecondary} />
              </View>
              <Text style={[styles.featuredTitle, { color: colors.text }]}>
                {getLocalizedName(place, "name")}
              </Text>
              <Text
                style={[
                  styles.featuredSubtitle,
                  { color: colors.textSecondary },
                ]}
              >
                {place.rating} ★ • {getLocalizedName(place, "category")}
              </Text>
            </ThemedCard>
          ))}
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
          <ThemedCard style={styles.eventCard}>
            <Text style={[styles.eventTitle, { color: colors.textSecondary }]}>
              Loading events...
            </Text>
          </ThemedCard>
        ) : upcomingEvents.length > 0 ? (
          upcomingEvents.map((event) => (
            <ThemedCard key={event.id} style={styles.eventCard}>
              <View
                style={[styles.eventDate, { backgroundColor: colors.primary }]}
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
            </ThemedCard>
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
