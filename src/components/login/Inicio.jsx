import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  Alert,
  ImageBackground 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { FontAwesome5 } from '@expo/vector-icons';

const Inicio = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');

  const handleLogin = async () => {
    if (!email || !password || !nombre) {
      Alert.alert('Error', 'Por favor complete todos los campos');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      
      await updateProfile(userCredential.user, {
        displayName: nombre
      });
      
      console.log('Login exitoso:', userCredential.user.email);
      navigation.navigate('MapComponent');
    } catch (error) {
      console.error('Error de login:', error);
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
            <FontAwesome5 name="compass" size={40} color="#1E88E5" />
          </View>

          <Text style={styles.title}>Iniciar Sesión</Text>
          
          <View style={styles.inputWrapper}>
            <FontAwesome5 name="user" size={18} color="#1E88E5" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={nombre}
              onChangeText={setNombre}
              placeholder="Nombre"
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
              placeholderTextColor="#90A4AE"
              keyboardType="email-address"
            />
          </View>
          
          <View style={styles.inputWrapper}>
            <FontAwesome5 name="lock" size={18} color="#1E88E5" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Contraseña"
              placeholderTextColor="#90A4AE"
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.registerButton}
            onPress={() => navigation.navigate('Registro')}
          >
            <Text style={styles.registerText}>
              ¿No tienes cuenta? <Text style={styles.registerTextBold}>Regístrate</Text>
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

// Estilos para efectos hover en web
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.type = 'text/css';
  style.appendChild(document.createTextNode(`
    .loginButton {
      transition: all 0.3s ease;
      cursor: pointer;
    }
    .loginButton:hover {
      background-color: #1976D2 !important;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(25, 118, 210, 0.4);
    }
    .loginButton:active {
      transform: translateY(1px);
    }
    .registerButton {
      transition: all 0.3s ease;
      cursor: pointer;
    }
    .registerButton:hover {
      opacity: 0.8;
    }
    .inputWrapper {
      transition: all 0.3s ease;
    }
    .inputWrapper:focus-within {
      border-color: #1E88E5;
      box-shadow: 0 0 0 2px rgba(30, 136, 229, 0.2);
    }
  `));
  document.head.appendChild(style);
}

export default Inicio;