import React from "react";
import { View, Button, StyleSheet, Text } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Controle de Estoque"
        onPress={() => navigation.navigate("StockScreen")}
      />
      <Button
        title="Controle de Mesas"
        onPress={() => navigation.navigate("TableControl")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
});

export default HomeScreen;
