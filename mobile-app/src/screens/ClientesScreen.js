// src/screens/ClientesScreen.js

import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { listarClientes } from '../services/api';

export default function ClientesScreen({ navigation }) {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(false);

  // Carga la lista de clientes cada vez que la pantalla recibe foco
  useFocusEffect(
    useCallback(() => {
      fetchClientes();
    }, [])
  );

  const fetchClientes = async () => {
    setCargando(true);
    try {
      const response = await listarClientes();
      setClientes(response.data);
    } catch (error) {
      console.error('Error al cargar clientes:', error);
      Alert.alert('Error', 'No se pudo cargar la lista de clientes');
    } finally {
      setCargando(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('DetalleCliente', {
        clienteId:   item.id,
        clienteNombre: item.nombre
      })}
    >
      <Text style={styles.nombre}>{item.nombre}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {cargando ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={clientes}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          ListEmptyComponent={<Text style={styles.empty}>No hay clientes aún.</Text>}
        />
      )}

      <TouchableOpacity
        style={styles.boton}
        onPress={() => navigation.navigate('NuevoCliente')}
      >
        <Text style={styles.botonTexto}>+ Agregar Cliente</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: {
    padding: 16,
    marginVertical: 4,
    backgroundColor: '#f9f9f9',
    borderRadius: 6
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
    color: 'gray'
  },
  boton: {
    backgroundColor: '#2196F3',
    padding: 14,
    borderRadius: 24,
    position: 'absolute',
    right: 20,
    bottom: 20,
    elevation: 2
  },
  botonTexto: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }
});
