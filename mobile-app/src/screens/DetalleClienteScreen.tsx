// src/screens/DetalleClienteScreen.tsx

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { listarPedidos, listarPagos } from '../services/api';
import { RootStackParamList } from '../navigation/AppNavigator';
import { StackScreenProps } from '@react-navigation/stack';

type Props = StackScreenProps<RootStackParamList, 'DetalleCliente'>;

export default function DetalleClienteScreen({ route, navigation }: Props) {
  const { clienteId, clienteNombre } = route.params;

  const [pedidos, setPedidos] = useState<Array<{ id: number; descripcion: string; monto: number; fecha: string }>>([]);
  const [pagos, setPagos]     = useState<Array<{ id: number; monto: number; fecha: string }>>([]);
  const [cargando, setCargando] = useState<boolean>(false);
  const [saldo, setSaldo]       = useState<number>(0);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const fetchData = async () => {
    setCargando(true);
    try {
      const [pedRes, pagRes] = await Promise.all([
        listarPedidos(clienteId),
        listarPagos(clienteId),
      ]);
      const pedidosData = pedRes.data as Array<any>;
      const pagosData   = pagRes.data as Array<any>;

      setPedidos(pedidosData);
      setPagos(pagosData);

      // Calcular saldo: suma de pedidos menos suma de pagos
      const totalPedidos = pedidosData.reduce((sum, p) => sum + Number(p.monto), 0);
      const totalPagos   = pagosData.reduce((sum, p) => sum + Number(p.monto), 0);
      setSaldo(totalPedidos - totalPagos);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo cargar la información del cliente');
    } finally {
      setCargando(false);
    }
  };

  const renderPedido = ({ item }: { item: any }) => (
    <View style={styles.row}>
      <Text style={styles.desc}>{item.descripcion || '—'}</Text>
      <Text style={styles.monto}>${item.monto.toFixed(2)}</Text>
    </View>
  );

  const renderPago = ({ item }: { item: any }) => (
    <View style={styles.row}>
      <Text style={styles.desc}>Pago</Text>
      <Text style={styles.monto}>${item.monto.toFixed(2)}</Text>
    </View>
  );

  if (cargando) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{clienteNombre}</Text>
      <View style={styles.saldoContainer}>
        <Text style={styles.saldoLabel}>Saldo:</Text>
        <Text style={[styles.saldo, saldo >= 0 ? styles.positivo : styles.negativo]}>
          ${saldo.toFixed(2)}
        </Text>
      </View>

      <Text style={styles.section}>Pedidos</Text>
      {pedidos.length > 0 ? (
        <FlatList
          data={pedidos}
          keyExtractor={item => item.id.toString()}
          renderItem={renderPedido}
        />
      ) : (
        <Text style={styles.empty}>No hay pedidos.</Text>
      )}

      <Text style={styles.section}>Pagos</Text>
      {pagos.length > 0 ? (
        <FlatList
          data={pagos}
          keyExtractor={item => item.id.toString()}
          renderItem={renderPago}
        />
      ) : (
        <Text style={styles.empty}>No hay pagos.</Text>
      )}

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('NuevoPedido', { clienteId, clienteNombre })}
        >
          <Text style={styles.buttonText}>+ Nuevo Pedido</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('NuevoPago', { clienteId, clienteNombre })}
        >
          <Text style={styles.buttonText}>+ Registrar Pago</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  loader:    { flex:1, alignItems:'center', justifyContent:'center' },
  title:     { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  saldoContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  saldoLabel:     { fontSize: 18 },
  saldo:          { fontSize: 18, fontWeight: 'bold', marginLeft: 8 },
  positivo:       { color: 'green' },
  negativo:       { color: 'red' },
  section:        { fontSize: 20, fontWeight: 'bold', marginTop: 16, marginBottom: 8 },
  row:            { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#eee' },
  desc:           { fontSize: 16 },
  monto:          { fontSize: 16 },
  empty:          { fontStyle: 'italic', color: 'gray', textAlign: 'center' },
  actions:        { marginTop: 24 },
  button:         { backgroundColor: '#2196F3', padding: 12, borderRadius: 8, marginBottom: 12, alignItems: 'center' },
  buttonText:     { color: 'white', fontWeight: 'bold' },
});
