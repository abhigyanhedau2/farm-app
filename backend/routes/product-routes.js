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

const { postAProduct, getAllProducts, deleteAProduct, getProductFromId, getProductsByCategory, updateProductById } = productControllers;

// GET a product from product id
router.route('/:productId')
    .get(getProductFromId);

router.route('/category/:category')
    .get(getProductsByCategory);

// GET All the products stored in the DB
router.route('/')
    .get(getAllProducts);

router.use(protect, restrictTo('seller'));

// POST A new product by the seller
router.route('/')
    .post(upload.single('image'), postAProduct);

// DELETE A product by the seller
router.route('/:productId')
    .patch(upload.single('image'), updateProductById)  // UPDATE a product from product id
    .delete(deleteAProduct);  // DELETE a product from product id

module.exports = router;