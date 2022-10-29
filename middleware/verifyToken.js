
/** verify token Steps : --->>
 * 1. check if token exits.
 * 2. if not token send res.
 * 3. decode the token.
 * 4. if valid next.
 */
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/User');
module.exports = async (req, res, next) => {

    try {
        // step 1. check if token exits 
        const token = req.headers?.authorization?.split(" ")[1];

        // step 2. if not token send res.
        if (!token) {
            res.status(500).json({
                status: 'fail',
                error: 'You are not logged in'
            });
        };

        // step 3. decode the token.
        // (NODE !) jwt return the callback function. 
        // Promisify er kaj hooloo jekonow callback function ke promise aa convert korte pari.
        const decoded = await promisify(jwt.verify)(token, process.env.TOKEN_SECREC);

        // user all the information 
        // const user = User.findOne({ email: decoded.email });

        // step 4. if valid The next. 
        req.user = decoded;
        next();

    } catch (error) {
        res.status(403).json({
            status: 'fail',
            error: 'Invalid token'
        });
    }
};