export interface Ticket {
  id: string
  code: string
  eventId: string
  attendeeName: string
  status: 'ACTIVE' | 'USED'
  purchaseDate: string
  createdAt: string
  updatedAt: string
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
