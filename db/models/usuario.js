const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Usuario extends Model {
    static associate(models) {
      // Defina associações aqui, se necessário
    }
  }

  Usuario.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      senha: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Usuario",
    }
  );

  return Usuario;
};
