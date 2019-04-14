import express from 'express';
import user from '../controller/userController';
import account from '../controller/accountController';
import transaction from '../controller/transactionController';

const router = express.Router();

router.get('/users', user.list);
router.post('/auth/signup', user.signup);
router.post('/auth/signin', user.signin);

router.post('/accounts', account.createAccount);
router.patch('/account/:accountNumber', account.updateAccountStatus);
router.delete('/accounts/:accountNumber', account.deleteAccount);

router.post('/transactions/:accountNumber/credit', transaction.creditAccount);
router.post('/transactions/:accountNumber/debit', transaction.debitAccount);

export default router;
