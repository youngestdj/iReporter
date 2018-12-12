import dotenv from 'dotenv';
import { insert } from './db_helpers';

dotenv.config();

/**
 * Sign up model class
 */
class SignupModel {
  /**
   * Method for signing user in
   * @param  {object} data user details
   * @return {int}      user id
   */
  static async signUserUp(data) {
    const res = insert(data, 'ireporter_users');
    return res;
  }
}

export default SignupModel;
