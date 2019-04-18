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
 * @class TransactionValidate
 */
var TransactionValidate =
/*#__PURE__*/
function () {
  function TransactionValidate() {
    _classCallCheck(this, TransactionValidate);
  }

  _createClass(TransactionValidate, null, [{
    key: "validateAmount",
    value: function validateAmount(request, response, next) {
      var amount = request.body.amount;

      if (amount === undefined || amount === '' || amount === null) {
        return response.status(400).json({
          status: _statusCodes["default"].badRequest,
          error: 'No amount entered'
        });
      }

      if (amount === 0 || amount < 0) {
        return response.status(400).json({
          status: _statusCodes["default"].badRequest,
          error: 'Amount is too low'
        });
      }

      next();
    }
  }]);

  return TransactionValidate;
}();

var _default = TransactionValidate;
exports["default"] = _default;