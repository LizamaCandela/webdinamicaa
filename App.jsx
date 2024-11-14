import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InicioScreen from './src/components/login/Inicio';
import Registro from './src/components/login/Registro';
import DrawerNavigator from './src/components/navigation/DrawerNavigator';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Inicio"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Inicio" component={InicioScreen} />
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen name="MapComponent" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}