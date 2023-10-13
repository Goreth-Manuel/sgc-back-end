const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/sequelize')

const User = sequelize.define('user', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    }
}, {

});

module.exports = User
