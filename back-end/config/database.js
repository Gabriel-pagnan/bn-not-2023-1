const mongoose = require('mongoose');

/*
    usa desestruturação para obter as variáveis de ambiente nescessarias paara realizar 
    a conexão ao banco de dados
*/

const {
    MONGODB_USER,
    MONGODB_PASS,
    MONGODB_SERVER,
    MONGODB_DATABASE
} = process.env

module.exports = function() {
    // Conecta ao banco de dados
    mongoose.connect(`mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@${MONGODB_SERVER}/${MONGODB_DATABASE}?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    mongoose.connection.on('connected', ()=> console.log('MONGOOSE conectado com sucesso'))
    mongoose.connection.on('disconnected', ()=> console.log('MONGOOSE desconectado'));
    mongoose.connection.on('error', error=> console.error('Erro ao se conectar' + error));

    //quando for detectado o comando de interrupção CTRL + C
    process.on('SIGINT', ()=> {
        console.log('MONGOOSE desconectado');
        mongoose.connection.close()
        process.exit(0);
    })
}