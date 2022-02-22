const HttpController = require("./HttpController");
const UsuarioService = require('../services/UsuarioService');

class UsuarioController extends HttpController {
    configurarRotas(baseUrl) {
        // define a rota de cadastro de usuário
        this.express.post(`${baseUrl}/usuario`, this.cadastrar.bind(this));
        this.express.delete(`${baseUrl}/usuario`, this.deletar.bind(this));
    }

    async cadastrar(req, res) {
        const dadosUsuario = req.body;

        try {
            const servico = new UsuarioService();
            const retornoServico = await servico.cadastrar(dadosUsuario);

            if (retornoServico.erros) {
                return res
                    .status(400)
                    .json({
                        status: 400,
                        erro: retornoServico.erros.join(', ')
                    })
            }

            req.logger.info('usuário cadastrado com sucesso');
            res.json({
                msg: 'Usuário criado com sucesso'
            });
        } catch (error) {
            req.logger.error('erro ao cadastrar usuário, error=' + error.message);
            res.status(500).json({
                erro: 'Ocorreu um problema ao cadastrar o usuário, tente novamente mais tarde.',
                status: 500
            });
        }
    }

    async deletar(req, res) {
        try {
            const usuarioId = req.usuario.id;
            const servico = new UsuarioService();
            const result = await servico.deletar(usuarioId);

            if (result) {
                res.status(200).json({
                    msg: "Usuário e tarefas deletados com sucesso"
                })
            }

        } catch (error) {
            req.logger.error('erro ao deletar usuário, error=' + error.message);
            res.status(500).json({
                erro: 'Ocorreu um problema ao deletar o usuário, tente novamente mais tarde.',
                status: 500
            });
        }
    }
}

module.exports = UsuarioController;