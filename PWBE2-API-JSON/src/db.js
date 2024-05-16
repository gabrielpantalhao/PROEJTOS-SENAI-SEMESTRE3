const mysql = require('mysql'); // criando a constante para instanciar o mysql

// criando a constante que irá armazenar os dados para conectar com MySQL.
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    insecureAuth: true // Adicione esta linha
});

// Criando coxexão com o banco e fazendo condição para verificação caso erro
connection.connect((error) => {
    if(error) throw error;
    console.log(`Conectado ao banco de dados: ${process.env.DB_NAME}`)
});

// criando o mudule.exports para conseguir exportar a conexão.
module.exports = connection;


