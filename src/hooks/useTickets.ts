import { useState } from 'react'
import { ticketService } from '@/services/tickets'
import type { Ticket } from '@/types/tickets'

export function useTickets() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchTicket = async (code: string): Promise<Ticket[] | null> => {
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

  const updateTicketStatus = async (
    id: string,
    status: string
  ): Promise<boolean> => {
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
    loading,
    error,
    searchTicket,
    updateTicketStatus,
  }
}
