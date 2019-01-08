import LoginModel from '../models/login';
import { validLogin, fieldExists } from '../helper';
import Auth from '../middleware/auth';
import UserModel from '../models/user';

/**
 * Login class
 */
class Login {
/**
 * Log in a user
 * @param  {object} request  http request object
 * @param  {object} response http response object
 * @return {object}          json object
 */
  static async logUserIn(request, response) {
    const { email, password } = request.body;
    const checklogin = await validLogin(email, password);
    if (!checklogin) {
      response.status(400).json({
        status: 400,
        error: 'Invalid login',
      });
      return;
    }

    const validUser = await fieldExists('email', email, 'ireporter_users');
    if (!validUser) {
      response.status(400).json({
        status: 400,
        error: 'Invalid email or password',
      });
      return;
    }

    const validPassword = await LoginModel.verifyPassword(email, password);
    if (!validPassword) {
      response.status(400).json({
        status: 400,
        error: 'Invalid email or password',
      });
      return;
    }

    const userObj = await UserModel.getUser(email);
    delete userObj.password;
    const token = await Auth.signToken(userObj);

    response.status(200).json({
      status: 200,
      data: [{
        token,
        user: userObj,
      }],
    });
  }
}
export default Login;
