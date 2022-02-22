const UsuarioRepository = require('../repositories/impl/MongoDBUsuarioRepository');
const TarefaRepository = require('../repositories/impl/MongoDBTarefaRepository');

class UsuarioService {
    async cadastrar(dadosUsuario) {
        const listaErros = [];

        if (!dadosUsuario.nome || !dadosUsuario.nome.toString().trim()) {            
            listaErros.push('Nome do usuário inválido');
        } else {
            // tenta fazer a conversão do nome para número
            const nomeParseado = parseInt(dadosUsuario.nome);

            // verifica se o retorno é um número
            const eUmNumero = !Number.isNaN(nomeParseado);
            if (eUmNumero) {
                listaErros.push('Nome do usuário inválido');
            }
        }        
        
        if (!dadosUsuario.emailUsuario || !dadosUsuario.emailUsuario.toString().trim()) {
            listaErros.push('E-mail do usuário inválido');
        } else {
            const temArroba = dadosUsuario.emailUsuario.indexOf('@') !== -1;
            const temPonto = dadosUsuario.emailUsuario.indexOf('.') !== -1;

            if (!temArroba || !temPonto) {
                listaErros.push('E-mail do usuário inválido');
            } else {
                // filtra no banco se existe algum usuário com o mesmo emailUsuario
                const usuarioComMesmoemailUsuario = await UsuarioRepository.filtrar({
                    email: dadosUsuario.emailUsuario
                });

                if (usuarioComMesmoemailUsuario && usuarioComMesmoemailUsuario.length) {
                    listaErros.push('Já existe um usuário com o mesmo emailUsuario cadastrado');
                }
            }
        }

        if (!dadosUsuario.senhaUsuario || !dadosUsuario.senhaUsuario.trim()) {
            listaErros.push('senhaUsuario inválida');
        }

        const retorno = {
            erros: null,
            usuario: null
        };

        if (listaErros.length) {
            retorno.erros = listaErros;
        } else {
            // faz o cadastro do usuario efetivamente no banco de dados
            const usuarioCadastrado = await UsuarioRepository.cadastrar({
                nome: dadosUsuario.nome,
                email: dadosUsuario.emailUsuario,
                senha: dadosUsuario.senhaUsuario
            });

            retorno.usuario = usuarioCadastrado;
        }

        return retorno;
    }

    async deletar(usuarioId) {
        if(await TarefaRepository.deletarTarefas(usuarioId) != -1){
            await UsuarioRepository.deletarTudo(usuarioId);
            return true;
        }else{
            return false;
        }

        
    }
}

module.exports = UsuarioService;