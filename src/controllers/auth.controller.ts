import express, { Router, Request, Response, NextFunction } from 'express';
import { Result, ValidationError, validationResult, check} from 'express-validator'
import jwt from 'jsonwebtoken';
import { validateHash } from '../utils/hash';
import validationLoginUser from '../middlewares/validations/validationLoginUser';
import auth from '../middlewares/auth'
import User from '../models/users.model';

const authRouter: Router = express.Router();

/**
 * @route  GET api/<api-version>/auth
 * @desc   Auth route - get authenticated user
 * @access private 
 */
authRouter.get('/', auth,  async (req: Request, res: Response) => {
    try {
      const currentUser = await User.query().findById((<any>req).user.id);
      res.json(currentUser);
    } catch (error: any) {
      console.error(error.message);
      res.status(501).json({ msg: 'Server error while authenticating user, please try after sometime' });
    }
});

/**
 * @route  POST api/<api-version>/auth
 * @desc   Login user - check password and get token
 * @access public 
 */
authRouter.post('/', validationLoginUser,
async (req: Request, res: Response) => {

    const validationErrors: Result<ValidationError> = validationResult(req);
    if(!validationErrors.isEmpty()) {
        return res.status(400).json({errors: validationErrors.array()})
    } 
    try {
        const {email, password} = req.body;
        const user: User | undefined = await User.query().findOne({email});
        if(!user) { // qs status
            return res.status(404).json({error: [{msg: 'Invalid credentials'}]});
        }
        const isPasswordCorrect = await validateHash(password, user.password);
        if(!isPasswordCorrect) {
            return res.status(400).json({error: [{msg: 'Invalid credentials'}]});
        }

        // create a token and send to response for login
        const payload: object = { user: { id : user.user_id} };
        const secretKey: jwt.Secret = process.env.jwtSecretKey || "undefinedKey";
        const expiresIn: jwt.SignOptions = { expiresIn: 36000 }
        console.log("authController", secretKey)

        jwt.sign(payload, secretKey, expiresIn, (error, token) => {
            if(error) throw error;
            res.json(token);
        }); 

    } catch (error: any) {
        console.error(error.message);
        res.status(500).json('Internal server error while logging in');
    }

})
  
export default authRouter;
