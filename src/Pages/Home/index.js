import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Modal, Pressable, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      modalLogoutVisible: false
    }

    this.logout = this.logout.bind(this);
  }

  logout() {
    AsyncStorage.removeItem('cliente');
    this.props.navigation.navigate('Login')
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Modal
          transparent={true}
          visible={this.state.modalLogoutVisible}
          onRequestClose={() => {
            this.setState({
              modalLogoutVisible: !this.state.modalLogoutVisible
            });
          }}>
          <View style={styles.modalCenter}>
            <View style={styles.modalView}>
              <Text>Deseja realmente sair da sua conta?</Text>
              <View style={styles.modalBtns}>
                <Pressable
                  style={[styles.button, styles.buttonConfirmLogout]}
                  onPress={this.logout}>
                  <Text style={styles.buttonConfirmLogoutText}>Sair</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    this.setState({
                      modalLogoutVisible: !this.state.modalLogoutVisible
                    })
                  }}>
                  <Text style={styles.buttonCloseText}>Cancelar</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        <View style={styles.header}>
          <Text style={styles.logo}>PinoBank</Text>
          <TouchableOpacity style={styles.btnLogout} onPress={() => {
            this.setState({
              modalLogoutVisible: !this.state.modalLogoutVisible
            });
          }}>
            <Text style={styles.btnLogoutLabel}>Sair</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.body}>

        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#dddddd"
  },
  header: {
    height: 64,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    textAlign: 'center',
    color: '#8e34c9',
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 20,
    paddingLeft: 10
  },
  btnLogout: {
    height: 40,
    width: 64,
    margin: 10,
    borderRadius: 15,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnLogoutLabel: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '700'
  },
  modalCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  modalBtns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8
  },
  button: {
    borderRadius: 20,
    padding: 10,
    margin: 3,
  },
  buttonClose: {
    backgroundColor: '#8e34c9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonCloseText: {
    color: 'white'
  },
  buttonConfirmLogout: {
    width: 80,
    backgroundColor: '#eeeeee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonConfirmLogoutText: {
    color: 'black'
  }
});

export default Home