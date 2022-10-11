const { createBrandService, getBrandsService, getBrandByIdService, updateBrandByIdService } = require("../services/brand.services");

const Brand = require('../models/Brand');
// inserted 
exports.createBrand = async (req, res, next) => {
    try {
        //Create
        const result = await createBrandService(req.body);

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

// getting 
exports.getBrands = async (req, res, next) => {
    try {
        //brand data getting
        const result = await getBrandsService();

        res.status(200).json({
            status: 'success',
            message: " all data getting the Brands ",
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

// getBrandById
exports.getBrandById = async (req, res, next) => {
    try {
        //brand data getting
        const { id } = req.params;
        const result = await getBrandByIdService(id);
        if (!result) {
            return res.status(400).json({
                status: 'fail',
                error: "Couldn't find a brand with this id"
            })
        }
        res.status(200).json({
            status: 'success',
            message: "  data getting the BrandsBy ID  ",
            data: result
        })
    } catch (err) {
        res.status(400).json({
            status: "Fail",
            message: 'Data is not getting the BrandBYID',
            error: err.message
        })
        next(err);
    }
};


// update by id 
exports.updateBrandById = async (req, res, next) => {
    try {
        //brand data getting
        const { id } = req.params;
        const result = await updateBrandByIdService(id, req.body);
        if (!result.nModified) {
            return res.status(400).json({
                status: 'fail',
                error: "Couldn't updated a brand with this id"
            })
        }
        res.status(200).json({
            status: 'success',
            message: "  data updated the BrandsBy ID  ",
            data: result
        })
    } catch (err) {
        res.status(400).json({
            status: "Fail",
            message: 'Data is not updated the BrandBYID',
            error: err.message
        })
        next(err);
    }
}