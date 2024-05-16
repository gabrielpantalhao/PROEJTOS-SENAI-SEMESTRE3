import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, TextInput, Button, StyleSheet, View, TouchableOpacity, Platform, Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DatabaseConnection } from '../../database/database'
import { getStatusBarHeight } from 'react-native-status-bar-height';

const db = new DatabaseConnection.getConnection;

export default function EditaRegistro({ route, navigation }) {

    const { id } = route.params;

    const [nome, setNome] = useState('');
    const [dataNasc, setDataNasc] = useState('');
    const [numero, setNumero] = useState('');
    const [tipoNumero, setTipoNumero] = useState('');



    const carregarRegistro = () => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT c.nome, c.data_nasc, t.numero, t.tipo FROM clientes c LEFT JOIN telefones_has_clientes thc ON c.id = thc.cliente_id LEFT JOIN telefones t ON thc.telefone_id = t.id WHERE c.id = ?',
                [id],
                (_, { rows }) => {
                    const { nome, data_nasc, numero, tipo } = rows.item(0);
                    setNome(nome);
                    setDataNasc(data_nasc);
                    setNumero(numero);
                    setTipoNumero(tipo);
                },
                (_, error) => {
                    console.error('Erro ao carregar registro:', error);
                    Alert.alert('Erro', 'Ocorreu um erro ao carregar o registro.');
                }
            );
        });
    };

    const atualizarRegistro = () => {
        if (nome.trim() === '') {
            Alert.alert('Erro', 'Por favor, insira um nome válido para atualizar o cliente');
            return;
        }
        if (dataNasc.trim() === '') {
            Alert.alert('Erro', 'Por favor, insira uma data de nascimento válida para atualizar o cliente');
            return;
        }
        if (numero.trim() === '') {
            Alert.alert('Erro', 'Por favor, insira um número de contato válido para atualizar o cliente');
            return;
        }
        if (tipoNumero.trim() === '') {
            Alert.alert('Erro', 'Por favor, insira um tipo de contato válido para atualizar o cliente');
            return;
        }
        db.transaction(
            tx => {
                tx.executeSql(
                    'UPDATE clientes SET nome = ?, data_nasc = ? WHERE id = ?',
                    [nome, dataNasc, id],
                    () => {
                        console.log('Registro atualizado com sucesso');
                        tx.executeSql(
                            'UPDATE telefones SET numero = ?, tipo = ? WHERE id = (SELECT telefone_id FROM telefones_has_clientes WHERE cliente_id = ?)',
                            [numero, tipoNumero, id],
                            () => {
                                console.log('Telefone atualizado com sucesso');
                                Alert.alert('Info', 'Registro atualizado com sucesso');
                                navigation.goBack();
                            },
                            (_, error) => {
                                console.error('Erro ao atualizar telefone:', error);
                                Alert.alert('Erro', 'Ocorreu um erro ao atualizar o telefone.');
                            }
                        );
                    },
                    (_, error) => {
                        console.error('Erro ao atualizar cliente:', error);
                        Alert.alert('Erro', 'Ocorreu um erro ao atualizar o cliente.');
                    }
                );
            }
        );
    };

    useEffect(() => {
        carregarRegistro();
    }, []);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.androidSafeArea}>
                <View style={styles.container}>
                    <Text>Atualize os dados do Cliente</Text>

                    <TextInput
                        style={styles.input}
                        value={nome}
                        onChangeText={setNome}
                        placeholder='Nome'>
                    </TextInput>

                    <TextInput
                        style={styles.input}
                        value={dataNasc}
                        onChangeText={setDataNasc}
                        placeholder='Data de nascimento'>
                    </TextInput>

                    <TextInput
                        style={styles.input}
                        value={numero}
                        placeholder='Contato'
                        onChangeText={setNumero}
                    >
                    </TextInput>

                    <TextInput
                        style={styles.input}
                        value={tipoNumero}
                        placeholder='Tipo de Contato'
                        onChangeText={setTipoNumero}
                    ></TextInput>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={atualizarRegistro}
                    >
                        <Text style={styles.textButton}>Atualizar</Text>
                    </TouchableOpacity>

                </View>
            </SafeAreaView>
        </SafeAreaProvider >
    )
}

const styles = StyleSheet.create({
    androidSafeArea: {
        flex: 1,
        marginTop: 10,
        paddingTop: Platform.OS === 'android' ? getStatusBarHeight() : 0,
        backgroundColor: '#fff'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#fff',
        padding: 15,
        gap: 10
    },
    button: {
        borderRadius: 10,
        backgroundColor: "darkgreen",
        height: 60,
        width: '90%',
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        elevation: 7,
        marginBottom: 30
    },
    textButton: {
        color: '#FFF',
        fontSize: 26,
        fontWeight: 'bold'
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }
});
