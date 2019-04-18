"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _uuid = _interopRequireDefault(require("uuid"));

var _moment = _interopRequireDefault(require("moment"));

var _accounts = _interopRequireDefault(require("../model/accounts"));

var _commons = _interopRequireDefault(require("../helpers/commons"));

var _dummyData = _interopRequireDefault(require("../model/dummyData"));

var _transaction = _interopRequireDefault(require("../model/transaction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @class TransactionController
 * @description Contains controller methods for each transaction related endpoint
 * @exports transactionController
 */
var TransactionController =
/*#__PURE__*/
function () {
  function TransactionController() {
    _classCallCheck(this, TransactionController);
  }

  _createClass(TransactionController, [{
    key: "creditAccount",

    /**
    * @method creditAccount
    * @description Credits a user's bank account
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    * @returns {object} JSON API Response
    */
    value: function creditAccount(req, res) {
      var amount = req.body.amount;
      var accountNumber = req.params.accountNumber; //const { id } = req.decode;

      accountNumber = parseInt(accountNumber, 10);
      amount = parseFloat(amount);

      var foundAccount = _commons["default"].searchByAccount(accountNumber, _dummyData["default"].accounts);

      if (!foundAccount) {
        return res.status(400).json({
          status: 400,
          error: 'Account number does not exists'
        });
      }

      var transaction = {
        transactionId: _uuid["default"].v4(),
        createdOn: (0, _moment["default"])().format(),
        type: 'credit',
        accountNumber: parseInt(req.params.accountNumber, 10),
        cashier: _dummyData["default"].transactions.length + 1,
        amount: parseFloat(req.body.amount),
        oldBalance: parseFloat(foundAccount.balance).toFixed(2),
        newBalance: parseFloat(foundAccount.balance) + parseFloat(req.body.amount)
      };

      if (transaction.newBalance < 0) {
        return res.status(400).json({
          status: 400,
          error: 'insufficient funds'
        });
      }

      foundAccount.balance = transaction.newBalance;

      _dummyData["default"].transactions.push(transaction);

      return res.status(200).json({
        status: 200,
        data: {
          transactionId: transaction.transactionId,
          accountNumber: transaction.accountNumber,
          amount: transaction.amount,
          cashier: transaction.cashier,
          transactionType: transaction.type,
          accountBalance: transaction.newBalance
        }
      });
    }
    /**
    * @method debitAccount
    * @description Debits a user's bank account
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    * @returns {object} JSON API Response
    */

  }, {
    key: "debitAccount",
    value: function debitAccount(req, res) {
      var amount = req.body.amount;
      var accountNumber = req.params.accountNumber; //const { id } = req.decode;

      accountNumber = parseInt(accountNumber, 10);
      amount = parseFloat(amount);

      var foundAccount = _commons["default"].searchByAccount(accountNumber, _dummyData["default"].accounts);

      if (!foundAccount) {
        return res.status(400).json({
          status: 400,
          error: 'Account number does not exists'
        });
      }

      var transaction = {
        transactionId: _uuid["default"].v4(),
        createdOn: (0, _moment["default"])().format(),
        type: 'debit',
        accountNumber: parseInt(req.params.accountNumber, 10),
        cashier: _dummyData["default"].transactions.length + 1,
        amount: parseFloat(req.body.amount),
        oldBalance: parseFloat(foundAccount.balance).toFixed(2),
        newBalance: parseFloat(foundAccount.balance) - parseFloat(req.body.amount)
      };

      if (transaction.newBalance < 0) {
        return res.status(400).json({
          status: 400,
          error: 'insufficient funds'
        });
      }

      foundAccount.balance = transaction.newBalance;

      _dummyData["default"].transactions.push(transaction);

      return res.status(201).json({
        status: 201,
        data: {
          transactionId: transaction.transactionId,
          accountNumber: transaction.accountNumber,
          amount: transaction.amount,
          cashier: transaction.cashier,
          transactionType: transaction.type,
          accountBalance: transaction.newBalance
        }
      });
    }
  }]);

  return TransactionController;
}();

var transactionController = new TransactionController();
var _default = transactionController;
exports["default"] = _default;