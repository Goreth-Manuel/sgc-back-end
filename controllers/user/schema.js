const yup = require('yup')


const createSchema = yup.object().shape({
    password: yup.string("Erro: Insira a sua senha").required("Insira a sua senha"),
    email: yup.string().email("Insira o seu email").required("Insira o seu email"),
    name: yup.string("Erro: Insira o seu nome").required("Insira o seu nome")
});

module.exports = { createSchema }