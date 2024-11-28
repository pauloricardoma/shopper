import type { NextConfig } from "next"
import "./envConfig"

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  },
}

export default nextConfig
