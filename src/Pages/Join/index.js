import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

class Join extends Component {

  constructor(props) {
    super(props)
    this.state = {}
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
        />
        <TextInput
          style={styles.input}
          maxLength={6}
          placeholder="PIN"
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.btnLogin}>
          <Text style={styles.btnLoginLabel}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnJoin}>
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

export default Join