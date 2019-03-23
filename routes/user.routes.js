const express = require('express');
const router = express.Router();


const user_controller = require('../controllers/user.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/', user_controller.user);
router.post('/register', user_controller.register);
router.post('/login', user_controller.login);
module.exports = router;