const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(401).json({
            success: false,
            message: "Missing authorization header"
        })
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        var tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!tokenDecoded.id) { //TODO cek lagi
            return res.status(401).json({
                success: false,
                message: "unathorized"
            })
        }

        res.locals.userId = tokenDecoded.id
        next()
    } catch(e){
        next(e)
    }
};