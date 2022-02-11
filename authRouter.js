// routes for sending requests

//import Router and create new routeк object  - it listens for requets GET, PUSH etc.
const Router = require('express')
const router = new Router();

// Import Controller
const controller = require('./authControler')

// POST requests - url and function
router.post('/registration', controller.registration)
router.post('/login', controller.login)
// GET requet - to establish user role
router.get('/users', controller.getUsers)

//Export router object
module.exports = router;