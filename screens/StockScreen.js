import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet } from 'react-native';

const StockScreen = () => {
  const [items, setItems] = useState([
    { id: '1', name: 'Cerveja', quantity: 20 },
    { id: '2', name: 'Vodka', quantity: 10 },
    { id: '3', name: 'Whisky', quantity: 5 },
  ]);

  const updateQuantity = (id, quantity) => {
    setItems(items.map(item => item.id === id ? { ...item, quantity: parseInt(quantity) || 0 } : item));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Controle de Estoque</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={item.quantity.toString()}
              onChangeText={(value) => updateQuantity(item.id, value)}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  input: { width: 50, height: 40, borderColor: 'gray', borderWidth: 1, textAlign: 'center' },
});

export default StockScreen;
