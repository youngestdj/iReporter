import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const recordFilled = (obj) => {
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

export const validId = (id) => {
  const objRegExp = /^[0-9]+$/;
  return objRegExp.test(id);
};

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

export const fieldExists = async (column, value, table) => {
  const query = `SELECT ${column} from ${table} WHERE ${column}='${value}'`;
  const result = await pool.query(query);
  return result.rows[0];
};

export const recordFieldExists = async (id, type) => {
  const query = `SELECT id from records where id='${id}' AND type ='${type}'`;
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

export const validateUrl = async (request, response, next) => {
  if (!validId(request.params.id)) {
    return response.status(400).json({
      status: 400,
      error: 'Invalid URL',
    });
  }
  const idExists = await recordFieldExists(request.params.id, request.recordType);
  if (!idExists) {
    return response.status(404).json({
      status: 404,
      error: 'record not found',
    });
  }
  next();
};

export const getRecordType = async (request, response, next) => {
  const record = request.route.path.split('/');
  const recordType = record[1];
  const recordField = record[3];
  request.recordType = recordType;
  request.recordField = recordField;
  next();
};
export const validateRecordType = async (request, response, next) => {
  if ((request.recordField === 'location' && !request.body.location)
    || (request.recordField === 'comment' && !request.body.comment)) {
    return response.status(422).json({
      status: 422,
      error: 'Invalid data',
    });
  }
  request.content = (request.body.comment) ? request.body.comment : request.body.location;
  next();
};

export const validateRecordField = async (request, response, next) => {
  const rowfieldExists = await recordFieldExists(request.params.id, request.recordType);
  if (!rowfieldExists) {
    return response.status(404).json({
      status: 404,
      error: 'record not found',
    });
  }
  next();
};
