import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const redFlagFilled = (obj) => {
  if (!obj.title || !obj.comment || !obj.location) {
    return false;
  }

  let str = obj.title.split(' ').join('');
  if (str.length < 1) {
    return false;
  }

  str = obj.comment.split(' ').join('');
  if (str.length < 1) {
    return false;
  }

  str = obj.location.split(' ').join('');
  if (str.length < 1) {
    return false;
  }

  return true;
};

export const validId = id => Number.isInteger(parseInt(id, 10));

export const redFlagExists = (id, redFlags) => (!!(redFlags[id - 1]));

export const isLetter = (str) => {
  const objRegExp = /^[a-zA-Z\u00C0-\u00ff]+$/;
  return objRegExp.test(str);
};

export const isAlphaNumeric = (str) => {
  const objRegExp = /^[a-zA-Z0-9]*$/;
  return objRegExp.test(str);
};

export const isEmail = (email) => {
  const check = /\S+@\S+\.\S+/;
  return check.test(email);
};

export const validLogin = async (email, password) => {
  if (email && password) {
    if (email.split(' ').join().length > 1 && password.split(' ').join('').length > 1) {
      return true;
    }
  }
  return false;
};

export const userExists = async (email) => {
  const query = `SELECT email from ireporter_users WHERE email='${email}'`;
  const result = await pool.query(query);
  return result.rows[0];
};
