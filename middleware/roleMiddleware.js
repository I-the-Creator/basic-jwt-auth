const jwt = require('jsonwebtoken');
const { secret } = require('../config')

// middleware to get access only to user with ADMIN role. 'roles' - array of user roles
module.exports = function(roles) {
    return function(req, res, next) {
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
            // get roles array (as userRoles) from token - array of allowed roles for function which will be called after middleware
            const { roles: userRoles} = jwt.verify(token, secret)
            // check the user's roles array contains at least one role from 'allowed-roles-array'
            let hasRole = false
            userRoles.forEach(role => {
                if(roles.includes(role)) {
                    hasRole = true
                }
            })
            if(!hasRole) {
                return res.status(403).json({message: "You have no permissions to access this page"})
            }
            
            // call next middleware in middleware-chain
            next()
        } catch (error) {
            console.log(error)
            return res.status(403).json({message: "User is not authorized"})
        }
    }
}