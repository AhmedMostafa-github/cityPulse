import { create } from "zustand";
import { venuesService, VenuesResponse } from "../services/venuesService";

export interface Venue {
  id: string;
  name: string;
  type: string;
  url: string;
  locale: string;
  images?: Array<{
    ratio: string;
    url: string;
    width: number;
    height: number;
    fallback: boolean;
  }>;
  postalCode: string;
  timezone: string;
  city: {
    name: string;
  };
  state: {
    name: string;
    stateCode: string;
  };
  country: {
    name: string;
    countryCode: string;
  };
  address: {
    line1: string;
  };
  location: {
    longitude: string;
    latitude: string;
  };
  markets: Array<{
    name: string;
    id: string;
  }>;
  upcomingEvents: {
    tmr?: number;
    ticketmaster?: number;
    archtics?: number;
    _total: number;
    _filtered: number;
  };
  _links: {
    self: {
      href: string;
    };
  };
}

interface VenuesState {
  venues: Venue[];
  loading: boolean;
  error: string | null;
  fetchVenues: () => Promise<void>;
}

export const useVenuesStore = create<VenuesState>((set) => ({
  venues: [],
  loading: false,
  error: null,
  fetchVenues: async () => {
    set({ loading: true, error: null });
    try {
      const response = await venuesService.getVenues();
      set({ venues: response._embedded?.venues || [], loading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to fetch venues",
        loading: false,
      });
    }
  },
}));
