import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../login/Inicio';
import Registro from '../login/Registro';
import MapComponent from '../Map/Map';

console.log('Rutas disponibles:', ['Login', 'Registro', 'MapComponent']); // Para debugging

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
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Routing;