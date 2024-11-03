import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, FlatList } from "react-native";
import UseStorage from './useStorage'

//Tela pra adicionar item
export function ModalItem({handleClose}){
    const {saveitem} = UseStorage()
    const [nome,setnome] = useState()
    const [valor,setvalor] = useState()
    const [quantidade,setquantidade] = useState()
    const [item, setItem] = useState([{name: nome, quantity: quantidade, valor: valor }]);

    async function Hadlesaveitem(){
        setItem([{name: nome, quantity: quantidade, valor: valor}])
        await saveitem("@pass", item)
        handleClose();
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
            
            <Button title="Confirmar" onPress={Hadlesaveitem}/>
        </View>
    )
    

    
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'top', padding: 16 },
    title: { fontSize: 16, marginBottom: 8 },
    input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, paddingLeft: 8 },
})