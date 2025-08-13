import api from "./api";
import { Event } from "../stores/eventsStore";

export interface EventsResponse {
  _embedded: {
    events: Event[];
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

export const eventsService = {
  getEvents: async (): Promise<EventsResponse> => {
    try {
      const response = await api.get("/events");
      return response.data;
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error;
    }
  },
};
