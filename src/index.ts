import express, {Request,Response,Application} from 'express';
import { connectDB } from './db';
import userRouter from './controllers/user.controller';
import postRouter from './controllers/post.controller';

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || '8000');
connectDB();

app.use(express.json());
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);

app.get("/", (req: Request, res: Response): void => {
  res.send("Typescript with Node.js!")
});

app.listen(PORT, (): void => {
    console.log(`Server started at http://localhost:${PORT}`);  
});



