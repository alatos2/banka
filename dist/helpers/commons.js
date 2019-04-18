"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _dummyData = _interopRequireDefault(require("../model/dummyData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var SECRET = 'andela';
var helpers = {
  /**
   * @description - generates a new id
   * @param {object} data
   * @returns {int} id
   */
  getNextId: function getNextId(data) {
    var lastId = data[data.length - 1].id;
    return lastId + 1;
  },

  /**
   * @description - generates a new account number
   * @param {object} data
   * @returns {int} accountNumber
   */
  generateAccountNumber: function generateAccountNumber(data) {
    var newAccountNumber = Math.floor(Math.random() * 9000000) + 2550000000;
    var foundAccount = data.find(function (eachData) {
      return eachData.accountNumber === newAccountNumber;
    });

    if (!foundAccount) {
      return newAccountNumber;
    }

    return 0;
  },

  /**
   * @description - encypt password
   * @param {object} password
   * @returns {object} hashPassword
   */
  hashPassword: function hashPassword(password) {
    var salt = _bcrypt["default"].genSaltSync(10);

    var hashedPassword = _bcrypt["default"].hashSync(password, salt);

    return hashedPassword;
  },

  /**
   * @description - validate password
   * @param {string} password
   * @param {string} hashPassword
   * @returns {boolean} boolean
   */
  validatePassword: function validatePassword(password, hashPassword) {
    return _bcrypt["default"].compareSync(password, hashPassword);
  },

  /**
   * @description - assigns token
   * @param {object} payload
   * @returns {object} token
   */
  jwtToken: function jwtToken(payload) {
    var token = _jsonwebtoken["default"].sign(payload, SECRET, {
      expiresIn: '24h' // expires in 24 hours

    });

    return token;
  },

  /**
   * @description - search by email
   * @param {string} email
   * @param {object} data
   * @returns {object} foundEmail
   */
  searchByEmail: function searchByEmail(searchEmail, data) {
    var foundEmail = data.find(function (eachData) {
      return eachData.email === searchEmail;
    });
    return foundEmail;
  },

  /**
   * @description - search by id
   * @param {int} id
   * @param {object} data
   * @returns {object} foundId
   */
  searchById: function searchById(searchId, data) {
    var foundId = data.find(function (eachData) {
      return eachData.id === searchId;
    });
    return foundId;
  },
  getOne: function getOne(accountNumber) {
    var accountExists = false;
    var accountDetails;
    var accountIndex;

    _dummyData["default"].accounts.forEach(function (account) {
      if (account.accountNumber === accountNumber) {
        accountExists = true;
        accountDetails = account;
        balance = account.balance;
        accountIndex = _dummyData["default"].accounts.indexOf(account);
      }
    });

    return {
      accountDetails: accountDetails,
      accountExists: accountExists,
      balance: balance,
      accountIndex: accountIndex
    };
  },

  /**
   * @description - search by account number
   * @param {int} accountNumber
   * @param {object} data
   * @returns {object} foundAccount
   */
  searchByAccount: function searchByAccount(searchAccount, data) {
    var foundAccount = data.find(function (eachData) {
      return eachData.accountNumber === searchAccount;
    });
    return foundAccount;
  },

  /**
   * @description - validates email
   * @param {string} emaIl;
   * @returns {Boolean} isValid
   */
  emailValidator: function emailValidator(email) {
    var reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var isValid = reg.test(email);
    return isValid;
  }
};
var _default = helpers;
exports["default"] = _default;