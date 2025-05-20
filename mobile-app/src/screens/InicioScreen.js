import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const InicioScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bienvenido a la App de Gestión de Clientes</Text>
      <TouchableOpacity
        style={styles.boton}
        onPress={() => navigation.navigate("Clientes")}
      >
        <Text style={styles.botonTexto}>Ver Clientes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  boton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
  },
  botonTexto: {
    color: "#fff",
    fontSize: 18,
  },
});

export default InicioScreen;