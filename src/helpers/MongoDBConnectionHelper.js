const mongoose = require('mongoose');

class MongoDBConnectionHelper {
    // define um método estatico que faz a conexão com o mongodb
    // como o método é estatico eu não preciso instânciar o objeto para usar
    static conectar() {
        // faz efetivamente a conexão com o mongodb
        const conexao = mongoose.connect('mongodb+srv://devariauser:nT4PhearF6lDje70@gerenciadortarefa2.6t0su.mongodb.net/GerenciadorTarefa2?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // quando a conexão for realizada com sucesso, ele vai mostrar a mensagem de sucesso
        mongoose.connection.on('connected', () => console.log('Conectado ao mongodb'));

        // se der algum erro na conexão, ele vai mostrar a mensagem de erro
        mongoose.connection.on('error', e => console.error('Erro ao conectar com o mongodb', e.message));

        return conexao;
    }
}

module.exports = MongoDBConnectionHelper;