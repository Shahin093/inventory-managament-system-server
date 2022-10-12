const { getSuppliersService, createSupplierService, getSupplierByIdService, updateSupplierByIdService } = require("../services/supplier.service");

exports.getSuppliers = async (req, res, next) => {
    try {
        //brand data getting
        const result = await getSuppliersService();

        res.status(200).json({
            status: 'success',
            message: " all data getting the suppliers ",
            data: result
        })
    } catch (err) {
        res.status(400).json({
            status: "Fail",
            message: 'Data is not getting',
            error: err.message
        })
        next(err);
    }
};

// create supplier 
// inserted 
exports.createSupplier = async (req, res, next) => {
    try {
        //Create
        const result = await createSupplierService(req.body);

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


// getBrandById
exports.getSupplierById = async (req, res, next) => {
    try {
        //supplier data getting
        const { id } = req.params;
        const result = await getSupplierByIdService(id);
        if (!result) {
            return res.status(400).json({
                status: 'fail',
                error: "Couldn't find a supplier with this id"
            })
        }
        res.status(200).json({
            status: 'success',
            message: "  data getting the supplier by ID  ",
            data: result
        })
    } catch (err) {
        res.status(400).json({
            status: "Fail",
            message: 'Data is not getting the supplier by id',
            error: err.message
        })
        next(err);
    }
};


// update by id 
exports.updateSupplierById = async (req, res, next) => {
    try {
        //brand data getting
        const { id } = req.params;
        const result = await updateSupplierByIdService(id, req.body);
        if (!result) {
            return res.status(400).json({
                status: 'fail',
                error: "Couldn't updated a supplier with this id"
            })
        }
        res.status(200).json({
            status: 'success',
            message: "  data updated the supplierBy ID  ",
            data: result
        })
    } catch (err) {
        res.status(400).json({
            status: "Fail",
            message: 'Data is not updated the supplierBy',
            error: err.message
        })
        next(err);
    }
}