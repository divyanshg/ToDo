const jwt = require('jsonwebtoken');

function isTokenValid(req, res, next) {
    try {
        let token = req.headers['authorization'];
        token = token.split(" ")[1]

        if (!token) {
            return res.status(401).send({
                auth: false,
                message: 'No token provided.'
            });
        }
        jwt.verify(token, process.env.TOKEN_SECRET, function (err, decoded) {
            if (err) {
                console.log(err)
                return res.status(500).send({
                    auth: false,
                    message: 'Failed to authenticate token.'
                });
            }
            req.userId = decoded.userId;
            next();
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: "Something went wrong"
        })
    }
}

module.exports = isTokenValid;