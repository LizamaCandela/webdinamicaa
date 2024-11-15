import React, { useState, useEffect } from 'react';
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
import FormularioResenas from '../resenas/FormularioResenas';
import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from "../../firebase/firebase";

const ActividadDetalle = ({ actividad, onBack }) => {
  const [resenas, setResenas] = useState([]);

  useEffect(() => {
    cargarResenas();
  }, []);

  const cargarResenas = async () => {
    try {
      const q = query(
        collection(db, 'resenas'),
        where('actividadId', '==', actividad.id)
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
        actividadId: actividad.id,
        texto: nuevaResena.texto,
        calificacion: nuevaResena.calificacion,
        fecha: serverTimestamp(),
        usuario: 'Usuario Anónimo'
      };

      await addDoc(collection(db, 'resenas'), resenaDoc);
      cargarResenas();
    } catch (error) {
      console.error('Error al agregar reseña:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: actividad.imagen || 'https://via.placeholder.com/400' }}
        style={styles.headerImage}
      />
      
      <TouchableOpacity 
        style={styles.backButton}
        onPress={onBack}
      >
        <FontAwesome name="arrow-left" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{actividad.nombre}</Text>
        <View style={styles.tagContainer}>
          <Text style={styles.tag}>{actividad.tipo}</Text>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <FontAwesome name="map-marker" size={24} color="#2C3E50" />
            <Text style={styles.infoText}>{actividad.ubicación  || 'ubicación ' }</Text>
          </View>

          <View style={styles.infoRow}>
            <FontAwesome name="clock-o" size={24} color="#2C3E50" />
            <Text style={styles.infoText}>{actividad.horario || 'Abierto las 24 horas'}</Text>
          </View>

          <View style={styles.infoRow}>
            <FontAwesome name="money" size={24} color="#2C3E50" />
            <Text style={styles.infoText}>{actividad.precio || 'Gratuito'}</Text>
          </View>
        </View>

        <View style={styles.descriptionCard}>
          <Text style={styles.sectionTitle}>Descripción</Text>
          <Text style={styles.descriptionText}>
            {actividad.descripción  || 'descripción '}
          </Text>
        </View>

        <View style={styles.resenasSection}>
          <Text style={styles.sectionTitle}>Reseñas</Text>
          <FormularioResenas onSubmit={agregarResena} />
          
          {resenas.map((resena) => (
            <View key={resena.id} style={styles.resenaCard}>
              <View style={styles.resenaHeader}>
                <Text style={styles.resenaUsuario}>{resena.usuario}</Text>
                <View style={styles.estrellas}>
                  {[...Array(5)].map((_, index) => (
                    <FontAwesome
                      key={index}
                      name={index < resena.calificacion ? "star" : "star-o"}
                      size={16}
                      color="#FFD700"
                      style={styles.estrella}
                    />
                  ))}
                </View>
              </View>
              <Text style={styles.resenaTexto}>{resena.texto}</Text>
            </View>
          ))}
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
  },
  resenaCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    padding: 15,
    marginTop: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  resenaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  resenaUsuario: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  estrellas: {
    flexDirection: 'row',
  },
  estrella: {
    marginLeft: 4,
  },
  resenaTexto: {
    fontSize: 14,
    color: '#34495E',
    lineHeight: 20,
  }
});

export default ActividadDetalle;