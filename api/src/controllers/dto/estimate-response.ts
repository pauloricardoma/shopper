export interface EstimateResponseDto {
  origin: Location
  destination: Location
  distance: number
  distanceText: string
  duration: string
  routeResponse: unknown
  options: Options[]
}

export interface Location {
  address: string
  latitude: number
  longitude: number
}

export interface Options {
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
