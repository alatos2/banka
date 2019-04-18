"use strict";

var _debug = _interopRequireDefault(require("debug"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var debug = (0, _debug["default"])('http');
var port = process.env.PORT || 6000;

_app["default"].listen(port, function () {
  debug("Server started at port ".concat(port));
});