const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const crypto = require('crypto');

const Product = require('../models/product-model');
const catchAsync = require("../utils/catchAsync");

const randomImageName = () => {
    return crypto.randomBytes(32).toString('hex');
};

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.BUCKET_ACCESS_KEY,
        secretAccessKey: process.env.BUCKET_SECRET_ACCESS_KEY,
    },
    region: process.env.BUCKET_REGION
});

const getAllProducts = catchAsync(async (req, res, next) => {

    const products = await Product.find();

    for (const product of products) {

        const getObjParams = {
            Bucket: process.env.BUCKET_NAME,
            Key: product.image,
        }

        const getObjCommand = new GetObjectCommand(getObjParams);

        const url = await getSignedUrl(s3, getObjCommand, { expiresIn: 3600 });
        product.image = url;
    }

    res.json({
        status: 'success',
        data: {
            products
        }
    })

});

const postAProduct = catchAsync(async (req, res, next) => {

    const { name, category, subCategory, price, quantityPerBox, calories, veg, description, icon } = req.body;

    // All textual data comes in req.body
    // All image data comes in req.file
    // Actual image = req.file.buffer

    const newImageName = randomImageName();

    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: newImageName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype
    };

    const putObjCommand = new PutObjectCommand(params);
    await s3.send(putObjCommand);

    const newProduct = await Product.create({
        name,
        category,
        subCategory,
        price,
        quantityPerBox,
        calories,
        veg,
        description,
        icon,
        image: newImageName,
        sellerId: req.user._id
    });

    res.status(201).json({
        status: 'success',
        data: {
            product: newProduct
        }
    });

});

const deleteAProduct = catchAsync(async (req, res, next) => {

    const productId = req.params.productId;

    const product = await Product.findById(productId);

    if (!product)
        return next(new AppError(404, `No product found with product id ${productId}`));

    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: product.image
    }

    const delObjCommand = new DeleteObjectCommand(params);
    await s3.send(delObjCommand);

    await Product.findByIdAndDelete(productId);

    res.status(204).json({
        status: 'success',
        data: null
    });

});

module.exports = { postAProduct, getAllProducts, deleteAProduct };