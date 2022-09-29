const express = require('express');
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

//  routers 
const productRouter = require('./routes/product.route.js');

// middleware 
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!')
});

// Posting and Getting to Database 
app.use('/api/v1/product', productRouter)

module.exports = app;
