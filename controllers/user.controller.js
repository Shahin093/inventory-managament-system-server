const { signupService } = require("../services/user.service")

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