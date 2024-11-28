"use client"

import {
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useState
} from 'react';
import { EstimateResponse, Option, Ride } from '@/interfaces/ride';
import rideService from '@/services/rideService';

interface RideContextModel {
  loading: boolean
  estimate: EstimateResponse | null
  rides: Ride[] | null
  drivers: Option[]
  successConfirm: boolean
  onEstimate: (
    customerId: string,
    origin: string,
    destination: string,
  ) => void
  onConfirm: (
    customerId: string,
    origin: string,
    destination: string,
    distance: number,
    duration: string,
    driverId: number,
    value: number,
  ) => void
  onListRides: (customerId: string, driverId?: number) => void
}

export const RideContext = createContext<RideContextModel>(
  {} as RideContextModel,
);

interface RideContextProviderProps {
  children: ReactNode;
}

export function RideContextProvider({ children }: RideContextProviderProps) {
  const [estimate, setEstimate] = useState<EstimateResponse | null>(null)
  const [rides, setRides] = useState<Ride[] | null>(null)
  const [drivers, setDrivers] = useState<Option[]>([])
  const [successConfirm, setSuccessConfirm] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleEstimate = useCallback(async (
    customerId: string,
    origin: string,
    destination: string,
  ) => {
    if (!customerId || !origin || !destination) return

    setLoading(true)
    try {
      const response = await rideService.estimate(customerId, origin, destination)
      setEstimate(response)
      setDrivers(response.options)
      // const map = await googleService.staticMap(
      //   response.routeResponse[0].polyline.encodedPolyline
      // )
      // console.log({ map })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [])

  const handleConfirm = useCallback(async (
    customerId: string,
    origin: string,
    destination: string,
    distance: number,
    duration: string,
    driverId: number,
    value: number,
  ) => {
    if (
      !customerId ||
      !origin ||
      !destination ||
      !distance ||
      !duration ||
      !driverId ||
      !value
    ) return

    setLoading(true)
    try {
      const response = await rideService.confirm(
        customerId,
        origin,
        destination,
        distance,
        duration,
        driverId,
        value,
      )
      setSuccessConfirm(response.success)
      setEstimate(null)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [])

  const listRides = useCallback(async (
    customerId: string,
    driverId?: number,
  ) => {
    if (!customerId) return

    setLoading(true)
    try {
      const response = await rideService.list(customerId, driverId)
      setRides(response)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [])

  const rideContextValue: RideContextModel = useMemo(() => ({
    loading,
    estimate,
    rides,
    drivers,
    successConfirm,
    onEstimate: handleEstimate,
    onConfirm: handleConfirm,
    onListRides: listRides,
  }), [
    loading,
    estimate,
    rides,
    drivers,
    successConfirm,
    handleEstimate,
    handleConfirm,
    listRides,
  ]);

  return (
    <RideContext.Provider value={rideContextValue}>
      {children}
    </RideContext.Provider>
  );
};
