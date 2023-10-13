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

(async () => {
    try {
        await User.sync();
        console.log('Tabela usuario criado');
    } catch (error) {
        console.error('Error ao criar as tabelas', error);
    }
})();

module.exports = User
