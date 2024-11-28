export interface EstimateResponse {
  origin: Location
  destination: Location
  distance: number
  distanceText: string
  duration: string
  routeResponse: unknown
  options: Option[]
}

export interface Location {
  address: string
  latitude: number
  longitude: number
}

export interface Option {
  id: number
  name: string
  description: string
  vehicle: string
  review: Review
  value: number
}

export interface Review {
  rating: number
  comment: string
}

export interface Ride {
  id: number
  customerId: string
  origin: string
  destination: string
  distance: number
  duration: string
  driverId: number
  driverName: string
  date: Date
  value: number
}
