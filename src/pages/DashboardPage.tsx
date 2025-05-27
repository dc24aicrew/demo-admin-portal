import { useState, useEffect, useRef } from 'react'
import Layout from '@/components/Layout'
import Button from '@/components/ui/Button'
import { useTickets } from '@/hooks/useTickets'
import type { SearchResponse } from '@/types/tickets'

function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResult, setSearchResult] = useState<SearchResponse | null>(null)
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
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h2>
        <p className="text-gray-600 mb-6">
          Welcome to the Event Ticket Management Admin Portal.
        </p>

        {/* Ticket Search Section */}
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 mb-6">
          <h3 className="text-xl font-medium text-blue-800 mb-4">
            Ticket Search
          </h3>

          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Enter ticket code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              aria-label="Ticket code search"
            />
            <Button
              type="submit"
              disabled={loading || !searchQuery.trim()}
              isLoading={loading}
            >
              Search Ticket
            </Button>
          </form>

          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
        </div>

        {/* Search Results */}
        {searchResult && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              Search Result
            </h3>

            {searchResult.ticket ? (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-md">
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
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {searchResult.ticket.ticketCode}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {searchResult.ticket.eventName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {searchResult.ticket.attendeeName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`px-3 py-1 rounded-full ${getStatusColor(searchResult.ticket.status)}`}
                        >
                          {searchResult.ticket.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {new Date(
                          searchResult.ticket.purchaseDate
                        ).toLocaleDateString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-md text-center">
                <p className="text-yellow-700">
                  No ticket found matching that code.
                </p>
                {searchResult.message && (
                  <p className="text-sm text-yellow-600">
                    {searchResult.message}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Dashboard Quick Links */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="text-lg font-medium text-blue-800">Events</h3>
            <p className="text-blue-600">Manage your events</p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <h3 className="text-lg font-medium text-green-800">Tickets</h3>
            <p className="text-green-600">Check ticket status</p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <h3 className="text-lg font-medium text-purple-800">Settings</h3>
            <p className="text-purple-600">Configure application settings</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default DashboardPage
