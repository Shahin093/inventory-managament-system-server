const mongoose = require('mongoose');
// const { validate } = require('./Product');
const validator = required('validator');
const { ObjectId } = mongoose.Schema.Types;

const brandSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please Provide a brand name'],
        maxLength: 100,
        unique: true,
        lowercase: true
    },
    description: String,
    email: {
        type: String,
        lowercase: true,
        validate: [validator.isEmail, "Please Provide a valid Email. "]
    },
    website: {
        type: String,
        validate: [validator.isURL, "Please provide a valid url . "]
    },
    location: String,
    products: [
        {
            type: ObjectId,
            ref: "Product",
        }
    ],
    suppliers: [{
        name: String,
        contactNumber: String,
        id: {
            type: ObjectId,
            ref: "Supplier"
        },

    }],
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
},
    {
        timestamps: true
    }
);

const Brand = mongoose.model("Brand", brandSchema);

exports = Brand;