import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, TextInput, Button, StyleSheet, Image, View, TouchableOpacity, Platform, Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DatabaseConnection } from '../../database/database'
import { getStatusBarHeight } from 'react-native-status-bar-height';

const db = new DatabaseConnection.getConnection;

export default function Cadastro() {

    const [nome, setNome] = useState('');
    const [dataNasc, setDataNasc] = useState('');
    const [numero, setNumero] = useState('');
    const [tipoNumero, setTipoNumero] = useState('');


    const salvarRegistro = () => {
        if (nome.trim() === '') {
            Alert.alert('Erro', 'Por favor, insira um texto válido para adicionar o cliente');
            return;
        }
        if (dataNasc.trim() === '') {
            Alert.alert('Erro', 'Por favor, insira um texto válido para adicionar o cliente');
            return;
        }
        if (numero.trim() === '') {
            Alert.alert('Erro', 'Por favor, insira um texto válido para adicionar o cliente');
            return;
        }
        if (tipoNumero.trim() === '') {
            Alert.alert('Erro', 'Por favor, insira um texto válido para adicionar o cliente');
            return;
        }
        db.transaction(
            tx => {
                tx.executeSql(
                    'INSERT INTO clientes (nome, data_nasc) VALUES (?,?)',
                    [nome, dataNasc],
                    (_, { insertId }) => {
                        console.log('Cliente inserido com ID:', insertId);
                        tx.executeSql(
                            'INSERT INTO telefones (numero, tipo) VALUES (?,?)',
                            [numero, tipoNumero],
                            (_, { insertId: telefoneId }) => {
                                console.log('Telefone inserido com ID:', telefoneId);
                                tx.executeSql(
                                    'INSERT INTO telefones_has_clientes (telefone_id, cliente_id) VALUES (?,?)',
                                    [telefoneId, insertId],
                                    (_, { rowsAffected }) => {
                                        console.log('Relacionamento inserido com sucesso');
                                        setNome('');
                                        setDataNasc('');
                                        setNumero('');
                                        setTipoNumero('');
                                        Alert.alert('Info', 'Registro incluído com sucesso');
                                    },
                                    (_, error) => {
                                        console.error('Erro ao adicionar relacionamento:', error);
                                        Alert.alert('Erro', 'Ocorreu um erro ao adicionar o relacionamento.');
                                    }
                                );
                            },
                            (_, error) => {
                                console.error('Erro ao adicionar telefone:', error);
                                Alert.alert('Erro', 'Ocorreu um erro ao adicionar o telefone.');
                            }
                        );
                    },
                    (_, error) => {
                        console.error('Erro ao adicionar cliente:', error);
                        Alert.alert('Erro', 'Ocorreu um erro ao adicionar o cliente.');
                    }
                );
            }
        );
    }


    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.androidSafeArea}>
                <View style={styles.container}>
                    <Text>Insira os dados do Cliente</Text>

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
                        onPress={salvarRegistro}
                    >
                        <Text style={styles.textButton}>Salvar</Text>

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