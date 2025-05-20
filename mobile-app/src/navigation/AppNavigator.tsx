import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import InicioScreen from '../screens/InicioScreen';
import ClientesScreen from '../screens/ClientesScreen';
import NuevoCliente from '../screens/NuevoClienteScreen';
import DetalleClienteScreen from '../screens/DetalleClienteScreen';
import NuevoPedido from '../screens/NuevoPedidoScreen';

// Define RootStackParamList con los parámetros de cada pantalla
export type RootStackParamList = {
  Inicio: undefined;
  Clientes: undefined;
  NuevoCliente: undefined;
  DetalleCliente: { clienteId: number; clienteNombre: string };
  NuevoPedido: { clienteId: number; clienteNombre: string };
  NuevoPago: { clienteId: number; clienteNombre: string };
  // Agrega aquí otras pantallas y sus parámetros si es necesario
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Inicio">
      <Stack.Screen name="Inicio" component={InicioScreen} />
      <Stack.Screen name="Clientes" component={ClientesScreen} />
      <Stack.Screen name="NuevoCliente" component={NuevoCliente} />
      <Stack.Screen
        name="DetalleCliente"
        component={DetalleClienteScreen}
        options={({ route }) => ({ title: route.params.clienteNombre })} 
      />
      <Stack.Screen
        name="NuevoPedido"
        component={NuevoPedido}
        options={({ route }) => ({ title: `Nuevo Pedido - ${route.params.clienteNombre}` })}
      />
    </Stack.Navigator>
  );
}