import moment from 'moment';
import Utils from '../helpers/commons';

export default {
  accounts: [
    {
      id: 1,
      accountNumber: 222021882,
      createdOn: moment().format(),
      owner: 1,
      type: 'savings',
      status: 'active',
      balance: 22000.55,
    },
    {
      id: 2,
      accountNumber: 222011983,
      createdOn: moment().format(),
      owner: 3,
      type: 'current',
      status: 'dormant',
      balance: 555000.95,
    },
  ],

  users: [
    {
      id: 1,
      email: 'lampard@gmail.com',
      firstName: 'Frank',
      lastName: 'Lampard',
      password: Utils.hashPassword('password'),
      type: 'staff',
      isAdmin: true,
    },
    {
      id: 2,
      email: 'gerard@gmail.com',
      firstName: 'Michael',
      lastName: 'Owen',
      password: Utils.hashPassword('password'),
      type: 'staff',
      isAdmin: false,
    },
    {
      id: 3,
      email: 'badejo@gmail.com',
      firstName: 'Bolade',
      lastName: 'Tosin',
      password: Utils.hashPassword('password'),
      type: 'user',
      isAdmin: false,
    },
    {
      id: 4,
      email: 'anu@hotmail.com',
      firstName: 'Shola',
      lastName: 'Shobiye',
      password: Utils.hashPassword('password'),
      type: 'user',
      isAdmin: false,
    },
  ],
  transactions: [
    {
      transactionId: 1,
      accountNumber: 222010772,
      cashier: 1,
      transactionType: 'debit',
      accountBalance: '10000.00',
    },
    {
      transactionId: 2,
      accountNumber: 222010772,
      cashier: 1,
      transactionType: 'debit',
      accountBalance: '10000.00',
    },
    {
      transactionId: 3,
      accountNumber: 222010772,
      cashier: 1,
      transactionType: 'debit',
      accountBalance: '10000.00',
    },
  ],
};
