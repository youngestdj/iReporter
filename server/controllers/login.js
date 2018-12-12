import verifyPassword from '../models/login';
import { validLogin, userExists } from '../helper';
import signToken from '../middleware/auth';
import getUser from '../models/user';

/**
 * Log in a user
 * @param  {object} request  http request object
 * @param  {object} response http response object
 * @return {object}          json object
 */
const logUserIn = async (request, response) => {
  const { email, password } = request.body;
  const checklogin = await validLogin(email, password);
  if (!checklogin) {
    response.status(400).json({
      status: 400,
      error: 'Invalid login',
    });
    return;
  }

  const validUser = await userExists(email);
  if (!validUser) {
    response.status(400).json({
      status: 400,
      error: 'Invalid email or password',
    });
    return;
  }

  const validPassword = await verifyPassword(email, password);
  if (!validPassword) {
    response.status(400).json({
      status: 400,
      error: 'Invalid email or password',
    });
    return;
  }

  const userObj = await getUser(email);
  delete userObj.password;
  const token = await signToken(userObj);

  response.status(200).json({
    status: 200,
    token,
    user: userObj,
  });
};
export default logUserIn;
