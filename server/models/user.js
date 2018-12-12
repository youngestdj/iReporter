import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const getUser = async (email) => {
  const query = `SELECT * from ireporter_users WHERE email = '${email}'`;
  const result = await pool.query(query);
  return result.rows[0];
};

export default getUser;
