import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, Theme, Language } from "../types";

interface UseAuthReturn {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateUserPreferences: (
    preferences: Partial<User["preferences"]>
  ) => Promise<void>;
  updateFavorites: (
    type: "places" | "events",
    id: string,
    action: "add" | "remove"
  ) => Promise<void>;
}

const MOCK_USER: User = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  avatar: undefined,
  preferences: {
    theme: "light",
    language: "en",
    notifications: true,
  },
  favorites: {
    places: [],
    events: [],
  },
};

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const savedUser = await AsyncStorage.getItem("user-data");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        // For demo purposes, set mock user
        setUser(MOCK_USER);
        await AsyncStorage.setItem("user-data", JSON.stringify(MOCK_USER));
      }
    } catch (error) {
      console.error("Error loading user:", error);
      setUser(MOCK_USER);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (email === "john@example.com" && password === "password") {
        setUser(MOCK_USER);
        await AsyncStorage.setItem("user-data", JSON.stringify(MOCK_USER));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setUser(null);
      await AsyncStorage.removeItem("user-data");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const updateUserPreferences = async (
    preferences: Partial<User["preferences"]>
  ): Promise<void> => {
    if (!user) return;

    try {
      const updatedUser = {
        ...user,
        preferences: {
          ...user.preferences,
          ...preferences,
        },
      };
      setUser(updatedUser);
      await AsyncStorage.setItem("user-data", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Error updating preferences:", error);
    }
  };

  const updateFavorites = async (
    type: "places" | "events",
    id: string,
    action: "add" | "remove"
  ): Promise<void> => {
    if (!user) return;

    try {
      const updatedUser = { ...user };
      const favorites = updatedUser.favorites[type];

      if (action === "add" && !favorites.includes(id)) {
        favorites.push(id);
      } else if (action === "remove") {
        const index = favorites.indexOf(id);
        if (index > -1) {
          favorites.splice(index, 1);
        }
      }

      setUser(updatedUser);
      await AsyncStorage.setItem("user-data", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  return {
    user,
    isLoading,
    login,
    logout,
    updateUserPreferences,
    updateFavorites,
  };
};
