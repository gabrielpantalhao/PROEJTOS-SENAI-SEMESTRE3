const db = require('../db.js');

module.exports = {
    // função que realizará a busca através dq query SELECT no MySQL trazendo toda lista de pessoas cadastrados.
    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM pessoa', (error, results) => {
                if(error) {rejeitado(error); return;}
                aceito(results);
            });
        });
    },

    // função que realizará a busca através dq query SELECT no MySQL trazendo somente um resutado da lista de pessoas cadastrados.
    buscarUm: (id) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM pessoa WHERE id = ?', [id], (error, results)=>{
                if(error) {rejeitado(error); return;}
                if(results.length > 0) {
                    aceito(results[0]);
                }else {
                    aceito(false);
                } 
            });
        });
    },

    // nome, data_nasc, cpf, sexo, estado_civil, email, telefone
    inserir: (nome, data_nasc, cpf, sexo, estado_civil, email, telefone) => {
        return new Promise((aceito, rejeitado) => {
            // Primeiro, verifica se o CPF já existe
            db.query('SELECT COUNT(*) AS count FROM pessoa WHERE cpf = ?', [cpf], (error, results) => {
                if (error) {
                    rejeitado(error);
                    return;
                }
    
                if (results[0].count > 0) {
                    rejeitado(new Error('CPF já existe no banco de dados.'));
                    return;
                }
    
                // Se o CPF não existir, insere o novo registro
                db.query(
                    'INSERT INTO pessoa (nome, data_nasc, cpf, sexo, estado_civil, email, telefone) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    [nome, data_nasc, cpf, sexo, estado_civil, email, telefone],
                    (error, results) => {
                        if (error) {
                            rejeitado(error);
                            return;
                        }
                        aceito(results.insertId);
                    }
                );
            });
        });
    },
    alterar: (id, nome, data_nasc, cpf, sexo, estado_civil, email, telefone)=> {
        return new Promise((aceito, rejeitado)=> {
            db.query('UPDATE pessoa SET nome = ?, data_nasc = ? , cpf = ?, sexo = ?, estado_civil = ?, email = ?,telefone = ? WHERE id = ?', 
                [nome, data_nasc, cpf, sexo, estado_civil, email, telefone, id],
                (error, results)=>{
                    if(error){ rejeitado(error); return; }
                    aceito(results);
                }
            );
        });
    },

    excluir: (id) => {
        return new Promise((aceito, rejeitado) => {
            db.query('DELETE FROM pessoa WHERE id = ?', [id], (error, results) => {
                if(error) {rejeitado(error); return;}
                aceito(results);
            });
        });
    }
};