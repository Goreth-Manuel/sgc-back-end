const express = require("express");
const router = express.Router();
const { hash } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { Sequelize } = require("sequelize");
const initUsuarioModel = require("../db/models/usuario");
const config = require("../db/config/config");

const environment = process.env.NODE_ENV || "development";
const dbConfig = config[environment];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
  }
);

const Usuario = initUsuarioModel(sequelize);

router.post("/register", async (req, res) => {
  try {
    const { name, email, senha } = req.body;

    // Verifique se o email já está em uso
    const existingUser = await Usuario.findOne({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "O email já está em uso" });
    }

    // Hash a senha antes de armazená-la no banco de dados
    const hashedSenha = await hash(senha, 10);

    // Crie um novo usuário
    const newUser = await Usuario.create({
      name,
      email,
      senha: hashedSenha,
      // Outros campos de usuário, se houverem
    });

    // Gere um token JWT para o novo usuário
    const token = sign({ id: newUser.id }, process.env.SECRET_JWT, {
      expiresIn: 3600, // Tempo de expiração do token em segundos
    });

    res.json({ auth: true, token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro no registro" });
  }
});

module.exports = router;
