import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase.jsx';
import { useNavigation } from '@react-navigation/native';

export default function Login () {
  
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (name, value) => {
    setUserData({...userData, [name]: value});
  };

  const handleSubmit = async () => {
    const {email, password} = userData;
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(`Usuario logueado: ${user.email}`);
      alert(`Inicio de sesión exitoso: ${user.email}`);
      navigation.navigate('Registro');

    } catch (error) {
      console.log('Error al iniciar sesión:', error.message);
      alert('Error al iniciar sesión')
    }
  };

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicio Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(value) => handleChange('email', value)}
        value={userData.email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="contraseña"
        secureTextEntry
        onChangeText={(value) => handleChange('password', value)}
        value={userData.password}
      />
      <TouchableOpacity 
        style={styles.loginButton}
        onPress={handleSubmit}
      >
        <Text style={styles.loginText}>Iniciar Sesión</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.registerButton}
        onPress={() => navigation.navigate('Registro')}
      >
        <Text style={styles.registerText}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    border:'5px solid black',
    backgroundColor: 'grey',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 20
    
  },
  registerButton: {
    marginTop: 20,
    padding: 10,
  },
  registerText: {
    color: '#007AFF',
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    width: '80%',
    marginTop: 10,
  },
  loginText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
