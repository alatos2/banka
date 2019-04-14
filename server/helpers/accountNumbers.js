/**
 * @class AccountNumber
 * @description contains function to generate account number
 * @export accountNumber
 */

class AccountNumber {
  /**
       * @method generateAccountNo
       * @desc generate a pseudo account number
       * @returns the generated account number
       */
  
  // eslint-disable-next-line class-methods-use-this
  generateAccountNo() {
    // eslint-disable-next-line no-undef
    let accountNoString = '';
  
    // eslint-disable-next-line no-undef
    while (accountNoString.length < 10) {
      // eslint-disable-next-line no-undef
      accountNoString += Math.floor(Math.random() * 10);
    }
  
    // eslint-disable-next-line no-undef
    return parseInt(accountNoString, 10);
  }
}
  
const accountNumber = new AccountNumber();
  
export default accountNumber;