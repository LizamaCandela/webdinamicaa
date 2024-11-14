import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/components/login/Inicio';
import Registro from './src/components/login/Registro';
import MapComponent from './src/components/mapa/Mapa';  // Actualizada la ruta según tu estructura

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen name="MapComponent" component={MapComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}