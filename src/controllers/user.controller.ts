import express, {Request, Response, Router} from 'express';
import validationRegisterUser from '../middlewares/validations/validationRegisterUser';
import { Result, ValidationError, validationResult, check} from 'express-validator'
import { generateHash } from '../utils/hash';
import jwt from 'jsonwebtoken';
import User from '../models/users.model';

const userRouter: Router = express.Router();

/**
 * @route  POST api/<api-version>/users
 * @desc   register user
 * @access public 
 */
userRouter.post('/', validationRegisterUser, async (req: Request, res: Response) => {
    try {
        const validationErrors: Result<ValidationError> = validationResult(req);

        if(!validationErrors.isEmpty()) {
            return res.status(400).json({errors: validationErrors.array()})
        }  

        const { name, email, password } = req.body;

        let userExistsinDB: boolean = !!(await User.query().findOne({ email }));
        if(userExistsinDB) {
            return res.status(400).json({ error: [{ msg: 'User already exists' }] });           
        }
        const hashedPassword = await generateHash(password);

        const newUser = await User.query().insert({
            name,
            email,
            password: hashedPassword
        })
        // sign json web token send as response
        const payload: object = { user: { id : newUser.user_id} };
        const secretKey: jwt.Secret = process.env.jwtSecretKey || "undefinedKey";
        console.log("userController", secretKey)
        const expiresIn: jwt.SignOptions = { expiresIn: 36000 }

        jwt.sign(payload, secretKey, expiresIn, (error, token) => {
            if(error) throw error;
            res.json(token);
        });        

    }catch(error) {
        console.error(error)
        res.status(500).send('Internal server error while registering user');
    }
})

/**
 * @route  GET api/<api-version>/users
 * @desc   get all users
 * @access public 
 */
userRouter.get('/', async (req: Request , res: Response) => {
    try {
        const users: User[] = await User.query();
        res.json(users);
    }catch(error) {
        console.error(error)
        res.status(500).send('Internal server error while fetching users');
    }

});


export default userRouter;