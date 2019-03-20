const express = require('express');
const router = express.Router();


const user_controller = require('../controllers/user.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', user_controller.test);
router.post('/create', user_controller.create_user);
router.post('/check', user_controller.check_user);
module.exports = router;