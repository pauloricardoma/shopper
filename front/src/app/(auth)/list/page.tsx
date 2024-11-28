"use client"

import { useContext, useEffect } from "react"
import Header from "@/components/Header"
import styles from "./list.module.css"
import { RideContext } from "@/contexts/rideContext"
import Card from "./components/Card"
import { Option } from "@/interfaces/ride"
import { AuthContext } from "@/contexts/authContext"
import { useRouter } from "next/navigation"

export default function List() {
  const router = useRouter()
  const { customerId } = useContext(AuthContext)
  const { estimate, loading, successConfirm, onConfirm } = useContext(RideContext)

  const handleSubmit = (driver: Option) => {
    if (!customerId || !estimate) return

    onConfirm(
      customerId,
      estimate.origin.address,
      estimate.destination.address,
      estimate.distance,
      estimate.duration,
      driver.id,
      driver.value,
    )
  }

  useEffect(() => {
    if (successConfirm) {
      router.push("/rides")
    }
  }, [successConfirm, router])

  return (
    <div className={styles.list}>
      <Header />

      <main className={styles.main}>
        {estimate?.options?.map((option) => (
          <Card
            key={option.id}
            driver={option}
            loading={loading}
            onConfirm={handleSubmit}
          />
        ))}
      </main>
    </div>
  )
}
