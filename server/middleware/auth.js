import jwt from 'jsonwebtoken';

/**
 * Authentication class
 */
class Auth {
  /**
   * Sign token method
   * @param  {object} obj user object
   * @return {string}     token
   */
  static async signToken(obj) {
    const token = jwt.sign({
      id: obj.id,
      isadmin: obj.isadmin,
    }, process.env.SECRET, {
      expiresIn: 86400000000,
    });
    return token;
  }

  /**
   * Verify a user token
   * @param  {object}   request  request object
   * @param  {object}   response response object
   * @param  {object} next     pass values on to the next middleware
   * @return {object}            user object
   */
  static verifyToken(request, response, next) {
    const token = request.headers['x-access-token'] || request.body.token || request.query.token;
    if (!token) {
      return response.status(401).json({
        status: 500,
        auth: false,
        error: 'No token provided.',
      });
    }
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return response.status(500).json({
          status: 500,
          auth: false,
          error: 'Failed to authenticate token.',
        });
      }
      request.userid = decoded.id;
      request.isadmin = decoded.isadmin;
      next();
    });
  }

  /**
   * Verify admin
   * @param  {object}   request  request object
   * @param  {request}   response reesponse object
   * @param  {object} next     pass request to next middleware
   * @return {object}            request
   */
  static verifyAdmin(request, response, next) {
    const { isadmin } = request;
    if (isadmin !== true) {
      return response.status(500).json({
        status: 500,
        auth: false,
        error: 'Only admin can access this resource',
      });
    }
    next();
  }
}

export default Auth;
