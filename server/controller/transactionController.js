import uuid from 'uuid';
import moment from 'moment';
import account from '../model/accounts';
import utils from '../helpers/commons';
import dummyData from '../model/dummyData';
import transaction from '../model/transaction';
/**
 * @class TransactionController
 * @description Contains controller methods for each transaction related endpoint
 * @exports transactionController
 */
class TransactionController {
  /**
  * @method creditAccount
  * @description Credits a user's bank account
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  creditAccount(req, res) {
      let { amount } = req.body;
      let { accountNumber } = req.params;
      //const { id } = req.decode;
      accountNumber = parseInt(accountNumber, 10);
      amount = parseFloat(amount);
  
      const foundAccount = utils.searchByAccount(accountNumber, dummyData.accounts);
  
      if (!foundAccount) {
        return res.status(400).json({
          status: 400,
          error: 'Account number does not exists',
        });
      }

    const transaction = {
      transactionId: uuid.v4(),
      createdOn: moment().format(),
      type: 'credit',
      accountNumber: parseInt(req.params.accountNumber, 10),
      cashier: dummyData.transactions.length + 1,
      amount: parseFloat(req.body.amount),
      oldBalance: parseFloat(foundAccount.balance).toFixed(2),
      newBalance: parseFloat(foundAccount.balance) + parseFloat(req.body.amount)
    };

      if (transaction.newBalance < 0) 
      { 
        return res.status(400).json({
          status: 400,
          error: 'insufficient funds',
        });
      }

    foundAccount.balance = transaction.newBalance;
    dummyData.transactions.push(transaction);

    return res.status(200).json({
      status: 200,
      data: {
        transactionId: transaction.transactionId,
        accountNumber: transaction.accountNumber,
        amount: transaction.amount,
        cashier: transaction.cashier,
        transactionType: transaction.type,
        accountBalance: transaction.newBalance,
      },
    });
  }

  /**
  * @method debitAccount
  * @description Debits a user's bank account
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  debitAccount(req, res) {
    let { amount } = req.body;
    let { accountNumber } = req.params;
    //const { id } = req.decode;
    accountNumber = parseInt(accountNumber, 10);
    amount = parseFloat(amount);

    const foundAccount = utils.searchByAccount(accountNumber, dummyData.accounts);

    if (!foundAccount) {
      return res.status(400).json({
        status: 400,
        error: 'Account number does not exists',
      });
    }

  const transaction = {
    transactionId: uuid.v4(),
    createdOn: moment().format(),
    type: 'debit',
    accountNumber: parseInt(req.params.accountNumber, 10),
    cashier: dummyData.transactions.length + 1,
    amount: parseFloat(req.body.amount),
    oldBalance: parseFloat(foundAccount.balance).toFixed(2),
    newBalance: parseFloat(foundAccount.balance) - parseFloat(req.body.amount)
  };

      if (transaction.newBalance < 0) 
      { 
        return res.status(400).json({
          status: 400,
          error: 'insufficient funds',
        });
      }

    foundAccount.balance = transaction.newBalance;
    dummyData.transactions.push(transaction);

    return res.status(201).json({
      status: 201,
      data: {
        transactionId: transaction.transactionId,
        accountNumber: transaction.accountNumber,
        amount: transaction.amount,
        cashier: transaction.cashier,
        transactionType: transaction.type,
        accountBalance: transaction.newBalance,
      },
    });
  }
}

const transactionController = new TransactionController();

export default transactionController;