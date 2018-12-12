import bcrypt from 'bcryptjs';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

/**
 * Login model class
 */
class LoginModel {
/**
 * verify user password
 * @param  {string} email    user email
 * @param  {string} password user password
 * @return {boolean}          return true if password is correct, otherwise return false
 */
  static async verifyPassword(email, password) {
    const query = `SELECT password FROM ireporter_users where email = '${email}'`;
    const hashedPwd = await pool.query(query);
    const hashedPwdCorrect = await bcrypt.compareSync(password, hashedPwd.rows[0].password);
    return hashedPwdCorrect;
  }
}

export default LoginModel;
