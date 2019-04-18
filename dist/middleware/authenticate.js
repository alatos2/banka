"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _statusCodes = _interopRequireDefault(require("../helpers/statusCodes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var SECRET = 'andela'; // eslint-disable-next-line consistent-return

var authentication = function authentication(request, response, next) {
  try {
    var header = request.headers.authorization;
    if (!header || header === '') return response.status(401).json({
      status: _statusCodes["default"].unAuthorized,
      error: 'Authentication failed'
    });

    var token = _jsonwebtoken["default"].verify(header, SECRET);

    request.decode = token;
    next();
  } catch (e) {
    return response.status(401).json({
      status: _statusCodes["default"].unAuthorized,
      error: 'Invalid token!'
    });
  }
};

var _default = authentication;
exports["default"] = _default;