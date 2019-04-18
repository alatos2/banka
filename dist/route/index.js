"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userController = _interopRequireDefault(require("../controller/userController"));

var _accountController = _interopRequireDefault(require("../controller/accountController"));

var _transactionController = _interopRequireDefault(require("../controller/transactionController"));

var _authenticate = _interopRequireDefault(require("../middleware/authenticate"));

var _userValidations = _interopRequireDefault(require("../middleware/userValidations"));

var _accountValidations = _interopRequireDefault(require("../middleware/accountValidations"));

var _transactionValidation = _interopRequireDefault(require("../middleware/transactionValidation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // router.get('/users', user.list);


router.post('/auth/signup', _userValidations["default"].validateSignup, _userController["default"].signup);
router.post('/auth/signin', _userValidations["default"].validateSignin, _userController["default"].signin);
router.post('/accounts', _authenticate["default"], _accountValidations["default"].validateCreate, _accountController["default"].createAccount);
router.patch('/account/:accountNumber', _authenticate["default"], _accountValidations["default"].validateStatusChange, _accountController["default"].updateAccountStatus);
router["delete"]('/accounts/:accountNumber', _authenticate["default"], _accountController["default"].deleteAccount);
router.post('/transactions/:accountNumber/credit', _authenticate["default"], _transactionValidation["default"].validateAmount, _transactionController["default"].creditAccount);
router.post('/transactions/:accountNumber/debit', _authenticate["default"], _transactionValidation["default"].validateAmount, _transactionController["default"].debitAccount);
var _default = router;
exports["default"] = _default;