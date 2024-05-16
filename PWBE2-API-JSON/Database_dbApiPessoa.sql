-- Criando a database
create database dbApiPessoa;

-- Colocando a database em uso
use dbApiPessoa;

-- Criando a tabela de carro com os campos codigo que sera auto preenchido pelo mySql, modelo e placa do carro.
CREATE TABLE pessoa (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(30) NOT NULL,
    data_nasc VARCHAR(10) NOT NULL,
    cpf VARCHAR(14) NOT NULL,
    sexo VARCHAR(1) NOT NULL,
    estado_civil VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefone VARCHAR(20) NOT NULL
);


-- Inserindo dados na tabela
INSERT INTO pessoa (nome, data_nasc, cpf, sexo, estado_civil, email, telefone) 
VALUES 
    ('João da Silva', '1990-05-13', '123.456.789-10', 'M', 'Solteiro', 'joao@example.com', '(00) 1234-5678'),
    ('Maria Oliveira', '1985-09-25', '987.654.321-00', 'F', 'Solteira', 'maria@example.com', '(00) 9999-8888'),
    ('Carlos Souza', '1978-03-21', '111.222.333-44', 'M', 'Casado', 'carlos@example.com', '(00) 7777-6666');


-- Verificando o conteúdo insrido na tabela carros
select * from pessoa;

-- Selecionado por conteúdo especifico para teste somente
SELECT * FROM pessoa WHERE nome = 'João da Silva';