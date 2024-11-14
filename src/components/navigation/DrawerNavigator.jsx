import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

import Restaurantes from '../restaurantes/Restaurantes';
import Mapa from '../mapa/Mapa';
import Actividad from '../actividad/Actividad';
import Ajustes from '../ajustes/Ajustes';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const usuario = {
    nombre: "Usuario",
    email: "usuario@email.com",
    foto: null // URL de la foto del usuario si existe
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <View style={styles.profileContainer}>
          {usuario.foto ? (
            <Image 
              source={{ uri: usuario.foto }}
              style={styles.profileImage}
            />
          ) : (
            <View style={styles.profileImagePlaceholder}>
              <Ionicons name="person" size={40} color="#fff" />
            </View>
          )}
        </View>
        <Text style={styles.profileName}>{usuario.nombre}</Text>
        <Text style={styles.profileEmail}>{usuario.email}</Text>
      </View>
      <DrawerItemList {...props} />
      <View style={styles.drawerFooter}>
        <Text style={styles.footerText}>Versión 1.0.0</Text>
      </View>
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{ marginLeft: 16 }}
          >
            <Ionicons name="menu" size={24} color="#fff" />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: '#2C3E50',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        drawerStyle: {
          backgroundColor: '#fff',
          width: 300,
        },
        drawerActiveBackgroundColor: '#2C3E50',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -20,
          fontSize: 16,
          fontWeight: '500',
        },
      })}
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
        name="Actividades" 
        component={Actividad}
        options={{
          title: 'Actividades',
          drawerIcon: ({color}) => (
            <Ionicons name="bicycle-outline" size={24} color={color} />
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

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  drawerHeader: {
    padding: 20,
    backgroundColor: '#2C3E50',
    alignItems: 'center',
  },
  profileContainer: {
    marginBottom: 10,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  profileEmail: {
    color: '#bdc3c7',
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
  },
  drawerItemsContainer: {
    flex: 1,
    paddingTop: 10,
  },
  drawerFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

export default DrawerNavigator; 