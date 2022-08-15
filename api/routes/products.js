const express = require('express');
const router = express.Router();

const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

//adding controllers for products
const ProductsController = require('../controllers/products');

//configuring  multer for file uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });
//only accepting images with conditions
const fileFilter = (req, file, cb) => {
    // reject a file 
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });


const Product = require('../models/product');

// Handle incoming GET requests to /products
router.get('/',ProductsController.products_get_all);

// Handle incoming POST requests to /products
// middlewares work from left to right , left most gets executed first
router.post('/',checkAuth,upload.single('productImage'),ProductsController.products_create_product);

// Handle incoming GET requests to /products/:productId
router.get('/:productId',ProductsController.products_get_product);

// Handle incoming PATCH requests to /products/:productId
router.patch('/:productId',checkAuth,ProductsController.products_update_product);

// Handle incoming DELETE requests to /products/:productId
router.delete('/:productId',checkAuth,ProductsController.products_delete_product);

module.exports = router;