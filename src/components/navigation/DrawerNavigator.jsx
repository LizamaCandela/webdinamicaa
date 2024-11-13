import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Restaurantes from '../restaurantes/Restaurantes';
import Mapa from '../mapa/Mapa';
import Ajustes from '../ajustes/Ajustes';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Restaurantes"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2C3E50',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        drawerStyle: {
          backgroundColor: '#fff',
          width: 280,
        },
        drawerActiveBackgroundColor: '#2C3E50',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -20,
          fontSize: 16,
        }
      }}
    >
      <Drawer.Screen 
        name="Restaurantes" 
        component={Restaurantes}
        options={{
          title: 'Restaurantes',
          drawerIcon: ({color}) => (
            <Ionicons name="restaurant-outline" size={24} color={color} />
          )
        }}
      />
      <Drawer.Screen 
        name="Mapa" 
        component={Mapa}
        options={{
          title: 'Mapa',
          drawerIcon: ({color}) => (
            <Ionicons name="map-outline" size={24} color={color} />
          )
        }}
      />
      <Drawer.Screen 
        name="Ajustes" 
        component={Ajustes}
        options={{
          title: 'Ajustes',
          drawerIcon: ({color}) => (
            <Ionicons name="settings-outline" size={24} color={color} />
          )
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator; 