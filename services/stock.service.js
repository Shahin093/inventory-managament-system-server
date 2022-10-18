const Stock = require("../models/Stock")

// all get stock service 
exports.getStockService = async (filters, queries) => {
    const result = await Stock.find({})
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy);

    return result;
}

// create stock service 
exports.createStockService = async (data) => {
    const result = await Stock.create(data);
    return result;
}

// get Stock by Id service 
exports.getStockByIdService = async (id) => {
    const stock = await Stock.findOne({ _id: id })
        // .populate("store.id")
        .populate("productId")
        .populate("suppliedBy.id")
        .populate("brand.id")
    return stock;
};

// update stock by id 
exports.updateStockByIdService = async (id, data) => {
    // const result = await Product.updateOne({ _id: productId }, { $set: data }, { runValidators: true });
    const stock = await Stock.findById(id);
    const result = await stock.set(data).save();
    return result;
};

// delete stock by id
exports.deleteStockByIdService = async (id) => {
    const result = await Product.deleteOne({ _id: id });
    return result;
};