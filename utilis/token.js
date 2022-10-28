const jwt = require('jsonwebtoken');

exports.generateToken = (userInfo) => {
    // console.log('user ; ', userInfo);
    const payload = {
        email: userInfo.email,
        role: userInfo.role,
    };

    const token = jwt.sign(payload, process.env.TOKEN_SECREC, {
        expiresIn: "20"
    });
    return token;
}