const { getStockService, createStockService, getStockByIdService } = require("../services/stock.service");


// all getting stock 
exports.getStock = async (req, res, next) => {
    try {
        //brand data getting
        const result = await getStockService();

        res.status(200).json({
            status: 'success',
            message: " all data getting the stock ",
            data: result
        })
    } catch (err) {
        res.status(400).json({
            status: "Fail",
            message: 'Data is not stocking',
            error: err.message
        });
        next(err);
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
        if (!result) {
            return res.status(400).json({
                status: 'fail',
                error: "Couldn't find a stock with this id"
            });
        }
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
}