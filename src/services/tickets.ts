import { api } from '@/lib/api'
import { Ticket, SearchResponse } from '@/types/tickets'

export const ticketService = {
  searchTicket: async (code: string): Promise<SearchResponse> => {
    return await api.get<SearchResponse>(`/tickets/search?code=${code}`)
  },
  
  getTicket: async (id: string): Promise<Ticket> => {
    return await api.get<Ticket>(`/tickets/${id}`)
  },
  
  updateTicketStatus: async (id: string, status: string): Promise<Ticket> => {
    return await api.put<Ticket>(`/tickets/${id}/status`, { status })
  },
}