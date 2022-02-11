const md5 = require('md5');
const Usuario = require('../../models/Usuario');
const PerfilRepository = require('../PerfilRepository');

class MongoDBPerfilRepository {
    static async deletarPorIdESenha(filtro, senhaFiltro){

        const usuarioLogado = await Usuario.findOne(filtro)

        const senhaCodificada = md5(senhaFiltro)
        const senhaDb = usuarioLogado.senha

        if (senhaCodificada === senhaDb) {
            await Usuario.deleteOne({filtro})
            return {msg: `${usuarioLogado.nome} deletado com sucesso, logue novamente`}

        } else {
            return {msg: "seu código tá todo torto amigão"}
        }
    }
}

module.exports = PerfilRepository(MongoDBPerfilRepository);