// Import do framework express
const express = require("express");
const clienteRoute = require('./src/routes/clienteRoute');

const app = express();

app.use(express.json())

app.use('/', clienteRoute);

// Inicia o servidor na porta informada _____________________________________________________________________________________
app.listen(3000, ()=>{
    console.log("Servidor respondendo no porta 3000")
});