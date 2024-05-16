const {connection} = require(`../config/db`);

const modelCliente = {

    // SELECIONA TODOS OS REGISTROS DA TABELA CLIENTES;
    selecionarTodosClientes: async () => {
        try {
            
            const conn = await connection();
            const [rows] = await conn.query('select * from cliente;');
            return rows;

        } catch (error) {
            throw error;
        }
    },
    // SELECIONA O REGISTRO DESEJADO NA TABELA CLIENTES;
    selecionarUmCliente: async (id) => {
        try {
            const conn = await connection();
            const sql = 'SELECT * FROM cliente WHERE id=?;';
            const values = id;
            const [rows] = await conn.query(sql, values);
            return rows;

        } catch (error) {
            throw error;
        }
    },
    // SELECIONA O REGISTRO DESEJADO NA TABELA CLIENTES POR NOME;
    selecionarUmClientePorNome: async (nome) => {
        try {
            let id = !isNaN(nome) ? nome:0;
            const conn = await connection();
            const sql = `SELECT * FROM cliente WHERE (id=? or nome=?);`;
            const values = [id,nome];
            const [rows] = await conn.query(sql, values);
            return rows;

        } catch (error) {
            throw error;
        }
    },
    // INSERE UM NOVO REGISTRO NA TABELA CLIENTES;
    insereClientes: async (cliente) => {
        try {
            const conn = await connection();
            const sql = 'INSERT INTO cliente(nome, tel_cel, tel_fixo, email) VALUES (?,?,?,?);';
            const values = [cliente.nome, cliente.tel_cel, cliente.tel_fixo, cliente.email];
            return await conn.query(sql, values);

        } catch (error) {
            throw error;
        }
    },
    // ATUALIZA UM REGISTRO DA TABELA CLIENTES;
    atualizaClientes: async (id, cliente) => {
        try {
            const conn = await connection();
            const sql = 'UPDATE cliente SET nome=?, tel_cel=?, tel_fixo=?, email=? WHERE id=?';
            const values = [cliente.nome, cliente.tel_cel, cliente.tel_fixo, cliente.email, id];
            return await conn.query(sql, values);

        } catch (error) {
            throw error;
        }
    },
    // DELETA UM REGISTRO DA TABELA CLIENTES;
    deletaClientes: async (id) => {
        try {
            const conn = await connection();
            const sql = 'DELETE FROM cliente where id=?;';
            return await conn.query(sql, [id]);

        } catch (error) {
            throw error;
        }
    },
}

module.exports = modelCliente ;