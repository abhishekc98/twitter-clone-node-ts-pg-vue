import {check} from 'express-validator';

const validationRegisterUser = [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
];

export default validationRegisterUser;