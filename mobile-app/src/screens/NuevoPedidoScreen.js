// src/screens/NuevoPedidoScreen.js

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, ActivityIndicator, Text, TouchableOpacity, FlatList } from 'react-native';
import { crearPedido } from '../services/api';

export default function NuevoPedidoScreen({ navigation, route }) {
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(false);

  const agregarProducto = () => {
    if (!descripcion.trim() || !monto.trim() || isNaN(Number(monto))) {
      Alert.alert('Error', 'Ingrese una descripción y un monto válido');
      return;
    }
    setProductos([
      ...productos,
      { descripcion: descripcion, monto: parseFloat(monto) }
    ]);
    setDescripcion('');
    setMonto('');
  };

  const eliminarProducto = (index) => {
    setProductos(productos.filter((_, i) => i !== index));
  };

  const guardarPedido = async () => {
    if (productos.length === 0) {
      Alert.alert('Error', 'Agregue al menos un producto al pedido');
      return;
    }

    const clienteId = route?.params?.clienteId;

    if (!clienteId) {
      Alert.alert('Error', 'No se encontró el cliente para el pedido');
      return;
    }

    setCargando(true);
    try {
      const body = {
        cliente_id: clienteId,
        productos // array de productos [{descripcion, monto}]
      };
      console.log('Enviando pedido:', body);

      const response = await crearPedido(body);

      console.log('Respuesta de la API:', response);

      if (response.data && response.data.insertId) {
        navigation.goBack();
      } else {
        const mensaje = response.data?.message || 'No se recibió el ID del nuevo pedido';
        throw new Error(mensaje);
      }
    } catch (error) {
      console.error('Error creando pedido:', error);
      Alert.alert('Error', error.message || 'No se pudo guardar el pedido');
    } finally {
      setCargando(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Nuevo Pedido</Text>
      <View style={styles.row}>
        <TextInput
          placeholder="Descripción del producto"
          style={[styles.input, { flex: 2 }]}
          value={descripcion}
          onChangeText={setDescripcion}
          editable={!cargando}
        />
        <TextInput
          placeholder="Monto"
          style={[styles.input, { flex: 1, marginLeft: 8 }]}
          value={monto}
          onChangeText={setMonto}
          keyboardType="numeric"
          editable={!cargando}
        />
        <TouchableOpacity
          style={styles.botonAgregar}
          onPress={agregarProducto}
          disabled={cargando}
        >
          <Text style={{ color: 'white', fontSize: 20 }}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={productos}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.productoRow}>
            <Text style={{ flex: 2 }}>{item.descripcion}</Text>
            <Text style={{ flex: 1 }}>${item.monto.toFixed(2)}</Text>
            <TouchableOpacity
              style={styles.botonEliminar}
              onPress={() => eliminarProducto(index)}
              disabled={cargando}
            >
              <Text style={{ color: 'white', fontSize: 18 }}>-</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={{ color: '#888', textAlign: 'center', marginVertical: 10 }}>No hay productos agregados</Text>}
        style={{ marginVertical: 16 }}
      />

      {cargando
        ? <ActivityIndicator style={{ marginTop: 20 }} size="large" />
        : <Button title="Guardar Pedido" onPress={guardarPedido} />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'flex-start' },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  input: {
    borderBottomWidth: 1,
    padding: 8,
    fontSize: 16,
    backgroundColor: '#fff'
  },
  botonAgregar: {
    backgroundColor: 'green',
    borderRadius: 20,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8
  },
  productoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: '#f2f2f2',
    borderRadius: 6,
    padding: 8
  },
  botonEliminar: {
    backgroundColor: 'red',
    borderRadius: 20,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8
  }
});
