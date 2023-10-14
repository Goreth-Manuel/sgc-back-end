const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      // Defina associações aqui, se necessário
    }
  }

  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      senha: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Usuarios",
    }
  );

  return User;
};
