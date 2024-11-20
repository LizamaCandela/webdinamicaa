import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../login/Inicio';
import Registro from '../login/Registro';
import MapComponent from '../mapa/Mapa';
import Actividad from '../actividad/Actividad.jsx';
import Hotel from '../hotel/Hotel.jsx';
import Restaurantes from '../restaurantes/Restaurante.jsx';

console.log('Rutas disponibles:', ['Login', 'Registro', 'MapComponent', 'Actividad', 'Hotel', 'Restaurantes']); 

const Stack = createStackNavigator();

function Routing() {
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
                />
                <Stack.Screen 
                    name="Restaurantes" 
                    component={Restaurantes} 
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Routing;