const mongoose = require("mongoose");

// schema design
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name for this product."],
        trim: true,
        unique: [true, "Name must be unique"],
        minLength: [3, "Name must be least 3 character"],
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
                    return true
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
    CreateAt: {
        type: Date,
        default: Date.now
    },
    UpdatedAt: {
        type: Date,
        default: Date.now
    },
    // supplier: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Supplier"
    // },
    // categories: [{
    //     name: {
    //         type: String,
    //         required: true
    //     },
    //     _id: mongoose.Schema.Types.ObjectId,
    // }
    // ]

}, {
    timestamps: true,
})

//Mongoose MiddleWare for saving data : pre / post
productSchema.pre('save', function (next) {
    if (this.quentity == 0) {
        this.status = 'out-of-stock'
    }
    next();
})
productSchema.post('save', function (doc, next) {
    console.log("After saving data");
    next();
})

// instance methods 
productSchema.methods.logger = function () {
    console.log(`Data saved for ${this.name}`);
}

// SCHEMA ---> MODEL  --> QUERY

// Creating Model 
const Product = mongoose.model('Product', productSchema)

module.exports = Product;