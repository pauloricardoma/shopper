import { Http } from "@/utils/Http"

class GoogleService {
  async staticMap(encodePolyline: string) {
    const axios = await Http.axios('https://maps.googleapis.com/maps/api/')
    const { data } = await axios.get(`staticmap?size=600x300&path=enc:${encodePolyline}&key=${process.env.GOOGLE_API_KEY}`)
    return data
  }
}

const googleService = new GoogleService()
export default googleService
