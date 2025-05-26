export interface Ticket {
  id: string
  ticketCode: string
  eventId: string
  eventName: string
  attendeeName: string
  status: 'ACTIVE' | 'USED'
  purchaseDate: string
  lastUpdated: string
}

export interface Event {
  id: string
  name: string
  description: string
  location: string
  date: string
  capacity: number
  ticketsSold: number
}

export interface SearchResponse {
  ticket: Ticket | null
  success: boolean
  message?: string
}