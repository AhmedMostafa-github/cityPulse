import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../contexts/ThemeContext";
import { useLanguage } from "../../../contexts/LanguageContext";

export const useHomeData = (
  events: any[],
  venues: any[],
  searchQuery: string
) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { isRTL } = useLanguage();

  const safeTranslate = (key: string, fallback: string) => {
    try {
      return t(key) || fallback;
    } catch {
      return fallback;
    }
  };

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      if (!searchQuery.trim()) return true;

      const query = searchQuery.toLowerCase();
      const eventName = event.name.toLowerCase();
      const venueName = event._embedded?.venues?.[0]?.name?.toLowerCase() || "";
      const eventInfo = event.info?.toLowerCase() || "";

      return (
        eventName.includes(query) ||
        venueName.includes(query) ||
        eventInfo.includes(query)
      );
    });
  }, [events, searchQuery]);

  const filteredVenues = useMemo(() => {
    return venues.filter((venue) => {
      if (!searchQuery.trim()) return true;

      const query = searchQuery.toLowerCase();
      const venueName = venue.name.toLowerCase();
      const venueType = venue.type.toLowerCase();
      const cityName = venue.city.name.toLowerCase();
      const stateName = venue.state.name.toLowerCase();

      return (
        venueName.includes(query) ||
        venueType.includes(query) ||
        cityName.includes(query) ||
        stateName.includes(query)
      );
    });
  }, [venues, searchQuery]);

  const categories = useMemo(
    () => [
      {
        icon: "restaurant",
        name: safeTranslate("home.restaurants", "Restaurants"),
        color: colors.primary,
      },
      {
        icon: "cafe",
        name: safeTranslate("home.cafes", "Cafes"),
        color: colors.secondary,
      },
      {
        icon: "beer",
        name: safeTranslate("home.bars", "Bars"),
        color: colors.blue,
      },
      {
        icon: "film",
        name: safeTranslate("home.entertainment", "Entertainment"),
        color: colors.green,
      },
    ],
    [colors, safeTranslate]
  );

  const featuredPlaces = useMemo(() => {
    return filteredVenues.slice(0, 5).map((venue) => ({
      id: venue.id,
      name: venue.name,
      nameAr: venue.name,
      rating: venue.upcomingEvents._total || 0,
      category: venue.type,
      categoryAr: venue.type === "venue" ? "مكان" : venue.type,
      city: venue.city.name,
      state: venue.state.name,
      imageUrl: venue.images?.[0]?.url || null,
    }));
  }, [filteredVenues]);

  const upcomingEvents = useMemo(() => {
    return filteredEvents.slice(0, 12).map((event) => {
      const eventDate = new Date(event.dates.start.localDate);
      const day = eventDate.getDate().toString().padStart(2, "0");
      const month = eventDate
        .toLocaleDateString("en-US", { month: "short" })
        .toUpperCase();
      const monthAr = eventDate.toLocaleDateString("ar-SA", { month: "long" });

      return {
        id: event.id,
        title: event.name,
        titleAr: event.name,
        date: day,
        month: month,
        monthAr: monthAr,
        location: event._embedded?.venues?.[0]?.name || "Location TBD",
        locationAr: event._embedded?.venues?.[0]?.name || "الموقع قيد التحديد",
        time: event.dates.start.localTime || "TBD",
      };
    });
  }, [filteredEvents]);

  const getLocalizedName = (item: any, field: string) => {
    try {
      const arField = `${field}Ar` as keyof typeof item;
      const defaultField = field as keyof typeof item;

      if (isRTL && arField in item) {
        return (item as any)[arField] || (item as any)[defaultField];
      }
      return (item as any)[defaultField];
    } catch (error) {
      return (item as any)[field] || "";
    }
  };

  return {
    filteredEvents,
    filteredVenues,
    categories,
    featuredPlaces,
    upcomingEvents,
    safeTranslate,
    getLocalizedName,
  };
};
