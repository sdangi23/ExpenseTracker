const Sequelize = require('sequelize');

const sequelize = new Sequelize('ExpenseTrackerDB', 'root', 'shubhamdangi', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;