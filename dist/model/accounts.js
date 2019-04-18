"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _dummyData = _interopRequireDefault(require("../model/dummyData"));

var _accountNumbers = _interopRequireDefault(require("../helpers/accountNumbers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @exports
 * @class Account
 */
var Account =
/*#__PURE__*/
function () {
  function Account() {
    _classCallCheck(this, Account);
  }

  _createClass(Account, [{
    key: "create",

    /**
      * @method create
      * @description Adds a user's bank account to the data structure
      * @param {object} data - The Request Body data
      * @param {object} req - The Request Object
      * @returns {object} JSON API Response
      */
    value: function create(data, req) {
      var account = {
        id: _dummyData["default"].accounts[_dummyData["default"].accounts.length - 1].id + 1,
        accountNumber: _accountNumbers["default"].generateAccountNumber(),
        createdOn: (0, _moment["default"])().format(),
        owner: req.user.id,
        type: data.type,
        status: 'draft',
        balance: parseFloat(data.initialDeposit, 10)
      };

      _dummyData["default"].accounts.push(account);

      return account;
    }
    /**
    * @method getOne
    * @description returns the account details if it the account number exists
    * @param {*} accountNumber - The accountNumber
    * @returns {object} the account details
    */

  }, {
    key: "getOne",
    value: function getOne(accountNumber) {
      var accountExists = false;
      var accountDetails;
      var accountIndex;

      _dummyData["default"].accounts.forEach(function (account) {
        if (account.accountNumber === accountNumber) {
          accountExists = true;
          accountDetails = account;
          accountIndex = _dummyData["default"].accounts.indexOf(account);
        }
      });

      return {
        accountDetails: accountDetails,
        accountExists: accountExists,
        accountIndex: accountIndex
      };
    }
    /**
    * @method delete
    * @description Deletes an account
    * @param {object} index - The Response Object
    * @returns {object} JSON API Response
    */

  }, {
    key: "delete",
    value: function _delete(index) {
      _dummyData["default"].accounts.splice(index, 1);
    }
  }]);

  return Account;
}();

var account = new Account();
var _default = account;
exports["default"] = _default;