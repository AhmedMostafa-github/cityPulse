import api from "./api";

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

export interface VenuesResponse {
  _embedded: {
    venues: Venue[];
  };
  _links: {
    first: { href: string };
    self: { href: string };
    next: { href: string };
    last: { href: string };
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

export const venuesService = {
  getVenues: async (): Promise<VenuesResponse> => {
    try {
      const response = await api.get("/venues");
      return response.data;
    } catch (error) {
      console.error("Error fetching venues:", error);
      throw error;
    }
  },
};
