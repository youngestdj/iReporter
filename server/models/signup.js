const { Pool } = require('pg');
const env = require('dotenv').config();
const db = require('./db_helpers.js');
const helper = require('../helper.js');

const config = {
  connectionString: process.env.DATABASE_URL,
};


exports.userExists = async (email) => {
  const pool = new Pool(config);
  const query = `SELECT email from ireporter_users WHERE email='${email}'`;
  const result = await pool.query(query);
  await pool.end();
  return result.rows[0];
};

exports.usernameExists = async (username) => {
  const pool = new Pool(config);
  const query = `SELECT username from ireporter_users WHERE username='${username}'`;
  const result = await pool.query(query);
  await pool.end();
  return result.rows[0];
};

exports.fieldsAreFilled = (requestBody) => {
  if (requestBody.firstname && requestBody.lastname) {
    if (requestBody.email && requestBody.phonenumber) {
      if (requestBody.password && requestBody.username) {
        if (requestBody.othernames) {
          return true;
        }
      }
    }
  }
  return false;
};

exports.fieldsAreNotLetters = async (requestBody) => {
  if (!helper.isLetter(requestBody.firstname)) {
    return 'Invalid firstname. Please enter only letters';
  }
  if (!helper.isLetter(requestBody.lastname)) {
    return 'Invalid lastname. Please enter only letters';
  }
  if (!helper.isLetter(requestBody.othernames)) {
    return 'Invalid other names. Please enter only letters';
  }
  if (!helper.isAlphaNumeric(requestBody.username)) {
    return 'Invalid username. Username should only contain letters and numbers';
  }
  return false;
};

exports.signUserUp = async (data) => {
  db.insert(data, 'ireporter_users');
};
