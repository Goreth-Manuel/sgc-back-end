const express = require('express');
const dotenv = require("dotenv/config.js");
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('../../util/bcript');
const { AutSchema } = require('./schema')
const userService = require('../../model/user');

const secretKey = process.env.SECRET_JWT

router.post('/auth', async (req, res) => {
    // await AutSchema.validate(req.body);

    const { email, password } = req.body
    const user = await userService.findOne({ where: { email } })
    if (!user) return res.status(404).send({ message: 'user not found' })
    const match = await bcrypt.comparePasswords(password, user.dataValues.password);
    if (!match) return res.status(401).send({ message: 'wrong password' })
    const token = jwt.sign({ user: user.user }, secretKey, { expiresIn: '1h' });
    return res.send({ user, token })
});

module.exports = router