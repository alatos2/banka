"use strict";

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _supertest = _interopRequireDefault(require("supertest"));

var _chai = _interopRequireWildcard(require("chai"));

var _app = _interopRequireDefault(require("../../app"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_chai["default"].use(_chaiHttp["default"]);

var API_VERSION = '/api/v1';
var testUser = {
  id: 4,
  firstName: 'tosin',
  lastName: 'alabi',
  email: 'tosin@tosin.com',
  password: 'password',
  confirmPassword: 'password',
  type: 'user',
  isAdmin: false
};
describe('Testing User Controller', function () {
  describe('Testing signup controller', function () {
    /**
       * Test the POST /auth/signup endpoint
       */
    var signupUrl = "".concat(API_VERSION, "/auth/signup");
    it('should not register a user when the email is missing', function (done) {
      _chai["default"].request(_app["default"]).post(signupUrl).send({
        firstName: 'tosin',
        lastName: 'alabi',
        password: 'password',
        confirmPassword: 'password'
      }).end(function (error, response) {
        (0, _chai.expect)(response.body).to.be.an('object');
        (0, _chai.expect)(response.body.status).to.equal(400);
        (0, _chai.expect)(response.body.error).to.be.a('string');
        (0, _chai.expect)(response.body.error).to.equal('Email is required');
        done();
      });
    });
    it('should not register a user when the first name is missing', function (done) {
      _chai["default"].request(_app["default"]).post(signupUrl).send({
        lastName: 'alabi ',
        username: 'tosin',
        email: 'tosin@tosin.com',
        password: 'password',
        confirmPassword: 'password'
      }).end(function (error, response) {
        (0, _chai.expect)(response.body).to.be.an('object');
        (0, _chai.expect)(response.body.status).to.equal(400);
        (0, _chai.expect)(response.body.error).to.be.a('string');
        done();
      });
    });
    it('should not register a user when the last name is missing', function (done) {
      _chai["default"].request(_app["default"]).post(signupUrl).send({
        firstName: 'dele',
        password: 'password',
        confirmPassword: 'password'
      }).end(function (error, response) {
        (0, _chai.expect)(response.body).to.be.an('object');
        (0, _chai.expect)(response.body.status).to.equal(400);
        (0, _chai.expect)(response.body.error).to.be.a('string');
        (0, _chai.expect)(response.body.error).to.equal('Last name is required');
        done();
      });
    });
    it('should not register a user when the password is missing', function (done) {
      _chai["default"].request(_app["default"]).post(signupUrl).send({
        email: 'test@test.com',
        firstName: 'dele',
        lastName: 'bella',
        username: 'password',
        confirmPassword: 'password'
      }).end(function (error, response) {
        (0, _chai.expect)(response.body).to.be.an('object');
        (0, _chai.expect)(response.body.status).to.equal(400);
        (0, _chai.expect)(response.body.error).to.be.a('string'); // expect(response.body.error).to.equal('Password is required');

        done();
      });
    });
    it('should not register a user when the passwords do not match', function (done) {
      _chai["default"].request(_app["default"]).post(signupUrl).send({
        email: 'test@test.com',
        firstName: 'dele',
        lastName: 'bella',
        password: 'password',
        confirmPassword: 'cc'
      }).end(function (error, response) {
        (0, _chai.expect)(response.body).to.be.an('object');
        (0, _chai.expect)(response.body.status).to.equal(400);
        (0, _chai.expect)(response.body.error).to.be.a('string');
        done();
      });
    });
    it('should not register a user when the email already exists', function (done) {
      _chai["default"].request(_app["default"]).post(signupUrl).send({
        firstName: 'dele',
        lastName: 'bella',
        email: 'test@test.com',
        password: 'password',
        confirmPassword: 'password'
      }).end(function (error, response) {
        (0, _chai.expect)(response.body).to.be.an('object');
        (0, _chai.expect)(response.body.status).to.equal(400);
        (0, _chai.expect)(response.body.error).to.be.a('string');
        done();
      });
    });
    it('should not register a user when the email is not valid', function (done) {
      _chai["default"].request(_app["default"]).post(signupUrl).send({
        firstName: 'dele',
        lastName: 'bella',
        email: 'testtest.com',
        password: 'password',
        confirmPassword: 'password'
      }).end(function (error, response) {
        (0, _chai.expect)(response.body).to.be.an('object');
        (0, _chai.expect)(response.body.status).to.equal(400);
        (0, _chai.expect)(response.body.error).to.be.a('string');
        (0, _chai.expect)(response.body.error).to.equal('Invalid email address');
        done();
      });
    });
  });
  describe('Testing signin controller', function () {
    /**
       * Test the POST /auth/signin endpoint
       */
    var signinUrl = "".concat(API_VERSION, "/auth/signin");
    it('should sign in a user when the email and password are correct', function (done) {
      (0, _supertest["default"])(_app["default"]).post(signinUrl).send({
        email: 'anu@hotmail.com',
        password: 'password'
      }).set('Accept', 'application/json').expect('Content-Type', /json/).expect(200).end(function (err, res) {
        if (err) throw err;else {
          var responseData = JSON.parse(res.text);
          (0, _chai.expect)(responseData).to.be.an('object');
        }
        done();
      });
    });
    it('should not login a user when the email is missing', function (done) {
      _chai["default"].request(_app["default"]).post(signinUrl).send({
        password: 'password'
      }).end(function (error, response) {
        (0, _chai.expect)(response.body).to.be.an('object');
        (0, _chai.expect)(response.body.status).to.equal(400);
        (0, _chai.expect)(response.body.error).to.be.a('string');
        (0, _chai.expect)(response.body.error).to.equal('Email is required');
        done();
      });
    });
    it('should not login a user when the password is missing', function (done) {
      _chai["default"].request(_app["default"]).post(signinUrl).send({
        email: 'dele@gmail.com'
      }).end(function (error, response) {
        (0, _chai.expect)(response.body).to.be.an('object');
        (0, _chai.expect)(response.body.status).to.equal(400);
        (0, _chai.expect)(response.body.error).to.be.a('string');
        (0, _chai.expect)(response.body.error).to.equal('Password is required');
        done();
      });
    });
    it('should not login a user when the email does not exist', function (done) {
      _chai["default"].request(_app["default"]).post(signinUrl).send({
        email: 'wrongemail@gmail.com',
        password: 'password'
      }).end(function (error, response) {
        (0, _chai.expect)(response.body).to.be.an('object');
        (0, _chai.expect)(response.body.status).to.equal(400);
        (0, _chai.expect)(response.body.error).to.be.a('string');
        (0, _chai.expect)(response.body.error).to.equal('Invalid login details, email or password is wrong');
        done();
      });
    });
    it('should not login a user when the password is wrong', function (done) {
      _chai["default"].request(_app["default"]).post(signinUrl).send({
        email: 'mike@gmail.com',
        password: 'wrong password'
      }).end(function (error, response) {
        (0, _chai.expect)(response.body).to.be.an('object');
        (0, _chai.expect)(response.body.status).to.equal(400);
        (0, _chai.expect)(response.body.error).to.be.a('string');
        (0, _chai.expect)(response.body.error).to.equal('Invalid login details, email or password is wrong');
        done();
      });
    });
  });
});