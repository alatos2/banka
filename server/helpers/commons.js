import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dummyData from '../model/dummyData';

const secret = 'scandali';

const Utils = {
  /**
   * @description - generates a new id
   * @param {object} data
   * @returns {int} id
   */
  // getNextId(data) {
  //   const lastId = data[data.length - 1].id;
  //   return lastId + 1;
  // },
  /**
   * @description - generates a new id
   * @param {object} data
   * @returns {int} id
   */
  getNextTransactionId(data) {
    const lastId = data[data.length - 1].transactionId;
    return lastId + 1;
  },
  /**
   * @description - generates a new account number
   * @param {object} data
   * @returns {int} id
   */
  generateAccountNumber(data) {
    const lastAcc = data[data.length - 1].accountNumber;
    return lastAcc + 100;
  },
  /**
   * @description - validate password by comparing password with hash password
   * @param {string} password
   * @param {string} hashpassword
   * @returns {boolean} boolean to show if password match or not
   */
  validatePassword(password, userPassword) {
    return bcrypt.compareSync(password, userPassword);
  },
  /**
   * @description - encypt password
   * @param {object} password
   * @returns {object} hashpassword
   */
  hashPassword(password) {
    const salt = bcrypt.genSaltSync(15);
    const pwd = bcrypt.hashSync(password, salt);
    return pwd;
  },
  /**
   * @description - signs token
   * @param {object} payload
   */
  jwtSigner(payload) {
    return jwt.sign(payload, secret, { expiresIn: '24h' });
  },
  /**
  * @description - validates email
  * @param {string} emaIl;
  * @returns {Boolean} isValid
  */
  emailValidator(email) {
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = reg.test(email);
    return isValid;
  },
  /**
   * @description - search by email
   * @param {string} email
   * @param {object} data
   * @returns {object} foundEmail
   */
  searchByEmail(searchEmail, data) {
    const foundEmail = data.find(eachData => eachData.email === searchEmail);
    return foundEmail;
  },
  /**
   * @description - search by account number
   * @param {int} accountNumber
   * @param {object} data
   * @returns {object} foundAccount
   */
  searchByAccount(searchAccount, data) {
    const foundAccount = data.find(eachData => eachData.accountNumber === searchAccount);
    return foundAccount;
  },
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
  },
  /**
   * @description - remove null key from ab object
   * @param {object}
   * @returns {object}
  //  */
  // stripNull(obj) {
  //   let cleanObj = {};

  //   Object.keys(obj).forEach((val) => {
  //     const newVal = obj[val];
  //     cleanObj = newVal ? { ...cleanObj, [val]: newVal } : cleanObj;
  //   });

  //   return cleanObj;
  // },
};

export default Utils;
