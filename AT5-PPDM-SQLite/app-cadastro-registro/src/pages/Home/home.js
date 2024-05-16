import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, SafeAreaView, Platform, ScrollView, TouchableOpacity, Image, AlertButton} from 'react-native';
import { DatabaseConnection } from '../../database/database';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useNavigation, StackActions } from '@react-navigation/native';

const db = new DatabaseConnection.getConnection;

export default function Home() {

    const navigation = useNavigation();

    function Cadastro() {
        navigation.navigate('Cadastro');
    }



    /**
    * Função dentro do useEffect que cria a tabela caso ela não exista
    */
    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS clientes (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL, data_nasc TEXT NOT NULL)",
                [], //[]: Este é o array de parâmetros. Como não estamos usando nenhum parâmetro na consulta SQL, deixamos esse array vazio.
                () => console.log('Tabela clientes criada com sucesso'),//retorno de  sucesso
                // '_' É um parâmetro que representa o resultado da transação SQL, por convenção utiliza-se o underscore. para indicar que estamos ignorando esse valor.
                (_, error) => console.error(error) //retorno de  erro
            );

            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS telefones (id INTEGER PRIMARY KEY AUTOINCREMENT, numero TEXT NOT NULL, tipo TEXT NOT NULL)",
                [], //[]: Este é o array de parâmetros. Como não estamos usando nenhum parâmetro na consulta SQL, deixamos esse array vazio.
                () => console.log('Tabela telefones com sucesso'),//retorno de  sucesso
                // '_' É um parâmetro que representa o resultado da transação SQL, por convenção utiliza-se o underscore. para indicar que estamos ignorando esse valor.
                (_, error) => console.error(error) //retorno de  erro
            );

            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS telefones_has_clientes (telefone_id INT NOT NULL, cliente_id INT NOT NULL, FOREIGN KEY(telefone_id) REFERENCES telefones(id), FOREIGN KEY(cliente_id) REFERENCES cliente(id))",
                [], //[]: Este é o array de parâmetros. Como não estamos usando nenhum parâmetro na consulta SQL, deixamos esse array vazio.
                () => console.log('Tabela Telefone dos clientes criada com sucesso'),//retorno de  sucesso
                // '_' É um parâmetro que representa o resultado da transação SQL, por convenção utiliza-se o underscore. para indicar que estamos ignorando esse valor.
                (_, error) => console.error(error) //retorno de  erro
            );
        });
    }, []);



    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.androidSafeArea}>
                <View style={styles.container}>
                    <Text style={styles.title}>Tela Home</Text>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={Cadastro}
                    >
                        <Text style={styles.textButton}>Cadastrar</Text>
                    </TouchableOpacity>

                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
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
    alinharEmLinha: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        margin: 15,
    },
    buttonConfig: {

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
    title: {
        fontSize: 36,
        letterSpacing: 3,
        textAlign: 'center',
        color: 'blue',
        fontWeight: '500'
    },
    buttonTable: {
        flexDirection: 'row',
        gap: 15
    }
});
