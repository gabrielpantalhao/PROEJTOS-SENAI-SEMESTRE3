import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, SafeAreaView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('database.db');

export default function Pesquisa() {
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        search();
    }, [searchText]);

    const search = () => {
        let searchTerm = searchText.trim();
        if (searchTerm.length === 0) {
            setSearchResults([]);
            return;
        }

        let searchLetter = searchTerm.charAt(0);
        db.transaction((tx) => {
            tx.executeSql(
                `SELECT clientes.id AS cliente_id, clientes.nome AS cliente_nome, clientes.data_nasc, telefones.numero, telefones.tipo
                FROM clientes
                LEFT JOIN telefones_has_clientes ON clientes.id = telefones_has_clientes.cliente_id
                LEFT JOIN telefones ON telefones_has_clientes.telefone_id = telefones.id
                WHERE clientes.nome LIKE ? AND substr(clientes.nome, 1, 1) = ?
                OR telefones.numero LIKE ?`,
                [`%${searchTerm}%`, searchLetter, `%${searchTerm}%`],
                (_, { rows }) => {
                    setSearchResults(rows._array);
                },
                (tx, error) => {
                    console.error(error);
                }
            );
        });
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.androidSafeArea}>
                <View style={styles.container}>
                    <Text style={styles.title}>Tela de Pesquisa</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Pesquise por nome ou contato'
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={search}
                    >
                        <Text style={styles.textButton}>Pesquisar</Text>
                    </TouchableOpacity>

                    <ScrollView style={{ flex: 1, width: '100%' }}>
                        {searchResults.map((result) => (
                            <View key={result.cliente_id} style={styles.resultItem}>
                                <Text>ID: {result.cliente_id}</Text>
                                <Text>Nome: {result.cliente_nome}</Text>
                                <Text>Número: {result.numero}</Text>
                                <Text>Tipo: {result.tipo}</Text>
                                <Text>Data de Nascimento: {result.data_nasc}</Text>
                            </View>
                        ))}
                    </ScrollView>
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
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
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
    resultItem: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
});
