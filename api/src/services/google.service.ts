import axios from "axios"

export class GoogleService {
  static baseRoutesUrl = 'https://routes.googleapis.com/directions/v2:computeRoutes'
  static baseGeocodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json'

  static async getRoutes(origin: string, destination: string) {
    const axiosInstance = axios.create({
      baseURL: GoogleService.baseRoutesUrl,
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': process.env.GOOGLE_API_KEY,
        'X-Goog-FieldMask': 'routes.*',
      }
    })

    try {
      const result = await axiosInstance.post('', {
        origin: { address: origin },
        destination: { address: destination },
        travelMode: 'DRIVE',
      })
      return result.data
    } catch (error) {
      console.log('GoogleService.getRoutes error', error)
      throw error
    }
  }

}
