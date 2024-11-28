"use client"

import { useContext, useEffect } from "react"
import Header from "@/components/Header"
import { RideContext } from "@/contexts/rideContext"
import Card from "./components/Card"
import { AuthContext } from "@/contexts/authContext"
import styles from "./rides.module.css"

export default function Rides() {
  const { customerId } = useContext(AuthContext)
  const { rides, onListRides } = useContext(RideContext)

  useEffect(() => {
    if (customerId) {
      onListRides(customerId)
    }
  }, [customerId, onListRides])

  return (
    <div className={styles.rides}>
      <Header />

      <main className={styles.main}>
        {rides?.map((option) => (
          <Card
            key={option.id}
            ride={option}
          />
        ))}
      </main>
    </div>
  )
}
