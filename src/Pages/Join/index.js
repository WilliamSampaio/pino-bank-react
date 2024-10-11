import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Join extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      cpf: '',
      dataNascimento: '',
      sexo: '',
      pin1: '',
      pin2: '',
      credLimite: 100
    }

    this.save = this.save.bind(this);
  }

  async componentDidMount() {
    const cliente = await AsyncStorage.getItem('cliente');
    if (cliente !== null) {
      this.props.navigation.navigate('Home');
    }
  }

  async save() {
    if (this.state.name.length < 3) {
      alert('Informe seu nome completo!');
      return;
    }

    if (this.state.cpf.length != 11) {
      alert('Informe seu CPF!');
      return;
    }

    if (this.state.dataNascimento.length != 10) {
      alert('Informe sua data de nascimento!');
      return;
    }

    if (this.state.sexo != 'f' && this.state.sexo != 'm') {
      alert('Informe seu sexo!');
      return;
    }

    if (this.state.pin1 != this.state.pin2 || this.state.pin1 === '') {
      alert('PIN não infornmado ou diferente!');
      return;
    }

    await AsyncStorage.getItem('clientes')
      .then(json => {
        return JSON.parse(json);
      })
      .then(clientes => {
        clientes.push({
          name: this.state.name,
          cpf: this.state.cpf,
          dataNascimento: this.state.dataNascimento,
          sexo: this.state.sexo,
          pin: this.state.pin1,
          cpf: this.state.cpf,
          credLimite: parseFloat(this.state.credLimite.toFixed(2)),
          id: clientes.length + 1
        })
        AsyncStorage.setItem('clientes', JSON.stringify(clientes)).then(() => {
          alert('Cliente cadastrado com sucesso!');
          this.props.navigation.navigate('Login');
        })
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="NOME COMPLETO"
          maxLength={50}
          autoFocus={true}
          onChangeText={value => {
            this.setState({
              name: String(value).toUpperCase()
            })
          }}
          value={this.state.name}
        />
        <TextInput
          style={styles.input}
          placeholder="CPF"
          maxLength={11}
          keyboardType="numeric"
          onChangeText={value => {
            this.setState({
              cpf: value
            })
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="DATA DE NASCIMENTO"
          maxLength={10}
          onChangeText={value => {
            this.setState({
              dataNascimento: value
            })
          }}
        />
        <Picker
          selectedValue={this.state.sexo}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({
              sexo: itemValue
            })
          }
        >
          <Picker.Item label="Feminino" value="f" />
          <Picker.Item label="Masculino" value="m" />
        </Picker>
        <Slider
          style={styles.slider}
          minimumValue={100}
          maximumValue={10000}
          onValueChange={(value) =>
            this.setState({
              credLimite: value
            })
          }
          value={this.state.credLimite}
        />
        <Text style={styles.sliderLabel}> Limite de Crédito: R$ {this.state.credLimite.toFixed(2)}</Text>
        <TextInput
          style={styles.input}
          maxLength={6}
          placeholder="PIN"
          keyboardType="numeric"
          onChangeText={value => {
            this.setState({
              pin1: value
            })
          }}
        />
        <TextInput
          style={styles.input}
          maxLength={6}
          placeholder="CONFIRME O PIN"
          keyboardType="numeric"
          onChangeText={value => {
            this.setState({
              pin2: value
            })
          }}
        />
        <TouchableOpacity style={styles.btnLogin} onPress={this.save}>
          <Text style={styles.btnLoginLabel}>Salvar</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dddddd',
    flexDirection: 'column',
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
    width: 'auto',
    borderRadius: 15,
    margin: 10,
    textAlign: 'center',
    color: 'black',
    backgroundColor: 'white'
  },
  slider: {
    marginTop: 20,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10
  },
  sliderLabel: {
    marginBottom: 20,
    textAlign: 'center'
  },
  btnLogin: {
    height: 50,
    width: 'auto',
    borderRadius: 15,
    margin: 10,
    backgroundColor: 'white',
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
});

export default Join