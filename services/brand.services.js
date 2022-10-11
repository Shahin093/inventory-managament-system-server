const Brand = require('../models/Brand');
const { ObjectId } = require("mongoose");
const { updateOne } = require('../models/Brand');
// Data inserted 
exports.createBrandService = async (data) => {
    const result = await Brand.create(data);
    return result;
}
// all data getting 
exports.getBrandsService = async () => {
    const brands = await Brand.find({});
    return brands;
}

// data brandById service 
exports.getBrandByIdService = async (id) => {
    const result = await Brand.findById(id);
    return result;
}

// updateBrandByIdService
exports.updateBrandByIdService = async (id, data) => {
    const result = await Brand.updateOne({ _id: id }, { $set: data });
    return result;
};


