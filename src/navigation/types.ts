import { Place, Event } from "../types";

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

export type TabParamList = {
  Home: undefined;
  Explore: undefined;
  Favorites: undefined;
  Profile: undefined;
};
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
