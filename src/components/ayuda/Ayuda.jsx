import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

const Ayuda = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Logo  decorativo */}
        <View style={styles.imageContainer}>
          <View style={styles.iconGroup}>
            <Ionicons name="compass" size={60} color="#2C3E50" />
            <Ionicons name="restaurant" size={40} color="#e74c3c" />
            <Ionicons name="bed" size={40} color="#3498db" />
            <Ionicons name="bicycle" size={40} color="#2ecc71" />
          </View>
        </View>

        <Text style={styles.title}>Bienvenido a la Guía de Uso</Text>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="menu-outline" size={24} color="#2C3E50" />
            <Text style={styles.sectionTitle}>Navegación en el Menú</Text>
          </View>
          <Text style={styles.text}>
            En el lado derecho, encontrarás un menú desplegable. Desde aquí, puedes acceder a las opciones de Mapa, Restaurantes, Actividades y Hoteles.
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="map-outline" size={24} color="#2C3E50" />
            <Text style={styles.sectionTitle}>Explorar por Municipio</Text>
          </View>
          <Text style={styles.text}>
            Al seleccionar una de estas opciones, se te pedirá elegir un municipio. Dependiendo del municipio que elijas, verás la lista de actividades, hoteles o restaurantes disponibles en esa área.
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="information-circle-outline" size={24} color="#2C3E50" />
            <Text style={styles.sectionTitle}>Información Detallada</Text>
          </View>
          <Text style={styles.text}>
            Una vez que selecciones un lugar, podrás ver:
          </Text>
          <View style={styles.bulletPoints}>
            <View style={styles.bulletPoint}>
              <Ionicons name="time-outline" size={20} color="#34495E" />
              <Text style={styles.bulletText}>Horarios de atención</Text>
            </View>
            <View style={styles.bulletPoint}>
              <Ionicons name="location-outline" size={20} color="#34495E" />
              <Text style={styles.bulletText}>Ubicación del lugar</Text>
            </View>
            <View style={styles.bulletPoint}>
              <Ionicons name="document-text-outline" size={20} color="#34495E" />
              <Text style={styles.bulletText}>Una breve descripción del lugar</Text>
            </View>
            <View style={styles.bulletPoint}>
              <Ionicons name="bookmark-outline" size={20} color="#34495E" />
              <Text style={styles.bulletText}> Nombre del lugar </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="settings-outline" size={24} color="#2C3E50" />
            <Text style={styles.sectionTitle}>Ajustes y Configuración</Text>
          </View>
          <Text style={styles.text}>
            En la sección de Ajustes encontrarás las siguientes opciones:
          </Text>
          <View style={styles.bulletPoints}>
            <View style={styles.bulletPoint}>
              <Ionicons name="person-outline" size={20} color="#34495E" />
              <Text style={styles.bulletText}>Cuenta: Edita tu perfil y gestiona tu contraseña</Text>
            </View>
            
            <View style={styles.bulletPoint}>
              <Ionicons name="notifications-outline" size={20} color="#34495E" />
              <Text style={styles.bulletText}>Preferencias: Activa/desactiva notificaciones, modo oscuro y ubicación</Text>
            </View>

            <View style={styles.bulletPoint}>
              <Ionicons name="language-outline" size={20} color="#34495E" />
              <Text style={styles.bulletText}>Idioma: Cambia el idioma de la aplicación</Text>
            </View>

            
          </View>
        </View>

        <View style={styles.footerSection}>
          <Ionicons name="heart" size={30} color="#e74c3c" />
          <Text style={styles.footerText}>
            Esperamos que disfrutes tu experiencia de turismo con nuestra app.
          </Text>
          
          
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  iconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: 200,
    height: 100,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2C3E50',
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#2C3E50',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#34495E',
  },
  bulletPoints: {
    marginTop: 10,
    marginLeft: 10,
  },
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  bulletText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#34495E',
  },
  footerSection: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginTop: 10,
  },
  footerText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#34495E',
    marginTop: 10,
  },
  contactText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 5,
    fontStyle: 'italic',
  },
});

export default Ayuda;