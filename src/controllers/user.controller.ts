import express, {Request, Response, Router} from 'express';
import validationRegisterUser from '../middlewares/validations/validationRegisterUser';
import { Result, ValidationError, validationResult, check} from 'express-validator'
import { generateHash } from '../utils/hash';
import jwt from 'jsonwebtoken';
import User from '../models/users.model';

const userRouter: Router = express.Router();

/**
** @description register user
** @public
**/
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
** @description get all users
**/
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