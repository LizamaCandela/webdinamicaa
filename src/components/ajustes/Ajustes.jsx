import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Ajustes = () => {
  const [notificaciones, setNotificaciones] = useState(false);
  const [modoOscuro, setModoOscuro] = useState(false);
  const [ubicacion, setUbicacion] = useState(false);

  return (
    <ScrollView style={[styles.container, { backgroundColor: modoOscuro ? '#1a1a1a' : '#f5f6fa' }]}>
      {/* Sección de Cuenta */}
      <View style={[styles.section, { backgroundColor: modoOscuro ? '#2d2d2d' : '#fff' }]}>
        <Text style={[styles.sectionTitle, { color: modoOscuro ? '#fff' : '#2C3E50' }]}>Cuenta</Text>
        <TouchableOpacity style={styles.option}>
          <View style={styles.optionLeft}>
            <Ionicons name="person-outline" size={24} color={modoOscuro ? '#fff' : '#2C3E50'} />
            <Text style={[styles.optionText, { color: modoOscuro ? '#fff' : '#2C3E50' }]}>Editar Perfil</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#95a5a6" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.option}>
          <View style={styles.optionLeft}>
            <Ionicons name="key-outline" size={24} color={modoOscuro ? '#fff' : '#2C3E50'} />
            <Text style={[styles.optionText, { color: modoOscuro ? '#fff' : '#2C3E50' }]}>Cambiar Contraseña</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#95a5a6" />
        </TouchableOpacity>
      </View>

      {/* Sección de Preferencias */}
      <View style={[styles.section, { backgroundColor: modoOscuro ? '#2d2d2d' : '#fff' }]}>
        <Text style={[styles.sectionTitle, { color: modoOscuro ? '#fff' : '#2C3E50' }]}>Preferencias</Text>
        <View style={styles.option}>
          <View style={styles.optionLeft}>
            <Ionicons name="notifications-outline" size={24} color={modoOscuro ? '#fff' : '#2C3E50'} />
            <Text style={[styles.optionText, { color: modoOscuro ? '#fff' : '#2C3E50' }]}>Notificaciones</Text>
          </View>
          <Switch
            value={notificaciones}
            onValueChange={setNotificaciones}
            trackColor={{ false: "#767577", true: "#2C3E50" }}
          />
        </View>

        <View style={styles.option}>
          <View style={styles.optionLeft}>
            <Ionicons name="moon-outline" size={24} color={modoOscuro ? '#fff' : '#2C3E50'} />
            <Text style={[styles.optionText, { color: modoOscuro ? '#fff' : '#2C3E50' }]}>Modo Oscuro</Text>
          </View>
          <Switch
            value={modoOscuro}
            onValueChange={setModoOscuro}
            trackColor={{ false: "#767577", true: "#2C3E50" }}
          />
        </View>

        <View style={styles.option}>
          <View style={styles.optionLeft}>
            <Ionicons name="location-outline" size={24} color={modoOscuro ? '#fff' : '#2C3E50'} />
            <Text style={[styles.optionText, { color: modoOscuro ? '#fff' : '#2C3E50' }]}>Ubicación</Text>
          </View>
          <Switch
            value={ubicacion}
            onValueChange={setUbicacion}
            trackColor={{ false: "#767577", true: "#2C3E50" }}
          />
        </View>
      </View>

      {/* Sección de Idioma */}
      <View style={[styles.section, { backgroundColor: modoOscuro ? '#2d2d2d' : '#fff' }]}>
        <Text style={[styles.sectionTitle, { color: modoOscuro ? '#fff' : '#2C3E50' }]}>Idioma</Text>
        <TouchableOpacity style={styles.option}>
          <View style={styles.optionLeft}>
            <Ionicons name="language-outline" size={24} color={modoOscuro ? '#fff' : '#2C3E50'} />
            <Text style={[styles.optionText, { color: modoOscuro ? '#fff' : '#2C3E50' }]}>Cambiar Idioma</Text>
          </View>
          <View style={styles.optionRight}>
            <Text style={[styles.optionDetail, { color: modoOscuro ? '#95a5a6' : '#95a5a6' }]}>Español</Text>
            <Ionicons name="chevron-forward" size={24} color="#95a5a6" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Sección de Información */}
      <View style={[styles.section, { backgroundColor: modoOscuro ? '#2d2d2d' : '#fff' }]}>
        <Text style={[styles.sectionTitle, { color: modoOscuro ? '#fff' : '#2C3E50' }]}>Información</Text>
        <TouchableOpacity style={styles.option}>
          <View style={styles.optionLeft}>
            <Ionicons name="information-circle-outline" size={24} color={modoOscuro ? '#fff' : '#2C3E50'} />
            <Text style={[styles.optionText, { color: modoOscuro ? '#fff' : '#2C3E50' }]}>Acerca de</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#95a5a6" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <View style={styles.optionLeft}>
            <Ionicons name="document-text-outline" size={24} color={modoOscuro ? '#fff' : '#2C3E50'} />
            <Text style={[styles.optionText, { color: modoOscuro ? '#fff' : '#2C3E50' }]}>Términos y Condiciones</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#95a5a6" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <View style={styles.optionLeft}>
            <Ionicons name="shield-checkmark-outline" size={24} color={modoOscuro ? '#fff' : '#2C3E50'} />
            <Text style={[styles.optionText, { color: modoOscuro ? '#fff' : '#2C3E50' }]}>Política de Privacidad</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#95a5a6" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  section: {
    backgroundColor: '#fff',
    marginVertical: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginLeft: 15,
    marginBottom: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#2C3E50',
  },
  optionDetail: {
    fontSize: 16,
    color: '#95a5a6',
    marginRight: 10,
  },
});

export default Ajustes;