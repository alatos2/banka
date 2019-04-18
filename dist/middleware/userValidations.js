"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _commons = _interopRequireDefault(require("../helpers/commons"));

var _statusCodes = _interopRequireDefault(require("../helpers/statusCodes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @class UserValidate
 */
var UserValidate =
/*#__PURE__*/
function () {
  function UserValidate() {
    _classCallCheck(this, UserValidate);
  }

  _createClass(UserValidate, null, [{
    key: "validateSignup",
    value: function validateSignup(request, response, next) {
      var _request$body = request.body,
          firstName = _request$body.firstName,
          lastName = _request$body.lastName,
          email = _request$body.email,
          password = _request$body.password,
          confirmPassword = _request$body.confirmPassword;

      if (!firstName || firstName.trim().length === 0) {
        return response.status(400).json({
          status: _statusCodes["default"].badRequest,
          error: 'First name is required'
        });
      }

      if (!lastName || lastName.trim().length === 0) {
        return response.status(400).json({
          status: _statusCodes["default"].badRequest,
          error: 'Last name is required'
        });
      }

      if (!email || email.trim().length === 0) {
        return response.status(400).json({
          status: _statusCodes["default"].badRequest,
          error: 'Email is required'
        });
      }

      if (email) {
        var isValid = _commons["default"].emailValidator(email);

        if (!isValid) {
          return response.status(400).json({
            status: _statusCodes["default"].badRequest,
            error: 'Invalid email address'
          });
        }
      }

      if (!password || password.trim().length === 0) {
        return response.status(400).json({
          status: _statusCodes["default"].badRequest,
          error: 'Password is required'
        });
      }

      if (password !== confirmPassword) {
        return response.status(400).json({
          status: _statusCodes["default"].badRequest,
          error: 'Passwords do not match'
        });
      }

      next();
    }
  }, {
    key: "validateSignin",
    value: function validateSignin(request, response, next) {
      var _request$body2 = request.body,
          email = _request$body2.email,
          password = _request$body2.password;

      if (!email || email.trim().length === 0) {
        return response.status(400).json({
          status: _statusCodes["default"].badRequest,
          error: 'Email is required'
        });
      }

      if (email) {
        var isValid = _commons["default"].emailValidator(email);

        if (!isValid) {
          return response.status(400).json({
            status: _statusCodes["default"].badRequest,
            error: 'Invalid email address'
          });
        }
      }

      if (!password || password.trim().length === 0) {
        return response.status(400).json({
          status: _statusCodes["default"].badRequest,
          error: 'Password is required'
        });
      }

      next();
    }
  }]);

  return UserValidate;
}();

var _default = UserValidate;
exports["default"] = _default;