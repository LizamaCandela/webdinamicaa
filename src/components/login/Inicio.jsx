import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  Alert 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase';

export default function Login() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (name, value) => {
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    if (!userData.email || !userData.password) {
      Alert.alert('Error', 'Por favor complete todos los campos');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );
      Alert.alert('Éxito', 'Inicio de sesión exitoso');
      // Aquí puedes navegar a la pantalla principal de tu app
      // navigation.navigate('Home');
    } catch (error) {
      let errorMessage = 'Error al iniciar sesión';
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'Email inválido';
          break;
        case 'auth/user-not-found':
          errorMessage = 'No existe una cuenta con este email';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Contraseña incorrecta';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Demasiados intentos fallidos. Intente más tarde';
          break;
      }
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Inicio Sesión</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(value) => handleChange('email', value)}
          value={userData.email}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#666"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          onChangeText={(value) => handleChange('password', value)}
          value={userData.password}
          placeholderTextColor="#666"
        />
        
        <TouchableOpacity 
          style={styles.button}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.registerButton}
          onPress={() => navigation.navigate('Registro')}
        >
          <Text style={styles.registerText}>¿No tienes cuenta? Regístrate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '35%',
    minHeight: 380,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingVertical: 25,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  input: {
    width: '90%',
    height: 30,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 8,
    borderRadius: 15,
    backgroundColor: '#f9f9f9',
    alignSelf: 'center',
    fontSize: 12,
  },
  button: {
    backgroundColor: '#4c669f',
    padding: 12,
    borderRadius: 25,
    width: '70%',
    marginTop: 20,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  registerButton: {
    marginTop: 20,
    padding: 10,
  },
  registerText: {
    color: '#4c669f',
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontSize: 12,
  }
});