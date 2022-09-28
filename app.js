const express = require('express');
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
// const port = 3000

// middleware 
app.use(express.json());
app.use(cors());

// schema design
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name for this product."],
        trim: true,
        unique: [true, "Name must be unique"],
        minLength: [3, "Name must be least 3 charecter"],
        maxLength: [100, "Name is too large"]
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price Can not be Negative"]
    },
    unit: {
        type: String,
        required: true,
        enum: {
            values: ["KG", "Litre", "PCS"],
            message: "unit value can not be {VALUE}, must be kg/litre/pcs"
        }
    },
    quentity: {
        type: Number,
        required: true,
        min: [0, "Quentity can not be negative"],
        validate: {
            validator: (value) => {
                const isInteger = Number.isInteger(value);
                if (isInteger) {
                    return ture
                } else {
                    return false
                }
            }
        },
        message: "Quentity must be an Integer"
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["in-stock", "out-off-stock", "discontinued"],
            message: "Status can not be {VALUE}"
        }
    },
    // CreateAt:{
    //     type : Date,
    //     default:Date.now
    // },
    // UpdatedAt: {
    //     type : Date,
    //     default: Date.now
    // }
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supplier"
    },
    categories: [{
        name: {
            type: String,
            required: true
        },
        _id: mongoose.Schema.Types.ObjectId,
    }
    ]

}, {
    timestamps: true,
})

// SCHEMA ---> MODEL  --> QUERY

// Creating Model 
const Product = mongoose.model('Product', productSchema)



app.get('/', (req, res) => {
    res.send('Hello World!')
})


// Posting to Database 
// app.post('/api/v1/product', (req, res, next) => {
//     res.send('It is working ')
// })
module.exports = app;
