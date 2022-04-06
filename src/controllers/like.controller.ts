import express, { NextFunction, Request, Response, Router } from "express";
import auth from "../middlewares/auth";
import Like from "../models/likes.model";
import Post from "../models/posts.model";

const likeRouter: Router = express.Router();

/**
 * @route  POST api/<api-version>/posts/likes/:postId
 * @desc   like post
 * @access private 
 */
likeRouter.post('/:postId', auth, async(req: Request, res: Response, next: NextFunction) => {

    try {
        // check if post exists for like
        const post: (Post|undefined) = await Post.query().findById(req.params.postId);
        if(!post) { 
            return res.status(404).json({msg: 'Post not found'});
        }

        // construct like object
        const userLikeForCurrentPost = {
            fk_user_id: (<any>req).user.id,
            fk_post_id: post.post_id
        }

        console.log("userLikeForCurrentPost: ", userLikeForCurrentPost);

        //check if post already been liked by user
        const likeExistsInDB: boolean = !!(await Like.query().findOne(userLikeForCurrentPost));
        console.log(await Like.query().findOne(userLikeForCurrentPost));
        if(likeExistsInDB) {
            return res.status(400).json({msg: 'Post already liked'});
        }

        // add like
        const like = await Like.query().insertAndFetch(userLikeForCurrentPost);

        res.json(like);

    } catch (error: any) {
        console.error(error.message)
        res.status(500).send('Internal server error while liking the post');
    }
});

/**
 * @route  GET api/<api-version>/posts/likes/:postId
 * @desc   get all likes for the post
 * @access public 
 */
likeRouter.get('/:postId', async (req: Request, res: Response) => {
    try {
        // JSON: [{ "count" : "2" }]
        const likes: Like[] = await Like.query()
                                        .count()
                                        .where('fk_post_id', req.params.postId);
        res.json(likes);

    } catch (error: any) {
        console.error(error)
        res.status(500).send('Internal server error while getting likes');
    }
})

/**
 * @route  DELETE api/<api-version>/posts/likes/:postId
 * @desc   unlike post
 * @access private 
 */
likeRouter.delete('/:postId', auth, async (req: Request, res: Response) => {
    try {
        const like: (Like|undefined) = await Like.query().findOne({
            fk_post_id: req.params.postId,
            fk_user_id: (<any>req).user.id
        });

        if(!like) {
            return res.send(400).json({ msg: 'Not liked yet'});
        }
        await Like.query().deleteById(like.like_id);
        res.json('Post unliked');

    } catch(error: any) {
        console.error(error.message)
        res.status(500).send('Internal server error while unliking the post');
    }
})

export default likeRouter;

