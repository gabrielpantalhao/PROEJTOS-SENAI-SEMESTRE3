const express = require("express");
const router = express.Router();

const {clienteController} = require('../controllers/clienteController');

router.get("/cliente", clienteController.selecionarTodosClientes);
// router.get("/cliente/:id", clienteController.selecionarUmCliente);
router.get("/cliente/:nome", clienteController.selecionarUmClientePorNome);
router.post("/cliente", clienteController.insereClientes);
router.put("/cliente/:id", clienteController.atualizaClientes);
router.delete("/cliente/:id", clienteController.deletaClientes);

module.exports = router;