import { Database } from "../database";
import { Driver } from "./model/driver.model";

export class DriverRepository {
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  async findByDistance(distance: number): Promise<Driver[]> {
    console.log('##### DriverRepository.findByDistance', distance);
    const query = `
      SELECT
        d.id,
        d.name,
        d.description,
        d.car,
        d.tax,
        json_agg(json_build_object(
          'value', r.value,
          'description', r.description
        )) AS ratings
      FROM drivers d
      LEFT JOIN ratings r ON d.id = r.driver_id
      WHERE $1 > min_distance
      GROUP BY d.id
    `;

    try {
      const result = await this.db.query(query, [distance]);
      return result.rows;
    } catch (error) {
      console.log('find customer error: ', error);
      throw error;
    }
  }
}
