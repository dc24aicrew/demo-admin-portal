import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Layout from '@/components/Layout'
import Button from '@/components/ui/Button'
import { useTickets } from '@/hooks/useTickets'
import { ticketService } from '@/services/tickets'
import type { Ticket } from '@/types/tickets'

function TicketDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [ticket, setTicket] = useState<Ticket | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const { updateTicketStatus, error } = useTickets()

  // Fetch ticket details
  useEffect(() => {
    async function fetchTicket() {
      if (!id) return
      try {
        setIsLoading(true)
        const data = await ticketService.getTicket(id)
        setTicket(data)
      } catch (err) {
        console.error('Failed to fetch ticket:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTicket()
  }, [id])

  // Handle status toggle
  const handleStatusToggle = async () => {
    if (!ticket) return

    // Determine the new status (toggle between ACTIVE and USED)
    const newStatus = ticket.status === 'ACTIVE' ? 'USED' : 'ACTIVE'
    const originalStatus = ticket.status

    // Optimistic update
    setTicket((prev) => (prev ? { ...prev, status: newStatus } : null))

    // Make API call
    const success = await updateTicketStatus(ticket.id, newStatus)

    if (success) {
      setUpdateSuccess(true)
      // Clear success message after 3 seconds
      setTimeout(() => {
        setUpdateSuccess(false)
      }, 3000)
    } else {
      // Revert optimistic update if failed
      setTicket((prev) => (prev ? { ...prev, status: originalStatus } : null))
    }
  }

  const getStatusColor = (status: string) => {
    return status === 'ACTIVE'
      ? 'text-green-700 bg-green-100'
      : 'text-gray-700 bg-gray-100'
  }

  const getStatusToggleColor = (status: string) => {
    return status === 'ACTIVE'
      ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
      : 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500'
  }

  return (
    <Layout>
      <div className="bg-white shadow-sm rounded-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Ticket Details
          </h2>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate(-1)}
            className="self-start sm:self-auto"
          >
            ← Back
          </Button>
        </div>

        {isLoading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-slate-200 rounded w-1/4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
            <div className="h-4 bg-slate-200 rounded w-1/3"></div>
            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
          </div>
        ) : ticket ? (
          <div>
            {updateSuccess && (
              <div className="mb-4 p-3 bg-green-50 text-green-800 rounded-lg text-sm transition-opacity">
                Ticket status updated successfully!
              </div>
            )}
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-800 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg border border-gray-200 mb-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Ticket Information
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Code
                      </p>
                      <p className="text-base font-semibold break-all">
                        {ticket.code}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Attendee
                      </p>
                      <p className="text-base break-words">
                        {ticket.attendeeName}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Event ID
                      </p>
                      <p className="text-base break-all">{ticket.eventId}</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Purchase Date
                      </p>
                      <p className="text-base">
                        <span className="block sm:inline">
                          {new Date(ticket.purchaseDate).toLocaleDateString()}
                        </span>
                        <span className="block sm:inline sm:ml-2 text-gray-600">
                          {new Date(ticket.purchaseDate).toLocaleTimeString()}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Status Management
                  </h3>

                  <div className="mb-6">
                    <p className="text-sm font-medium text-gray-500 mb-2">
                      Current Status
                    </p>
                    <span
                      className={`inline-flex px-4 py-2 rounded-full font-medium text-sm ${getStatusColor(ticket.status)}`}
                    >
                      {ticket.status}
                    </span>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-3">
                      Toggle Status
                    </p>
                    <Button
                      className={`w-full sm:w-auto ${getStatusToggleColor(ticket.status)}`}
                      onClick={handleStatusToggle}
                    >
                      Change to {ticket.status === 'ACTIVE' ? 'USED' : 'ACTIVE'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Ticket History
              </h3>

              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 text-sm">
                  <span className="text-gray-500 font-medium">Created</span>
                  <span className="text-gray-900">
                    {new Date(ticket.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 text-sm">
                  <span className="text-gray-500 font-medium">
                    Last Updated
                  </span>
                  <span className="text-gray-900">
                    {new Date(ticket.updatedAt).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 p-4 sm:p-6 rounded-lg text-center">
            <p className="text-yellow-800">
              Ticket not found or error loading ticket details.
            </p>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default TicketDetailPage
