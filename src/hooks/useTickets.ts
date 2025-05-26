import { useState } from 'react'
import { Ticket } from '@/types/tickets'
import { ticketService } from '@/services/tickets'

export function useTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchTicket = async (code: string) => {
    try {
      setLoading(true)
      setError(null)
      const data = await ticketService.searchTicket(code)
      return data
    } catch (err) {
      setError('Failed to search ticket')
      console.error(err)
      return null
    } finally {
      setLoading(false)
    }
  }

  const updateTicketStatus = async (id: string, status: string) => {
    try {
      setLoading(true)
      setError(null)
      await ticketService.updateTicketStatus(id, status)
      return true
    } catch (err) {
      setError('Failed to update ticket status')
      console.error(err)
      return false
    } finally {
      setLoading(false)
    }
  }

  return {
    tickets,
    loading,
    error,
    searchTicket,
    updateTicketStatus,
  }
}