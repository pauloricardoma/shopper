import { Pool, PoolClient, QueryResult } from "pg";

export class Database {
  private static instance: Database;
  public pool: Pool;

  private constructor() {
    this.pool = new Pool({
      host: 'localhost',
      port: parseInt('5432'),
      database: 'shopper',
      user: 'postgres',
      password: 'postgres',
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    this.pool.on('error', (err) => {
      console.log('Unexpected PostgreSQL client error', err);
    });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async connect(): Promise<PoolClient> {
    try {
      const client = await this.pool.connect();
      return client;
    } catch (err) {
      console.log('Error connecting to database', err);
      throw err;
    }
  }

  public async query(
    text: string,
    params?: (string | number | boolean | null)[]
  ): Promise<QueryResult> {
    try {
      return await this.pool.query(text, params);
    } catch (err) {
      console.log('Database query error', { text, params, error: err });
      throw err;
    }
  }

  public async transaction<T>(
    operation: (client: PoolClient) => Promise<T>
  ): Promise<T> {
    const client = await this.connect();
    try {
      await client.query('BEGIN');
      const result = await operation(client);
      await client.query('COMMIT');
      return result;
    } catch (err) {
      await client.query('ROLLBACK');
      console.log('Transaction failed', err);
      throw err;
    } finally {
      client.release();
    }
  }
}
