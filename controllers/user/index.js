const express = require('express');
const bcrypt = require('../../util/bcript');
const router = express.Router();
const { createSchema } = require('./schema')

const userService = require('../../model/user');

router.get('/user', async (req, res) => {
    const users = await userService.findAll()
    res.send({ users })
});
router.get('/user/:id', async (req, res) => {
    const { id } = req.params;
    const user = await userService.findOne({ where: { id } })
    if (!user) return res.status(404).send({ message: 'user not found' })
    return res.send({ user })
});
router.post('/user', async (req, res) => {
    // const isInvalid = await createSchema.validate(req.body);
    const { name, email, password } = req.body
    const userExist = await userService.findOne({ where: { email } })
    if (userExist) return res.status(400).send({ message: 'user already exist' })
    const ecriptedPassword = await bcrypt.hashPassword(password)
    const newUser = await userService.create({ name, email, password: ecriptedPassword })
    res.send({ user: newUser })
});

router.put('/user/:id', async (req, res) => {
    // const isInvalid = await createSchema.validate(req.body);
    const { id } = req.params;
    const { name, email, password } = req.body
    const userExist = await userService.findOne({ where: { id } })
    if (!userExist) return res.status(400).send({ message: 'user dont exist' })
    const ecriptedPassword = await bcrypt.hashPassword(password)
    const updatedUser = await userService.update({
        name, email, password: ecriptedPassword
    }, { where: { id } })
    console.log(updatedUser)
    res.send({ user: updatedUser })
});
router.delete('/user/:id', async (req, res) => {
    const { id } = req.params;
    const userExist = await userService.findOne({ where: { id } })
    if (!userExist) return res.status(400).send({ message: 'user dont exist' })
    const response = await userService.destroy({ where: { id } })
    if (!response) return res.status(500).send({ message: 'internal error' })
    return res.status(200)
});

module.exports = router