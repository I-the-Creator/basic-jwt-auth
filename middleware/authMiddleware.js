const jwt = require('jsonwebtoken');
const { secret } = require('../config')

// middleware gives access only to authorized users - with JWT token
module.exports = function(req, res, next) {
    if(req.method === "OPTIONS") {
        // call next middleware in middleware-chain
        next()
    }

    try {
        //extract token from request headers; we need only token itself without type - split by space and use [1] array element
        const token = req.headers.authorization.split(' ')[1]
        if(!token) {
            return res.status(403).json({message: "User is not authorized"})
        }
        // decode token with jwt.verify() - inside object with id and users roles - payload from generateAccessToken()
        const decodedData = jwt.verify(token, secret)
        // to use that data in other functions - create new field 'user' and send there decodedData
        req.user = decodedData
        // call next middleware in middleware-chain
        next()
    } catch (error) {
        console.log(error)
        return res.status(403).json({message: "User is not authorized"})
    }
}