import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { crearCliente } from '../services/api';

// src/screens/NuevoClienteScreen.js


export default function NuevoClienteScreen({ navigation }) {
    const [nombre, setNombre] = useState('');
    const [cargando, setCargando] = useState(false);

    const guardarCliente = async () => {
        if (!nombre.trim()) {
            Alert.alert('Error', 'El nombre es obligatorio');
            return;
        }

        setCargando(true);
        try {
            const response = await crearCliente({ nombre });
            if (response.data.insertId) {
                navigation.goBack();
            } else {
                throw new Error('No se recibió el ID del nuevo cliente');
            }
        } catch (error) {
            console.error('Error creando cliente:', error);
            Alert.alert('Error', 'No se pudo guardar el cliente');
        } finally {
            setCargando(false);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Nombre"
                style={styles.input}
                value={nombre}
                onChangeText={setNombre}
                editable={!cargando}
            />

            {cargando
                ? <ActivityIndicator style={{ marginTop: 20 }} size="large" />
                : <Button title="Guardar Cliente" onPress={guardarCliente} />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, justifyContent: 'center' },
    input: {
        borderBottomWidth: 1,
        marginBottom: 20,
        padding: 8,
        fontSize: 16
    }
});