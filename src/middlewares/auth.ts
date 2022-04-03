import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

export default (req: Request, res: Response, next: NextFunction) => {

  // get token from request
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token - Unauthorized !!!' });
  }

  //Verify token
  try {
    const decoded = jwt.verify(token, process.env.jwtSecretKey || "undefinedKey");
    (<any>req).user = (<any>decoded).user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};
