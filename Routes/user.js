const express = require('express');
const userController = require('../Controller/user');
const authenticateMiddleware = require('../middleware/auth');
const expenseController = require('../Controller/expense');
const user = require('../Models/users');
const router = express.Router();


router.post('/signup',userController.signUp);
router.post('/login', userController.login);

router.post('/addexpense', authenticateMiddleware.authenticate, expenseController.addExpense);


module.exports = router;