import uuid from 'uuid';
import moment from 'moment';
import transactions from '../model/transaction';
import utils from '../helpers/commons';
import dummyData from '../model/dummyData';
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
    const { accountDetails, accountExists } = utils.getOne(parseInt(req.params.accountNumber, 10));

    const { amount } = req.body;

    const type = 'credit';

    if(!accountExists) {
      return res.status(400).json({
        status: 400,
        error: 'Account number does not exists',
      });
    };

    if(!amount){
      return res.status(400).json({
        status: 400,
        error: 'Amount cannot be left empty',
      });
    };

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

      if (transaction.newBalance < 0) 
      { 
        return res.status(400).json({
          status: 400,
          error: 'insufficient funds',
        });
      }

    accountDetails.balance = transaction.newBalance;
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
    const { accountDetails, accountExists } = utils.getOne(parseInt(req.params.accountNumber, 10));

    const { amount } = req.body;

    const type = 'debit';

    if(!accountExists) {
      return res.status(400).json({
        status: 400,
        error: 'Account number does not exists',
      });
    };

    if(!amount){
      return res.status(400).json({
        status: 400,
        error: 'Amount cannot be left empty',
      });
    };

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

      if (transaction.newBalance < 0) 
      { 
        return res.status(400).json({
          status: 400,
          error: 'insufficient funds',
        });
      }

    accountDetails.balance = transaction.newBalance;
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