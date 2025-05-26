import { api } from '@/lib/api'
import type { Event } from '@/types/tickets'

export const eventService = {
  getEvents: async (): Promise<Event[]> => {
    return await api.get<Event[]>('/events')
  },

  getEvent: async (id: string): Promise<Event> => {
    return await api.get<Event>(`/events/${id}`)
  },

  createEvent: async (event: Omit<Event, 'id'>): Promise<Event> => {
    return await api.post<Event>('/events', event)
  },

  updateEvent: async (id: string, event: Partial<Event>): Promise<Event> => {
    return await api.put<Event>(`/events/${id}`, event)
  },

  deleteEvent: async (id: string): Promise<void> => {
    return await api.delete(`/events/${id}`)
  },
}
