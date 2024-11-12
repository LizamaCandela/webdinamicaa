import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MenuComponentes from './src/components/menu/botones';
import AjustesComponent from './src/components/ajuste/Botones2';
import RegisterScreen from './src/components/login/Registro';
import LoginScreen from './src/components/login/Inicio';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapComponent from './src/components/mapa/Map';

export default function App() {
  return (
    <NavigationContainer>
      {<MapComponent/>}
    </NavigationContainer>
  );
}