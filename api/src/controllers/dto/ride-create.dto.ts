export interface RideCreateDto {
  customerId: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driverId: number;
  value: number;
}
