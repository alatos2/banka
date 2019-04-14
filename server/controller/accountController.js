import moment from 'moment';
import uuid from 'uuid';
import utils from '../helpers/commons';
import dummyData from '../model/dummyData';

/**
 * @class AccountController
 */
class AccountController {
  /**
   * creates new account
   * @param {object} req express request object
   * @param {object} res express response object
   *
   * @returns {json} json
   * @memberof AccountController
   */

  // eslint-disable-next-line consistent-return
  static createAccount(req, res) {
    const { type } = req.body;
    const {
      id, firstName, lastName, email,
    } = req.body;

    if (!type || type.trim().length === 0) {
      return res.status(400).json({
        status: 400,
        error: 'No account type selected',
      });
    }

    if (type !== 'savings' && type !== 'current') {
      return res.status(400).json({
        status: 400,
        error: 'Account Type must be either savings or current',
      });
    }

    if (!utils.generateAccountNumber(dummyData.accounts)) {
      return res.status(401).json({
        status: 401,
        error: 'Account could not be created',
      });
    }

    const accountData = {
      id: uuid.v4(),
      accountNumber: utils.generateAccountNumber(dummyData.accounts),
      createdOn: moment().format(),
      owner: id,
      type,
      status: 'draft',
      balance: 0.00,
    };

    dummyData.accounts.push(accountData)

    res.status(201).json({
      status: 201,
      data: {
        accountNumber: accountData.accountNumber,
        firstName,
        lastName,
        email,
        type: accountData.type,
        openingBalance: accountData.balance,
      },
    });
  }

  /**
   * changes account status
   * @param {object} req express request object
   * @param {object} res express response object
   *
   * @returns {json} json
   * @memberof AccountController
   */
  // eslint-disable-next-line consistent-return
  static updateAccountStatus(req, res) {
    const { status } = req.body;
    let { accountNumber } = req.params;
    accountNumber = parseInt(accountNumber, 10);

    const found = utils.searchByAccount(accountNumber, dummyData.accounts);

    if (!status || status.trim().length === 0) {
      return res.status(400).json({
        status: 400,
        error: 'Status not selected',
      });
    }

    if (status !== 'activate' && status !== 'deactivate') {
      return res.status(400).json({
        status: 400,
        error: 'Wrong status selected',
      });
    }

    if (!found) {
      return res.status(400).json({
        status: 400,
        error: 'Account number does not exists',
      });
    }
    found.status = status;

    res.status(200).json({
      status: 200,
      data: {
        accountNumber,
        status,
      },
    });
  }

  /**
   * Delete account
   * @param {object} req express request object
   * @param {object} res express response object
   *
   * @returns {json} json
   * @memberof AccountController
   */
  // eslint-disable-next-line consistent-return
  static deleteAccount(req, res) {
    let { accountNumber } = req.params;
    accountNumber = parseInt(accountNumber, 10);

    const found = utils.searchByAccount(accountNumber, dummyData.accounts);

    if (!found) {
      return res.status(400).json({
        status: 400,
        error: 'Account number does not exists',
      });
    }

    const index = dummyData.accounts.indexOf(found);

    dummyData.accounts.splice(index, 1);
    res.status(200).send({ status: 200, message: 'Account successfully deleted' });
  }

  static invalidAccountRequest(req, res) {
    return res.status(400).json({
      status: 400,
      error: 'Request is not valid',
    });
  }
}

export default AccountController;