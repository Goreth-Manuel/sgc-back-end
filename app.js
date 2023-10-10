//Incluir as bibliotecas
const express = require('express');

const cors = require('cors'); // Importar a bibliotece para permitir conexão externa
//chamar a função express
const app = express();

//Criar o middleware para receber os dados no corpo da requisição
// middleware é uma instrução que é executada antes de executar a rota
app.use(express.json());

//Criar o middleware para permitir requisição externa
app.use((req, res, next) => {
    // Qualquer endereço pode fazerrequisição
    res.header("Access-Control-Allow-Origin", "*");
    // Tipos dr métodos que a API aceita
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    //Permitir o envio de dados para API
    res.header("Access-Control-Allow-Headers", "Content-Type");
    // Executar o cors
    app.use(cors());
    // Quando não houver erro deve continuar o processamento
    next();

})
//testar a conexão com o BD
//const db = require("./db/models");

// incluir os CONTRLLERS
const usuarios = require('./controllers/usuarios')
const login = require('./controllers/login')

//criar as rotas
app.use('/', usuarios);
app.use('/', login);

app.listen(8080, () => {
    console.log('Servidor rodando na porta 8080')
});