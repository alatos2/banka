"use strict";

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports.validateAccount = function (account) {
  var accountSchema = {
    accountNumber: _joi["default"].number(),
    type: _joi["default"].string().valid('saving', 'current'),
    openingBalance: _joi["default"].number(),
    status: _joi["default"].string().valid('draft', 'activate', 'dormant')
  };
  return _joi["default"].validate(account, accountSchema);
};

exports.validateUpdate = function (update) {
  var updateSchema = {
    status: _joi["default"].string().valid('draft', 'activate', 'dormant')
  };
  return _joi["default"].validate(update, updateSchema);
};