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
  if (obj.title.trim().length < 1) {
    return false;
  }
  if (obj.comment.trim().length < 1) {
    return false;
  }
  if (obj.location.trim().length < 1) {
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

export const fieldExists = async (column, value) => {
  const query = `SELECT email from ireporter_users WHERE ${column}='${value}'`;
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

export const dateString = () => {
  // set date up
  const dateObj = new Date();
  return `${dateObj.getFullYear()} / ${(dateObj.getMonth() + 1)} / ${dateObj.getDate()}`;
};
