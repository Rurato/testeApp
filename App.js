import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import StockScreen from './screens/StockScreen';
import HomeScreen from './screens/HomeScreen';
import TableControlScreen from './screens/TableControlScreen';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="StockScreen" component={StockScreen} />
        <Stack.Screen name="TableControl" component={TableControlScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;