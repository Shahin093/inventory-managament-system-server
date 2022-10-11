const Category = require("../models/Category");

exports.getCategoriesService = async () => {
    const result = await Category.find({});
    return result;
};

exports.createCategoryService = async (data) => {
    const result = await Category.create(data);
    return result;
}