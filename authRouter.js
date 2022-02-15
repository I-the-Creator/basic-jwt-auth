// routes for sending requests

//import Router and create new Router object  - it listens for requets GET, PUSH etc.
const Router = require('express')
const router = new Router();

// Express-validator - middleware
const { check } = require('express-validator');

// Middleware
const authMiddleware = require('./middleware/authMiddleware')
const roleMiddleware = require('./middleware/roleMiddleware')

// Import Controller
const controller = require('./authController')

// POST requests - url and function with validation
router.post('/registration', [  
    check('username', 'Username cannot be empty').notEmpty(),
    check('password', 'Password must be at least 4 and not more than 10 characters long').isLength({min:4, max:10})
], controller.registration)
router.post('/login', controller.login)
// GET request - to establish user role - request via middleware - 
// router.get('/users', authMiddleware, controller.getUsers)
router.get('/users', roleMiddleware(['ADMIN', 'USER']), controller.getUsers)

//Export router object
module.exports = router;