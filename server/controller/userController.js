import moment from 'moment';
import utils from '../helpers/commons';
import dummy from '../model/dummyData';
import statusCodes from '../helpers/statusCodes';

/**
 * @class UserController
 */
class UserController {
  /**
   * creates new user
   * @param {object} req express request object
   * @param {object} res express response object
   *
   * @returns {json} json
   * @memberof UserController
   */

  // eslint-disable-next-line consistent-return
  static signup(req, res) {
    const { firstName, lastName, email, password, confirmPassword,} = req.body;

    if (utils.searchByEmail(email, dummy.users)) {
        return res.status(400).json({
            status: statusCodes.badRequest,
            error: 'Email already exists',
          });
      }    
    
    const userData = {
      id: utils.getNextId(dummy.users),
      email,
      firstName,
      lastName,
      password: utils.hashPassword(password),
      type: 'user',
      registered: moment().format(),
      isAdmin: false,
    };

    dummy.users.push(userData);

    const token = utils.jwtToken(userData);

    res.header('Authorization', `${token}`).status(201).json({
      status: statusCodes.created,
      data: {
        token,
        id: userData.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
      },
    });
  }

  /**
   * logs a user in
   * @param {object} req express request object
   * @param {object} res express response object
   *
   * @returns {json} json
   * @memberof UserController
   */

  static signin(req, res) {
    const { email, password } = req.body;

    const userData = {
      email,
      password,
    };

    const storedUser = utils.searchByEmail(email, dummy.users);
    if (!storedUser) {
      return res.status(400).json({
        status: statusCodes.badRequest,
        error: 'Invalid login details, email or password is wrong',
      });
    }

    if (storedUser) {
      if (utils.validatePassword(userData.password, storedUser.password)) {
        const token = utils.jwtToken(storedUser);
        return res.header('Authorization', `${token}`).status(200).json({
          status: statusCodes.success,
          data: {
            token,
            id: storedUser.id,
            firstName: storedUser.firstName,
            lastName: storedUser.lastName,
            email: storedUser.email,
          },
        });
      }
    }

    return res.status(400).json({
      status: statusCodes.badRequest,
      error: 'Invalid login details, email or password is wrong',
    });
  }

  static invalidUserRequest(req, res) {
    return res.status(400).json({
      status: statusCodes.badRequest,
      error: 'Request is not valid',
    });
  }
}

export default UserController;