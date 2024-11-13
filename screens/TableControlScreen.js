import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import ModalTableManage from "./ModalTableManage";

const TableControlScreen = () => {
  const [tables, setTables] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);

  // Função para adicionar nova mesa
  const addNewTable = (tableNumber) => {
    const newTable = {
      id: String(new Date().getTime()),
      name: `Mesa ${tableNumber}`,
      orders: [],
    };
    setTables([...tables, newTable]);
    setModalVisible(false); // Fecha o modal após adicionar a mesa
  };

  // Função para abrir o modal de gerenciamento de mesa
  const manageTable = (tableId) => {
    setSelectedTable(tableId);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Controle de Mesas</Text>

      {/* Botão para abrir o modal de nova mesa */}
      <Button title="Nova Mesa" onPress={() => setModalVisible(true)} />

      <FlatList
        data={tables}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.tableItem}>
            <Text>{item.name}</Text>
            <FlatList
              data={item.orders}
              keyExtractor={(order) => order.id}
              renderItem={({ item }) => (
                <Text style={styles.orderItem}>- {item.item}</Text>
              )}
            />
            <Button
              title="Gerenciar Mesa"
              onPress={() => manageTable(item.id)}
            />
          </View>
        )}
      />

      {/* Modal de gerenciamento de mesa */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <ModalTableManage
          tableId={selectedTable}
          tables={tables}
          setTables={setTables}
          handleClose={() => setModalVisible(false)}
          addNewTable={addNewTable} // Função para adicionar mesa
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  tableItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 12,
  },
  orderItem: { paddingLeft: 8 },
});

export default TableControlScreen;
