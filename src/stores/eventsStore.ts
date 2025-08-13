import { create } from "zustand";
import { eventsService, EventsResponse } from "../services/eventsService";

export interface Event {
  id: string;
  name: string;
  type: string;
  url: string;
  locale: string;
  images: Array<{
    ratio: string;
    url: string;
    width: number;
    height: number;
    fallback: boolean;
  }>;
  sales: {
    public: {
      startDateTime: string;
      startTBD: boolean;
      startTBA: boolean;
      endDateTime: string;
    };
    presales: Array<{
      startDateTime: string;
      endDateTime: string;
      name: string;
    }>;
  };
  dates: {
    start: {
      localDate: string;
      localTime: string;
      dateTime: string;
      dateTBD: boolean;
      dateTBA: boolean;
      timeTBA: boolean;
      noSpecificTime: boolean;
    };
    timezone: string;
    status: {
      code: string;
    };
    spanMultipleDays: boolean;
  };
  classifications: Array<{
    primary: boolean;
    segment: {
      id: string;
      name: string;
    };
    genre: {
      id: string;
      name: string;
    };
    subGenre: {
      id: string;
      name: string;
    };
    type: {
      id: string;
      name: string;
    };
    subType: {
      id: string;
      name: string;
    };
    family: boolean;
  }>;
  promoter: {
    id: string;
    name: string;
    description: string;
  };
  promoters: Array<{
    id: string;
    name: string;
    description: string;
  }>;
  info: string;
  upcomingEvents: {
    tmr: number;
    ticketmaster: number;
    _total: number;
    _filtered: number;
  };
  _embedded?: {
    venues?: Array<{
      id: string;
      name: string;
      url: string;
      locale: string;
      images?: Array<{
        ratio: string;
        url: string;
        width: number;
        height: number;
        fallback: boolean;
      }>;
    }>;
    attractions?: Array<{
      id: string;
      name: string;
      url: string;
      locale: string;
      images?: Array<{
        ratio: string;
        url: string;
        width: number;
        height: number;
        fallback: boolean;
      }>;
    }>;
  };
  _links: {
    self: {
      href: string;
    };
  };
}

interface EventsState {
  events: Event[];
  loading: boolean;
  error: string | null;
  fetchEvents: () => Promise<void>;
}

export const useEventsStore = create<EventsState>((set) => ({
  events: [],
  loading: false,
  error: null,
  fetchEvents: async () => {
    set({ loading: true, error: null });
    try {
      const response = await eventsService.getEvents();
      set({ events: response._embedded?.events || [], loading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to fetch events",
        loading: false,
      });
    }
  },
}));
