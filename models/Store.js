const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types;

const storeSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please Provide a store name'],
        lowercase: true,
        enum: {
            values: ['dhaka', 'chittagong', 'rajshahi', 'sylhet', 'khulna', 'barishal', 'rongpur', 'mymensingh'],
            message: "{VALUE} is not a valid name"
        }
    },
    status: {
        type: String,
        enum: ["active", 'inactive'],
        default: 'active'
    },
    manager: {
        name: String,
        contactNumber: String,
        id: {
            type: ObjectId,
            ref: 'User'
        }
    }
}, {
    timestamps: true
});