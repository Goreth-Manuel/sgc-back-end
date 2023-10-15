const express = require('express');
//chamar a função express
const router = express.Router();

//Incluir o arquivo que possui a conexão com o banco de dados
const db = require('./../db/models');

// Bibliotece para validar os campos do formulário
const yup = require('yup')
//criar rota listar
router.get('/usuarios', async (req, res) => {
    //Receber o número da página, quando não é enviado o número da página é atribuido 
    // a página 1
    const { page } = req.query;
    console.log(page);

    //recuperar todos os usuários do banco de dados
    const usuario = await db.Usuario.findAll({
        // Ordenar os registros pela coluna id na forma decrescente
        //order: [['id', 'ASC']]
    })
    
    if (usuario) {
        return res.json({
            usuario
        });
    } else {
        return res.status(400).json({
            mensagem: 'Erro: Nenhum cadastro enviado'
        });
    }
    /*
    try{
        const usuario = await db.usuario.findAll({
            usuario
        })
    } catch (err) {
        return res.status(400).send({error: 'Nenhum cadatrado encontrado'})

    }
    */
   
});

//criar a rota cadastrar
router.post("/usuarios", async (req, res) => {

    // Validar os dados enviados pelo formulário
    const schema = yup.object().shape({
        senha: yup.string("Erro: Insira a sua senha").required("Insira a sua senha"),
        email: yup.string().email("Insira o seu email").required("Insira o seu email"),
        name: yup.string("Erro: Insira o seu nome").required("Insira o seu nome")
    });
    
    try {
        await schema.validate(req.body);
    }catch(error) {
        return res.status(400).json({
            error: true,
            message: error.erros
        })
    }

    try{
        const usuario = await db.Usuario.create(req.body);
        //return res.send({ usuario });
        return res.json({ messagem: 'Usuário cadastrado', usuario });
    } catch (err) {
        return res.status(400).send({error: 'Não cadatrado'})
    }
    /*
    
    //receber os dados enviados no corpo da requisição
    var dados = req.body;
    console.log(dados);

    //salvar no banco de dados
    await db.Usuario.create(dados).then((dadosUsuario) => {
        return res.json({
            messagem: "Usuário cadastrado!",
            dadosUsuario
        });
     }).catch(() => {
        return res.json({
            messagem: "Erro: Usuário não cadastrado!",
        });

    });
  */
});

// Criar rota Visualizar e receber o parâmetro id enviado na url
router.get('/usuarios/:id', async(req, res) => {

    // Receber o parâmetro enviado na URL
    const { id } = req.params;
    //console.log(id);

    //Recuperar o registo do banco de dados
    const usuario = await db.Usuario.findOne({
        // Indicar quais colunas recuperar
        attributes: ['id', 'name', 'email', 'senha', 'createdAt', 'updatedAt'],

        //Acrescentar a condição de qual registro deve ser retornado do banco de dados
        where: { id },
    });
    //console.log(usuario);

    //Acessa o IF se encontrar o registro no banco de dados
    if (usuario) {
         // Pausar o processamento e retornar os dados
         return res.json({
            usuario: usuario.dataValues
        });

    }else{
        // Pausar o processamento e retornar a mensagem de erro
        return res.status(400).json({
            mensagem: "Usuario não encontrado"
        });

    }

});

//Criar a rota editar
router.put('/usuarios', async(req, res) => {

    //Receber os dados enviados no corpo da requisição
    const dados = req.body;
    //console.log(dados);

    //Editar no banco de dados
    await db.Usuario.update(dados, { where: { id: dados.id }})
    .then(() => {
        return res.json({
            mensagem: " Usuário editado com sucesso!"
        })

    }).catch(() => {
        return res.status(400).json({
            mensagem: "Erro: Usuário não editado!"
        });
    });
});

// Criar a rota apagar
router.delete('/usuarios/:id', async(req, res) => {

    //Receber o parâmetro enviado na URL
    const { id } = req.params

    // Apagar usuário no banco de dados utilizando a MODELS usuarios
    await db.Usuario.destroy({
        // O where na instrução SQL indica qual registro excluir no BD
        where: {id}
    }).then(() => {
        return res.json({
            mensagem: "Usuário apagado com sucesso"
        })   

    }).catch(() => {
        return res.status(400).json({
            mensagem: "Erro: Usuário não apagado"
        }); 
    })
 
})

// Exportar a instrução que está dentro da costante router
module.exports = router;
