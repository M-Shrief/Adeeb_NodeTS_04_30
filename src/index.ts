import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import mongoose from 'mongoose';
import api from './router/api';
import helmet from 'helmet';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(compression());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// const MONGO_DB = process.env.MONGO_DB as string;
mongoose
  .connect(process.env.MONGO_DB as string, {
    dbName: process.env.DB_NAME,
    // other option are no longer required for v6+
  })
  .then(() => console.log('connected'))
  .catch((err) => console.log(err));

app.listen('3000', (): void => {
  console.log('Server Running!');
});

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Please Like the Video!' });
});

app.use('/api', api);
