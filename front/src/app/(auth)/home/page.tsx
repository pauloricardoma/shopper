"use client"

import { useContext, useEffect, useState } from "react"
import Header from "@/components/Header"
import Input from "@/components/Input"
import styles from "./home.module.css"
import { AuthContext } from "@/contexts/authContext"
import Button from "@/components/Button"
import { RideContext } from "@/contexts/rideContext"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  const { customerId } = useContext(AuthContext)
  const { estimate, loading, onEstimate } = useContext(RideContext)

  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")

  const btnIsDisabled = loading || !customerId || !origin || !destination

  useEffect(() => {
    if (!loading && !!estimate) {
      router.push("/list")
    }
  }, [loading, estimate, router])

  return (
    <div className={styles.home}>
      <Header />

      <main className={styles.main}>
        <Input
          name="origin"
          placeholder="Insira o ponto de origem"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />
        <Input
          name="destination"
          placeholder="Insira o ponto de destino"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <Button
          disabled={btnIsDisabled}
          onClick={() => onEstimate(customerId || '', origin, destination)}
        >
          Buscar
        </Button>
      </main>
    </div>
  )
}
