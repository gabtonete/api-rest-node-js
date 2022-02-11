const PerfilRepository = require("../repositories/impl/MongoDBPerfilRepository");

class PerfilService {
    deletarPerfil(idLogado, senhaBody) {
        const filtro = {
            _id: idLogado,
        }

        const senhaFiltro = senhaBody
        
        return PerfilRepository.deletarPorIdESenha(filtro, senhaFiltro)
    }
}

module.exports = PerfilService;