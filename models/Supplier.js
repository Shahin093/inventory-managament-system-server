const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types;

const supplierSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Provide a name ?'],
        trim: true,
        lowercase: true,
        minLength: [3, 'Name must be at least 3 characters.'],
        maxLength: [100, 'Name is too large']
    },
    email: {
        type: String,
        validate: [validator.isEmail, 'Provide a valid Email'],
        trim: true,
        lowercase: true,
        unique: true
    },
    brand: {
        name: {
            type: String,
            required: true,
            trim: true
        },
        id: {
            type: ObjectId,
            required: true,
            ref: "Brand"
        }
    },
    contactNumber: {
        type: String,
        required: [true, 'Please Provide a contact number ?'],
        validate: {
            validator: (value) => {
                return validator.isMobilePhone(value)
            }
        },
        message: "Please Provide a valid Phone Number ?"
    },
    emergencyContactNumber: {
        type: String,
        required: [true, "Please Provide a emergency contact number ?"],
        validate: {
            validator: (value) => {
                return validator.isMobilePhone(value);
            }
        },
        message: 'Please Provide a valid Phone Number ?'
    },
    tradeLicenceNumber: {
        type: Number,
        required: [true, 'Please Provide your Trade Licence Number'],
    },
    presentAddress: {
        type: String,
        required: [true, 'Please Provide your Present Address ?']
    },
    permanentAddress: {
        type: String,
        required: [true, "Please Provide your permanent Address? "]
    },
    location: {
        type: String,
        required: true,
        lowercase: true,
        enum: {
            values: ["dhaka", "rajshahi", "chattogram", "sylhet", "khulna", "barishal", "rangpur", "mymensingh"],
            message: "{VALUE} is not acorect division"
        }
    },
    imageURL: {
        type: String,
        validate: [validator.isURL, "privide a valid URL"]
    },
    nationalIdImageURL: {
        type: String,
        required: true,
        validate: [validator.isURL, "Please Provide a vlid url ?"]
    },
    status: {
        type: String,
        default: 'active',
        enum: ['active', 'inactive']
    }
}, { timestamps: true });

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;