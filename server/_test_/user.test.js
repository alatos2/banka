import chaiHttp from 'chai-http';
import request from 'supertest';
import chai, { expect } from 'chai';
import app from '../../app';

chai.use(chaiHttp);
const API_VERSION = '/api/v1';
const testUser = {
  id: 4,
  firstName: 'tosin',
  lastName: 'alabi',
  email: 'tosin@tosin.com',
  password: 'password',
  confirmPassword: 'password',
  type: 'user',
  isAdmin: false,
};

describe('Testing User Controller', () => {
  describe('Testing signup controller', () => {
    /**
       * Test the POST /auth/signup endpoint
       */
    const signupUrl = `${API_VERSION}/auth/signup`;

    it('should not register a user when the email is missing', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          firstName: 'tosin',
          lastName: 'alabi',
          password: 'password',
          confirmPassword: 'password',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Email is required');
          done();
        });
    });

    it('should not register a user when the first name is missing', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          lastName: 'alabi ',
          username: 'tosin',
          email: 'tosin@tosin.com',
          password: 'password',
          confirmPassword: 'password',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          done();
        });
    });


    it('should not register a user when the last name is missing', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          firstName: 'dele',
          password: 'password',
          confirmPassword: 'password',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Last name is required');
          done();
        });
    });

    it('should not register a user when the password is missing', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          email: 'test@test.com',
          firstName: 'dele',
          lastName: 'bella',
          username: 'password',
          confirmPassword: 'password',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          // expect(response.body.error).to.equal('Password is required');
          done();
        });
    });

    it('should not register a user when the passwords do not match', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          email: 'test@test.com',
          firstName: 'dele',
          lastName: 'bella',
          password: 'password',
          confirmPassword: 'cc',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          done();
        });
    });

    it('should not register a user when the email already exists', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          firstName: 'dele',
          lastName: 'bella',
          email: 'test@test.com',
          password: 'password',
          confirmPassword: 'password',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          done();
        });
    });

    it('should not register a user when the email is not valid', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          firstName: 'dele',
          lastName: 'bella',
          email: 'testtest.com',
          password: 'password',
          confirmPassword: 'password',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Invalid email address');
          done();
        });
    });
  });

  describe('Testing signin controller', () => {
    /**
       * Test the POST /auth/signin endpoint
       */
    const signinUrl = `${API_VERSION}/auth/signin`;

      it('should sign in a user when the email and password are correct', (done) => {
        request(app)
          .post(signinUrl)
          .send({
            email: 'anu@hotmail.com',
            password: 'password',
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            if (err) throw err;
            else {
              const responseData = JSON.parse(res.text);
              expect(responseData).to.be.an('object');
            }
            done();
          });
      });

    it('should not login a user when the email is missing', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send({
          password: 'password',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Email is required');
          done();
        });
    });

    it('should not login a user when the password is missing', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send({
          email: 'dele@gmail.com',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Password is required');
          done();
        });
    });


    it('should not login a user when the email does not exist', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send({
          email: 'wrongemail@gmail.com',
          password: 'password',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Invalid login details, email or password is wrong');
          done();
        });
    });

    it('should not login a user when the password is wrong', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send({
          email: 'mike@gmail.com',
          password: 'wrong password',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Invalid login details, email or password is wrong');
          done();
        });
    });
  });
});