const jwt = require('jsonwebtoken');

function generateToken(req, res) {
    try {
        let token = jwt.sign({
                userId: req.params.user,
                [req.params.user == 'admin' && 'isAdmin' || 'isUser']: true
            },
            process.env.TOKEN_SECRET, {
                expiresIn: "1h"
            }
        );
        res.json({token});
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: "Something went wrong"
        })
    }
}

module.exports = generateToken;