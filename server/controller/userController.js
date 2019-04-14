import uuid from 'uuid';
import dummyData from '../model/dummyData.js';
import Utils from '../helpers/commons.js';


const UserController = {

    /**
     * List all Users | client, staff
     * @param {object} req express request object 
     * @param {object} res express respond object
     * 
     * @returns {json} json
     * @memberof UserController
     */

  list(req, res) {
    res.status(200).send(dummyData.users);
  },

      /**
     * Create new User | client, staff
     * @param {object} req express request object 
     * @param {object} res express respond object
     * 
     * @returns {json} json
     * @memberof UserController
     */

  signup (req, res) {
    const { firstName, lastName, email, password, confirmPassword, } = req.body;

    if (!firstName) {
      return res.status(400).json({
        status: 400,
        error: 'First name is required',
      });
    }

    if (!lastName) {
      return res.status(400).json({
        status: 400,
        error: 'Last name is required',
      });
    }

    if (!email) {
      return res.status(400).json({
        status: 400,
        error: 'Email is required',
      });
    }

    if (email) {
        const isValid = Utils.emailValidator(email);
        if(!isValid) {
            return res.status (400).json({
                status: 400,
                error: 'Email is invalid',
            });
        }
    }

    if (!password) {
      return res.status(400).json({
        status: 400,
        error: 'Password is required',
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        status: 400,
        error: 'Passwords do not match',
      });
    }
    
    const newUser = {
        id: uuid.v4(),
        firstName,
        lastName,
        email,
        password: Utils.hashPassword(password),
        type: 'User', // client or staff
        isAdmin: false,
      };

    dummyData.users.push(newUser);

    const token = Utils.jwtSigner(newUser);

    res.status(201).json({
      status: 201,
      data: {
        token,
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
    });
  },
  
      /**
     * Sign in as user
     * @param {object} req express request object 
     * @param {object} res express respond object
     * 
     * @returns {json} json
     * @memberof UserController
     */

     signin (req, res) {
        const {email, password} = req.body;
            
        if (!email) {
            return res.status(400).json({
            status: 400,
            error: 'Email is required',
            });
        }  
        if (!password) {
            return res.status(400).json({
            status: 400,
            error: 'Password is required',
            });
        }    
        const userData = {
            email,
            password,
          };

        const existingUser = Utils.searchByEmail(email, dummyData.users);
          if (!existingUser) {
            return res.status(400).json({
              status: 400,
              error: 'Invalid login details, email or password is wrong',
            });
          }

          if (existingUser) {
            if (Utils.validatePassword(userData.password, existingUser.password)) {
              const token = Utils.jwtSigner(existingUser);
              return res.status(200).json({
                status: 200,
                data: {
                  token,
                  id: existingUser.id,
                  firstName: existingUser.firstName,
                  lastName: existingUser.lastName,
                  email: existingUser.email,
                },
              });
            }
          }
          return res.status(400).json({
            status: 400,
            error: 'Invalid login details, email or password is wrong',
          });
     },
};

export default UserController;