const PerfilService = require('../services/PerfilService');
const HttpController = require('./HttpController');

class PerfilController extends HttpController {
    setupRoutes(baseUrl) {
        this.express.get(`${baseUrl}/perfil`, this.informar.bind(this));
        this.express.post(`${baseUrl}/perfil`, this.deletarPerfil.bind(this));
    }

    informar(req, res) {
        res.json({ msg: " Você está logado " });
        const idLogado = req.usuario.id;
        console.log(idLogado);
    }

    async deletarPerfil(req, res) {
        try {
            const idLogado = req.usuario.id;
            const senhaBody = req.body.senha;

            const service = new PerfilService();

            const resp = await service.deletarPerfil(idLogado, senhaBody);

            res.json(resp)
        } catch {
            throw new Error("falha no engano")
        }
    }
}

module.exports = PerfilController;