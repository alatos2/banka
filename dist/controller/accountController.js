"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _uuid = _interopRequireDefault(require("uuid"));

var _commons = _interopRequireDefault(require("../helpers/commons"));

var _dummyData = _interopRequireDefault(require("../model/dummyData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @class AccountController
 */
var AccountController =
/*#__PURE__*/
function () {
  function AccountController() {
    _classCallCheck(this, AccountController);
  }

  _createClass(AccountController, null, [{
    key: "createAccount",

    /**
     * creates new account
     * @param {object} req express request object
     * @param {object} res express response object
     *
     * @returns {json} json
     * @memberof AccountController
     */
    // eslint-disable-next-line consistent-return
    value: function createAccount(req, res) {
      var type = req.body.type;
      var _req$decode = req.decode,
          id = _req$decode.id,
          firstName = _req$decode.firstName,
          lastName = _req$decode.lastName,
          email = _req$decode.email;

      if (!_commons["default"].generateAccountNumber(_dummyData["default"].accounts)) {
        return res.status(401).json({
          status: 401,
          error: 'Account could not be created'
        });
      }

      var accountData = {
        id: _uuid["default"].v4(),
        accountNumber: _commons["default"].generateAccountNumber(_dummyData["default"].accounts),
        createdOn: (0, _moment["default"])().format(),
        owner: id,
        type: type,
        status: 'draft',
        balance: 0.00
      };

      _dummyData["default"].accounts.push(accountData);

      res.status(201).json({
        status: 201,
        data: {
          accountNumber: accountData.accountNumber,
          firstName: firstName,
          lastName: lastName,
          email: email,
          type: accountData.type,
          openingBalance: accountData.balance
        }
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

  }, {
    key: "updateAccountStatus",
    value: function updateAccountStatus(req, res) {
      var status = req.body.status;
      var accountNumber = req.params.accountNumber;
      accountNumber = parseInt(accountNumber, 10);

      var found = _commons["default"].searchByAccount(accountNumber, _dummyData["default"].accounts);

      if (!found) {
        return res.status(400).json({
          status: 400,
          error: 'Account number does not exists'
        });
      }

      found.status = status;
      res.status(200).json({
        status: 200,
        data: {
          accountNumber: accountNumber,
          status: status
        }
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

  }, {
    key: "deleteAccount",
    value: function deleteAccount(req, res) {
      var accountNumber = req.params.accountNumber;
      accountNumber = parseInt(accountNumber, 10);

      var found = _commons["default"].searchByAccount(accountNumber, _dummyData["default"].accounts);

      if (!found) {
        return res.status(400).json({
          status: 400,
          error: 'Account number does not exists'
        });
      }

      var index = _dummyData["default"].accounts.indexOf(found);

      _dummyData["default"].accounts.splice(index, 1);

      res.status(200).send({
        status: 200,
        message: 'Account successfully deleted'
      });
    }
  }, {
    key: "invalidAccountRequest",
    value: function invalidAccountRequest(req, res) {
      return res.status(400).json({
        status: 400,
        error: 'Request is not valid'
      });
    }
  }]);

  return AccountController;
}();

var _default = AccountController;
exports["default"] = _default;