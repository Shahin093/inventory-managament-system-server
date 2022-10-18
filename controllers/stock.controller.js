const { getStockService, createStockService, getStockByIdService, updateStockByIdService, deleteStockByIdService } = require("../services/stock.service");


// all getting stock 
exports.getStock = async (req, res, next) => {
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

        // gt lt gte lte
        let filtersString = JSON.stringify(filters);
        console.log(filtersString);
        // use the reject and replace methods
        filtersString = filtersString.replace(/\b(gte|gt|lt|lte)\b/g, match => `$${match}`)
        console.log(JSON.parse(filtersString));

        const queries = {};
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            queries.sortBy = sortBy;
        }

        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            queries.fields = fields;
            console.log(fields);
        };
        if (req.query.page) {
            // 50 products
            // each page 10 product
            // page 1--> 1-10
            // page 2--> 2-20
            // page 3--> 21-30     --page 3 --> skip 1-20   --> (3-1)  --> 2 *10
            // page 4--> 31-40     -- page 4  --> skip 1-30 --> (4-1)  --> 3* 10
            // page 5--> 41-50
            const { page = 1, limit = 10 } = req.query;    //"3"  "10"
            const skip = (page - 1) * parseInt(limit);
            queries.skip = skip;
            queries.limit = parseInt(limit);
        }
        const product = await getStockService(filters, queries);

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
};

// create stock 
exports.createStock = async (req, res, next) => {
    try {
        //Create
        const result = await createStockService(req.body);
        res.status(200).json({
            status: 'success',
            message: "Data Inserted Successfully",
            data: result
        });
    } catch (err) {
        res.status(400).json({
            status: "Fail",
            message: 'Data is not create the stock',
            error: err.message
        });
        next(err);
    }
}

// getting stock by Id
exports.getStockById = async (req, res, next) => {
    try {
        //brand data getting
        const { id } = req.params;
        const result = await getStockByIdService(id);
        // if (!result) {
        //     return res.status(400).json({
        //         status: 'fail',
        //         error: "Couldn't find a stock with this id"
        //     });
        // }
        res.status(200).json({
            status: 'success',
            message: "  data getting the stock By ID  ",
            data: result
        });
    } catch (err) {
        res.status(400).json({
            status: "Fail",
            message: 'Data is not getting the stock by id ',
            error: err.message
        });
        next(err);
    }
};

// update stock by ID 
exports.updateStockById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateStockByIdService(id, req.body);

        res.status(200).json({
            status: 'success',
            message: 'Successfully Updated the Product',
            data: result
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Could not update the Stock',
            error: error.message
        });
    }
}

// delete stock by id
exports.deleteStockById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await deleteStockByIdService(id);
        if (!result.deletedCount) {
            return res.status(400).json({
                status: 'fail',
                error: 'Could not the Stock'
            });
        }
        res.status(200).json({
            status: "Success",
            message: "Successfully Deleted the Stock",
            data: result
        });
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: 'Could not Deleting the Stock ',
            error: error.message
        })
    }
}