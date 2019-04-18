"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _commons = _interopRequireDefault(require("../helpers/commons"));

var _dummyData = _interopRequireDefault(require("../model/dummyData"));

var _statusCodes = _interopRequireDefault(require("../helpers/statusCodes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @class UserController
 */
var UserController =
/*#__PURE__*/
function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, null, [{
    key: "signup",

    /**
     * creates new user
     * @param {object} req express request object
     * @param {object} res express response object
     *
     * @returns {json} json
     * @memberof UserController
     */
    // eslint-disable-next-line consistent-return
    value: function signup(req, res) {
      var _req$body = req.body,
          firstName = _req$body.firstName,
          lastName = _req$body.lastName,
          email = _req$body.email,
          password = _req$body.password,
          confirmPassword = _req$body.confirmPassword;

      if (_commons["default"].searchByEmail(email, _dummyData["default"].users)) {
        return res.status(400).json({
          status: _statusCodes["default"].badRequest,
          error: 'Email already exists'
        });
      }

      var userData = {
        id: _commons["default"].getNextId(_dummyData["default"].users),
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: _commons["default"].hashPassword(password),
        type: 'user',
        registered: (0, _moment["default"])().format(),
        isAdmin: false
      };

      _dummyData["default"].users.push(userData);

      var token = _commons["default"].jwtToken(userData);

      res.header('Authorization', "".concat(token)).status(201).json({
        status: _statusCodes["default"].created,
        data: {
          token: token,
          id: userData.id,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email
        }
      });
    }
    /**
     * logs a user in
     * @param {object} req express request object
     * @param {object} res express response object
     *
     * @returns {json} json
     * @memberof UserController
     */

  }, {
    key: "signin",
    value: function signin(req, res) {
      var _req$body2 = req.body,
          email = _req$body2.email,
          password = _req$body2.password;
      var userData = {
        email: email,
        password: password
      };

      var storedUser = _commons["default"].searchByEmail(email, _dummyData["default"].users);

      if (!storedUser) {
        return res.status(400).json({
          status: _statusCodes["default"].badRequest,
          error: 'Invalid login details, email or password is wrong'
        });
      }

      if (storedUser) {
        if (_commons["default"].validatePassword(userData.password, storedUser.password)) {
          var token = _commons["default"].jwtToken(storedUser);

          return res.header('Authorization', "".concat(token)).status(200).json({
            status: _statusCodes["default"].success,
            data: {
              token: token,
              id: storedUser.id,
              firstName: storedUser.firstName,
              lastName: storedUser.lastName,
              email: storedUser.email
            }
          });
        }
      }

      return res.status(400).json({
        status: _statusCodes["default"].badRequest,
        error: 'Invalid login details, email or password is wrong'
      });
    }
  }, {
    key: "invalidUserRequest",
    value: function invalidUserRequest(req, res) {
      return res.status(400).json({
        status: _statusCodes["default"].badRequest,
        error: 'Request is not valid'
      });
    }
  }]);

  return UserController;
}();

var _default = UserController;
exports["default"] = _default;