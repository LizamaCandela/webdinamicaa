import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';

const HotelDetalle = ({ hotel, onBack }) => {
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={onBack}
      >
        <Text style={styles.backButtonText}>← Volver</Text>
      </TouchableOpacity>

      <Image
        source={{ uri: hotel.imagen || 'https://via.placeholder.com/400' }}
        style={styles.imagen}
      />

      <View style={styles.contenido}>
        <Text style={styles.nombre}>{hotel.nombre}</Text>
        <Text style={styles.categoria}>{hotel.categoria}</Text>
        
        <View style={styles.seccion}>
          <Text style={styles.label}>Ubicación:</Text>
          <Text style={styles.texto}>{hotel.ubicacion}</Text>
        </View>

        <View style={styles.seccion}>
          <Text style={styles.label}>Teléfono:</Text>
          <Text style={styles.texto}>{hotel.telefono}</Text>
        </View>

        <View style={styles.seccion}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.texto}>{hotel.email}</Text>
        </View>

        <View style={styles.seccion}>
          <Text style={styles.label}>Servicios:</Text>
          <Text style={styles.texto}>{hotel.servicios}</Text>
        </View>

        <View style={styles.seccion}>
          <Text style={styles.label}>Precio por noche:</Text>
          <Text style={styles.texto}>{hotel.precio}</Text>
        </View>

        <View style={styles.seccion}>
          <Text style={styles.label}>Descripción:</Text>
          <Text style={styles.descripcion}>{hotel.descripcion}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  imagen: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  contenido: {
    padding: 16,
  },
  nombre: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  categoria: {
    fontSize: 16,
    color: '#007AFF',
    marginBottom: 16,
  },
  seccion: {
    marginBottom: 16,
  },
  label: {
    fontWeight: 'bold',
  },
  texto: {
    marginBottom: 8,
  },
  descripcion: {
    marginBottom: 16,
  },
}); 

export default HotelDetalle;