import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  TextInput,
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
        <Text style={styles.subtitle}>Hotel</Text>

        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <FontAwesome name="map-marker" size={20} color="#34495E" />
            <Text style={styles.infoLabel}>Ubicación:</Text>
            <Text style={styles.infoText}>{hotel.ubicacion || 'No disponible'}</Text>
          </View>

          <View style={styles.infoRow}>
            <FontAwesome name="phone" size={20} color="#34495E" />
            <Text style={styles.infoLabel}>Teléfono:</Text>
            <Text style={styles.infoText}>{hotel.telefono || 'No disponible'}</Text>
          </View>

          <View style={styles.infoRow}>
            <FontAwesome name="envelope" size={20} color="#34495E" />
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoText}>{hotel.email || 'No disponible'}</Text>
          </View>

          <View style={styles.infoRow}>
            <FontAwesome name="bed" size={20} color="#34495E" />
            <Text style={styles.infoLabel}>Servicios:</Text>
            <Text style={styles.infoText}>{hotel.servicios || 'No disponible'}</Text>
          </View>

          <View style={styles.infoRow}>
            <FontAwesome name="money" size={20} color="#34495E" />
            <Text style={styles.infoLabel}>Precio:</Text>
            <Text style={styles.infoText}>{hotel.precio || 'No disponible'}</Text>
          </View>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.sectionTitle}>Descripción</Text>
          <Text style={styles.descriptionText}>
            {hotel.descripcion || 'Sin descripción disponible'}
          </Text>
        </View>

        <View style={styles.reseñasContainer}>
          <Text style={styles.sectionTitle}>Reseñas</Text>
          
          <View style={styles.escribirReseña}>
            <Text style={styles.escribirReseñaTitle}>Escribir una reseña</Text>
            
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <FontAwesome 
                  key={star}
                  name="star-o"
                  size={30}
                  color="#FFD700"
                  style={styles.star}
                />
              ))}
            </View>

            <TextInput
              style={styles.comentarioInput}
              placeholder="Escribe tu comentario aquí"
              multiline={true}
              numberOfLines={4}
            />

            <TouchableOpacity style={styles.publicarButton}>
              <Text style={styles.publicarButtonText}>Publicar reseña</Text>
            </TouchableOpacity>
          </View>
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
    height: 250,
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 1,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  contentContainer: {
    padding: 20,
    marginTop: -30,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    marginBottom: 20,
  },
  infoContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoLabel: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#34495E',
    width: 80,
  },
  infoText: {
    flex: 1,
    fontSize: 16,
    color: '#7F8C8D',
  },
  descriptionContainer: {
    marginBottom: 20,
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
    color: '#7F8C8D',
  },
  reseñasContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  escribirReseña: {
    marginTop: 10,
  },
  escribirReseñaTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#2C3E50',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  star: {
    marginHorizontal: 5,
  },
  comentarioInput: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    minHeight: 100,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
  },
  publicarButton: {
    backgroundColor: '#2C3E50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  publicarButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  }
});

export default HotelDetalle;