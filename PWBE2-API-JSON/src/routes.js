const express = require('express');
const router = express.Router();

const PessoaController = require('./controllers/PessoaController');

router.get('/pessoa', PessoaController.buscarTodos);
router.get('/pessoa/:id', PessoaController.buscarUm);
router.post('/pessoa', PessoaController.inserir);
router.put('/pessoa/:id', PessoaController.alterar);
router.delete('/pessoa/:id', PessoaController.excluir);

module.exports = router; // exportando o modulo router para administrar as rotas

