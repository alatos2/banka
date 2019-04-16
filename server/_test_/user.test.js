import request from 'supertest';
import { expect } from 'chai';
import moment from 'moment';
import uuid from 'uuid';
import app from '../../app';


describe('Testing User Controller', () => {
  // before((done) => {
  //   TestTables.createTables();

  //   done();
  // });

  it('should not register when email is missing', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'mike',
        lastName: 'umanah',
        password: 'password',
        confirmPassword: 'password',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        else {
          const responseData = JSON.parse(res.text);
          expect(responseData).to.be.an('object');
        }
        done();
      });
  });

  it('should not register a user when the first name is missing', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        lastName: 'umanah',
        password: 'password',
        email: 'test@test.com',
        confirmPassword: 'password',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        else {
          const responseData = JSON.parse(res.text);
          expect(responseData).to.be.an('object');
        }
        done();
      });
  });

  it('should not register a user when the last name is missing', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'umanah',
        password: 'password',
        email: 'test@test.com',
        confirmPassword: 'password',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        else {
          const responseData = JSON.parse(res.text);
          expect(responseData).to.be.an('object');
        }
        done();
      });
  });

  it('should not register a user when the password is missing', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'umanah',
        lastName: 'nebucad',
        email: 'test@test.com',
        confirmPassword: 'password',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        else {
          const responseData = JSON.parse(res.text);
          expect(responseData).to.be.an('object');
        }
        done();
      });
  });

  it('should not register a user when the passwords do not match', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'umanah',
        lastName: 'nebucad',
        email: 'test@test.com',
        password: 'passworded',
        confirmPassword: 'password',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        else {
          const responseData = JSON.parse(res.text);
          expect(responseData).to.be.an('object');
        }
        done();
      });
  });
  
  it('should not sign in a user when the email is not supplied', (done) => {
    request(app)
      .post('/api/v1/auth/signin')
      .send({
        password: 'passworded',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        else {
          const responseData = JSON.parse(res.text);
          expect(responseData).to.be.an('object');
        }
        done();
      });
  });
   
  it('should not sign in a user when the password is not supplied', (done) => {
    request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'test@test.com',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        else {
          const responseData = JSON.parse(res.text);
          expect(responseData).to.be.an('object');
        }
        done();
      });
  });
    
  it('should not sign in a user when the email is invalid', (done) => {
    request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'test@testcom',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        else {
          const responseData = JSON.parse(res.text);
          expect(responseData).to.be.an('object');
        }
        done();
      });
  });
      
  it('should not sign in a user when the password is incorrect', (done) => {
    request(app)
      .post('/api/v1/auth/signin')
      .send({
        password: 'password123',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        else {
          const responseData = JSON.parse(res.text);
          expect(responseData).to.be.an('object');
        }
        done();
      });
  });
        
  it('should sign in a user when the email and password are correct', (done) => {
    request(app)
      .post('/api/v1/auth/signin')
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
});
