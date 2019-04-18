"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _statusCodes = _interopRequireDefault(require("../helpers/statusCodes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @class AccountValidate
 */
var AccountValidate =
/*#__PURE__*/
function () {
  function AccountValidate() {
    _classCallCheck(this, AccountValidate);
  }

  _createClass(AccountValidate, null, [{
    key: "validateCreate",
    value: function validateCreate(request, response, next) {
      var type = request.body.type;

      if (!type || type.trim().length === 0) {
        return response.status(400).json({
          status: _statusCodes["default"].badRequest,
          error: 'No account type selected'
        });
      }

      if (type !== 'savings' && type !== 'current') {
        return response.status(400).json({
          status: _statusCodes["default"].badRequest,
          error: 'Account Type must be either savings or current'
        });
      }

      next();
    }
  }, {
    key: "validateStatusChange",
    value: function validateStatusChange(request, response, next) {
      var status = request.body.status; // eslint-disable-next-line no-unused-vars

      var accountNumber = request.params.accountNumber;
      accountNumber = parseInt(accountNumber, 10);

      if (!status || status.trim().length === 0) {
        return response.status(400).json({
          status: _statusCodes["default"].badRequest,
          error: 'Status not selected'
        });
      }

      if (status !== 'activate' && status !== 'deactivate') {
        return response.status(400).json({
          status: _statusCodes["default"].badRequest,
          error: 'Wrong status selected'
        });
      }

      next();
    }
  }]);

  return AccountValidate;
}();

var _default = AccountValidate;
exports["default"] = _default;