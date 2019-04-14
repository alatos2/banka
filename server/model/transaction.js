import moment from 'moment';
import uuid from 'uuid';
import accounts from './accounts';
import dummyData from '../model/dummyData';

/**
 * @exports transaction
 * @class Transaction
 */
class Transaction {
/**
  * @method create
  * @description Creates a new transaction object and adds it to the data structure
  * @param {object} req - The Request Object
  * @param {string} type - A string representing the type of transaction
  * @returns {object} JSON API Response
  */
  create(req, type) {
    const { accountDetails, accountExists } = accounts
      .getOne(parseInt(req.params.accountNumber, 10));

    if (!accountExists) { return false; }
    const transaction = {
      transactionId: uuid.v4(),
      createdOn: moment().format(),
      type,
      accountNumber: parseInt(req.params.accountNumber, 10),
      cashier: dummyData.transactions.length + 1,
      amount: parseFloat(req.body.amount),
      oldBalance: accountDetails.balance,
      newBalance: type === 'credit' ? parseFloat((accountDetails
        .balance + parseFloat(req.body.amount))
        .toFixed(2)) : parseFloat((accountDetails
        .balance - parseFloat(req.body.amount)).toFixed(2)),
    };
    if (transaction.newBalance < 0) { return 'insufficient funds'; }
    accountDetails.balance = transaction.newBalance;
    dummyData.transactions.push(transaction);
    return transaction;
  }
}

const transaction = new Transaction();
export default transaction;