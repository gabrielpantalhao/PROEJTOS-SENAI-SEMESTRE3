import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import api from '../../services/api/api';

export default function App() {
  const [cliente, setCliente] = useState([]);
  const [nomeCli, setNomeCli] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const getCliente = async () => {
    try {
      if (nomeCli.length > 0) {
        console.log('ver')
        const response = await api.get(`/cliente/${nomeCli}`)
          .catch(function (error) {
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              if ((error.request._response).includes('Failed')) {
                console.log('Erro ao conectar com API');
              }
            } else {
              console.log('Error', error.message);
            }
            console.error('Error', error.message);
          });
        
        if (response != undefined){
          if(response.data.length === 0){
            setCliente([])
            setShowAlert(true)
          }else {
            setCliente(response.data)
          }
        }
      
      console.log(response.data)

      } else {
        setCliente([])
      }

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View style={styles.container}>

      <TextInput
        style={styles.TextInput}
        placeholder='Digite o ID ou Nome do Cliente'
        // value={idCli.toString()}
        onChangeText={setNomeCli}
      ></TextInput>

      <TouchableOpacity
        onPress={() => getCliente(nomeCli)}
        style={styles.botao}
      >

        <Text style={{ color: 'white' }}>Pressione para pesquisar</Text>

      </TouchableOpacity>

      <Text>ID</Text>
      <TextInput style={styles.TextInput} value={cliente[0]?.id.toString()}></TextInput>
      <Text>Nome</Text>
      <TextInput style={styles.TextInput} value={cliente[0]?.nome}></TextInput>
      <Text>Celular</Text>
      <TextInput style={styles.TextInput} value={cliente[0]?.tel_cel}></TextInput>
      <Text>Telefone Fixo</Text>
      <TextInput style={styles.TextInput} value={cliente[0]?.tel_fixo}></TextInput>
      <Text>E-mail</Text>
      <TextInput style={styles.TextInput} value={cliente[0]?.email}></TextInput>

      {showAlert &&
        (Alert.alert('Informação', 'Registro não foi lozalido na base de dados',
          [
            { text: 'OK', onPress:() => setShowAlert(false) }
          ]
        ))
      }

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  botao: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: 40,
    borderColor: 'black',
    borderRadius: 4,
    backgroundColor: 'blue',
  },

  TextInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 5,
    width: '80%'
  }

});