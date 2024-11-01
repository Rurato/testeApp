import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';

const TableControlScreen = () => {
  const [tables, setTables] = useState([
    { id: '1', name: 'Mesa 1', orders: [] },
    { id: '2', name: 'Mesa 2', orders: [] },
    { id: '3', name: 'Mesa 3', orders: [] },
  ]);

  const addOrderToTable = (tableId) => {
    // Exemplo: Adiciona um pedido "Cerveja" na mesa selecionada
    setTables(tables.map(table => {
      if (table.id === tableId) {
        return {
          ...table,
          orders: [...table.orders, { id: new Date().toString(), item: 'Cerveja' }]
        };
      }
      return table;
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Controle de Mesas</Text>
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
            <Button title="Adicionar Pedido" onPress={() => addOrderToTable(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  tableItem: { padding: 8, borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 12 },
  orderItem: { paddingLeft: 8 },
});

export default TableControlScreen;
