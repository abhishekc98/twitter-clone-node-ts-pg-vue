import { check } from "express-validator";

const validationLoginUser = [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password is required').exists()  
];

export default validationLoginUser;