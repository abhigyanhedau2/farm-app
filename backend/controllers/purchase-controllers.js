const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const Purchase = require("../models/purchase-model");
const catchAsync = require("../utils/catchAsync");

// Creating a S3 client
const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.BUCKET_ACCESS_KEY,
        secretAccessKey: process.env.BUCKET_SECRET_ACCESS_KEY,
    },
    region: process.env.BUCKET_REGION
});

const getMyPurchases = catchAsync(async (req, res, next) => {

    const userId = req.user.id;

    // const purchases = await Purchase.find({ userId });
    const purchases = await Purchase.find({ userId }).populate('products.product', 'name category price quantityPerBox veg icon image');

    // Convert the image name stored in the DB to the image url we'll use 
    // to fetch the image
    for (const purchase of purchases) {

        for (const products of purchase.products) {

            // Set params before sending the request
            const getObjParams = {
                Bucket: process.env.BUCKET_NAME,
                Key: products.product.image,
            }

            // Send a get request for the image
            const getObjCommand = new GetObjectCommand(getObjParams);
            const url = await getSignedUrl(s3, getObjCommand, { expiresIn: 3600 });

            // Set the fetch url to the image
            products.product.image = url;

        }

    }

    if (!purchases)
        return res.status(200).json({
            status: 'success',
            data: null
        });

    res.status(200).json({
        status: 'success',
        data: {
            purchases
        }
    });

});

module.exports = { getMyPurchases };