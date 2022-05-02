const express = require('express');
const user = require('../Models/users');
const userController = require('../Controller/user');

const router = express.Router();

router.get('/getUserExpenses', userController.getUserExpenses);



module.exports = router;