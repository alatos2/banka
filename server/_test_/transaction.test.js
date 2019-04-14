import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.should();

chai.use(chaiHttp);

const apiEndPoint = '/api/v1/';
const userEndPoint = `${apiEndPoint}auth/`;
const randomToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RuYW1lIjoiQ2h1a3d1ZGkiLCJsYXN0bmFtZSI6Ik5nd29iaWEiLCJvdGhlcm5hbWUiOiJNaWtlIiwiZW1haWwiOiJuZ3dvYmlhY2h1a3d1ZGlAZ21haWwuY29tIiwicGhvbmVOdW1iZXIiOiIwNzA2MDg1NDc3MyIsInBhc3Nwb3J0VXJsIjoiaHR0cHM6Ly9nbWFpbC5jb20vcGFzc3BvcnQiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1NTExNzYzMzYsImV4cCI6MTU1MTE3OTkzNn0.ewoovxp-otFQ58E2Ez7wWTfGyFwoeJX7CY_nBL6r06c';

describe('Transaction Tests', () => {
  describe(`POST ${apiEndPoint}transactions/:accountNumber/credit`, () => {
    it('Should credit an account successfully', (done) => {
      const login = {
        email: 'lampard@gmail.com',
        password: 'password',
      };

      chai.request(app)
        .post(`${userEndPoint}signin`)
        .send(login)
        .end((loginErr, loginRes) => {
          //const token = `Bearer ${loginRes.body.data.token}`;

          chai.request(app)
            .post(`${apiEndPoint}transactions/5823642528/credit`)
            .set('Authorization', randomToken)
            .send({ amount: 20000000 })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('data');
              res.body.data.should.be.a('object');
              res.body.data.should.have.property('transactionId');
              res.body.data.should.have.property('cashier');
              res.body.data.should.have.property('transactionType');
              res.body.data.should.have.property('accountBalance');
              done();
            });
        });
    });

    it('Should return a 404 error if account number does not exist', (done) => {
      const login = {
        email: 'lampard@gmail.com',
        password: 'password',
      };

      chai.request(app)
        .post(`${userEndPoint}signin`)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data.token}`;

          chai.request(app)
            .post(`${apiEndPoint}transactions/5258525852/credit`)
            .set('Authorization', token)
            .send({ amount: 2000 })
            .end((err, res) => {
              res.should.have.status(404);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              done();
            });
        });
    });

    it('Should return 400 if amount isn\'t specified', (done) => {
      chai.request(app)
        .post(`${apiEndPoint}transactions/5823642528/credit`)
        .send({})
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });

    it('Should return 400 if non integer characters are provided', (done) => {
      chai.request(app)
        .post(`${apiEndPoint}transactions/5823642528/credit`)
        .send({ amount: 'do521' })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });
  });

  
  describe(`POST ${apiEndPoint}transactions/:accountNumber/debit`, () => {
    it('Should debit an account successfully', (done) => {
      const login = {
        email: 'lampard@gmail.com',
        password: 'password',
      };

      chai.request(app)
        .post(`${userEndPoint}signin`)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data.token}`;

          chai.request(app)
            .post(`${apiEndPoint}transactions/5823642528/debit`)
            .set('Authorization', token)
            .send({ amount: 2000 })
            .end((err, res) => {
              res.should.have.status(201);
              res.body.should.be.a('object');
              res.body.should.have.property('data');
              res.body.data.should.be.a('object');
              res.body.data.should.have.property('transactionId');
              res.body.data.should.have.property('cashier');
              res.body.data.should.have.property('transactionType');
              res.body.data.should.have.property('accountBalance');
              done();
            });
        });
    });

    it('Should return a 404 error if account number does not exist', (done) => {
      const login = {
        email: 'lampard@gmail.com',
        password: 'password',
      };

      chai.request(app)
        .post(`${userEndPoint}signin`)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data.token}`;

          chai.request(app)
            .post(`${apiEndPoint}transactions/5258525852/debit`)
            .set('Authorization', token)
            .send({ amount: 2000 })
            .end((err, res) => {
              res.should.have.status(404);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              done();
            });
        });
    });

    it('Should return a 400 error if there isn\t sufficient funds in the account to debit', (done) => {
      const login = {
        email: 'lampard@gmail.com',
        password: 'password',
      };

      chai.request(app)
        .post(`${userEndPoint}signin`)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data.token}`;

          chai.request(app)
            .post(`${apiEndPoint}transactions/5823642528/debit`)
            .set('Authorization', token)
            .send({ amount: 200000000 })
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              done();
            });
        });
    });

    it('Should return 400 if amount isn\'t specified', (done) => {
      chai.request(app)
        .post(`${apiEndPoint}transactions/5823642528/debit`)
        .send({})
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });

    it('Should return 400 if non integer characters are provided', (done) => {
      chai.request(app)
        .post(`${apiEndPoint}transactions/5823642528/debit`)
        .send({ amount: 'do521' })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });
  });
});