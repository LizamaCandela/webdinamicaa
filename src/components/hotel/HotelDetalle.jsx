import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  TextInput,
  Linking,
  Alert
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { collection, query, where, getDocs, addDoc, deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from "../../firebase/firebase";
import FormularioResenas from '../resenas/FormularioResenas';

const HotelDetalle = ({ hotel, onBack }) => {
  const [resenas, setResenas] = useState([]);
  const [resenaEnEdicion, setResenaEnEdicion] = useState(null);

  useEffect(() => {
    cargarResenas();
  }, []);

  const cargarResenas = async () => {
    try {
      const q = query(
        collection(db, 'resenas'),
        where('hotelId', '==', hotel.id)
      );
      const querySnapshot = await getDocs(q);
      const resenasData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setResenas(resenasData);
    } catch (error) {
      console.error('Error al cargar reseñas:', error);
    }
  };

  const agregarResena = async (nuevaResena) => {
    try {
      const resenaDoc = {
        hotelId: hotel.id,
        texto: nuevaResena.texto,
        calificacion: nuevaResena.calificacion,
        fecha: serverTimestamp(),
        usuario: auth.currentUser.email
      };

      await addDoc(collection(db, 'resenas'), resenaDoc);
      cargarResenas();
    } catch (error) {
      console.error('Error al agregar reseña:', error);
    }
  };

  const handleEditarResena = async (resenaEditada) => {
    try {
      const docRef = doc(db, 'resenas', resenaEditada.id);
      await updateDoc(docRef, {
        calificacion: resenaEditada.calificacion,
        texto: resenaEditada.texto,
        fechaEdicion: serverTimestamp()
      });
      
      await cargarResenas();
      setResenaEnEdicion(null);
    } catch (error) {
      console.error('Error al editar reseña:', error);
      Alert.alert('Error', 'No se pudo editar la reseña');
    }
  };

  const handleEliminarResena = async (resenaId) => {
    try {
      const docRef = doc(db, 'resenas', resenaId);
      await deleteDoc(docRef);
      await cargarResenas();
      Alert.alert('Éxito', 'Reseña eliminada correctamente');
    } catch (error) {
      console.error('Error al eliminar reseña:', error);
      Alert.alert('Error', 'No se pudo eliminar la reseña');
    }
  };

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
        <FontAwesome name="arrow-left" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{hotel.nombre}</Text>
        <View style={styles.tagContainer}>
          <Text style={styles.tag}>Hotel</Text>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <FontAwesome name="map-marker" size={24} color="#2C3E50" />
            <Text style={styles.infoText}>{hotel.direccion || 'Dirección no disponible'}</Text>
          </View>

          <View style={styles.infoRow}>
            <FontAwesome name="phone" size={24} color="#2C3E50" />
            <Text style={styles.infoText}>{hotel.telefono || 'No disponible'}</Text>
          </View>

          <View style={styles.infoRow}>
            <FontAwesome name="envelope" size={24} color="#2C3E50" />
            <Text style={styles.infoText}>{hotel.email || 'No disponible'}</Text>
          </View>

          <View style={styles.infoRow}>
            <FontAwesome name="bed" size={24} color="#2C3E50" />
            <Text style={styles.infoText}>{hotel.servicios || 'No disponible'}</Text>
          </View>

          <View style={styles.infoRow}>
            <FontAwesome name="money" size={24} color="#2C3E50" />
            <Text style={styles.infoText}>{hotel.precio || 'No disponible'}</Text>
          </View>
        </View>

        <View style={styles.descriptionCard}>
          <Text style={styles.sectionTitle}>Descripción</Text>
          <Text style={styles.descriptionText}>
            {hotel.descripcion || 'Sin descripción disponible'}
          </Text>
        </View>

        <View style={styles.resenasSection}>
          <Text style={styles.sectionTitle}>Reseñas</Text>
          <FormularioResenas 
            onSubmit={agregarResena}
            resenas={resenas}
            onEditar={handleEditarResena}
            onEliminar={handleEliminarResena}
            resenaEnEdicion={resenaEnEdicion}
            setResenaEnEdicion={setResenaEnEdicion}
          />
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
    height: 300,
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  contentContainer: {
    padding: 20,
    marginTop: -40,
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
    backgroundColor: '#3498DB',
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
  infoText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#2C3E50',
    flex: 1,
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
  resenasSection: {
    marginTop: 20,
  }
});

export default HotelDetalle;