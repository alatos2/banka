import moment from 'moment';
import dummyData from '../model/dummyData';
import AccountNumber from '../helpers/accountNumbers';


/**
 * @exports
 * @class Account
 */
class Account {
/**
  * @method create
  * @description Adds a user's bank account to the data structure
  * @param {object} data - The Request Body data
  * @param {object} req - The Request Object
  * @returns {object} JSON API Response
  */
  create(data, req) {
    const account = {
      id: dummyData.accounts[dummyData.accounts.length - 1].id + 1,
      accountNumber: AccountNumber.generateAccountNumber(),
      createdOn: moment().format(),
      owner: req.user.id,
      type: data.type,
      status: 'draft',
      balance: parseFloat(data.initialDeposit, 10),
    };

    dummyData.accounts.push(account);
    return account;
  }

  /**
  * @method getOne
  * @description returns the account details if it the account number exists
  * @param {*} accountNumber - The accountNumber
  * @returns {object} the account details
  */
  getOne(accountNumber) {
    let accountExists = false;
    let accountDetails;
    let accountIndex;
    dummyData.accounts.forEach((account) => {
      if (account.accountNumber === accountNumber) {
        accountExists = true;
        accountDetails = account;
        accountIndex = dummyData.accounts.indexOf(account);
      }
    });
    return { accountDetails, accountExists, accountIndex };
  }

  /**
  * @method delete
  * @description Deletes an account
  * @param {object} index - The Response Object
  * @returns {object} JSON API Response
  */
  delete(index) {
    dummyData.accounts.splice(index, 1);
  }
}

const account = new Account();
export default account;