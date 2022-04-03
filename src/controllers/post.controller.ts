import express, { Router, Request, Response, NextFunction } from 'express';
import validationSubmitPost from '../middlewares/validations/validationSubmitPost';
import auth from '../middlewares/auth'
import Post from '../models/posts.model';
import User from '../models/users.model';
import { Result, ValidationError, validationResult } from 'express-validator';

const postRouter: Router = express.Router();

// submit a post
postRouter.post('/', [auth, ...validationSubmitPost], 
async(req: Request, res: Response, next: NextFunction) => {
    try{
        const validationErrors: Result<ValidationError> = validationResult(req);
        if(!validationErrors.isEmpty()) {
            return res.status(400).json({errors: validationErrors.array()});
        }

        //const currentUser = await User.query().findById((<any>req).user.id).select('-password');

        const newPost = await Post.query().insert({
            fk_user_id: (<any>req).user.id,
            text: req.body.text
        });

        res.json(newPost);

    } catch (error) {
        console.error(error)
        res.status(500).send('Internal server error while submitting post');    
    }
})

// get all posts
postRouter.get('/', auth, 
async (req: Request, res: Response) => {
    try {
        const allPosts = await Post.query();
        res.json(allPosts);
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal server error while fetching posts');                    
    }

})

export default postRouter;