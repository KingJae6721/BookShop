// app.js

import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/users.js';
// import channelRouter from './routes/channel.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/', userRouter);
// app.use('/channels', channelRouter);

app.listen(process.env.PORT_NUMBER, () => {
  console.log(`Example app listening on port ${process.env.PORT_NUMBER}`);
});