export interface RideResponse {
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
