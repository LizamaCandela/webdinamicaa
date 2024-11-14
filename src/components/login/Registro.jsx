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
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebase';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState('');

  const handleRegister = async () => {
    if (!email || !contraseña || !confirmarContraseña || !nombreUsuario) {
      Alert.alert('Error', 'Por favor complete todos los campos');
      return;
    }

    if (contraseña.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (contraseña !== confirmarContraseña) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        contraseña
      );

      await setDoc(doc(db, 'usuarios', userCredential.user.uid), {
        email: email,
        password: contraseña,
        nombreUsuario: nombreUsuario
      });

      Alert.alert('Éxito', 'Registro completado correctamente');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error:', error);
      let errorMessage = 'Error al registrar usuario';
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Este email ya está registrado';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Email inválido';
          break;
        case 'auth/weak-password':
          errorMessage = 'La contraseña debe tener al menos 6 caracteres';
          break;
        default:
          errorMessage = error.message;
      }
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Registrarse</Text>
        
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Ingrese su email"
          keyboardType="email-address"
          placeholderTextColor="#666"
        />
        
        <TextInput
          style={styles.input}
          value={contraseña}
          onChangeText={setContraseña}
          placeholder="Ingrese la contraseña"
          secureTextEntry={true}
          placeholderTextColor="#666"
        />

        <TextInput
          style={styles.input}
          value={confirmarContraseña}
          onChangeText={setConfirmarContraseña}
          placeholder="Confirmar contraseña"
          secureTextEntry={true}
          placeholderTextColor="#666"
        />
        
        <TextInput
          style={styles.input}
          value={nombreUsuario}
          onChangeText={setNombreUsuario}
          placeholder="Ingrese el nombre de usuario"
          placeholderTextColor="#666"
        />
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={handleRegister}
        >
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.loginButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginText}>¿Ya tienes cuenta? Inicia sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
  loginButton: {
    marginTop: 20,
    padding: 10,
  },
  loginText: {
    color: '#4c669f',
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontSize: 12,
  }
});

export default RegisterScreen;