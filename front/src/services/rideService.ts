import { Http } from "@/utils/Http";

class RideService {
  async estimate(
    customerId: string,
    origin: string,
    destination: string,
  ) {
    const axios = await Http.axios()
    const { data } = await axios.post("/ride/estimate", {
      customerId,
      origin,
      destination
    })
    return data
  }

  async confirm(
    customerId: string,
    origin: string,
    destination: string,
    distance: number,
    duration: string,
    driverId: number,
    value: number,
  ) {
    const axios = await Http.axios()
    const { data } = await axios.patch("/ride/confirm", {
      customerId,
      origin,
      destination,
      distance,
      duration,
      driverId,
      value,
    })
    return data
  }

  async list(
    customerId: string,
    driverId?: number,
  ) {
    const axios = await Http.axios()
    const { data } = await axios.get(
      `/ride/${customerId}${driverId ? `?driverId=${driverId}` : ''}`
    )
    return data
  }
}

const rideService = new RideService()
export default rideService
