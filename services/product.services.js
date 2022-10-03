const { ObjectId } = require("mongoose");
const Product = require("../models/Product");

// get Product
exports.getProductsService = async (filters, queries) => {
    //    const products = a wait Product.find({}).sort(queries.sortBy).select(queries.fields);
    const products = await Product.find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy)

    // total Products
    const totalProducts = await Product.countDocuments(filters);
    // ceil korar maddome amder ke sesh aa ekti product thakle seta alada page aa dekhabe.
    const pageCount = Math.ceil(totalProducts / queries.limit);
    return { pageCount, totalProducts, products };
}





// create product 
exports.createProductService = async (data) => {
    const product = await Product.create(data);
    return product;
};
// update 
exports.updateProductByIdService = async (productId, data) => {
    // const result = await Product.updateOne({ _id: productId }, { $set: data }, { runValidators: true });
    console.log(data);
    const product = await Product.findById(productId);
    const result = await product.set(data).save();
    return result;
}



// bulk update Product 
exports.bulkUpdateProductService = async (data) => {
    // const result = await Product.updateMany({ _id: data.ids }, data.data, {
    //     runValidators: true
    // });

    const products = [];
    data.ids.forEach(product => {
        products.push(Product.updateOne({ _id: product.id }, product.data));
    });

    const result = await Promise.all(products);
    console.log(result);
    return result;
}

// Delete 
exports.deleteProductByIdService = async (id) => {
    const result = await Product.deleteOne({ _id: id });
    return result;
}
// bulk delete 
exports.bulkDeleteProductService = async (ids) => {

    const result = await Product.deleteOne({ _id: ids });
    return result;
};