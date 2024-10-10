import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      cpf: '',
      pin: ''
    }
  }

  async login(cpf, pin) {
    Keyboard.dismiss();
    await AsyncStorage.getItem('clientes')
      .then(async clientes => {
        const clientesObj = JSON.parse(clientes);
        let cliente = null;
        for (let i = 0; i < clientesObj.length; i++) {
          if (clientesObj[i].cpf === cpf && clientesObj[i].pin === pin) {
            cliente = clientesObj[i];
          }
        }
        if (!cliente) {
          alert('CPF ou PIN incorretos!');
        } else {
          await AsyncStorage.setItem('cliente', JSON.stringify(cliente));
          this.props.navigation.navigate('Home');
        }
      })
      .catch(error => {
        alert(error.message);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>PinoBank</Text>
        <TextInput
          style={styles.input}
          placeholder="CPF"
          maxLength={11}
          autoFocus={true}
          keyboardType="numeric"
          onChangeText={value => {
            this.setState({
              cpf: value
            })
          }}
          defaultValue={this.state.cpf}
        />
        <TextInput
          style={styles.input}
          maxLength={6}
          placeholder="PIN"
          keyboardType="numeric"
          onChangeText={value => {
            this.setState({
              pin: value
            })
          }}
          defaultValue={this.state.pin}
        />
        <TouchableOpacity style={styles.btnLogin} onPress={() => { this.login(this.state.cpf, this.state.pin) }}>
          <Text style={styles.btnLoginLabel}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnJoin} onPress={() => this.props.navigation.navigate('Join')}>
          <Text style={styles.btnJoinLabel}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8e34c9',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 30,
    marginBottom: 10
  },
  input: {
    height: 50,
    width: 250,
    borderWidth: 1,
    borderColor: 'white',
    margin: 10,
    borderRadius: 25,
    textAlign: 'center',
    color: 'white',
    backgroundColor: '#b458ed'
  },
  btnLogin: {
    height: 50,
    width: 250,
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnLoginLabel: {
    textTransform: 'uppercase',
    color: '#8e34c9',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700'
  },
  btnJoin: {
    height: 50,
    width: 250,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnJoinLabel: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  }
});

export default Login;