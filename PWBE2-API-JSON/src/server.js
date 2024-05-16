require('dotenv').config({path:'veriaveis.env'}); // Possibilita o acesso ao caminho das variaveis.env

// Armazenando dependencias em constantes
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); // Utilizado para converter requisições em outros formatos (Jason, string, xml e outros)
const routes = require('./routes'); // Indicando para a aplicação onde ficarão armazenadas as rotas.

const server = express(); // Chamando o express no arquivos server para controla-lo

// Colocando em uso algumas dependencias
server.use(cors());
server.use(bodyParser.urlencoded({extended: false}));

server.use(express.json()); // Adicionando o middleware express.json() para análise de corpo JSON

server.use('/api', routes) // criando um prefixo para nossa rota

// Chamando o servidor na porta expecificada em nossa variavel PORT.
server.listen(process.env.PORT, () => {
    console.log(`Servidor rodando em http://localhost:${process.env.PORT}`);
});





