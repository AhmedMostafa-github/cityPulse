import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Network from "expo-network";
import { SearchResult, SearchFilters, OfflineCache } from "../types";

interface UseOfflineCacheReturn {
  isOnline: boolean;
  cacheSearchResults: (
    query: string,
    filters: SearchFilters,
    results: SearchResult
  ) => Promise<void>;
  getCachedResults: () => Promise<OfflineCache | null>;
  clearCache: () => Promise<void>;
  isCacheValid: (cache: OfflineCache) => boolean;
}

const CACHE_EXPIRY_TIME = 24 * 60 * 60 * 1000;
const CACHE_KEY = "offline-search-cache";

export const useOfflineCache = (): UseOfflineCacheReturn => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const checkNetworkStatus = async () => {
      try {
        const networkState = await Network.getNetworkStateAsync();
        setIsOnline(networkState.isConnected ?? false);
      } catch (error) {
        setIsOnline(false);
      }
    };

    checkNetworkStatus();
    const interval = setInterval(checkNetworkStatus, 5000);

    return () => clearInterval(interval);
  }, []);

  const cacheSearchResults = async (
    query: string,
    filters: SearchFilters,
    results: SearchResult
  ): Promise<void> => {
    try {
      const cache: OfflineCache = {
        lastSearch: results,
        timestamp: Date.now(),
        query,
        filters,
      };

      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    } catch (error) {
      console.error("Error caching search results:", error);
    }
  };

  const getCachedResults = async (): Promise<OfflineCache | null> => {
    try {
      const cached = await AsyncStorage.getItem(CACHE_KEY);
      if (cached) {
        const cache: OfflineCache = JSON.parse(cached);
        if (isCacheValid(cache)) {
          return cache;
        }
      }
      return null;
    } catch (error) {
      console.error("Error retrieving cached results:", error);
      return null;
    }
  };

  const clearCache = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(CACHE_KEY);
    } catch (error) {
      console.error("Error clearing cache:", error);
    }
  };

  const isCacheValid = useCallback((cache: OfflineCache): boolean => {
    const now = Date.now();
    return now - cache.timestamp < CACHE_EXPIRY_TIME;
  }, []);

  return {
    isOnline,
    cacheSearchResults,
    getCachedResults,
    clearCache,
    isCacheValid,
  };
};
