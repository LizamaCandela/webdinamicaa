import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Linking 
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const HotelDetalle = ({ hotel, onBack }) => {
  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: hotel.imagen || 'https://via.placeholder.com/400' }}
        style={styles.headerImage}
      />
      
      <TouchableOpacity 
        style={styles.backButton}
        onPress={onBack}
      >
        <Text style={styles.backText}>← Volver</Text>
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{hotel.nombre}</Text>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <FontAwesome name="map-marker" size={24} color="#2C3E50" />
            </View>
            <Text style={styles.infoLabel}>Ubicación:</Text>
            <Text style={styles.infoText}>{hotel.ubicacion || 'No disponible'}</Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <FontAwesome name="phone" size={24} color="#2C3E50" />
            </View>
            <Text style={styles.infoLabel}>Teléfono:</Text>
            <Text style={styles.infoText}>{hotel.telefono || 'No disponible'}</Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <FontAwesome name="envelope" size={24} color="#2C3E50" />
            </View>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoText}>{hotel.email || 'No disponible'}</Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <FontAwesome name="bed" size={24} color="#2C3E50" />
            </View>
            <Text style={styles.infoLabel}>Servicios:</Text>
            <Text style={styles.infoText}>{hotel.servicios || 'No disponible'}</Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <FontAwesome name="money" size={24} color="#2C3E50" />
            </View>
            <Text style={styles.infoLabel}>Precio:</Text>
            <Text style={styles.infoText}>{hotel.precio || 'No disponible'}</Text>
          </View>
        </View>

        <View style={styles.descriptionCard}>
          <Text style={styles.sectionTitle}>Descripción</Text>
          <Text style={styles.descriptionText}>
            {hotel.descripcion || 'Sin descripción disponible'}
          </Text>
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
  headerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 20,
    zIndex: 1,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  iconContainer: {
    width: 40,
    alignItems: 'center',
  },
  infoLabel: {
    width: 80,
    fontSize: 16,
    fontWeight: '500',
    color: '#2C3E50',
  },
  infoText: {
    flex: 1,
    fontSize: 16,
    color: '#34495E',
  },
  descriptionCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#34495E',
  }
});

export default HotelDetalle;