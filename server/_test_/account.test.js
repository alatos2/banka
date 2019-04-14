import request from 'supertest';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import chai, { expect } from 'chai';
import app from '../../app';

const secret = 'scandali';
chai.use(chaiHttp);

const API_VERSION = '/api/v1';

const testUser = {
    firstName: 'Tosin',
    lastName: 'Alabi',
    email: 'alabitosin59@hotmail.com',
    password: 'password',
    confirmPassword: 'password',
};

const accountType = {
    type: 'savings'
};

const token = jwt.sign(testUser, secret, {expiresIn: '24h'});


describe('Testing Account Controller', () => {

    //sign up users

  before('Before any operation on account user must signup', (done) => {
    request(app)
        .post(`${API_VERSION}/auth/signup`)
        .send(testUser)
        .end((err, res) => {
            if (err) throw err;
            else {
                expect(res.body.status).to.equal(201);
                done();
            }
        });
  });

  it('should not allow unregistered or unauthenticated users to create account', (done) => {
    request(app)
      .post('/api/v1/accounts')
      .send({})
      .end((err, res) => {
        if (err) throw err;
        else {
          expect(res.headers.authorization).to.be.undefined;
        }

        done();
      });
  });

  it('should not create account when authorization token is invalid', (done) => {
    chai.request(app)
        .post('/api/v1/accounts')
        .set('Authorization', '555555')
        .send(accountType)
        .end((error, response) => {
          expect(response).to.have.status(401);
          expect(response.body.status).to.equal(401);
          expect(response.body.error).to.equal('Invalid token!');
          done();
        });
    });

  it('should create a new account when all the parameters are given', (done) => {
    request(app)
      .post('/api/v1/accounts')
      .set('Authorization', token)
      .send({accountType})
      .expect(201)
      .end((err, res) => {
        if (err) throw err;
        else {
            expect(res.body).to.be.an('object');
            // expect(res).to.have.status(201);
            // expect(res.body.status).to.equal(201);
            expect(res.body.data).to.be.a('object');
            expect(res.body.data).to.have.property('accountNumber');
            expect(res.body.data).to.have.property('firstName');
            expect(res.body.data).to.have.property('lastName');
            expect(res.body.data).to.have.property('email');
            expect(res.body.data).to.have.property('type');
            expect(res.body.data).to.have.property('openingBalance');
        }
        done();
      });
  });

  it('should not create an account when the account type is missing', (done) => {
    request(app)
      .post('/api/v1/accounts')
      .set('Authorization', token)
      .send({ type: ''})
      .end((err, res) => {
        if (err) throw err;
        else {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equal(400);
            expect(res.body.error).to.be.a('string');
            expect(res.body.error).to.equal('No account type selected');
        }
        done();
      });
  });

  it('should not create an account when the account type is not savings or current', (done) => {
    request(app)
      .post('/api/v1/accounts')
      .set('Authorization', token)
      .send({type: 'strange'})
      .end((err, res) => {
        if (err) throw err;
        else {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equal(400);
            expect(res.body.error).to.be.a('string');
            expect(res.body.error).to.equal('Account Type must be either savings or current');
        }
        done();
      });
  });

  // Test the PATCH /accounts/:accountNumber endpoint

  it('Change of status by activating or deactivating the accounts of account holders', (done) => {
    request(app)
      .patch('/api/v1/account/222021882')
      .set('Authorization', token)
      .send({status: 'activate'})
      .end((err, res) => {
        if (err) throw err;
        else {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equal(200);
            expect(res.body.data).to.have.property('accountNumber');
            expect(res.body.data.accountNumber).to.equal(222021882);
            expect(res.body.data.status).to.equal('activate');
        }
        done();
      });
  });
  
  it('should deactivate a user bank account', (done) => {
    request(app)
      .patch('/api/v1/account/222021882')
      .set('Authorization', token)
      .send({status: 'deactivate'})
      .end((err, res) => {
        if (err) throw err;
        else {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equal(200);
            expect(res.body.data).to.have.property('accountNumber');
            expect(res.body.data.accountNumber).to.equal(222021882);
            expect(res.body.data.status).to.equal('deactivate');
        }
        done();
      });
  });
   
  it('should not change status when account number is wrong', (done) => {
    request(app)
      .patch('/api/v1/account/222021882123')
      .set('Authorization', token)
      .send({accountNumber: 222021882123, status: 'activate'})
      .end((err, res) => {
        if (err) throw err;
        else {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equal(400);
            expect(res.body.error).to.be.a('string');
            expect(res.body.error).to.equal('Account number does not exists');
        }
        done();
      });
  });
    
  it('should have account status deactivated or activated not otherwise', (done) => {
    request(app)
      .patch('/api/v1/account/222021882')
      .set('Authorization', token)
      .send({status: 'validate'})
      .end((err, res) => {
        if (err) throw err;
        else {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equal(400);
            expect(res.body.error).to.be.a('string');
            expect(res.body.error).to.equal('Wrong status selected');
        }
        done();
      });
  });
      
  it('should not have an empty status selected', (done) => {
    request(app)
      .patch('/api/v1/account/222021882')
      .set('Authorization', token)
      .send({status: ''})
      .end((err, res) => {
        if (err) throw err;
        else {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equal(400);
            expect(res.body.error).to.be.a('string');
            expect(res.body.error).to.equal('Status not selected');
        }
        done();
      });
  });

  // Test the DELETE /accounts/:accountNumber endpoint

        
  it('Delete account of an account holder', (done) => {
    request(app)
      .delete('/api/v1/accounts/222021882')
      .set('Authorization', token)
      .send()
      .end((err, res) => {
        if (err) throw err;
        else {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equal(200);
            expect(res.body).to.have.property('message');
        }
        done();
      });
    });
          
  it('should not delete account when account number is wrong or does not exist', (done) => {
    request(app)
      .delete('/api/v1/accounts/222021882')
      .set('Authorization', token)
      .send()
      .end((err, res) => {
        if (err) throw err;
        else {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equal(400);  
            expect(res.body.error).to.be.a('string');
            expect(res.body.error).to.equal('Account number does not exists');
        }
        done();
      });
    });
});
