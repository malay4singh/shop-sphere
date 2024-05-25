require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const productRouter = require('./routes/product');
const cartRouter = require('./routes/cart');
const authRouter = require('./routes/auth');
const cors = require('cors');
const PORT = process.env.PORT;

const server = express();



// -----------------------------------database connection
connectDB(process.env.DB_URL);



// -----------------------------------server config
server.use(express.urlencoded());
server.use(cors({ origin: process.env.CORS_ORI }));
server.use(express.json());



// -----------------------------------listener
server.listen(PORT, () => {
        console.log(`Server running on Port ${PORT}`);
})



// -----------------------------------routers
server.use('/products', productRouter);
server.use('/', cartRouter);
server.use(authRouter);



// -----------------------------------functions
async function connectDB(url){
        await mongoose.connect(url);
        console.log(`DB Connected`);
}