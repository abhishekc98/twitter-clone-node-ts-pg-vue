import express, { Router, Request, Response, NextFunction } from 'express';
import validationSubmitPost from '../middlewares/validations/validationSubmitPost';
import auth from '../middlewares/auth'
import Post from '../models/posts.model';
import { Result, ValidationError, validationResult } from 'express-validator';

const postRouter: Router = express.Router();

/**
 * @route  POST api/<api-version>/posts
 * @desc   Submit post
 * @access private 
 */
postRouter.post('/', [auth, ...validationSubmitPost], async(req: Request, res: Response, next: NextFunction) => {
    try{
        const validationErrors: Result<ValidationError> = validationResult(req);
        if(!validationErrors.isEmpty()) {
            return res.status(400).json({errors: validationErrors.array()});
        }
        const newPost = await Post.query().insert({
            fk_user_id: (<any>req).user.id,
            text: req.body.text
        });

        res.json(newPost);

    } catch (error: any) {
        console.error(error.message)
        res.status(500).send('Internal server error while submitting post');    
    }
})

/**
 * @route  GET api/<api-version>/posts
 * @desc   get all posts
 * @access public 
 */
postRouter.get('/', async (req: Request, res: Response) => {
    try {
        const allPosts: Post[] = await Post.query();

        res.json(allPosts);

    } catch (error: any) {
        console.error(error.message)
        res.status(500).send('Internal server error while fetching posts');                    
    }
})

/**
 * @route  GET api/<api-version>/posts/:id
 * @desc   get post by id
 * @access private 
 */
postRouter.get('/:id', auth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const post: (Post|undefined) = await Post.query().findById(req.params.id);
        if(!post){ 
            return res.status(404).json({msg: 'Post not found'});
        }
        res.json(post);
    } catch (error: any) {
        console.error(error.message)
        res.status(500).send('Internal server error while fetching the post');
    }
})

/**
 * @route   DELETE api/<api-version>/posts/:id
 * @desc    Delete a post by id
 * @access private 
 */
postRouter.delete('/:id', auth, async (req: Request, res: Response) => {
  try {
    const postToDelete: (Post | undefined) = await Post.query().findById(req.params.id);
    if (!postToDelete) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    // verify if the post belongs to user
    if (postToDelete.fk_user_id !== (<any>req).user.id) {
      return res.status(401).json({ msg: 'Unauthorized to delete this post' });
    }

    const deleteCount: number = await Post.query().deleteById(postToDelete.post_id);
    if(deleteCount < 1){
        return res.status(401).json({msg: 'Error while deleting post'});
    }

    res.json({ msg: 'Post removed' });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send('Internal server error while deleting post');
  }
});


export default postRouter;