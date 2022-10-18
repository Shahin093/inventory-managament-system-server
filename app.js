const express = require('express');
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// product  routers 
const productRouter = require('./routes/product.route.js');
// brand routers 
const brandRouter = require('./routes/brandRoute.route');
// stock routers
const stockRouter = require('./routes/stock.route');
// category routers
const categoryRouter = require('./routes/category.route.js');
// supplier routers 
const supplierRouter = require('./routes/supplier.route');
// User Creating 
const userRouter = require('./routes/user.route.js');

// middleware 
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});
//Product route Posting and Getting to Database 
app.use('/api/v1/product', productRouter);

// Brand route posting and getting to database 
app.use('/api/v1/brand', brandRouter);

// stock route 
app.use('/api/v1/stock', stockRouter);

// Category route
app.use('/api/v1/category', categoryRouter);

// Supplier Route 
app.use('/api/v1/supplier', supplierRouter);

// user create 
app.use('/api/v1/user', userRouter)

module.exports = app;
