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
    console.log(`[TicketService] Updating ticket ${id} status to ${status}`)
    const url = `/tickets/${id}/status`
    console.log(`[TicketService] API URL: ${url}`)
    console.log(`[TicketService] Payload:`, { status })

    try {
      const result = await api.patch<Ticket>(url, { status })
      console.log(`[TicketService] Success:`, result)
      return result
    } catch (error) {
      console.error(`[TicketService] Failed to update ticket status:`, error)
      throw error
    }
  },
}
