/*import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/components/login/Inicio';
import Registro from './src/components/login/Registro';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerShown: false // Esto ocultará el header en todas las pantallas
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registro" component={Registro} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}*/
/*import React from 'react';
import { View } from 'react-native';
import Restaurantes from './src/components/restaurantes/Restaurantes';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Restaurantes />
    </View>
  );
}*/
import React from 'react';
import { View } from 'react-native';
import Hotel from './src/components/hotel/Hotel';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Hotel />
    </View>
  );
}