const express = require('express');
const userController = require('../Controller/user');
const authenticateMiddleware = require('../middleware/auth');
const expenseController = require('../Controller/expense');
const user = require('../Models/users');
const router = express.Router();


router.post('/signup',userController.signUp);
router.post('/login', userController.login);

router.post('/addexpense', authenticateMiddleware.authenticate, expenseController.addExpense);
router.get('/getexpenses', authenticateMiddleware.authenticate, expenseController.getexpenses);
router.delete('/deleteexpense/:expenseid', authenticateMiddleware.authenticate, expenseController.deleteexpense);


module.exports = router;