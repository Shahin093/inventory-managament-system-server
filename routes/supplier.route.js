const express = require('express');
const supplierController = require('../controllers/supplier.controller');

router = express.Router();

router
    .route('/')
    .get(supplierController.getSuppliers)
    .post(supplierController.createSupplier)

router
    .route('/:id')
    .get(supplierController.getSupplierById)
    .patch(supplierController.updateSupplierById);
module.exports = router;