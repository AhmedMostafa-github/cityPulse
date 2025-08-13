import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface FavoriteItem {
  id: string;
  name: string;
  category: "event" | "venue";
  data: any;
  addedAt: string;
}

interface FavoritesState {
  favorites: FavoriteItem[];
  addToFavorites: (item: any, category: "event" | "venue") => void;
  removeFromFavorites: (id: string, category: "event" | "venue") => void;
  isFavorite: (id: string, category: "event" | "venue") => boolean;
  getFavoritesByCategory: (category: "event" | "venue") => FavoriteItem[];
  clearAllFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addToFavorites: (item: any, category: "event" | "venue") => {
        const { favorites } = get();
        const existingIndex = favorites.findIndex(
          (fav) => fav.id === item.id && fav.category === category
        );

        if (existingIndex === -1) {
          const newFavorite: FavoriteItem = {
            id: item.id,
            name: item.name,
            category,
            data: item,
            addedAt: new Date().toISOString(),
          };

          set({ favorites: [...favorites, newFavorite] });
        }
      },

      removeFromFavorites: (id: string, category: "event" | "venue") => {
        const { favorites } = get();
        const filteredFavorites = favorites.filter(
          (fav) => !(fav.id === id && fav.category === category)
        );
        set({ favorites: filteredFavorites });
      },

      isFavorite: (id: string, category: "event" | "venue") => {
        const { favorites } = get();
        return favorites.some(
          (fav) => fav.id === id && fav.category === category
        );
      },

      getFavoritesByCategory: (category: "event" | "venue") => {
        const { favorites } = get();
        return favorites.filter((fav) => fav.category === category);
      },

      clearAllFavorites: () => {
        set({ favorites: [] });
      },
    }),
    {
      name: "favorites-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
