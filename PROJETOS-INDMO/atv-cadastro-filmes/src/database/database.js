import * as SQLite from 'expo-sqlite';


export const DatabaseConnection = {
    getConnection: () => SQLite.openDatabase('meubanco.db'),
}





// export const selecionaFilmes = () => {
//     try {
//       db.transaction(tx => {
//         tx.executeSql('SELECT * FROM filmes',
//           //'_array' é uma propriedade do objeto rows retornado pela consulta SQL, em rows._array, o '_' não se refere diretamente a rows, mas sim ao objeto retornado pela transação SQL. 
//           [], (_, { rows }) =>
//           // O '_array' é uma propriedade desse objeto que contém os resultados da consulta em forma de array.
//           setTodos(rows._array),
//         );
//       });
//     } catch (error) {
//       console.error('Erro ao buscar todos:', error);
//     }
//   };

//  export const AdicionaFilme = (descFilme, genero, classificacao, dataCadast) => {
//     db.transaction(
//         tx => {
//             tx.executeSql(
//                 'INSERT INTO filmes (descFilme, genero, classificacao, dataCadast) VALUES (?,?,?,?)',
//                 [descFilme, genero, classificacao, dataCadast],
//                 (_, { rowsAffected }) => {
//                     console.log(rowsAffected);
//                     // atualizaRegistros();
//                 },
//                 (_, error) => {
//                     console.error('Erro ao adicionar cliente:', error);
//                     Alert.alert('Erro', 'Ocorreu um erro ao adicionar o Filme.');
//                 }
//             );
//         }
//     );

// };

// export const atualizaFilme = (descFilme, genero, classificacao, id) => {
//     db.transaction(
//         tx => {
//             tx.executeSql(
//                 'UPDATE filmes SET descFilme=?, genero=?, classificao=?  WHERE id=?',
//                 [descFilme, genero, classificacao, id],
//                 (_, { rowsAffected }) => {
//                     if (rowsAffected === 1)
//                         Alert.alert('Sucesso', 'Registro alterado com sucesso!');
//                     else if (rowsAffected === 0)
//                         Alert.alert('Alerta', 'O registro não foi localizado na Base de Dados!')
//                     console.log(rowsAffected);
//                     //atualizaRegistros();
//                 },
//                 (_, error) => {
//                     console.error('Erro ao adicionar filme:', error);
//                     Alert.alert('Erro', 'Ocorreu um erro ao adicionar o filme.');
//                 }
//             );
//         }
//     );
// };

//  export const excluiFilme = (id) => {
//     db.transaction(tx => {
//       tx.executeSql('DELETE FROM filmes where id=?',
//         [id],
//         (_, { rowsAffected }) => {
//           if (rowsAffected > 0) {
//             // atualizaRegistros();
//             Alert.alert('Sucesso', 'Registro excluído com sucesso!');
//           } else {
//             Alert.alert('Erro', 'Registro não excluído, verifique e tente novamente!');
//           }
//         },
//         (_, error) => {
//           console.error('Erro ao excluir o filme', error);
//           Alert.alert('Erro', 'Ocorreu um erro ao excluir o filme!')
//         }
//       )
//     })
//   }