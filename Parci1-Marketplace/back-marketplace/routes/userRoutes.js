const express = require('express');
const controller = require('../controllers/userController');
const router = express.Router();

router.post('/newUser', controller.newUser);
router.post('/newAdmin', controller.newAdmin);
router.post('/login', controller.login);

module.exports = router;