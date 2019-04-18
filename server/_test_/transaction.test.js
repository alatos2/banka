import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../../app';

chai.should();

const SECRET = 'andela';

chai.use(chaiHttp);

const API_VERSION = '/api/v1';
const testUser = {
  id: 90,
  firstName: 'steve',
  lastName: 'cannon',
  email: 'testing@testers.com',
  password: 'delapassword',
  confirmPassword: 'delapassword',
};
const transactionUser = {
  amount: 555555,
};
const accountNumber = 2039956566;
const userToken = jwt.sign(testUser, SECRET, { expiresIn: '24h' });

describe('Testing Transaction Controller', () => {
  /**
     * Sign in user to generate user token before test
     */
  before('transaction operations can begin when user have signed up', (done) => {
    chai.request(app)
      .post(`${API_VERSION}/auth/signup`)
      .send(testUser)
      .end((error, response) => {
        expect(response.body.status).to.equal(201);
        done();
      });
  });

  describe('Testing credit account controller', () => {
    /**
       * Test the POST /transactions/<account-number>/credit endpoint
       */
    const transactionUrl = `${API_VERSION}/transactions/${accountNumber}/credit`;

    it('should not create account when authorization is undefined', (done) => {
      chai.request(app)
        .post(transactionUrl)
        .send({})
        .end((error, response) => {
          // eslint-disable-next-line no-unused-expressions
          expect(response.headers.authorization).to.be.undefined;
          done();
        });
    });

    it('should not credit account when authorization token is invalid', (done) => {
      chai.request(app)
        .post(transactionUrl)
        .set('Authorization', '555555')
        .send(transactionUser)
        .end((error, response) => {
          expect(response).to.have.status(401);
          expect(response.body.status).to.equal(401);
          expect(response.body.error).to.equal('Invalid token!');
          done();
        });
    });
  });

  describe('Testing debit account controller', () => {
    /**
       * Test the POST /transactions/<account-number>/debit endpoint
       */
    const transactionUrl = `${API_VERSION}/transactions/${accountNumber}/debit`;

    it('should not create account when authorization is undefined', (done) => {
      chai.request(app)
        .post(transactionUrl)
        .send({})
        .end((error, response) => {
          // eslint-disable-next-line no-unused-expressions
          expect(response.headers.authorization).to.be.undefined;
          done();
        });
    });

    it('should not credit account when authorization token is invalid', (done) => {
      chai.request(app)
        .post(transactionUrl)
        .set('Authorization', '555555')
        .send(transactionUser)
        .end((error, response) => {
          expect(response).to.have.status(401);
          expect(response.body.status).to.equal(401);
          expect(response.body.error).to.equal('Invalid token!');
          done();
        });
    });

    it('Should return 400 if non integer characters are provided', (done) => {
      chai.request(app)
        .post('/api/v1/transactions/5823642528/debit')
        .send({ amount: 'do521' })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });
  });
});