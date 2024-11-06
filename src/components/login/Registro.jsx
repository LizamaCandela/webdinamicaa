import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  return (
    <View>
      <Text>Login</Text>
      <Button title="Ir a Registro" onPress={() => navigation.navigate('Registro')} />
    </View>
  );
};

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [contraseña, setContraseña] = useState('');

  const handleRegister = () => {
    // Aquí puedes manejar el registro, por ejemplo, enviando los datos a un servidor
    console.log('Email:', email);
    console.log('Teléfono:', telefono);
    console.log('Contraseña:', contraseña);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrarse</Text>
      
      <Text>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Ingrese su email"
        keyboardType="email-address"
        
      />
      
      <Text>Teléfono</Text>
      <TextInput
        style={styles.input}
        value={telefono}
        onChangeText={setTelefono}
        placeholder="Ingrese su telefono"
       keyboardType="phone-pad"
      />
      
      <Text>Contraseña</Text>
      <TextInput
        style={styles.input}
        value={contraseña}
        onChangeText={setContraseña}
        placeholder="Ingrese la contraseña"
        secureTextEntry={true}
        
      />
      
      <Button title="Crear Cuenta" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 100,
    backgroundColor: 'grey',
    justifyContent: 'center', //eje Y
    alignItems: 'center', //eje X
   
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  Button: {
   backgroundColor: 'blue',
   borderRadius: 20,


  },
});

export default RegisterScreen;
