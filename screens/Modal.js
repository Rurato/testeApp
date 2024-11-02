import { View, Text, StyleSheet, TextInput, Button } from "react-native";

//Tela pra adicionar item
export function ModalItem({handleClose, items}){
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
                value={Qtd}
            />
            
            <Button title="Confirmar" onPress={handleClose}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'top', padding: 16 },
    title: { fontSize: 16, marginBottom: 8 },
    input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, paddingLeft: 8 },
})