// routes for sending requests

//import Router and create new routeк object  - it listens for requets GET, PUSH etc.
const Router = require('express')
const router = new Router();

// Express-validator - middleware
const { check } = require('express-validator');

// Import Controller
const controller = require('./authControler')

// POST requests - url and function with validation
router.post('/registration', [  
    check('username', 'Username cannot be empty').notEmpty(),
    check('password', 'Password must be at least 4 and not more than 10 characters long').isLength({min:4, max:10})
], controller.registration)
router.post('/login', controller.login)
// GET requet - to establish user role
router.get('/users', controller.getUsers)

//Export router object
module.exports = router;