# API com NodeJs e MySQL (CRUD)
<br>

Liguagens e bibliotecas utilizadas masis utilizadas:
<br><br>
<img src="./src/assets/img/JavaScript1.png" style="width:83px;height:50px;border-radius:10%">
<img src="./src/assets/img/NodeJS_logo.png" style="width:80px;height:50px;border-radius:10%">
<img src="./src/assets/img/express.png" style="width:75px;height:50px;border-radius:10%">
<img src="./src/assets/img/MySql_Logo.png" style="width:80px;height:50px;border-radius:10%">
<img src="./src/assets/img/nodemon1.png" style="width:83px;height:50px;border-radius:10%">
 
 <br>

### Passo a passo 
<br>

1 - Criar a pasta APICARRO em algum local de sua preferencia e abrir com o VSCode.

---
2 - Abrir um terminal e installar as dependencias:

```
npm install express mysql dotenv cors body-parser
npm i nodemon --save-dev
````
Após instalação as mesmas aparecerão no arquivo _package.json_.
````
"dependencies": {
    "body-parser": "^1.20.2",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "mysql": "^2.18.1"
  },
  "devDependencies": {
    "nodemon": "^3.1.0"
  }
````

---
3 - Criar uma pasta dentro da pasta raiz do projeto (apiCarro) com nome de **_"src"_**.

---
4 - Criar um arquivo dentro da pasta raiz do projeto com nome de **_"veriaveis.env"_** onde esse arquivo armazenará senhas, variáveis de ambiente e etc.

---
5 - Dentro da pasta **_src_** criar o arquivo **_"server.js"_**, pois o mesmo se encarregará armazenar as contantes que controlarão todas as requisições do servidor.

---
6 - Dentro da pasta **_src_** criar o arquivo **_"routes.js"_**, pois o mesmo se encarregará de administrar os direcionamentos/rotas da nossa aplicação.

---
7 - Dentro do arquivo **_package.json_** no menu **_Scrips_** realizar a inserção do atributo **_"start": "nodemon ./src/server.js",_** , pois o mesmo se encarregará de controlar o servidor com o **_nodemon_**.

````
"scripts": {
    "start": "nodemon ./src/server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
},
````

---
8 - Configurações iniciais do arquivo **"routes.js"**, onde armazenaremos em constantes o express, router e exportaremos com module.exporte o router.

````
const express = require('express');
const router = express.Router();

module.exports = router; // esportando o modulo router para administrar as rotas
````

---
9 - Configurações iniciais do arquivo **"server.js"**, onde armazenaremos algumas depencias em constantes, colocaremos um uso e inicializaremos o servidor.

````
require('dotenv').config({path:'veriaveis.env'}); // Possibilita o acesso ao caminho das variaveis.env
// console.log("Variáveis carregadas:", process.env);

// Armazenando dependencias em constantes
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); // Utilizado para converter requisições em outros formatos (Jason, string, xml e outros)
const routes = require('./routes'); // Indicando para a aplicação onde ficarão armazenadas as rotas.

const server = express(); // Chamando o express no arquivos server para controla-lo

// Colocando em uso algumas dependencias
server.use(cors());
server.use(bodyParser.urlencoded({extended: false}));

server.use('/api', routes) // criando um prefixo para nossa rota

// Chamando o servidor na porta expecificada em nossa variavel PORT.
server.listen(process.env.PORT, () => {
    console.log(`Servidor rodando em http://localhost:${process.env.PORT}`);
});

````

