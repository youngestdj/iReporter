import bcrypt from 'bcryptjs';
import SignupModel from '../models/signup';
import {
  fieldExists,
  isEmail,
  fieldsAreFilled,
  fieldsAreNotLetters,
  dateString,
} from '../helper';
import Auth from '../middleware/auth';

/**
 * Signup class
 */
class Signup {
  /**
   * Check if sent data is Invalid
   * @param  {object} request http request object
   * @return {array}         array of status code and error message
   */
  static async invalidData(request) {
  // check if all fields are filled
    const validData = await fieldsAreFilled(request.body);
    if (!validData) {
      return [400, 'Invalid data. Ensure that all fields are filled'];
    }

    // check if all alphabetic fields are valid
    const validFields = await fieldsAreNotLetters(request.body);
    if (validFields) {
      return [422, validFields];
    }

    // check if email is valid
    if (!isEmail(request.body.email)) {
      return [422, 'Invalid email'];
    }

    // check if email does not exist in the database already
    const existingUser = await fieldExists('email', request.body.email, 'ireporter_users');
    if (existingUser) {
      return [409, 'User already exists'];
    }

    // check if username does not exist in the database already
    const validUsername = await fieldExists('username', request.body.username, 'ireporter_users');
    if (validUsername) {
      return [409, 'Username already exists. Pleasee choose another one'];
    }
    return false;
  }

  /**
 * Sign up a user
 * @param  {object} request  http request object
 * @param  {object} response http response object
 * @return {object}          user instance and status code
 */
  static async saveUserToDb(request, response) {
    const invalidRequest = await Signup.invalidData(request);
    if (invalidRequest) {
      response.status(invalidRequest[0]).json({
        status: invalidRequest[0],
        error: invalidRequest[1],
      });
      return;
    }
    // hash password
    const hashedPwd = bcrypt.hashSync(request.body.password, 8);

    // final data
    const data = {
      firstname: request.body.firstname,
      lastname: request.body.lastname,
      othernames: request.body.othernames,
      email: request.body.email,
      username: request.body.username,
      phonenumber: request.body.phonenumber,
      password: hashedPwd,
      registered: dateString(),
    };

    const id = await SignupModel.signUserUp(data);
    await delete data.password;
    data.id = id;
    data.isadmin = 'false';
    const token = await Auth.signToken(data);


    response.status(201).json({
      status: 201,
      data: [{
        token,
        user: data,
      }],
    });
  }
}

export default Signup;
