import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, FlatList } from "react-native";
import UseStorage from './StockScreen'

//Tela pra adicionar item
export function ModalItem({handleClose}){
    const {saveitem} = UseStorage()
    const [nome,setnome] = useState()
    const [valor,setvalor] = useState()
    const [quantidade,setquantidade] = useState()
    const [item, setItem] = useState([{name: 'Cerveja', quantity: 20, valor: 9.50 }]);

    async function Hadlesaveitem(){
        setItem([{name: 'teste1', quantity: quantidade, valor: valor}])
        //await saveitem('@pass', item)
        //handleClose();
    }
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Item</Text>
            <TextInput
                style={styles.input}
                placeholder="Item"
                value={nome}
            />
            <Text style={styles.title}>Valor</Text>
            <TextInput
                style={styles.input}
                placeholder="Valor"
                value={valor}
            />
            <Text style={styles.title}>Quantidade</Text>
            <TextInput
                style={styles.input}
                placeholder="Quantidade"
                value={quantidade}
            />
            
            <Button title="Confirmar" onPress={Hadlesaveitem}/>
            <FlatList
                data={item}
                keyExtractor={(item) => item.nome}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{item.name}</Text>
                        <Text>{item.quantity}</Text>
                        <Text>R${item.valor}</Text>
                    </View>
                )}
            />
        
        </View>
    )
    

    
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'top', padding: 16 },
    title: { fontSize: 16, marginBottom: 8 },
    input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, paddingLeft: 8 },
})