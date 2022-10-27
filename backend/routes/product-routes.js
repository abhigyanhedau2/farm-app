const express = require('express');
const multer = require('multer');

const protect = require('../middlewares/protect');
const restrictTo = require('../middlewares/restrictTo');

const productControllers = require('../controllers/product-controllers');

const router = express.Router();

// Create a memory storage object and a upload function with multer 
// which makes sure that it always stores the image in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const { postAProduct, getAllProducts, deleteAProduct } = productControllers;

router.route('/')
    .get(getAllProducts);

router.use(protect);

router.route('/')
    .post(restrictTo('seller'), upload.single('image'), postAProduct);

router.route('/:productId')
    .delete(restrictTo('seller'), deleteAProduct);

module.exports = router;