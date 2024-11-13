import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/components/login/Inicio';
import Registro from './src/components/login/Registro';
import Restaurantes from './src/components/restaurantes/Restaurantes';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Restaurantes">
        <Stack.Screen 
          name="Restaurantes" 
          component={Restaurantes}
          options={{
            title: 'Restaurantes',
            headerStyle: {
              backgroundColor: '#007AFF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
     
      </Stack.Navigator>
    </NavigationContainer>
  );
} 