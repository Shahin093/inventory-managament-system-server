const { signupService, findByEmail } = require("../services/user.service");
const User = require("../models/User");
const { generateToken } = require("../utilis/token");

exports.signup = async (req, res, next) => {
    try {
        const user = await signupService(req.body);
        res.status(200).json({
            status: 'Success',
            message: 'Successfully sign up '
        });
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            error: error.message
        });
    }
}

/**
 * Step Login System : : : ---->
 * 1. check if Email and password are given 
 * 2. load user with email
 * 3. if not user (send res)
 * 4. compare pass
 * 5. if password not correct send res
 * 6. check user is active
 * 7. if not active send res
 * 8. generate token 
 * 9. send user an  token 
 */
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // 1. check if Email and password are given  
        if (!email || !password) {
            return res.status(401).json({
                status: "fail",
                error: "Please provide your credentials",
            });
        }

        // 2. load user with email 
        const user = await findByEmail(email);
        // 3. if not user (send res) 
        if (!user) {
            return res.status(401).json({
                status: "fail",
                error: "No user found. Please create an account",
            });
        }

        // 4. compare pass 
        const isPasswordValid = user.comparePassword(password, user.password);
        // 5. if password not correct send res 
        if (!isPasswordValid) {
            return res.status(403).json({
                status: "fail",
                error: "Password is not correct",
            });
        }

        // 6. check user is active 
        // 7. if not active send res 
        if (user.status != "active") {
            return res.status(401).json({
                status: "fail",
                error: "Your account is not active yet.",
            });
        }

        // 8. generate token 
        const token = generateToken(user);

        // step 9: send user an token 
        const { password: pwd, ...others } = user.toObject();
        res.status(200).json({
            status: "success",
            message: "Successfully logged in",
            data: {
                user: others,
                token,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            error,
        });
    }
}