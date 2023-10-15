const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const usuario = require("../db/models/usuario");
const express = require("express");
const router = express.Router();
//const db = require('./../db/models');

router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;
    const Usuario = await usuario.findOne({
      where: { email },
    });

    if (!Usuario) {
      return res
        .status(400)
        .json({ message: "Não existe nenhum usuário com este email" });
    }

    const senhaUsuario = await compare(senha, Usuario.senha);

    if (!senhaUsuario) {
      return res.status(400).json.send({ error: "Senha incorrecta" });
    }

    const token = sign({ id: Usuario.id }, process.env.SECRET_JWT, {
      expiresIn: 3600,
    });

    return res.json({ auth: true, token: token });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;

/*
router.post('/login', async (req, res) => {
    console.log(req.body);

    return res.json({
        erro: false,
        mensagem: 'Login'
    })
})

module.exports = router;
*/
