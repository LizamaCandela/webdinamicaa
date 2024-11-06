import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // TO DO: Implement login logic here
    console.log('Login button pressed');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicio Sesion</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="contraseña"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      <Button  title="iniciar" onPress={handleLogin} />
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
});

export default LoginScreen;
