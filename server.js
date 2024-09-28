require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const productRouter = require('./routes/product');
const reviewRouter = require('./routes/review');
const cartRouter = require('./routes/cart');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const orderRouter = require('./routes/order');
const portfolioRouter = require('./routes/portfolio');
const cors = require('cors');
const PORT = process.env.PORT;

const server = express();



// -----------------------------------database connection
connectDB(process.env.DB_URL);



// -----------------------------------server config
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
}));



// -----------------------------------listener
server.listen(PORT, () => {
        console.log(`Server running on Port ${PORT}`);
})



// -----------------------------------routers
server.use('/products', productRouter);
server.use('/review', reviewRouter);
server.use(cartRouter);
server.use(authRouter);
server.use(userRouter);
server.use(orderRouter);
server.use('/portfolio', portfolioRouter);



// -----------------------------------functions
async function connectDB(url){
        await mongoose.connect(url);
        console.log(`Database Connected`);
}