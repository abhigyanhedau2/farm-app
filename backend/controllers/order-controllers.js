const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Order = require('../models/order-model');

// Creating a S3 client
const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.BUCKET_ACCESS_KEY,
        secretAccessKey: process.env.BUCKET_SECRET_ACCESS_KEY,
    },
    region: process.env.BUCKET_REGION
});

const getAllOrders = catchAsync(async (req, res, next) => {

    const sellerId = req.user.id;

    // let orders = await Order.find().populate('product', 'name category price image').populate('userId', 'name address number');
    let orders = await Order.find().populate('product', 'name category price image sellerId').populate('userId', 'id name address number');

    if (!orders)
        return res.status(200).json({
            status: 'success',
            data: null
        });

    orders = orders.filter(order => {
        return order.product.sellerId.toString() === sellerId;
    });

    // Convert the image name stored in the DB to the image url we'll use 
    // to fetch the image
    for (const order of orders) {

        // Set params before sending the request
        const getObjParams = {
            Bucket: process.env.BUCKET_NAME,
            Key: order.product.image,
        }

        // Send a get request for the image
        const getObjCommand = new GetObjectCommand(getObjParams);
        const url = await getSignedUrl(s3, getObjCommand, { expiresIn: 3600 });

        // Set the fetch url to the image
        order.product.image = url;
    }

    return res.status(200).json({
        status: 'success',
        data: {
            orders
        }
    });

});

const deleteOrderById = catchAsync(async (req, res, next) => {

    const orderId = req.params.orderId;

    await Order.findByIdAndDelete(orderId);

    return res.status(200).json({
        status: 'success',
        data: null
    });

})

module.exports = { getAllOrders, deleteOrderById };