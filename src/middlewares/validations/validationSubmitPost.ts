import {check} from "express-validator";

const validationSubmitPost = [check('text', 'Text is required').notEmpty()];

export default validationSubmitPost;
