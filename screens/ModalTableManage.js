import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  StyleSheet,
} from "react-native";
import ModalTableItem from "./ModalTableItem";
import UseStorage from "./useStorage";

const ModalTableManage = ({
  tableId,
  tables,
  setTables,
  handleClose,
  addNewTable,
}) => {
  const [newTableNumber, setNewTableNumber] = useState("");
  const [modalItemVisible, setModalItemVisible] = useState(false);
  const selectedTable = tables.find((table) => table.id === tableId);

  const addItemToTable = (item, quantity) => {
    const updatedTables = tables.map((table) => {
      if (table.id === tableId) {
        return {
          ...table,
          orders: [
            ...table.orders,
            { id: new Date().toString(), item, quantity },
          ],
        };
      }
      return table;
    });
    setTables(updatedTables);
  };

  const closeTableOrder = () => {
    const total = selectedTable.orders.reduce(
      (acc, order) => acc + order.quantity * order.valor,
      0
    );
    alert(`Total a pagar: R$${total.toFixed(2)}`);
    handleClose();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciar Mesa</Text>
      {tableId ? (
        <>
          <FlatList
            data={selectedTable.orders}
            keyExtractor={(order) => order.id}
            renderItem={({ item }) => (
              <View style={styles.orderItem}>
                <Text>
                  {item.item} - Quantidade: {item.quantity}
                </Text>
              </View>
            )}
          />
          <Button
            title="Adicionar Item"
            onPress={() => setModalItemVisible(true)}
          />
          <Button title="Fechar Pedido" onPress={closeTableOrder} />
        </>
      ) : (
        <>
          <TextInput
            placeholder="Número da Mesa"
            value={newTableNumber}
            onChangeText={setNewTableNumber}
            keyboardType="numeric"
            style={styles.input}
          />
          <Button
            title="Confirmar"
            onPress={() => addNewTable(newTableNumber)}
          />
        </>
      )}
      {modalItemVisible && (
        <ModalTableItem
          isVisible={modalItemVisible}
          closeModal={() => setModalItemVisible(false)}
          addItemToTable={addItemToTable}
        />
      )}
      <Button title="Fechar" onPress={handleClose} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  orderItem: { paddingLeft: 8, marginBottom: 5 },
  input: { borderBottomWidth: 1, marginBottom: 16, padding: 8 },
});

export default ModalTableManage;
