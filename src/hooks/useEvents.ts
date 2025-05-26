import { useState } from 'react'
import { Event } from '@/types/tickets'
import { eventService } from '@/services/events'

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchEvents = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await eventService.getEvents()
      setEvents(data)
    } catch (err) {
      setError('Failed to fetch events')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return {
    events,
    loading,
    error,
    fetchEvents,
  }
}