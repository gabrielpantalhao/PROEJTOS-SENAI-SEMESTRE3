const PessoaService = require('../services/PessoaService');

module.exports = {
    buscarTodos: async (req, res) => {
        try {
            const pessoas = await PessoaService.buscarTodos();
            const results = pessoas.map(pessoa => ({
                id: pessoa.id,
                nome: pessoa.nome,
                data_nasc: pessoa.data_nasc,
                cpf: pessoa.cpf,
                sexo: pessoa.sexo,
                estado_civil: pessoa.estado_civil,
                email: pessoa.email,
                telefone: pessoa.telefone,
            }));
            res.json({ error: '', results });
        } catch (error) {
            res.json({ error: error.message, results: [] });
        }
    },

    buscarUm: async (req, res) => {
        try {
            const pessoa = await PessoaService.buscarUm(req.params.id);
            if (pessoa) {
                res.json({ error: '', results: pessoa });
            } else {
                res.json({ error: 'Pessoa não encontrada', results: {} });
            }
        } catch (error) {
            res.json({ error: error.message, results: {} });
        }
    },

    inserir: async (req, res) => {
        const { nome, data_nasc, cpf, sexo, estado_civil, email, telefone } = req.body;
        if (nome && data_nasc && cpf && sexo && estado_civil && email && telefone) {
            try {
                const id = await PessoaService.inserir(nome, data_nasc, cpf, sexo, estado_civil, email, telefone);
                res.json({ error: '', result: { id, nome, data_nasc, cpf, sexo, estado_civil, email, telefone } });
            } catch (error) {
                res.json({ error: error.message, result: {} });
            }
        } else {
            res.json({ error: 'Campos não enviados', result: {} });
        }
    },

    alterar: async (req, res) => {
        const { id } = req.params;
        const { nome, data_nasc, cpf, sexo, estado_civil, email, telefone } = req.body;
        if (id && nome && data_nasc && cpf && sexo && estado_civil && email && telefone) {
            try {
                await PessoaService.alterar(id, nome, data_nasc, cpf, sexo, estado_civil, email, telefone);
                res.json({ error: '', result: { id, nome, data_nasc, cpf, sexo, estado_civil, email, telefone } });
            } catch (error) {
                res.json({ error: error.message, result: {} });
            }
        } else {
            res.json({ error: 'Campos não enviados', result: {} });
        }
    },

    excluir: async (req, res) => {
        try {
            await PessoaService.excluir(req.params.id);
            res.json({ error: '', result: {} });
        } catch (error) {
            res.json({ error: error.message, result: {} });
        }
    }
};
