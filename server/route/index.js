import express from 'express';
import user from '../controller/userController';
import account from '../controller/accountController';
import transaction from '../controller/transactionController';
import authentication from '../middleware/authenticate';
import userValidate from '../middleware/userValidations';
import accountValidate from '../middleware/accountValidations';
import transactionValidate from  '../middleware/transactionValidation';

const router = express.Router();

// router.get('/users', user.list);
router.post('/auth/signup', userValidate.validateSignup, user.signup);
router.post('/auth/signin', userValidate.validateSignin, user.signin);

router.post('/accounts', authentication, accountValidate.validateCreate, account.createAccount);
router.patch('/account/:accountNumber', authentication, accountValidate.validateStatusChange, account.updateAccountStatus);
router.delete('/accounts/:accountNumber', authentication, account.deleteAccount);

router.post('/transactions/:accountNumber/credit', authentication, transactionValidate.validateAmount, transaction.creditAccount);
router.post('/transactions/:accountNumber/debit', authentication, transactionValidate.validateAmount, transaction.debitAccount);

export default router;
