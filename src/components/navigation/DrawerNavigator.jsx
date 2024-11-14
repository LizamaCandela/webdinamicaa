import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { auth } from '../../firebase/firebase';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import md5 from 'md5';

import Restaurantes from '../restaurantes/Restaurantes';
import Mapa from '../mapa/Mapa';
import Actividad from '../actividad/Actividad';
import Ajustes from '../ajustes/Ajustes';
import Hotel from '../hotel/Hotel';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({
    email: '',
    displayName: 'Usuario'
  });

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserData({
        email: currentUser.email,
        displayName: currentUser.displayName || 'Usuario'
      });
    }
  }, []);

  const gravatarUrl = userData.email ? 
    `https://www.gravatar.com/avatar/${md5(userData.email.toLowerCase())}?d=identicon&s=200` : 
    null;

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Inicio' }],
      });
    } catch (error) {
      Alert.alert('Error', 'No se pudo cerrar sesión');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'space-between' }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerHeader}>
          {gravatarUrl ? (
            <Image 
              source={{ uri: gravatarUrl }} 
              style={styles.profileImage}
            />
          ) : (
            <View style={styles.profileImagePlaceholder}>
              <Text style={styles.profileImagePlaceholderText}>
                {userData.displayName?.charAt(0)?.toUpperCase() || 'U'}
              </Text>
            </View>
          )}
          <Text style={styles.profileName}>{userData.displayName}</Text>
          <Text style={styles.profileEmail}>{userData.email}</Text>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      
      <View style={styles.signOutContainer}>
        <TouchableOpacity 
          style={styles.signOutButton}
          onPress={handleSignOut}
        >
          <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
          <Text style={styles.signOutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
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
      initialRouteName="Mapa"
    >
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
        name="Hotel" 
        component={Hotel}
        options={{
          title: 'Hoteles',
          drawerIcon: ({color}) => (
            <Ionicons name="business" size={24} color={color} />
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
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    backgroundColor: '#34495E',
  },
  profileImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#34495E',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImagePlaceholderText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
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
  signOutContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    marginTop: 'auto',
  },
  signOutButton: {
    backgroundColor: '#2C3E50',
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  signOutText: {
    color: '#FF3B30',
    marginLeft: 32,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default DrawerNavigator; 