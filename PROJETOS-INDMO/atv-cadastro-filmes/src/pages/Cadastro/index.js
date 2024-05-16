import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, TextInput, View, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DatabaseConnection } from '../../database/database';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const db = new DatabaseConnection.getConnection;

export default function Cadastro() {
    const [todos, setTodos] = useState([]);
    const [id, setId] = useState(null);
    const [nomeFilme, setNomeFilme] = useState('');
    const [generoFilme, setGeneroFilme] = useState('');
    const [classificacaoFilme, setClassificacaoFilme] = useState(null);
    const [dataFilme, setDataFilme] = useState('');


    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS filmes (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL, genero TEXT NOT NULL, classificacao INT NOT NULL, dataCadast TEXT NOT NULL)',
                [], //[]: Este é o array de parâmetros. Como não estamos usando nenhum parâmetro na consulta SQL, deixamos esse array vazio.
                () => console.log('Tabela "filmes" criada com sucesso!'),
                (_, error) => console.error(error)
            );
        }, null);
    }, [todos]);



    const CadastrarFilme = () => {
        console.log('Adicionando a função CadastrarFilme normalmente!');

        if (nomeFilme.trim() === '') {
            Alert.alert('Erro', 'Por favor, insira um texto válido para adicionar o filme');
            return;
        } else {
            db.transaction(
                tx => {
                    tx.executeSql(
                        'INSERT INTO filmes (nome, genero, classificacao, dataCadast) VALUES (?,?,?,?)',
                        [nomeFilme, generoFilme, classificacaoFilme, dataFilme],
                        (_, { rowsAffected }) => {
                            console.log(rowsAffected);
                            setNomeFilme('');
                            setGeneroFilme('');
                            setClassificacaoFilme(null);
                            setDataFilme('');
                            Alert.alert('Filme cadastrado com sucesso!');
                        },
                        (_, error) => {
                            console.error('Erro ao cadastrar filme:', error);
                            Alert.alert('Erro', 'Ocorreu um erro ao adicionar o filme.');
                        }
                    );
                }
            );
        }
    }


    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.contentContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Página Cadastro</Text>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Filme</Text>
                        <TextInput style={styles.input}
                            placeholder='Nome do filme...'
                            value={nomeFilme}
                            onChangeText={setNomeFilme}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Gênero</Text>
                        <TextInput style={styles.input}
                            placeholder='Drama, Ação, Romance...'
                            value={generoFilme}
                            onChangeText={setGeneroFilme}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Classificação</Text>
                        <TextInput style={styles.input}
                            placeholder='10, 12, 14...'
                            value={classificacaoFilme}
                            onChangeText={setClassificacaoFilme}
                            keyboardType='numeric'
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Data de lançamento</Text>
                        <TextInput style={styles.input}
                            placeholder='Exemplo 31/12/2023'
                            value={dataFilme}
                            onChangeText={setDataFilme}
                        />
                    </View>
                    <View style={styles.botao}>
                        <TouchableOpacity style={styles.button}
                            onPress={CadastrarFilme}
                        >
                            <Text style={styles.buttonText}>Cadastrar Filme</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.containerScroll}>
                        {todos.map(filme => (
                            <View key = {filme.id} style={styles.filmeItem}>
                                <Text>{filme.id}</Text>
                                <Text>{filme.nome}</Text>
                                <Text>{filme.genero}</Text>
                                <Text>{filme.classificacao}</Text>
                                <Text>{filme.dataCadast}</Text>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
        width: '100%',
    },
    titleContainer: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#3498db',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    containerScroll: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 20,
        gap: 5
      },
      filmeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5,
      },
});
