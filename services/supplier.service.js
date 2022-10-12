const Supplier = require("../models/Supplier");

// all data getting 
exports.getSuppliersService = async () => {
    const suppliers = await Supplier.find({});
    return suppliers;
};

// Data inserted 
exports.createSupplierService = async (data) => {
    const result = await Supplier.create(data);
    return result;
};


// data SupplierById service 
exports.getSupplierByIdService = async (id) => {
    const result = await Supplier.findById(id);
    return result;
}

// updateSupplierByIdService
exports.updateSupplierByIdService = async (id, data) => {
    const result = await Supplier.updateOne({ _id: id }, { $set: data }, { runValidators: true });
    return result;
};