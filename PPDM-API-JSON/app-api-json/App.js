import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView, SafeAreaView } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import api from './src/services/api';

export default function App() {
  const [dados, setDados] = useState(null);

  const selecionarArquivo = async () => {
    try {
      const resultado = await DocumentPicker.getDocumentAsync();
      console.log(resultado);

      if (resultado.canceled == true) {
        console.log('Busca de arquivo cancelada!');
        setDados(null);
        return;
      }

      const { assets: [{ mimeType, uri }], canceled } = resultado;
      console.log(mimeType);

      if (mimeType !== 'application/json') {
        Alert.alert('O arquivo selecionado não é do tipo JSON')
        setDados(null);
        return;
      }

      const conteudo = await FileSystem.readAsStringAsync(uri);
      const dadosJSON = JSON.parse(conteudo);
      setDados(dadosJSON);

    } catch (error) {
      console.error('Erro ao selecionar o arquivo:', error);
    }
  };

  const enviarBd = async () => {
    try {
      const response = await api.post('api/pessoa', dados);
      const { error, result } = response.data;

      if (error) {
        Alert.alert('Erro', error);
      } else {
        console.log(result);
        Alert.alert('Sucesso', 'Dados enviados com sucesso!');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Ocorreu um erro ao enviar os dados.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.containerLargura}>
            <View style={styles.topo}>
              <Text style={styles.titleConteudo}>Leitura de arquivo JSON</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={selecionarArquivo}>
              <Text style={styles.buttonText}>Selecionar Arquivo</Text>
            </TouchableOpacity>

            {dados && (
              <TouchableOpacity style={styles.button} onPress={enviarBd}>
                <Text style={styles.buttonText}>Enviar para o Banco</Text>
              </TouchableOpacity>
            )}

            {dados ? (
              <View style={styles.card}>
                <Text style={styles.titleInfo}>Nome:</Text>
                <TextInput style={styles.textInput} value={dados.nome} editable={false} />

                <Text style={styles.titleInfo}>Data de Nasc.:</Text>
                <TextInput style={styles.textInput} value={dados.data_nasc} editable={false} />

                <Text style={styles.titleInfo}>CPF:</Text>
                <TextInput style={styles.textInput} value={dados.cpf} editable={false} />

                <Text style={styles.titleInfo}>Sexo:</Text>
                <TextInput style={styles.textInput} value={dados.sexo} editable={false} />

                <Text style={styles.titleInfo}>Estado civil:</Text>
                <TextInput style={styles.textInput} value={dados.estado_civil} editable={false} />

                <Text style={styles.titleInfo}>E-mail:</Text>
                <TextInput style={styles.textInput} value={dados.email} editable={false} />

                <Text style={styles.titleInfo}>Telefone:</Text>
                <TextInput style={styles.textInput} value={dados.telefone} editable={false} />
              </View>
            ) : (
              <Text style={styles.noFileText}>Nenhum arquivo selecionado</Text>
            )}
          </View>
        </ScrollView>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  containerLargura: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleConteudo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  textInput: {
    height: 50,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FF8C00',
    borderRadius: 8,
    backgroundColor: '#444444',
    width: '100%',
  },
  titleInfo: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FF8C00',
    marginBottom: 5,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 25,
    elevation: 5,
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
    width: '100%',
    backgroundColor: '#FF8C00',
    shadowColor: '#FF4500',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  topo: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  noFileText: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#282828',
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    width: '100%',
  },
});
