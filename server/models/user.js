import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

/**
 * User model class
 */
class UserModel {
  /**
   * Return a user object
   * @param  {string} email user email
   * @return {object}       user object
   */
  static async getUser(email) {
    const query = `SELECT * from ireporter_users WHERE email = '${email}'`;
    const result = await pool.query(query);
    return result.rows[0];
  }
}

export default UserModel;
