const express = require('express');
const user = require('../Models/users');
const userController = require('../Controller/user');

const router = express.Router();

router.get('/getUserExpenses', userController.getUserExpenses);

router.post('/password/forgotpassword' , userController.getPassword);

module.exports = router;