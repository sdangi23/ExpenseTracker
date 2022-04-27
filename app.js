const express = require('express');
const cors = require('cors');

const sequelize = require('./utils/database.js');
const User = require('./Models/users');
const Expense = require('./Models/expense');

const userRoutes = require('./Routes/user');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/user' , userRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

sequelize
//.sync({ alter: true })
.sync()
    .then(() => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    })