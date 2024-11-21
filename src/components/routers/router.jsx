import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../login/Inicio';
import Registro from '../login/Registro';
import MapComponent from '../mapa/Mapa';
import Actividad from '../actividad/Actividad.jsx';
import Hotel from '../hotel/Hotel.jsx';
import Restaurantes from '../restaurantes/Restaurante.jsx';

const Stack = createStackNavigator();

function Routing() {
    console.log("Rutas disponibles:", {
        Actividad,
        Hotel,
        Restaurantes
    }); // De

    return (
        <NavigationContainer>
            <Stack.Navigator 
                initialRouteName="Login"
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen 
                    name="Login" 
                    component={Login} 
                />
                <Stack.Screen 
                    name="Registro" 
                    component={Registro} 
                />
                <Stack.Screen 
                    name="MapComponent" 
                    component={MapComponent} 
                />
                <Stack.Screen 
                    name="Actividad" 
                    component={Actividad} 
                />
                <Stack.Screen 
                    name="Hotel" 
                    component={Hotel} 
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name="Restaurantes" 
                    component={Restaurantes} 
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Routing;