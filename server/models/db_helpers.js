import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const insert = async (data, table) => {
  // convert object keys to array then to a single string seperated by commas
  const fields = Object.keys(data).join();

  // convert object values to array
  const values = Object.values(data);

  // create a parameterized query based on the length of the array items
  const number = Object.keys(data).length;
  let prepQuery = '';
  for (let i = 1; i <= number; i += 1) {
    if (prepQuery === '') prepQuery = `$${i}`;
    else prepQuery = `${prepQuery}, $${i}`;
  }
  const text = `INSERT INTO ${table}(${fields}) VALUES(${prepQuery}) RETURNING id`;
  const res = await pool.query(text, values);
  return res.rows[0].id;
};

export const update = async (id, data, table) => {
  const entries = Object.entries(data);
  let queryString = '';
  entries.forEach((entry) => {
    if (queryString === '') queryString = `${entry[0]} = '${entry[1]}'`;
    else queryString = `${queryString}, ${entry[0]} = '${entry[1]}'`;
  });
  const text = `UPDATE ${table} SET ${queryString} WHERE id=${id}`;
  await pool.query(text);
};

export const deleteRow = async (id, table) => {
  const query = `DELETE from ${table} where id='${id}'`;
  await pool.query(query);
};
