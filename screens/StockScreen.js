import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";
import { ModalItem } from "./Modal";
import UseStorage from "./useStorage";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StockScreen = () => {
  const [item, setItem] = useState([]);
  const [ModalVisible, setModalVisible] = useState(false);

  const { GetItem } = UseStorage();
  const focused = useIsFocused();

  useEffect(() => {
    // async function loadItems() {
    //   let items = (await GetItem("@pass")) || [];
    //   let element = [];

    //   // Ajustando para garantir que cada item tenha o formato correto
    //   setItem(items);
    // }
    loadItems();
  }, [focused, ModalVisible]);

  // Função para carregar itens do AsyncStorage e atualizar o estado
  const loadItems = async (item) => {
    try {
      let items = (await GetItem("@pass")) || [];
      let element = [];
      // for (let i = 0; i < items.length; i++) {
      //   for (let j = 0; j < 1; j++) {
      //     element.push(items[i][j]);
      //   }
      // }

      items.forEach((item) => {
        if (
          item &&
          item[0] &&
          item[0].name &&
          item[0].quantity &&
          item[0].valor
        ) {
          element.push(item[0]);
        }
      });
      setItem(element);
    } catch (error) {
      console.error("Erro ao carregar itens:", error);
    }
  };

  // Função para excluir item e atualizar AsyncStorage
  // const deleteItem = async (name) => {
  //   try {
  //     let items = await GetItem("@pass") || [];
  //     let updatedItems = items.filter((i) => i[0].name !== name); // Filtra o item pelo nome
  //     // let updatedItems = [];
  //     // for (let i = 0; i < items.length; i++) {
  //     //   for (let j = 0; j < 1; j++) {
  //     //     if (items[i][j].name !== name) {
  //     //       updatedItems.push(items[i][j]);
  //     //     }
  //     //     console.log(updatedItems);
  //     //   }
  //     // }
  //     // Atualiza o estado e salva no AsyncStorage
  //     await AsyncStorage.setItem("@pass", JSON.stringify(updatedItems));
  //     setItem(updatedItems.map(i => i[0])); // Converte novamente para o formato usado em `element`
  //   } catch (error) {
  //     console.error("Erro ao excluir o item:", error);
  //   }
  // };

  const deleteItem = async (name) => {
    const updatedItems = item.filter((i) => i.name !== name); // Filtra o item que será excluído
    setItem(updatedItems);

    // Atualiza o AsyncStorage
    await AsyncStorage.setItem("@pass", JSON.stringify(updatedItems));
  };

  const verlog = async () =>{
    let useStorage= await GetItem("@pass");
    //await AsyncStorage.setItem("@pass", JSON.stringify(null)); // Limpa o use storage
    console.log(useStorage)
    console.log(item)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Controle de Estoque</Text>
      <View style={styles.button}>
        <Button title="ver log" onPress={() => verlog()} />
      </View>
      <View style={styles.button}>
        <Button title="Adicionar item" onPress={() => setModalVisible(true)} />
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
            <TouchableOpacity onPress={() => deleteItem(item.name)}>
              <Text style={styles.deleteButton}>X</Text>
            </TouchableOpacity>
            <Text>{item.name}</Text>
            <Text>{item.quantity}</Text>
            <Text>R${item.valor}</Text>
          </View>
        )}
      />

      <Modal visible={ModalVisible} animationType="fade">
        <ModalItem handleClose={() => setModalVisible(false)} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingRight: 10,
  },
  input: {
    width: 50,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    textAlign: "center",
  },
  button: { paddingBottom: 20 },
  colum: { fontWeight: "bold", marginLeft: 30 },
  deleteButton: { fontWeight: "bold" },
});

export default StockScreen;
