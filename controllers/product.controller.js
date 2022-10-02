const { query } = require("express");
const Product = require("../models/Product");
const { getProductsService, createProductService, updateProductByIdService, bulkUpdateProductService, deleteProductByIdService, bulkDeleteProductService } = require("../services/product.services");

// getData 
exports.getProducts = async (req, res, next) => {
    try {
        // const products = await Product.find({ $or: [{ _id: "633489443c985bdc159e6d21" }, { name: 'mull' }] });
        // const products = await Product.find({ status: { $ne: "out-of-stock" } });
        // const products = await Product.find({ quentity: { $gte: 100 } });
        // const products = await Product.find({ quentity: { $lte: 100 } });
        // const products = await (await Product.where('name').equals('mull').where('quentity').gt(100).limit(2));

        const filters = { ...req.query };
        // sort , Page , limit --> exclude
        const excludeFields = ['sort', 'page', 'limit'];

        excludeFields.forEach(field => delete filters[field])

        const queries = {};
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            queries.sortBy = sortBy;
        }

        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            queries.fields = fields;
            console.log(fields);
        }
        const product = await getProductsService(filters, queries);

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

// inserted 
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
};

// Update 
exports.updateProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateProductByIdService(id, req.body);

        res.status(200).json({
            status: 'success',
            message: 'Successfully Updated'
        })

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Could not update the product',
            error: error.message
        })
    }
};
// bulk-updating 
// update json data : 
// {
//     "ids":[
//       "63347f1c88d1cc5e3595d07a",
//       "6334877a03c22b6516bf41db"
//       ],
//       "data": {
//         "price":99900,
//         "quentity":7790
//       }
//   }

exports.bulkUpdateProduct = async (req, res, nex) => {
    try {
        const result = await bulkUpdateProductService(req.body);
        res.status(200).json({
            status: 'Success',
            message: 'Successfully bulk-Updated'
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Could not bulk updating the product',
            error: error.message
        })
    }
}

// Delete Product 
exports.deleteProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await deleteProductByIdService(id);
        if (!result.deletedCount) {
            return res.status(400).json({
                status: 'fail',
                error: 'Could not the Product'
            })
        }

        res.status(200).json({
            status: "Success",
            message: "Successfully Deleted the Product"
        })
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: 'Could not Deleting the Product ',
            error: error.message
        })
    }
}

// bulk-delete 
exports.bulkDeleteProduct = async (req, res, next) => {
    try {
        const result = await bulkDeleteProductService(req.body.ids);
        res.status(200).json({
            status: 'Success',
            message: "Successfullly bulk deleted the given products"
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Could not bulk deleted the product",
            error: error.message
        })
    }
}
