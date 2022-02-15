const mongoose = require('mongoose');

// Configuração geral do mongoose e sua conexão com o MongoDB Atlas
class MongoDBHelper {
    // A função connect do helper usa o método connect() do mongoose, passando como parâmetro a connectionstring e as options
    static connect() {
        const conexao = mongoose.connect('mongodb+srv://devariauser:nT4PhearF6lDje70@gerenciadortarefa2.6t0su.mongodb.net/GerenciadorTarefa2?retryWrites=true&w=majority', {
           useNewUrlParser: true,
           useUnifiedTopology: true
        });

        mongoose.connection.on('connected', () => console.log('Conectado ao mongoDB'));

        mongoose.connection.on('error', e => console.error('Erro ao conectar o mongoDB', e.message));        
        
        return conexao;
    }
}

module.exports = MongoDBHelper;