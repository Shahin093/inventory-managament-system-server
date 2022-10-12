const productController = require('../controllers/product.controller.js');
const express = require('express');
const uploader = require('../middleware/uploader.js');
const router = express.Router();

// file uploader route 
router.post("/file-upload", uploader.array("image"), productController.fileUpload);

{/* <input type="file" name="image" /> */ }
// const formData = new FormData();
// formData.append("image", forData);


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