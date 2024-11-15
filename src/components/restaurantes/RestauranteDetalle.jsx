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

const RestauranteDetalle = ({ restaurante, onBack }) => {
  console.log("Datos de restaurante recibidos:", restaurante);

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: restaurante.imagen || 'https://via.placeholder.com/400' }}
        style={styles.headerImage}
      />
      
      <TouchableOpacity 
        style={styles.backButton}
        onPress={onBack}
      >
        <Text style={styles.backText}>← Volver</Text>
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{restaurante.nombre}</Text>
        <View style={styles.tagContainer}>
          <Text style={styles.tag}>{restaurante.tipo || 'Restaurante'}</Text>
        </View>

        <View style={styles.infoCard}>
          <TouchableOpacity 
            style={styles.infoRow}
            onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurante.ubicacion)}`)}
          >
            <View style={styles.iconContainer}>
              <FontAwesome name="map-marker" size={24} color="#2C3E50" />
            </View>
            <Text style={styles.infoLabel}>Ubicación:</Text>
            <Text style={styles.infoText}>{restaurante.ubicacion}</Text>
          </TouchableOpacity>

          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <FontAwesome name="clock-o" size={24} color="#2C3E50" />
            </View>
            <Text style={styles.infoLabel}>Horario:</Text>
            <Text style={styles.infoText}>{restaurante.horario}</Text>
          </View>

          {restaurante.telefono && (
            <TouchableOpacity 
              style={styles.infoRow}
              onPress={() => Linking.openURL(`tel:${restaurante.telefono}`)}
            >
              <View style={styles.iconContainer}>
                <FontAwesome name="phone" size={24} color="#2C3E50" />
              </View>
              <Text style={styles.infoLabel}>Teléfono:</Text>
              <Text style={styles.infoText}>{restaurante.telefono}</Text>
            </TouchableOpacity>
          )}

          {restaurante.precio && (
            <View style={styles.infoRow}>
              <View style={styles.iconContainer}>
                <FontAwesome name="money" size={24} color="#2C3E50" />
              </View>
              <Text style={styles.infoLabel}>Precio:</Text>
              <Text style={styles.infoText}>{restaurante.precio}</Text>
            </View>
          )}
        </View>

        <View style={styles.descriptionCard}>
          <Text style={styles.sectionTitle}>Descripción</Text>
          <Text style={styles.descriptionText}>
            {restaurante.descripcion || 'Sin descripción disponible'}
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 10,
  },
  tagContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tag: {
    backgroundColor: '#E74C3C',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
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
  },
  reseñasContainer: {
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

export default RestauranteDetalle;