Aqui nesse momento é possivel rodar no terminal o comando abaixo para averiguar a conexão realizada. 
<br>
(Servidor rodando em http://localhost:3000)
````
npm start
````
````
PS C:\Users\Denilson Araújo\Desktop\apiCarro> npm start

> apicarro@1.0.0 start
> nodemon ./src/server.js

[nodemon] 3.1.0
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node ./src/server.js`
Servidor rodando em http://localhost:3000
````

---
10 - Dentro da pasta **_src_** criar a _pasta_ **_"controllers"_**, a mesma irá amazenar os arquivos que conterão as funções controladoras da nossa aplicação.

---
11 - Dentro da pasta **_controllers_** criar o arquivo **_"CarroController.js"_**, pois o mesmo se encarregará de administrar a execução das funções contidas nele.

---
12 - No arquivo _**routes.js**_ acionaremos a constante **_CarroCotroller_** para que esse arquivo se comunique com as chamadas das funções a conceda o acesso a rota da solicitação

````
const express = require('express');
const router = express.Router();

const CarroCotroller = require('./controllers/CarroController');

module.exports = router; // exportando o modulo router para administrar as rotas
````

---
13 - Dentro da pasta **_src_** criar a _pasta_ **_"services"_**, a mesma irá amazenar os arquivos que conterão as requisições ao banco de dados com as chamadas SQL.

---
14 - Dentro da pasta **services** criar o arquivo **_"CarroService.js"_**, pois o mesmo se encarregará de administrar a execução das funções contidas nele.

---
15 - Configurações iniciais do arquivo **"CarroService.js"**, abrindo o module.exports
````
module.exports = {

};
````

16 - No arquivo **_CarroController_**, iremos abrir  uma constante de **_"const CarroService"_**, para que seja possivel realizar a comunicação com o mesmo.
````
const CarroService = require('../services/CarroService');
````
---
<br>

### Agora será necessário a criação do banco de dados no mySQL

16 - Vá até o mySQL e execute os comandas abaixo para criar a database, criar a tabela carro e popular a mesma.

````
-- Criando a database
create database dbApiCarros;

-- Colocando a database em uso
use dbApiCarros;

-- Criando a tabela de carro com os campos codigo que sera auto preenchido pelo mySql, modelo e placa do carro.
create table carros (
	codigo int primary key auto_increment,
    modelo varchar(30),
    placa varchar(7)
);

-- Inserindo dados na tabela
INSERT INTO carros (modelo, placa) VALUES 
('Toyota Corolla', 'ABC1234'),
('Ford Fiesta', 'XYZ5678'),
('Chevrolet Cruze', 'JKL9012'),
('Volkswagen Golf', 'MNO3456'),
('Hyundai Sonata', 'PQR7890'),
('Nissan Sentra', 'STU2468'),
('BMW 3 Series', 'VWX1357'),
('Mercedes-Benz C-Class', 'YZA8642'),
('Audi A4', 'BCD9753'),
('Kia Optima', 'EFG3184');

-- Verificando o conteúdo inserido na tabela carros
select * from carros;

````

17 - No arquivo variaveis de **_ambiente.env_**, iremos criar as seguintes variáveis que armazenarão informações da nossa conexão com o MySQL.
````
DB_HOST=localhost
DB_USER=root
DB_PASS=1234
DB_NAME=dbApiCarros
````

18 - Criar um arquivo dentro da pasta raiz do projeto com nome de **_"db.js"_** onde esse arquivo armazenará variáveis que realização a conexão da aplicação com o banco de dados MySQL.

````
const mysql = require('mysql'); // criando a constante para instanciar o mysql

// criando a constante que irá armazenar os dados para conectar com MySQL.
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    databse: process.env.DB_NAME
});

// Criando coxexão com o banco e fazendo condição para verificação caso erro
connection.connect((error) => {
    if(error) throw error;
    console.log(`Conectado ao banco de dados: ${process.env.DB_NAME}`)
});

// criando o mudule.exports para conseguir exportar a conexão.
module.exports = connection;
````

19 - Na pasta **_services_**, dentro do arquivo **_CarroService_** iremos inserir a constante **<span style="color:yellow">db</span>**, que será responsável por **_chamar_** a conexão com o banco de dados.

````
const db = require('../db');

module.exports = {

};
````
<br>

### Nessa etapa iremos tentar a conexão com o banco via terminal.

````
npm start
````

Caso de um **_erro 1251_**, será necessário resetar sua senha do MySQL com o seguinte comando **_no MySQL command Line_**.<br>
No Exemplo abaixo está a minha senha utilizada, insira subistituindo pela **sua senha**.
````
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '1234';
````
Atualize as permissões: Após redefinir a senha, você pode precisar atualizar as permissões do usuário root. Isso pode ser feito com o seguinte comando:
````
FLUSH PRIVILEGES;
````
---
<br>

## Daqui para frente criaremos nosso CRUD (Create, Read, Update e Delete), conactando nossa aplicação ao MySQL.
<br>

20 - No arquivo **_routes.js_** iremos criar o **_router.get('/carros', CarroCotroller.buscarTodos);_** que é o rota **executada pela função buscarTodos que está dentro do CarroController**.

````
const express = require('express');
const router = express.Router();

const CarroCotroller = require('./controllers/CarroController');

router.get('/carros', CarroCotroller.buscarTodos);

module.exports = router; // exportando o modulo router para administrar as rotas
````
<br>

---
### 1. CREATE - Criando a função de buscar todos carros cadastrados. 

21 - No arquivo **_CarroController_** dentro da pasta controller, criaremos a função **_buscarTodos_** que receberá o resultado da requisição SQL do carroService, e criaremos um loop (FOR) percorrendo a lista com os atributos que capturaremos (codigo, modelo e placa), e armazenadando os em um resultado do tipo JSON.

````
const CarroService = require('../services/CarroService');

module.exports = {
    // Função que irá realizar a busca de todos registros.
    buscarTodos: async (req, res) => {
        let json = {error: '', results:[]}; // variavel que amazenara erros ou arrays de resultados.

        let carros = await CarroService.buscarTodos(); // varivavel que aguarda retono da função do carroServices (busucarTodos) que busca dados do banco MySQL.

        // Loop que irá fazer a varedura dentro da variavel carros e trazer a informação do codigo e modelo.
        for(let i in carros) {
            json.results.push({
                codigo: carros[i].codigo,
                descricao: carros[i].modelo,
                placa: carros[i].placa,
            });
        }
        res.json(json); // pega o resultado e passa para o formato JSON.
    },
}
````
---
22 - No arquivo **_CarroService_** dentro da pasta services, criaremos a função **_buscarTodos_** que receberá um resultado da query do MySQL.

````
const db = require('../db');

module.exports = {
    // funçao que realizará a busca através dq query SELECT no MySQL trazendo toda lista de carros cadastrados.
    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM carros', (error, results) => {
                if(error) {rejeitado(error); return;}
                aceito(results);
            });
        });
    },
};
````


### 2. READ - Criando a função de buscar um carro cadastrado na tabela.

23 - No arquivo **_routes.js_** iremos criar o **_router.get('/carro/:codigo', CarroCotroller.buscarUm);_** que é o rota **executada pela função buscarTodos que está dentro do CarroController**.

````
const express = require('express');
const router = express.Router();

const CarroCotroller = require('./controllers/CarroController');

router.get('/carros', CarroCotroller.buscarTodos);
router.get('/carro/:codigo', CarroCotroller.buscarUm);

module.exports = router; // exportando o modulo router para administrar as rotas
````
<br>

---
24 - No arquivo **_CarroService_** dentro da pasta services, **_dentro do mudule.exports e abaixo da função buscarTodos_**, criaremos a função **_buscarUm_** que receberá o resultado da requisição SQL do carroService, onde realizá a busca de um carro atraves do codigo.

````
// função que realizará a busca através dq query SELECT no MySQL trazendo somente um resutado da lista dos carros cadastrados, realiando a busca pelo código.
    buscarUm: () => {
        return new Promise((aceito, rejeitado) => {
            bd.query('SELECT * FROM carros WHERE codigo = ?', [codigo], (error, results) =>{
                if(error) {rejeitado(error); return;}
                if(results.length > 0) {
                    aceito(results[0]);
                }else {
                    aceito(false);
                }
            });
        });
    }
````








