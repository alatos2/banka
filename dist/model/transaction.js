"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _uuid = _interopRequireDefault(require("uuid"));

var _accounts = _interopRequireDefault(require("./accounts"));

var _dummyData = _interopRequireDefault(require("../model/dummyData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @exports transaction
 * @class Transaction
 */
var Transaction =
/*#__PURE__*/
function () {
  function Transaction() {
    _classCallCheck(this, Transaction);
  }

  _createClass(Transaction, [{
    key: "create",

    /**
      * @method create
      * @description Creates a new transaction object and adds it to the data structure
      * @param {object} req - The Request Object
      * @param {string} type - A string representing the type of transaction
      * @returns {object} JSON API Response
      */
    value: function create(req, type) {
      var _accounts$getOne = _accounts["default"].getOne(parseInt(req.params.accountNumber, 10)),
          accountDetails = _accounts$getOne.accountDetails,
          accountExists = _accounts$getOne.accountExists;

      if (!accountExists) {
        return false;
      }

      var transaction = {
        transactionId: _uuid["default"].v4(),
        createdOn: (0, _moment["default"])().format(),
        type: type,
        accountNumber: parseInt(req.params.accountNumber, 10),
        cashier: _dummyData["default"].transactions.length + 1,
        amount: parseFloat(req.body.amount),
        oldBalance: accountDetails.balance,
        newBalance: type === 'credit' ? parseFloat((accountDetails.balance + parseFloat(req.body.amount)).toFixed(2)) : parseFloat((accountDetails.balance - parseFloat(req.body.amount)).toFixed(2))
      };

      if (transaction.newBalance < 0) {
        return 'insufficient funds';
      }

      accountDetails.balance = transaction.newBalance;

      _dummyData["default"].transactions.push(transaction);

      return transaction;
    }
  }]);

  return Transaction;
}();

var transaction = new Transaction();
var _default = transaction;
exports["default"] = _default;