import { Http } from "@/utils/Http";

class AuthService {
  async login(name: string) {
    const axios = await Http.axios()
    const { data } = await axios.post("/auth/login", { name })
    return data
  }
}

const authService = new AuthService()
export default authService
