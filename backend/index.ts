import express, {Application, Request, Response} from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import userRouter from './router/user.route';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;





app.use(express.json());

connectDB();

app.get('/',(req: Request, res: Response) =>{
    res.status(200).send('Hello, World!');
});

app.use('/api/users', userRouter);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
