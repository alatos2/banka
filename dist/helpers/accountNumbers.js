"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @class AccountNumber
 * @description contains function to generate account number
 * @export accountNumber
 */
var AccountNumber =
/*#__PURE__*/
function () {
  function AccountNumber() {
    _classCallCheck(this, AccountNumber);
  }

  _createClass(AccountNumber, [{
    key: "generateAccountNo",

    /**
         * @method generateAccountNo
         * @desc generate a pseudo account number
         * @returns the generated account number
         */
    // eslint-disable-next-line class-methods-use-this
    value: function generateAccountNo() {
      // eslint-disable-next-line no-undef
      var accountNoString = ''; // eslint-disable-next-line no-undef

      while (accountNoString.length < 10) {
        // eslint-disable-next-line no-undef
        accountNoString += Math.floor(Math.random() * 10);
      } // eslint-disable-next-line no-undef


      return parseInt(accountNoString, 10);
    }
  }]);

  return AccountNumber;
}();

var accountNumber = new AccountNumber();
var _default = accountNumber;
exports["default"] = _default;