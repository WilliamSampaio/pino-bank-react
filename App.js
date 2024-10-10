import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList, Switch } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from './src/Pages/Login';
import Join from './src/Pages/Join';
import Home from './src/Pages/Home';

const Stack = createNativeStackNavigator();

AsyncStorage.setItem('clientes',
  JSON.stringify([
    {
      id: 1,
      cpf: '03374801250',
      pin: '123456',
      name: 'WILLIAM B M SAMPAIO',
      dataNascimento: '1997-01-31',
      sexo: 'm',
      credLimite: 9999.98,
    }
  ])
);

class App extends Component {

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Login'
            component={Login}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name='Join'
            component={Join}
            options={{
              title: 'Novo Cadastro'
            }}
          />
          <Stack.Screen
            name='Home'
            component={Home}
            options={{
              headerShown: false,
              title: 'PinoBank',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;