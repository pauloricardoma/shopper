import { Database } from "../database";
import { Customer } from "./model/customer.model";

export class CustomerRepository {
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  async findById(id: string): Promise<Customer> {
    const query = 'SELECT id, name FROM customers WHERE id = $1';

    try {
      const result = await this.db.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      console.log('find customer error: ', error);
      throw error;
    }
  }
}
