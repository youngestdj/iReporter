const { Pool } = require('pg');
const env = require('dotenv').config();

const config = {
  connectionString: process.env.DATABASE_URL,
};

exports.insert = async (data, table) => {
  const pool = new Pool(config);
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
  const text = `INSERT INTO ${table}(${fields}) VALUES(${prepQuery})`;

  await pool.query(text, values);
  await pool.end();
};

exports.update = async (id, data, table) => {
  const pool = new Pool(config);
  const entries = Object.entries(data);
  let queryString = '';
  entries.map((entry) => {
    if (queryString === '') queryString = `${entry[0]} = '${entry[1]}'`;
    else queryString = `${queryString}, ${entry[0]} = '${entry[1]}'`;
  });
  const text = `UPDATE ${table} SET ${queryString} WHERE id=${id}`;
  await pool.query(text);
  await pool.end();
};

exports.deleteRow = async (id, table) => {
  const pool = new Pool(config);
  const query = `DELETE from ${table} where id='${id}'`;
  await pool.query(query);
  await pool.end();
};

// const data = { ome: 'lol', two: 'lmao', three: 'rotfl' }