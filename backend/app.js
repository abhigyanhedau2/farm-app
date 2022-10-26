const express = require('express');
const bodyParser = require('body-parser');
const connectToDB = require('./utils/connectToDB');
const dotenv = require('dotenv');
dotenv.config();

const productsRouter = require('./routes/product-routes');
const globalErrorHandler = require('./utils/globalErrorHandler');

const app = express();

// MIDDLEWARES

// To get the req.body values 
app.use(bodyParser.json());

app.use('/api/v1/products', productsRouter);

app.use(globalErrorHandler);

// Connecting to DB
connectToDB();

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`);
});