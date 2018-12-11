import bcrypt from 'bcryptjs';
import {
  fieldsAreFilled, fieldsAreNotLetters, usernameExists, signUserUp,
} from '../models/signup';
import { userExists, isEmail } from '../helper';
import signToken from '../middleware/auth';

/**
 * Sign up a user
 * @param  {object} request  http request object
 * @param  {object} response http response object
 * @return {object}          user instance and status code
 */
const signUp = async (request, response) => {
  // check if all fields are filled
  const validData = await fieldsAreFilled(request.body);
  if (!validData) {
    response.status(400).json({
      status: 400,
      error: 'Invalid data. Ensure that all fields are filled',
    });
    return;
  }

  // check if all alphabetic fields are valid
  const validFields = await fieldsAreNotLetters(request.body);
  if (validFields) {
    response.status(422).json({
      status: 422,
      error: validFields,
    });
    return;
  }


  // check if email is valid
  if (!isEmail(request.body.email)) {
    response.status(422).json({
      status: 422,
      error: 'Invalid email',
    });
    return;
  }

  // check if email does not exist in the database already
  const existingUser = await userExists(request.body.email);
  if (existingUser) {
    response.status(409).json({
      status: 409,
      error: 'User already exists',
    });
    return;
  }

  // check if username does not exist in the database already
  const validUsername = await usernameExists(request.body.username);
  if (validUsername) {
    response.status(409).json({
      status: 409,
      error: 'Username already exists. Pleasee choose another one',
    });
    return;
  }

  // hash password
  const hashedPwd = bcrypt.hashSync(request.body.password, 8);

  // set date up
  const dateObj = new Date();
  const regDate = `${dateObj.getFullYear()} / ${(dateObj.getMonth() + 1)} / ${dateObj.getDate()}`;

  // final data
  const data = {
    firstname: request.body.firstname,
    lastname: request.body.lastname,
    othernames: request.body.othernames,
    email: request.body.email,
    username: request.body.username,
    phonenumber: request.body.phonenumber,
    password: hashedPwd,
    registered: regDate,
  };

  const id = await signUserUp(data);
  await delete data.password;
  const token = await signToken(data);

  data.id = id;
  data.isadmin = 'false';

  response.status(201).json({
    status: 201,
    data: [{
      token,
      user: data,
    }],
  });
};

export default signUp;
