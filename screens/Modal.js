import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, FlatList } from "react-native";
import UseStorage from './useStorage'

//Tela pra adicionar item
export function ModalItem({handleClose}){
    const {SaveItem} = UseStorage()
    const [nome,setnome] = useState()
    const [valor,setvalor] = useState()
    const [quantidade,setquantidade] = useState()
    const [item, setItem] = useState([]);

    async function Hadlesaveitem(){
        setItem([{name: nome, quantity: quantidade, valor: valor}]);
        const novoitem = item
        if(novoitem.length==!null){
            await SaveItem("@pass", novoitem)
            handleClose();
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Item</Text>
            <TextInput
                style={styles.input}
                placeholder="Item"
                value={nome}
                onChangeText={setnome}
            />
            <Text style={styles.title}>Valor</Text>
            <TextInput
                style={styles.input}
                placeholder="Valor"
                value={valor}
                onChangeText={setvalor}
            />
            <Text style={styles.title}>Quantidade</Text>
            <TextInput
                style={styles.input}
                placeholder="Quantidade"
                value={quantidade}
                onChangeText={setquantidade}
            />
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
        <View style={styles.title}>
            <Button title="Confirmar" onPress={Hadlesaveitem}/>
        </View>
        <View style={styles.title}>
            <Button title="voltar"  onPress={handleClose}/>
        </View>
            
        </View>
    )
    

    
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'top', padding: 16 },
    title: { fontSize: 16, marginBottom: 8 },
    input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, paddingLeft: 8 },
    item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 ,  paddingRight: 10},
})