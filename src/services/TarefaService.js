const TarefaRepository = require('../repositories/impl/MongoDBTarefaRepository');

class TarefaService {
    constructor(idUsuario) {
        this.idUsuario = idUsuario;
    }

    async listar(filtro = {}) {
        filtro.idUsuario = this.idUsuario;
        return TarefaRepository.filtrarPorUsuarioPeriodoEStatus(filtro);
    }

    async cadastrar(dados) {
        const erros = [];
        if (!dados) {
            erros.push('Favor enviar os dados para cadastro da tarefa');
        } else {
            if (!dados.nome || !dados.nome.trim()) {
                erros.push('Nome da tarefa é obrigatório');
            } else if (dados.nome.length < 4) {
                erros.push('Nome da tarefa precisa de pelo menos 4 caracteres');
            }

            if (!dados.dataPrevistaConclusao || !dados.dataPrevistaConclusao.trim()) {
                erros.push('Data prevista de conclusão é obrigatória');
            }
        }

        const resposta = { erros: null, tarefa: null }
        if (erros.length) {
            resposta.erros = erros;
        } else {
            console.log(dados)
            const dataEmString = dados.dataPrevistaConclusao

            const year = dataEmString.substring(0, 4);
            const month = dataEmString.substring(5, 7);
            const day = dataEmString.substring(8, 10);

            const data = new Date();
            const dataPrevistaConclusao = new Date(parseInt(year), parseInt(month), parseInt(day), data.getHours(), data.getMinutes(), data.getSeconds(), data.getMilliseconds());
            console.log(dataPrevistaConclusao)
            // faz o if ternário para determinar a dataConclusao
            const dataConclusao = dados.dataConclusao // verifica se a data de conclusão foi informada
                ? new Date(dados.dataConclusao) // caso positivo, converte para data do js
                : null; // caso negativo retorna null

            const tarefa = {
                nome: dados.nome,
                dataPrevistaConclusao,
                dataConclusao,
                idUsuario: this.idUsuario
            }

            resposta.tarefa = await TarefaRepository.cadastrar(tarefa);
        }

        return resposta;
    }

    async editar(id, dados) {
        const erros = [];
        if (!id) {
            erros.push('ID da tarefa é obrigatório');
        } else {
            const tarefaBD = await TarefaRepository.buscarPorId(id);
            // se a tarefa não existir no banco ou pertencer a outro usuário, informamos que ela não existe
            if (!tarefaBD || tarefaBD.idUsuario !== this.idUsuario) {
                erros.push('Tarefa não foi encontrada');
            }

            if (dados.nome && dados.nome.trim() && dados.nome.trim().length < 4) {
                erros.push('Nome da tarefa precisa ter pelo menos 4 caracteres');
            }
        }
        
        if (erros.length) {
            return {
                erros
            }
        }

        const dadosAtualizar = {};
        if (dados.nome && dados.nome.trim()) {
            dadosAtualizar.nome = dados.nome;
        }

        if (dados.dataPrevistaConclusao && dados.dataPrevistaConclusao.trim()) {
            dadosAtualizar.dataPrevistaConclusao = new Date(dados.dataPrevistaConclusao);
            dadosAtualizar.dataPrevistaConclusao.setHours() = dadosAtualizar.dataPrevistaConclusao.getHours() + 3;
        }

        if (dados.dataConclusao && dados.dataConclusao.trim()) {
            dadosAtualizar.dataConclusao = new Date(dados.dataConclusao);
            dadosAtualizar.dataConclusao.setHours() = dadosAtualizar.dataConclusao.getHours() + 3;
        }

        const tarefaEditada = await TarefaRepository.editar(id, dadosAtualizar);
        return tarefaEditada;
    }

    async deletar(id) {
        const erros = [];
        if (!id) {
            erros.push('ID da tarefa é obrigatório');
        } else {
            const tarefaBD = await TarefaRepository.buscarPorId(id);
            // se a tarefa não existir no banco ou pertencer a outro usuário, informamos que ela não existe
            if (!tarefaBD || tarefaBD.idUsuario !== this.idUsuario) {
                erros.push('Tarefa não foi encontrada');
            }
        }

        const resposta = { erros: null }
        if (erros.length) {
            resposta.erros = erros;
        } else {
            await TarefaRepository.deletar(id);
        }

        return resposta;
    }
}

module.exports = TarefaService;