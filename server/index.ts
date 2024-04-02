import express, { Request } from 'express';

import connectDB from './config/db';
import cors from "cors"
import dotenv from 'dotenv';
import indexRouter from './routes/index';
import urlsRouter from './routes/urls';

dotenv.config();

const app = express();

connectDB();

// Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors<Request>())

app.use('/', indexRouter);
app.use('/api', urlsRouter);

// Server Setup
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
