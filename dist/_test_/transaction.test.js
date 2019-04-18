"use strict";

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _chai = _interopRequireWildcard(require("chai"));

var _supertest = _interopRequireDefault(require("supertest"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _app = _interopRequireDefault(require("../../app"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_chai["default"].should();

var SECRET = 'andela';

_chai["default"].use(_chaiHttp["default"]);

var API_VERSION = '/api/v1';
var testUser = {
  id: 90,
  firstName: 'steve',
  lastName: 'cannon',
  email: 'testing@testers.com',
  password: 'delapassword',
  confirmPassword: 'delapassword'
};
var transactionUser = {
  amount: 555555
};
var accountNumber = 2039956566;

var userToken = _jsonwebtoken["default"].sign(testUser, SECRET, {
  expiresIn: '24h'
});

describe('Testing Transaction Controller', function () {
  /**
     * Sign in user to generate user token before test
     */
  before('transaction operations can begin when user have signed up', function (done) {
    _chai["default"].request(_app["default"]).post("".concat(API_VERSION, "/auth/signup")).send(testUser).end(function (error, response) {
      (0, _chai.expect)(response.body.status).to.equal(201);
      done();
    });
  });
  describe('Testing credit account controller', function () {
    /**
       * Test the POST /transactions/<account-number>/credit endpoint
       */
    var transactionUrl = "".concat(API_VERSION, "/transactions/").concat(accountNumber, "/credit");
    it('should not create account when authorization is undefined', function (done) {
      _chai["default"].request(_app["default"]).post(transactionUrl).send({}).end(function (error, response) {
        // eslint-disable-next-line no-unused-expressions
        (0, _chai.expect)(response.headers.authorization).to.be.undefined;
        done();
      });
    });
    it('should not credit account when authorization token is invalid', function (done) {
      _chai["default"].request(_app["default"]).post(transactionUrl).set('Authorization', '555555').send(transactionUser).end(function (error, response) {
        (0, _chai.expect)(response).to.have.status(401);
        (0, _chai.expect)(response.body.status).to.equal(401);
        (0, _chai.expect)(response.body.error).to.equal('Invalid token!');
        done();
      });
    });
  });
  describe('Testing debit account controller', function () {
    /**
       * Test the POST /transactions/<account-number>/debit endpoint
       */
    var transactionUrl = "".concat(API_VERSION, "/transactions/").concat(accountNumber, "/debit");
    it('should not create account when authorization is undefined', function (done) {
      _chai["default"].request(_app["default"]).post(transactionUrl).send({}).end(function (error, response) {
        // eslint-disable-next-line no-unused-expressions
        (0, _chai.expect)(response.headers.authorization).to.be.undefined;
        done();
      });
    });
    it('should not credit account when authorization token is invalid', function (done) {
      _chai["default"].request(_app["default"]).post(transactionUrl).set('Authorization', '555555').send(transactionUser).end(function (error, response) {
        (0, _chai.expect)(response).to.have.status(401);
        (0, _chai.expect)(response.body.status).to.equal(401);
        (0, _chai.expect)(response.body.error).to.equal('Invalid token!');
        done();
      });
    });
    it('Should return 400 if non integer characters are provided', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/transactions/5823642528/debit').send({
        amount: 'do521'
      }).end(function (err, res) {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
    });
  });
});