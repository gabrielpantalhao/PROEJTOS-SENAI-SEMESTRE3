import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert, SafeAreaView, Platform, FlatList, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { DatabaseConnection } from '../../database/database';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Feather } from '@expo/vector-icons';

const db = new DatabaseConnection.getConnection;

export default function ExibeTodos() {

    const navigation = useNavigation();

    const [todosRegistros, setTodosRegistros] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            mostrarRegistros();
        }, [])
    );

    const Editar = (id) => {
        navigation.navigate('Editar', { id });
    };

    const listViewItem = ({ item }) => {
        return (
            <View style={styles.modeloCard}>
                <Text style={styles.textHeader}>ID</Text>
                <Text style={styles.textValue}> {item.id} </Text>

                <Text style={styles.textHeader}>Nome</Text>
                <Text style={styles.textValue}> {item.nome} </Text>

                <Text style={styles.textHeader}>Data de Nascimento</Text>
                <Text style={styles.textValue}> {item.data_nasc} </Text>

                <Text style={styles.textHeader}>Número</Text>
                <Text style={styles.textValue}> {item.numero} </Text>

                <Text style={styles.textHeader}>Tipo de Contato</Text>
                <Text style={styles.textValue}> {item.tipo} </Text>

                <View style={styles.containerButton}>
                    <TouchableOpacity
                        onPress={() => {
                            Alert.alert(
                                'Atenção',
                                'Deseja realmente excluir esse registro?',
                                [
                                    {
                                        text: 'Sim',
                                        onPress: () => deletarCliente(item.id)
                                    },
                                    {
                                        text: 'Cancelar',
                                        onPress: () => { }
                                    }
                                ]
                            );
                        }}
                    >
                        <Feather name='trash-2' color='#FF6347' size={24} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => Editar(item.id)}
                    >
                        <Feather name='edit' color='#32CD32' size={24} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const mostrarRegistros = () => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT c.id, c.nome, data_nasc,
                t.numero AS numero,
                    t2.numero AS numero2,
                    t.tipo AS tipo,
                    c.nome FROM clientes c 
                        LEFT JOIN
                        telefones_has_clientes thc 
                        ON 
                        c.id = thc.cliente_id 
                        LEFT JOIN telefones t 
                        ON 
                        thc.telefone_id = t.id
                        LEFT JOIN telefones t2  
                        ON thc.telefone_id = t2.id`
                        ,
                        [],
                (_, { rows }) => {
                    setTodosRegistros(rows._array);
                },
                (_, error) => {
                    console.error('Erro ao buscar registros:', error);
                    Alert.alert('Erro', 'Ocorreu um erro ao buscar os registros.');
                }
            );
        });
    };

    const deletarCliente = (id) => {
        db.transaction(tx => {
            tx.executeSql(
                'DELETE FROM clientes WHERE id = ?',
                [id],
                () => {
                    console.log('Registro deletado com sucesso');
                    mostrarRegistros();
                },
                (_, error) => {
                    console.error('Erro ao deletar registro:', error);
                    Alert.alert('Erro', 'Ocorreu um erro ao deletar o registro.');
                }
            );
        });
    };

    return (
        <SafeAreaView style={styles.androidSafeArea}>
            <View style={styles.container}>
                <Text style={styles.title}>Tela de Registros </Text>
                <FlatList
                    style={{ marginTop: 20 }}
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                    data={todosRegistros}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={listViewItem}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    androidSafeArea: {
        flex: 1,
        marginTop: 10,
        paddingTop: Platform.OS === 'android' ? getStatusBarHeight() : 0,
        backgroundColor: '#F5F5F5'
    },
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    containerButton: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 10,
    },
    modeloCard: {
        backgroundColor: '#FFFFFF',
        marginBottom: 20,
        padding: 15,
        borderRadius: 8,
        elevation: 3,
    },
    textHeader: {
        color: '#666666',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    textValue: {
        color: '#333333',
        fontSize: 16,
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        letterSpacing: 1,
        textAlign: 'center',
        color: '#333333',
        marginBottom: 20,
        fontWeight: 'bold',
    }
});
