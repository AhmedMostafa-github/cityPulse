export type Theme = "light" | "dark";
export type Language = "en" | "ar";

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  shadow: string;
  success: string;
  error: string;
  warning: string;
  info: string;
}

export interface AppSettings {
  theme: Theme;
  language: Language;
  isRTL: boolean;
}

export interface Place {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  category: string;
  rating: number;
  price: string;
  address: string;
  addressAr: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  images: string[];
  isOpen: boolean;
  isFavorite: boolean;
  tags: string[];
}

export interface Event {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  date: string;
  time: string;
  location: string;
  locationAr: string;
  category: string;
  price: string;
  images: string[];
  isFavorite: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: {
    theme: Theme;
    language: Language;
    notifications: boolean;
  };
  favorites: {
    places: string[];
    events: string[];
  };
}

export interface SearchFilters {
  category?: string;
  rating?: number;
  price?: string;
  distance?: number;
  openNow?: boolean;
}

export interface SearchResult {
  places: Place[];
  events: Event[];
  totalResults: number;
  hasMore: boolean;
}

export interface OfflineCache {
  lastSearch: SearchResult;
  timestamp: number;
  query: string;
  filters: SearchFilters;
}
