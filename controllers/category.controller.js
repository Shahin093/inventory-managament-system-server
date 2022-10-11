const { getCategoriesService, createCategoryService } = require("../services/category.service");

// get categories route 
exports.getCategories = async (req, res, next) => {
    try {
        //brand data getting
        const result = await getCategoriesService();
        res.status(200).json({
            status: 'success',
            message: " all data getting the categories ",
            data: result
        })
    } catch (err) {
        res.status(400).json({
            status: "Fail",
            message: 'Data is not getting the categories',
            error: err.message
        })
        next(err);
    }
};

// create category
exports.createCategory = async (req, res, next) => {
    try {
        //Create
        const result = await createCategoryService(req.body);

        res.status(200).json({
            status: 'success',
            message: "Data Inserted Successfully",
            data: result
        })
    } catch (err) {
        res.status(400).json({
            status: "Fail",
            message: 'Data is not inserted the category',
            error: err.message
        })
        next(err);
    }
};