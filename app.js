const express = require('express');
const cors = require('cors');

const sequelize = require('./utils/database.js');
const User = require('./Models/users');
const Expense = require('./Models/expense');
const Order = require('./Models/order');
const Forgotpassword = require('./Models/forgotpassword');

const userRoutes = require('./Routes/user');
const purchaseRoutes = require('./Routes/purchase');
const generalRoutes = require('./Routes/general');
//const resetPasswordRoutes = require('./routes/resetpassword');

const app = express();

const dotenv = require('dotenv');
dotenv.config();

app.use(cors());

app.use(express.json());

app.use('/user' , userRoutes);
app.use('/purchase',purchaseRoutes);
//app.use('/password', resetPasswordRoutes);
app.use('/' , generalRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

// User.hasMany(Forgotpassword);
// Forgotpassword.belongsTo(User);

sequelize
//.sync({ alter: true })
.sync()
    .then(() => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    })