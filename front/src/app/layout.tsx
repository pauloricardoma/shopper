import type { Metadata } from "next"
import "./globals.css"
import Script from "next/script"
import { AuthContextProvider } from "@/contexts/authContext"
import { RideContextProvider } from "@/contexts/rideContext"

export const metadata: Metadata = {
  title: "Shopper App",
  description: "Seu app de viagens favorito",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}`}
        strategy="afterInteractive"
      />
      <body>
        <AuthContextProvider>
          <RideContextProvider>
            {children}
          </RideContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  )
}
