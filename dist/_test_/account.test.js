"use strict";

var _supertest = _interopRequireDefault(require("supertest"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _chai = _interopRequireWildcard(require("chai"));

var _app = _interopRequireDefault(require("../../app"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var secret = 'andela';

_chai["default"].use(_chaiHttp["default"]);

var API_VERSION = '/api/v1';
var testUser = {
  firstName: 'Tosin',
  lastName: 'Alabi',
  email: 'alabitosin59@hotmail.com',
  password: 'password',
  confirmPassword: 'password'
};
var accountType = {
  type: 'savings'
};

var token = _jsonwebtoken["default"].sign(testUser, secret, {
  expiresIn: '24h'
});

describe('Testing Account Controller', function () {
  //sign up users
  before('Before any operation on account user must signup', function (done) {
    (0, _supertest["default"])(_app["default"]).post("".concat(API_VERSION, "/auth/signup")).send(testUser).end(function (err, res) {
      if (err) throw err;else {
        (0, _chai.expect)(res.body.status).to.equal(201);
        done();
      }
    });
  });
  it('should not allow unregistered or unauthenticated users to create account', function (done) {
    (0, _supertest["default"])(_app["default"]).post('/api/v1/accounts').send({}).end(function (err, res) {
      if (err) throw err;else {
        (0, _chai.expect)(res.headers.authorization).to.be.undefined;
      }
      done();
    });
  });
  it('should not create an account when the account type is missing', function (done) {
    (0, _supertest["default"])(_app["default"]).post('/api/v1/accounts').set('Authorization', token).send({}).end(function (err, res) {
      if (err) throw err;else {
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body.status).to.equal(400);
        (0, _chai.expect)(res.body.error).to.be.a('string');
        (0, _chai.expect)(res.body.error).to.equal('No account type selected');
      }
      done();
    });
  });
  it('should not create an account when the account type is not savings or current', function (done) {
    (0, _supertest["default"])(_app["default"]).post('/api/v1/accounts').set('Authorization', token).send({
      type: 'strange'
    }).end(function (err, res) {
      if (err) throw err;else {
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body.status).to.equal(400);
        (0, _chai.expect)(res.body.error).to.be.a('string');
        (0, _chai.expect)(res.body.error).to.equal('Account Type must be either savings or current');
      }
      done();
    });
  }); // Test the PATCH /accounts/:accountNumber endpoint

  it('Change of status by activating or deactivating the accounts of account holders', function (done) {
    (0, _supertest["default"])(_app["default"]).patch('/api/v1/account/222021882').set('Authorization', token).send({
      status: 'activate'
    }).end(function (err, res) {
      if (err) throw err;else {
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body.status).to.equal(200);
        (0, _chai.expect)(res.body.data).to.have.property('accountNumber');
        (0, _chai.expect)(res.body.data.accountNumber).to.equal(222021882);
        (0, _chai.expect)(res.body.data.status).to.equal('activate');
      }
      done();
    });
  });
  it('should deactivate a user bank account', function (done) {
    (0, _supertest["default"])(_app["default"]).patch('/api/v1/account/222021882').set('Authorization', token).send({
      status: 'deactivate'
    }).end(function (err, res) {
      if (err) throw err;else {
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body.status).to.equal(200);
        (0, _chai.expect)(res.body.data).to.have.property('accountNumber');
        (0, _chai.expect)(res.body.data.accountNumber).to.equal(222021882);
        (0, _chai.expect)(res.body.data.status).to.equal('deactivate');
      }
      done();
    });
  });
  it('should not change status when account number is wrong', function (done) {
    (0, _supertest["default"])(_app["default"]).patch('/api/v1/account/222021882123').set('Authorization', token).send({
      accountNumber: 222021882123,
      status: 'activate'
    }).end(function (err, res) {
      if (err) throw err;else {
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body.status).to.equal(400);
        (0, _chai.expect)(res.body.error).to.be.a('string');
        (0, _chai.expect)(res.body.error).to.equal('Account number does not exists');
      }
      done();
    });
  });
  it('should have account status deactivated or activated not otherwise', function (done) {
    (0, _supertest["default"])(_app["default"]).patch('/api/v1/account/222021882').set('Authorization', token).send({
      status: 'validate'
    }).end(function (err, res) {
      if (err) throw err;else {
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body.status).to.equal(400);
        (0, _chai.expect)(res.body.error).to.be.a('string');
        (0, _chai.expect)(res.body.error).to.equal('Wrong status selected');
      }
      done();
    });
  });
  it('should not have an empty status selected', function (done) {
    (0, _supertest["default"])(_app["default"]).patch('/api/v1/account/222021882').set('Authorization', token).send({
      status: ''
    }).end(function (err, res) {
      if (err) throw err;else {
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body.status).to.equal(400);
        (0, _chai.expect)(res.body.error).to.be.a('string');
        (0, _chai.expect)(res.body.error).to.equal('Status not selected');
      }
      done();
    });
  }); // Test the DELETE /accounts/:accountNumber endpoint

  it('Delete account of an account holder', function (done) {
    (0, _supertest["default"])(_app["default"])["delete"]('/api/v1/accounts/222021882').set('Authorization', token).send().end(function (err, res) {
      if (err) throw err;else {
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body.status).to.equal(200);
        (0, _chai.expect)(res.body).to.have.property('message');
      }
      done();
    });
  });
  it('should not delete account when account number is wrong or does not exist', function (done) {
    (0, _supertest["default"])(_app["default"])["delete"]('/api/v1/accounts/222021882').set('Authorization', token).send().end(function (err, res) {
      if (err) throw err;else {
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body.status).to.equal(400);
        (0, _chai.expect)(res.body.error).to.be.a('string');
        (0, _chai.expect)(res.body.error).to.equal('Account number does not exists');
      }
      done();
    });
  });
});