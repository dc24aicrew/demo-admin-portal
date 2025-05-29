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
    console.log(`Updating ticket ${id} status to ${status}`)
    const url = `/tickets/${id}/status`
    console.log(`API URL: ${url}`)
    return await api.put<Ticket>(url, { status })
  },
}
