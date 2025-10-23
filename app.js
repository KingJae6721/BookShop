// app.js

import express from 'express';
import dotenv from 'dotenv';

import bookRouter from './routes/books.js';
// import cartRouter from './routes/carts.js';
import likeRouter from './routes/likes.js';
// import orderRouter from './routes/orders.js';
import userRouter from './routes/users.js';
import categoryRouter from './routes/category.js'
// import channelRouter from './routes/channel.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/users', userRouter);
// app.use('/carts', cartRouter);
app.use('/books', bookRouter);
app.use('/likes', likeRouter);
// app.use('/orders', orderRouter);
app.use('/category', categoryRouter);


app.listen(process.env.PORT_NUMBER, () => {
  console.log(`Example app listening on port ${process.env.PORT_NUMBER}`);
});