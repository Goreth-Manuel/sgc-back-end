const User = require('../model/user');

async function migration() {
    try {
        await User.sync();
        console.log('Tabela usuario criado');
    } catch (error) {
        console.error('Error ao criar as tabelas', error);
    }
}
migration()
