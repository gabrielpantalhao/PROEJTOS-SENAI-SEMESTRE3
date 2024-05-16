import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react';
import { DatabaseConnection } from '../../database/database';

export default function ExibeTodos() {
    const [id, setId] = useState(null);
    const [nomeFilme, setNomeFilme] = useState('');
    const [todosFilmes, setTodosFilmes] = useState([]);
    const [operacao, setOperacao] = useState('Adicionar');

    
    //Função utilizada para atualizar os registros
    const db = new DatabaseConnection.getConnection; // 
    const navigation = useNavigation();

    const atualizaRegistros = () => {
        try {
            db.transaction(tx => {
                tx.executeSql('SELECT * FROM filmes',
                    [], (_, { rows }) =>
                    setTodosFilmes(rows._array),
                );
            });
        } catch (error) {
            console.error('Erro ao buscar todos os Filmes:', error);
        }
    };

    //useEffect chama a função para atualizar os registros
    useEffect(() => {
        atualizaRegistros();
    }, []);





    return (
        <SafeAreaView style={styles.container}>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});