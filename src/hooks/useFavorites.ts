import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Place, Event, User } from "../types";

interface UseFavoritesReturn {
  favoritePlaces: Place[];
  favoriteEvents: Event[];
  isLoading: boolean;
  addToFavorites: (
    type: "places" | "events",
    item: Place | Event
  ) => Promise<void>;
  removeFromFavorites: (type: "places" | "events", id: string) => Promise<void>;
  isFavorite: (type: "places" | "events", id: string) => boolean;
  clearFavorites: (type: "places" | "events") => Promise<void>;
}

const MOCK_PLACES: Place[] = [
  {
    id: "1",
    name: "Downtown Cafe",
    nameAr: "مقهى وسط المدينة",
    description: "A cozy cafe in the heart of downtown",
    descriptionAr: "مقهى دافئ في قلب وسط المدينة",
    category: "cafe",
    rating: 4.5,
    price: "$$",
    address: "123 Main St, Downtown",
    addressAr: "١٢٣ الشارع الرئيسي، وسط المدينة",
    coordinates: { latitude: 40.7128, longitude: -74.006 },
    images: [],
    isOpen: true,
    isFavorite: true,
    tags: ["coffee", "breakfast", "wifi"],
  },
  {
    id: "2",
    name: "Urban Park",
    nameAr: "الحديقة الحضرية",
    description: "Beautiful park with walking trails",
    descriptionAr: "حديقة جميلة مع مسارات للمشي",
    category: "outdoor",
    rating: 4.8,
    price: "Free",
    address: "456 Park Ave, Downtown",
    addressAr: "٤٥٦ جادة الحديقة، وسط المدينة",
    coordinates: { latitude: 40.7589, longitude: -73.9851 },
    images: [],
    isOpen: true,
    isFavorite: true,
    tags: ["outdoor", "nature", "exercise"],
  },
];

const MOCK_EVENTS: Event[] = [
  {
    id: "1",
    title: "Summer Music Festival",
    titleAr: "مهرجان الموسيقى الصيفي",
    description: "Annual summer music festival featuring local artists",
    descriptionAr: "مهرجان الموسيقى الصيفي السنوي مع فنانيين محليين",
    date: "2024-08-15",
    time: "7:00 PM",
    location: "Central Park",
    locationAr: "الحديقة المركزية",
    category: "music",
    price: "$25",
    images: [],
    isFavorite: true,
  },
];

export const useFavorites = (): UseFavoritesReturn => {
  const [favoritePlaces, setFavoritePlaces] = useState<Place[]>([]);
  const [favoriteEvents, setFavoriteEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const savedPlaces = await AsyncStorage.getItem("favorite-places");
      const savedEvents = await AsyncStorage.getItem("favorite-events");

      if (savedPlaces) {
        setFavoritePlaces(JSON.parse(savedPlaces));
      } else {
        // For demo purposes, set mock favorites
        setFavoritePlaces(MOCK_PLACES);
        await AsyncStorage.setItem(
          "favorite-places",
          JSON.stringify(MOCK_PLACES)
        );
      }

      if (savedEvents) {
        setFavoriteEvents(JSON.parse(savedEvents));
      } else {
        // For demo purposes, set mock favorites
        setFavoriteEvents(MOCK_EVENTS);
        await AsyncStorage.setItem(
          "favorite-events",
          JSON.stringify(MOCK_EVENTS)
        );
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
      setFavoritePlaces(MOCK_PLACES);
      setFavoriteEvents(MOCK_EVENTS);
    } finally {
      setIsLoading(false);
    }
  };

  const addToFavorites = async (
    type: "places" | "events",
    item: Place | Event
  ): Promise<void> => {
    try {
      if (type === "places") {
        const place = item as Place;
        const updatedPlaces = [
          ...favoritePlaces,
          { ...place, isFavorite: true },
        ];
        setFavoritePlaces(updatedPlaces);
        await AsyncStorage.setItem(
          "favorite-places",
          JSON.stringify(updatedPlaces)
        );
      } else {
        const event = item as Event;
        const updatedEvents = [
          ...favoriteEvents,
          { ...event, isFavorite: true },
        ];
        setFavoriteEvents(updatedEvents);
        await AsyncStorage.setItem(
          "favorite-events",
          JSON.stringify(updatedEvents)
        );
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const removeFromFavorites = async (
    type: "places" | "events",
    id: string
  ): Promise<void> => {
    try {
      if (type === "places") {
        const updatedPlaces = favoritePlaces.filter((place) => place.id !== id);
        setFavoritePlaces(updatedPlaces);
        await AsyncStorage.setItem(
          "favorite-places",
          JSON.stringify(updatedPlaces)
        );
      } else {
        const updatedEvents = favoriteEvents.filter((event) => event.id !== id);
        setFavoriteEvents(updatedEvents);
        await AsyncStorage.setItem(
          "favorite-events",
          JSON.stringify(updatedEvents)
        );
      }
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  const isFavorite = useCallback(
    (type: "places" | "events", id: string): boolean => {
      if (type === "places") {
        return favoritePlaces.some((place) => place.id === id);
      } else {
        return favoriteEvents.some((event) => event.id === id);
      }
    },
    [favoritePlaces, favoriteEvents]
  );

  const clearFavorites = async (type: "places" | "events"): Promise<void> => {
    try {
      if (type === "places") {
        setFavoritePlaces([]);
        await AsyncStorage.setItem("favorite-places", JSON.stringify([]));
      } else {
        setFavoriteEvents([]);
        await AsyncStorage.setItem("favorite-events", JSON.stringify([]));
      }
    } catch (error) {
      console.error("Error clearing favorites:", error);
    }
  };

  return {
    favoritePlaces,
    favoriteEvents,
    isLoading,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    clearFavorites,
  };
};
