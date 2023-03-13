import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET',
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// const MONGO_DB = process.env.MONGO_DB as string;
mongoose
  .connect(process.env.MONGO_DB as string, {
    dbName: process.env.DB_NAME,
    // other option are no longer required for v6+
  })
  .then(() => console.log('connected'))
  .catch((err) => console.log(err));

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Please Like the Video!' });
});

app.listen('3000', (): void => {
  console.log('Server Running!');
});
