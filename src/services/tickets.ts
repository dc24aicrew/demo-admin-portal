import { api } from '@/lib/api'
import type { Ticket } from '@/types/tickets'

export const ticketService = {
  searchTicket: async (code: string): Promise<Ticket[]> => {
    return await api.get<Ticket[]>(`/tickets/search?code=${code}`)
  },

  getTicket: async (id: string): Promise<Ticket> => {
    return await api.get<Ticket>(`/tickets/${id}`)
  },

  updateTicketStatus: async (id: string, status: string): Promise<Ticket> => {
    return await api.patch<Ticket>(`/tickets/${id}/status`, { status })
  },
}
