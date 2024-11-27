import { Database } from "../database"
import { Ride } from "./model/ride.model"
import { RideConfirmDto } from "../controllers/dto/ride-confirm.dto"

export class RideRepository {
  private db: Database

  constructor() {
    this.db = Database.getInstance()
  }

  async create(rideCreateDto: RideConfirmDto): Promise<Ride> {
    const {
      customerId,
      origin,
      destination,
      distance,
      duration,
      driverId,
      value
    } = rideCreateDto
    const query = `
      INSERT INTO rides (customer_id, origin, destination, distance, duration, driver_id, value)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
    `

    try {
      const result = await this.db.query(query, [
        customerId,
        origin,
        destination,
        distance,
        duration,
        driverId,
        value
      ])
      return result.rows[0]
    } catch (error) {
      console.log('Ride create error: ', error)
      throw error
    }
  }

  async findAllByCustomer(customerId: string, driverId?: number): Promise<Ride[]> {
    let query = `
      SELECT
        r.id,
        r.origin,
        r.destination,
        r.distance,
        r.duration,
        r.value,
        r.created_at as date,
        d.id AS driver_id,
        d.name AS driver_name
      FROM rides r
      JOIN drivers d ON r.driver_id = d.id
      WHERE r.customer_id = $1
    `
    const params: (string | number)[] = [customerId]

    if (driverId) {
      query += ' AND r.driver_id = $2'
      params.push(driverId)
    }

    query += ' ORDER BY r.created_at DESC'

    try {
      const result = await this.db.query(query, params)
      return result.rows
    } catch (error) {
      console.log('Ride findAllByCustomer error: ', error)
      throw error
    }
  }
}
