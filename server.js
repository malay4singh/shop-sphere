require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const productRouter = require('./routes/product');
const cartRouter = require('./routes/cart');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const orderRouter = require('./routes/order');
const cors = require('cors');
const PORT = process.env.PORT;

const server = express();



// -----------------------------------database connection
connectDB(process.env.DB_URL);



// -----------------------------------server config
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cors({
        origin: process.env.CORS_ORIGIN,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
}));



// -----------------------------------listener
server.listen(PORT, () => {
        console.log(`Server running on Port ${PORT}`);
})



// -----------------------------------routers
server.use('/products', productRouter);
server.use(cartRouter);
server.use(authRouter);
server.use(userRouter);
server.use(orderRouter)



// -----------------------------------functions
async function connectDB(url){
        await mongoose.connect(url);
        console.log(`DB Connected`);
}