const mongoose = require("mongoose");
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types;
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
            validate: {
                validator: (value) => {
                    if (!Array.isArray(value)) {
                        return false;
                    }
                    let isValid = true;
                    value.forEach(url => {
                        if (!validator.isURL(url)) {
                            isValid = false;
                        }
                    });
                    return isValid;
                },
                message: "Please Provide valid image urls . "
            }
        }
    ],

    category: {
        type: String,
        required: true
    },

    brand: {
        name: {
            type: String,
            required: true,
        },
        id: {
            type: ObjectId,
            ref: 'Brand',
            required: true
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
const Product = mongoose.model('Product', productSchema)

module.exports = Product;