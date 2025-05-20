import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ClientesScreen from '../screens/ClientesScreen';
import NuevoCliente from '../screens/NuevoClienteScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Clientes">
      <Stack.Screen name="Clientes" component={ClientesScreen} />
      <Stack.Screen name="NuevoCliente" component={NuevoCliente} />
    </Stack.Navigator>
  );
}