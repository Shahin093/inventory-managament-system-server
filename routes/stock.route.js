const express = require('express');
const stockController = require('../controllers/stock.controller');
const router = express.Router();

router.route('/')
    .get(stockController.getStock)
    .post(stockController.createStock);

router.route('/:id')
    .get(stockController.getStockById)
    .patch(stockController.updateStockById)
    .delete(stockController.deleteStockById)
module.exports = router;