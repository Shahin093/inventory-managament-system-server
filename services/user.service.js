const User = require("../models/User")

exports.signupService = async (userInfo) => {
    const user = await User.create(userInfo);
    return user;
};

exports.findByEmail = async (email) => {
    return await User.findOne({ email });
};