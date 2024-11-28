import { Database } from "../database"
import { Customer } from "./model/customer.model"

export class CustomerRepository {
  private db: Database

  constructor() {
    this.db = Database.getInstance()
  }

  async create(name: string): Promise<Customer> {
    const query = 'INSERT INTO customers (name) VALUES ($1) RETURNING id, name'

    try {
      const result = await this.db.query(query, [name])
      return result.rows[0]
    } catch (error) {
      console.log('Customer create error: ', error)
      throw error
    }
  }

  async findById(id: string): Promise<Customer> {
    const query = 'SELECT id, name FROM customers WHERE id = $1'

    try {
      const result = await this.db.query(query, [id])
      return result.rows[0]
    } catch (error) {
      console.log('Customer findById error: ', error)
      throw error
    }
  }

  async findByName(name: string): Promise<Customer> {
    const query = 'SELECT id, name FROM customers WHERE name = $1'

    try {
      const result = await this.db.query(query, [name])
      return result.rows[0]
    } catch (error) {
      console.log('Customer findByName error: ', error)
      throw error
    }
  }
}
