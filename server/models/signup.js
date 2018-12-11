import { Pool } from 'pg';
import dotenv from 'dotenv';
import { insert } from './db_helpers';
import { isLetter, isAlphaNumeric } from '../helper';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});


export const userExists = async (email) => {
  const query = `SELECT email from ireporter_users WHERE email='${email}'`;
  const result = await pool.query(query);
  return result.rows[0];
};

export const usernameExists = async (username) => {
  const query = `SELECT username from ireporter_users WHERE username='${username}'`;
  const result = await pool.query(query);
  return result.rows[0];
};

export const fieldsAreFilled = (requestBody) => {
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

export const fieldsAreNotLetters = async (requestBody) => {
  if (!isLetter(requestBody.firstname)) {
    return 'Invalid firstname. Please enter only letters';
  }
  if (!isLetter(requestBody.lastname)) {
    return 'Invalid lastname. Please enter only letters';
  }
  if (!isLetter(requestBody.othernames)) {
    return 'Invalid other names. Please enter only letters';
  }
  if (!isAlphaNumeric(requestBody.username)) {
    return 'Invalid username. Username should only contain letters and numbers';
  }
  return false;
};

export const signUserUp = async (data) => {
  const res = insert(data, 'ireporter_users');
  return res;
};
