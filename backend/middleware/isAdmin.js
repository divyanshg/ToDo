const jwt = require('jsonwebtoken');

function isAdmin(req, res, next) {
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
            if(decoded.isAdmin){
                next();
            }
            else{
                return res.status(401).send({
                    auth: false,
                    message: 'You are not authorized to perform this action.'
                });
            }
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: "Something went wrong"
        })
    }
}

module.exports = isAdmin;