import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import UseStorage from "./useStorage";

const ModalTableItem = ({ isVisible, closeModal, addItemToTable }) => {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const { GetItem, UpdateItem } = UseStorage();

  const handleAddItem = async () => {
    const stockItems = await GetItem("@pass");
    const stockItem = stockItems.find((i) => i.name === itemName);

    if (stockItem && stockItem[0].quantity >= parseInt(quantity)) {
      addItemToTable(itemName, parseInt(quantity));
      stockItem[0].quantity -= parseInt(quantity);
      await UpdateItem(stockItems);
      setItemName("");
      setQuantity("");
      closeModal();
    } else {
      alert("Fora de estoque ou quantidade insuficiente");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Item</Text>
      <TextInput
        placeholder="Nome do Item"
        value={itemName}
        onChangeText={setItemName}
        style={styles.input}
      />
      <TextInput
        placeholder="Quantidade"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Confirmar" onPress={handleAddItem} />
      <Button title="Cancelar" onPress={closeModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  input: { borderBottomWidth: 1, marginBottom: 16, padding: 8 },
});

export default ModalTableItem;
