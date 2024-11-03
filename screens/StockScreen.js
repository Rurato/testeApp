import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet, Modal } from 'react-native';
import {ModalItem} from './Modal'
import UseStorage from './useStorage'
import AsyncStorage from '@react-native-async-storage/async-storage';


const StockScreen = () => {
  const [item, setItem] = useState([
    {name: 'Cerveja', quantity: 20, valor: 9.50 },
    {name: 'Vodka', quantity: 10, valor: 40  },
    {name: 'Whisky', quantity: 5, valor: 60  },
  ]);
  
  const {GetItem} = UseStorage();
  
    async function loaditems() {
      //AsyncStorage.clear("@pass")
      const items = await GetItem("@pass");
      console.log(items)
      //setItem(items);
    }

  const [ModalVisible, setModalVisible] = useState(false)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Controle de Estoque</Text>
      <View style={styles.button}>
        <Button title='lodar item' onPress={() => loaditems()}/>
        <Button title='Adicionar item' onPress={() => setModalVisible(true)}/>
      </View>

      <View style={styles.item}>
            <Text style={styles.colum}>Nome</Text>
            <Text style={styles.colum}>Estoque</Text>
            <Text style={styles.colum}>Valor</Text>
      </View>

      <FlatList
        data={item}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <Text>{item.quantity}</Text>
            <Text>R${item.valor}</Text>
          </View>
        )}
      />

      <Modal visible={ModalVisible} animationType='fade'>
        <ModalItem handleClose={()=>setModalVisible(false)}/>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 ,  paddingRight: 10},
  input: { width: 50, height: 40, borderColor: 'gray', borderWidth: 1, textAlign: 'center' },
  button: { paddingBottom: 20},
  colum:{fontWeight: 'bold'},
});

export default StockScreen;
