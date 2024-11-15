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
import { FontAwesome5 } from '@expo/vector-icons';

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
      navigation.navigate('Inicio');
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
    <View style={styles.mainContainer}>
      <View style={styles.floatingIcons}>
        <FontAwesome5 name="plane" size={30} color="rgba(255,255,255,0.15)" style={[styles.floatingIcon, styles.icon1]} />
        <FontAwesome5 name="map-marked-alt" size={30} color="rgba(255,255,255,0.15)" style={[styles.floatingIcon, styles.icon2]} />
        <FontAwesome5 name="umbrella-beach" size={30} color="rgba(255,255,255,0.15)" style={[styles.floatingIcon, styles.icon3]} />
        <FontAwesome5 name="mountain" size={30} color="rgba(255,255,255,0.15)" style={[styles.floatingIcon, styles.icon4]} />
        <FontAwesome5 name="camera" size={30} color="rgba(255,255,255,0.15)" style={[styles.floatingIcon, styles.icon5]} />
      </View>

      <View style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.logoContainer}>
            <FontAwesome5 name="user-plus" size={40} color="#1E88E5" />
          </View>

          <Text style={styles.title}>Registro</Text>

          <View style={styles.inputWrapper}>
            <FontAwesome5 name="user" size={18} color="#1E88E5" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={nombreUsuario}
              onChangeText={setNombreUsuario}
              placeholder="Nombre de usuario"
              placeholderTextColor="#90A4AE"
            />
          </View>

          <View style={styles.inputWrapper}>
            <FontAwesome5 name="envelope" size={18} color="#1E88E5" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              keyboardType="email-address"
              placeholderTextColor="#90A4AE"
            />
          </View>

          <View style={styles.inputWrapper}>
            <FontAwesome5 name="lock" size={18} color="#1E88E5" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={contraseña}
              onChangeText={setContraseña}
              placeholder="Contraseña"
              secureTextEntry
              placeholderTextColor="#90A4AE"
            />
          </View>

          <View style={styles.inputWrapper}>
            <FontAwesome5 name="lock" size={18} color="#1E88E5" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={confirmarContraseña}
              onChangeText={setConfirmarContraseña}
              placeholder="Confirmar contraseña"
              secureTextEntry
              placeholderTextColor="#90A4AE"
            />
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
            <Text style={styles.loginButtonText}>Registrarse</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.registerButton}
            onPress={() => navigation.navigate('Inicio')}
          >
            <Text style={styles.registerText}>
              ¿Ya tienes cuenta? <Text style={styles.registerTextBold}>Inicia sesión</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#1B4F72',
  },
  floatingIcons: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  floatingIcon: {
    position: 'absolute',
  },
  icon1: { top: '10%', left: '10%' },
  icon2: { top: '20%', right: '15%' },
  icon3: { bottom: '25%', left: '15%' },
  icon4: { bottom: '40%', right: '10%' },
  icon5: { top: '40%', left: '20%' },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  formContainer: {
    width: '25%',
    minWidth: 300,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 10,
  },
  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#E3F2FD',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1E88E5',
    marginBottom: 30,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 45,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#424242',
    fontSize: 14,
  },
  loginButton: {
    width: '100%',
    height: 45,
    backgroundColor: '#1E88E5',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#1E88E5',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  registerButton: {
    marginTop: 20,
    padding: 10,
  },
  registerText: {
    color: '#757575',
    fontSize: 14,
  },
  registerTextBold: {
    color: '#1E88E5',
    fontWeight: '600',
  }
});

export default RegisterScreen;