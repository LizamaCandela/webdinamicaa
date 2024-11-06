import React from 'react';
import { ImageBackground, View, Text, StyleSheet } from 'react-native';
import { Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function Ayuda() {
  return (
    <ImageBackground
      source={require('../../../assets/mapa.png')} // reemplaza con la ruta de tu imagen
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.content}>
        {/* Header with menu bar */}
        <View style={styles.header}>
          <Menu style={styles.menu} />
        </View>

        {/* Main content */}
        <View style={styles.main}>
          <Text style={styles.title}>Ayuda</Text>
          <View style={styles.section}>
            <Text style={styles.subtitle}>¿Cómo usar la aplicación?</Text>
            <Text style={styles.list}>
              <Text>1. Regístrate o inicia sesión en la aplicación.</Text>
              <Text>2. Explora las diferentes funciones disponibles en el menú principal.</Text>
              <Text>3. Personaliza tu perfil y configura tus preferencias en la sección de ajustes.</Text>
            </Text>
          </View>
          <Button variant="outline" style={styles.button}>
            Volver
          </Button>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  menu: {
    width: 24,
    height: 24,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  list: {
    fontSize: 16,
  },
  button: {
    paddingHorizontal: 20,
  },
});

