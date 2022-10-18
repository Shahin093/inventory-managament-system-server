const mongoose = require("mongoose");
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types;
// stock schema design
const StockSchema = mongoose.Schema({
    productId: {
        type: ObjectId,
        required: true,
        ref: "Product"
    },
    name: {
        type: String,
        required: [true, "Please provide a name for this product."],
        trim: true,
        // unique: [true, "Name must be unique"],
        minLength: [3, "Name must be least 3 character"],
        maxLength: [100, "Name is too large"]
    },
    description: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true,
        enum: {
            values: ["KG", "Litre", "PCS", "bag"],
            message: "unit value can not be {VALUE}, must be kg/litre/pcs/bag"
        }
    },
    imageURLs: [
        {
            type: String,
            required: true,
            validate: [validator.isURL, 'Please Provide a valid url(s)']
        }],
    price: {
        type: Number,
        required: true,
        min: [0, "Product price can't be negative"]
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, "Product quantity can't be negative"]
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["in-stock", "out-of-stock", "discontinued"],
            message: "status can't be {VALUE}"
        }
    },
    store: {
        name: {
            type: String,
            trim: true,
            required: [true, 'Please Provide a store name'],
            lowercase: true,
            enum: {
                values: ['dhaka', 'chittagong', 'rajshahi', 'sylhet', 'khulna', 'varishal', 'rangpur', 'mymensingh'],
                message: '{VALUE} is not a valid name'
            }
        },
        id: {
            type: ObjectId,
            required: true,
            ref: "Store"
        }
    },

    suppliedBy: {
        name: {
            type: String,
            trim: true,
            required: [true, "Please Provide a supplier name"]
        },
        id: {
            type: ObjectId,
            ref: "Supplier"
        }
    },
    category: {
        type: String,
        required: true
    },

    brand: {
        type: String,
        required: true,
        id: {
            type: ObjectId,
            ref: 'Brand',
            required: true
        }
    },
    sellCount: {
        type: Number,
        default: 0,
        min: 0,
    },
    CreateAt: {
        type: Date,
        default: Date.now
    },
    UpdatedAt: {
        type: Date,
        default: Date.now
    },

}, {
    timestamps: true,
});

// productSchema.pre('save', function (next)){

//     // This --> 
//     console.log('before saving data');
//     if (this.quentity == 0) {
//         this.status = 'out-of-stock'
//     }
//     next();
// }

// SCHEMA ---> MODEL  --> QUERY

// Creating Model 
const Stock = mongoose.model('Stock', StockSchema)
module.exports = Stock;