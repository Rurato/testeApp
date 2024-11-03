import AsyncStorage from '@react-native-async-storage/async-storage';

const UseStorage = () =>{
    const GetItem = async (key) =>{
      try {
        const items = await AsyncStorage.getItem(key);
        return JSON.parse(items) || [];
      } catch (error) {
        console.log("Erro ao buscar item", error)
        return[];
      }
    }
  
    const SaveItem = async (key, novoitem) =>{
      try {
        let items = await GetItem(key);
        items.push(novoitem)
  
        await AsyncStorage.setItem(key, JSON.stringify(items))
  
      } catch (error) {
        console.log("Erro ao salvar item", error)
      }
    }
  
    const deleteitem = async (key, itemremov) =>{
      try {
        let items = await GetItem(key);
  
        let myitems = items.filter( (item) => {
          return(item ==! itemremov)
        })
  
        await AsyncStorage.setItem(key, JSON.stringify(myitems))
        return myitems;
  
      } catch (error) {
        console.log("Erro ao deletar item", error)
      }
    }
  
    return{
        GetItem,
        SaveItem,
        deleteitem,
    }
  }

export default UseStorage;