const Stock = require("../models/Stock")

// all get stock service 
exports.getStockService = async () => {
    const result = await Stock.find({});
    return result;
}

// create stock service 
exports.createStockService = async (data) => {
    const result = await Stock.create(data);
    return result;
}

// get Stock by Id service 
exports.getStockByIdService = async (id) => {
    const result = await Stock.findById(id);
    return result;
}