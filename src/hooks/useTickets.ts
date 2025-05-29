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
    } catch (err: unknown) {
      console.error('Update ticket status error:', err)

      // Provide more specific error messages
      let errorMessage = 'Failed to update ticket status'

      // Type guard for error with status property
      if (typeof err === 'object' && err !== null) {
        const error = err as {
          status?: number
          code?: string
          message?: string
        }

        if (error.status === 404) {
          errorMessage = 'Ticket not found'
        } else if (error.status === 401) {
          errorMessage = 'Authentication required'
        } else if (error.status === 403) {
          errorMessage = 'Permission denied'
        } else if (error.status === 500) {
          errorMessage = 'Server error occurred'
        } else if (
          error.code === 'NETWORK_ERROR' ||
          (error.message && error.message.includes('Network Error'))
        ) {
          errorMessage =
            'Network connection failed. Please check if the server is running.'
        } else if (error.message) {
          errorMessage = `Error: ${error.message}`
        }
      }

      setError(errorMessage)
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
