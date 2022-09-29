const Product = require("../models/Product");
const { getProductsService, createProductService } = require("../services/product.services");


exports.getProducts = async (req, res, next) => {
    try {
        // const products = await Product.find({ $or: [{ _id: "633489443c985bdc159e6d21" }, { name: 'mull' }] });
        // const products = await Product.find({ status: { $ne: "out-of-stock" } });
        // const products = await Product.find({ quentity: { $gte: 100 } });
        // const products = await Product.find({ quentity: { $lte: 100 } });
        // const products = await (await Product.where('name').equals('mull').where('quentity').gt(100).limit(2));
        const product = await getProductsService();

        res.status(200).json({
            status: 'success',
            data: product
        })

    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: "can't get the data",
            error: error.message
        });
    }
}


exports.createProduct = async (req, res, next) => {
    try {
        // Save Or Create

        // Save 
        // const product = new Product(req.body);
        // console.log('data:::', req.body);
        // const result = await product.save();

        //Create
        const result = await createProductService(req.body);

        res.status(200).json({
            status: 'success',
            message: "Data Inserted Successfully",
            data: result
        })
    } catch (err) {
        res.status(400).json({
            status: "Fail",
            message: 'Data is not inserted',
            error: err.message
        })
        next(err);
    }
}