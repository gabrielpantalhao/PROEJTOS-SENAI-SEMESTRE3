import React from 'react';
import { SafeAreaView, Text, StyleSheet, TextInput, View, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DatabaseConnection } from '../../database/database';

const db = new DatabaseConnection.getConnection;

export default function Pesquisa() {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoidingContainer}
            >
                <View style={styles.contentContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Digite uma informação</Text>
                        <Text style={styles.title}>Para pesquisar</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.input} placeholder='Nome ou ID' />

                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Pesquisar</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.contentFilme}>
                        <Text style={styles.textId}></Text>
                        <Text style={styles.descText}></Text>
                        <Text style={styles.descText}></Text>
                        <Text style={styles.descText}></Text>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    keyboardAvoidingContainer: {
        flex: 1,
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
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 16,
        width: 350,
        height: 50, // Altura fixa para o TextInput
    },
    button: {
        backgroundColor: 'green',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
        width: 200
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    textId:{
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        paddingBottom: 20
    },
    descText:{
        color: 'white',
        fontSize: 20,
        padding: 5,
        textAlign: 'center'
        
    },
    contentFilme:{
        width: 'auto',
        margin: 20,
        top: 50,
        backgroundColor: '#708090',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000', // Cor da sombra
        shadowOffset: {
            width: 5,
            height: 10,
          },
          shadowOpacity: 0.4, // Opacidade da sombra
           // Raio da sombra
          elevation: 10, // Elevação para a sombra (para Android)
        },
});
