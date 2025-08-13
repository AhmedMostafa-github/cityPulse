import { Place, Event } from "../types";

// Root Stack Param List for type safety
export type RootStackParamList = {
  HomeMain: undefined;
  ExploreMain: undefined;
  FavoritesMain: undefined;
  ProfileMain: undefined;
  Settings: undefined;
  Detail: {
    item: Place | Event;
    type: "venue" | "event";
  };
};

// Tab Navigator Param List
export type TabParamList = {
  Home: undefined;
  Explore: undefined;
  Favorites: undefined;
  Profile: undefined;
};

// Navigation prop types
export interface DetailScreenProps {
  route: {
    params: {
      item: Place | Event;
      type: "venue" | "event";
    };
  };
  navigation: any;
}

export interface HomeScreenProps {
  navigation: any;
}
