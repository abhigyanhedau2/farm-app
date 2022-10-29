const express = require('express');
const bodyParser = require('body-parser');
const connectToDB = require('./utils/connectToDB');
const dotenv = require('dotenv');
dotenv.config();

const productsRouter = require('./routes/product-routes');
const usersRouter = require('./routes/user-routes');
const cartRouter = require('./routes/cart-routes');
const orderRouter = require('./routes/order-routes');
const purchaseRouter = require('./routes/purchase-routes');
const globalErrorHandler = require('./utils/globalErrorHandler');

const app = express();

// MIDDLEWARES

// To get the req.body values 
app.use(bodyParser.json());

app.use('/api/v1/products', productsRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/purchases', purchaseRouter);

app.use(globalErrorHandler);

// Connecting to DB
connectToDB();

app.listen(process.env.PORT || 5000, () => {
    console.log(`App listening on port ${process.env.PORT}`);
});