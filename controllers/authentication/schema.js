const yup = require('yup')


const AutSchema = yup.object().shape({
    password: yup.string("Erro: Insira a sua senha").required("Insira a sua senha"),
    email: yup.string().email("Insira o seu email").required("Insira o seu email"),
});

module.exports = { AutSchema }