import React from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CustomButton = ({ onPress, title, buttonColor }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: buttonColor }]}
      onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default function Home() {
    const navigation = useNavigation();
    const navegaCadastro = () => {
        navigation.navigate('Cadastro')
    }
    const navegaPesquisa = () => {
        navigation.navigate('Pesquisa')
    }
    const navegaExibeTodos = () => {
        navigation.navigate('ExibeTodos')
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.containerTextPage}>
                <Text style={styles.textPage}>Bem vindo</Text>
                <Text style={styles.textPage}>Escolha um botão para continuar</Text>
            </View>
            <View style={styles.botaoContainer}>
                <CustomButton title='Cadastrar' onPress={navegaCadastro} buttonColor='blue' />
                <CustomButton title='Pesquisar' onPress={navegaPesquisa} buttonColor='green' />
                <CustomButton title='Exibir todos os itens' onPress={navegaExibeTodos} buttonColor='red' />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 15
    },
    containerTextPage: {
        alignItems: 'center',
        alignContent: 'center',
        top: -150
    },
    textPage:{
        fontSize: 22,
        textAlign: 'center',
    },
    botaoContainer:{
        textAlign: 'center',
        alignItems: 'center',
        alignContent: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 20
    },
    button: {
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: 20,
        width: 250,
        height: 60
    },
    buttonText: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
    },
});
