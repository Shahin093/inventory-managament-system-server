const productController = require('../controllers/product.controller.js');

const express = require('express');
const router = express.Router();

// bulk-update 
router
    .route('/bulk-update')
    .patch(productController.bulkUpdateProduct)

// bulk Delete 
router
    .route('/bulk-delete')
    .delete(productController.bulkDeleteProduct)

router.route('/')
    .get(productController.getProducts)
    .post(productController.createProduct)


// update and Delete 
router
    .route('/:id')
    .patch(productController.updateProductById)
    .delete(productController.deleteProductById)


module.exports = router;