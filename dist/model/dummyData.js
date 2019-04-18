"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _commons = _interopRequireDefault(require("../helpers/commons"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  accounts: [{
    id: 1,
    accountNumber: 222021882,
    createdOn: (0, _moment["default"])().format(),
    owner: 1,
    type: 'savings',
    status: 'active',
    balance: 22000.55
  }, {
    id: 2,
    accountNumber: 222011983,
    createdOn: (0, _moment["default"])().format(),
    owner: 3,
    type: 'current',
    status: 'dormant',
    balance: 555000.95
  }, {
    id: 3,
    accountNumber: 222011984,
    createdOn: (0, _moment["default"])().format(),
    owner: 3,
    type: 'current',
    status: 'dormant',
    balance: 555000.00
  }],
  users: [{
    id: 1,
    email: 'lampard@gmail.com',
    firstName: 'Frank',
    lastName: 'Lampard',
    password: 'password',
    type: 'staff',
    isAdmin: true
  }, {
    id: 2,
    email: 'test@test.com',
    firstName: 'Michael',
    lastName: 'Owen',
    password: 'password',
    type: 'staff',
    isAdmin: false
  }, {
    id: 3,
    email: 'badejo@gmail.com',
    firstName: 'Bolade',
    lastName: 'Tosin',
    password: 'password',
    type: 'user',
    isAdmin: false
  }, {
    id: 4,
    firstName: 'alabi',
    lastName: 'Tosin',
    email: 'tosin@tosin.com',
    password: 'password',
    type: 'user',
    isAdmin: false
  }, {
    id: 5,
    email: 'anu@hotmail.com',
    firstName: 'Shola',
    lastName: 'Shobiye',
    password: 'password',
    type: 'user',
    isAdmin: false
  }],
  transactions: [{
    id: 1,
    createdOn: (0, _moment["default"])().format(),
    type: 'credit',
    accountNumber: 222021882,
    cashier: 2,
    amount: 30000.00,
    oldBalance: 3522.56,
    newBalance: 33522.56
  }, {
    id: 2,
    createdOn: (0, _moment["default"])().format(),
    type: 'debit',
    accountNumber: 222011983,
    cashier: 2,
    amount: 4000.00,
    oldBalance: 33522.56,
    newBalance: 37522.56
  }, {
    id: 3,
    createdOn: (0, _moment["default"])().format(),
    type: 'credit',
    accountNumber: 7456321485,
    cashier: 2,
    amount: 300000.00,
    oldBalance: 255000.86,
    newBalance: 555000.86
  }]
};
exports["default"] = _default;