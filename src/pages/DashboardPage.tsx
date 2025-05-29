import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Layout from '@/components/Layout'
import Button from '@/components/ui/Button'
import { useTickets } from '@/hooks/useTickets'
import type { Ticket } from '@/types/tickets'

function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResult, setSearchResult] = useState<Ticket[] | null>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const { searchTicket, loading, error } = useTickets()

  useEffect(() => {
    // Auto-focus the search input when component mounts
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    const result = await searchTicket(searchQuery.trim())
    setSearchResult(result)
  }

  const getStatusColor = (status: string) => {
    return status === 'ACTIVE'
      ? 'text-green-700 bg-green-100'
      : 'text-gray-700 bg-gray-100'
  }

  return (
    <Layout>
      <div className="bg-white shadow-sm rounded-lg p-4 sm:p-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Dashboard
        </h2>
        <p className="text-gray-600 mb-6 text-sm sm:text-base">
          Welcome to the Event Ticket Management Admin Portal.
        </p>

        {/* Ticket Search Section */}
        <div className="bg-primary-50 p-4 sm:p-6 rounded-lg border border-primary-100 mb-6">
          <h3 className="text-lg sm:text-xl font-semibold text-primary-800 mb-4">
            Ticket Search
          </h3>

          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Enter ticket code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-sm sm:text-base"
              aria-label="Ticket code search"
            />
            <Button
              type="submit"
              disabled={loading || !searchQuery.trim()}
              isLoading={loading}
              className="w-full sm:w-auto"
            >
              Search Ticket
            </Button>
          </form>

          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Search Results */}
        {searchResult && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Search Result
            </h3>

            {searchResult.length > 0 ? (
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                {/* Mobile Card View */}
                <div className="block md:hidden">
                  <div className="divide-y divide-gray-200">
                    {searchResult.map((ticket) => (
                      <div key={ticket.id} className="p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-gray-900">
                            {ticket.code}
                          </span>
                          <span
                            className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}
                          >
                            {ticket.status}
                          </span>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Event:</span>{' '}
                            {ticket.eventId}
                          </div>
                          <div>
                            <span className="font-medium">Attendee:</span>{' '}
                            {ticket.attendeeName}
                          </div>
                          <div>
                            <span className="font-medium">Purchase Date:</span>{' '}
                            {new Date(ticket.purchaseDate).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="pt-2">
                          <Link
                            to={`/tickets/${ticket.id}`}
                            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm"
                          >
                            View Details →
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ticket Code
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Event
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Attendee
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Purchase Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {searchResult.map((ticket) => (
                        <tr key={ticket.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {ticket.code}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {ticket.eventId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {ticket.attendeeName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span
                              className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}
                            >
                              {ticket.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {new Date(ticket.purchaseDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            <Link
                              to={`/tickets/${ticket.id}`}
                              className="text-primary-600 hover:text-primary-700 font-medium"
                            >
                              View Details
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg text-center">
                <p className="text-yellow-800">
                  No ticket found matching that code.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Dashboard Quick Links */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-primary-50 p-4 sm:p-6 rounded-lg border border-primary-100 hover:border-primary-200 transition-colors">
            <h3 className="text-lg font-semibold text-primary-800 mb-2">
              Events
            </h3>
            <p className="text-primary-600 text-sm">Manage your events</p>
          </div>

          <div className="bg-green-50 p-4 sm:p-6 rounded-lg border border-green-100 hover:border-green-200 transition-colors">
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              Tickets
            </h3>
            <p className="text-green-600 text-sm">Check ticket status</p>
          </div>

          <div className="bg-purple-50 p-4 sm:p-6 rounded-lg border border-purple-100 hover:border-purple-200 transition-colors sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-semibold text-purple-800 mb-2">
              Settings
            </h3>
            <p className="text-purple-600 text-sm">
              Configure application settings
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default DashboardPage
