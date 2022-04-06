import express, {Request,Response,Application} from 'express';
import { connectDB } from './db';
import userRouter from './controllers/user.controller';
import postRouter from './controllers/post.controller';
import authRouter from './controllers/auth.controller';
import likeRouter from './controllers/like.controller';

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || '8000');
const API_VERSION: number = 1;

connectDB();

app.use(express.json());
app.use(`/api/v${API_VERSION}/users`, userRouter);
app.use(`/api/v${API_VERSION}/posts`, postRouter);
app.use(`/api/v${API_VERSION}/posts/likes`, likeRouter);
app.use(`/api/v${API_VERSION}/auth`, authRouter);

app.get("/", (req: Request, res: Response): void => {
  res.send("Typescript with Node.js!")
});

app.listen(PORT, (): void => {
    console.log(`Server started at http://localhost:${PORT}`);  
});



