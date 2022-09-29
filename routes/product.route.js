const productController = require('../controllers/product.controller.js');

const express = require('express');
const router = express.Router();

router.route('/')
    .get(productController.getProducts)
    .post(productController.createProduct)



module.exports = router;