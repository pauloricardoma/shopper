import { Pool, QueryResult } from "pg"

export class Database {
  private static instance: Database
  public pool: Pool

  private constructor() {
    this.pool = new Pool({
      host: 'localhost',
      port: 5432,
      database: 'shopper',
      user: 'postgres',
      password: 'postgres',
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    })

    this.pool.on('error', (error) => {
      console.log('Unexpected PostgreSQL client error', error)
    })
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return Database.instance
  }

  public async query(
    text: string,
    params?: (string | number | boolean | null)[]
  ): Promise<QueryResult> {
    try {
      return await this.pool.query(text, params)
    } catch (error) {
      console.log('Database query error', error)
      throw error
    }
  }
}
