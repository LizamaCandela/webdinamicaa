import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  Image 
} from 'react-native';
import FormularioResenas from '../resenas/FormularioResenas';
import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { FontAwesome } from '@expo/vector-icons';

const RestauranteDetalle = ({ restaurante, onBack }) => {
  const [resenas, setResenas] = useState([]);

  useEffect(() => {
    cargarResenas();
  }, [restaurante.id]);

  const cargarResenas = async () => {
    try {
      const q = query(
        collection(db, 'resenas'),
        where('restauranteId', '==', restaurante.id)
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
        restauranteId: restaurante.id,
        texto: nuevaResena.texto,
        calificacion: nuevaResena.calificacion,
        fecha: serverTimestamp(),
        usuario: 'Usuario Anónimo'
      };

      await addDoc(collection(db, 'resenas'), resenaDoc);
      await cargarResenas(); // Recargar las reseñas
    } catch (error) {
      console.error('Error al agregar reseña:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={onBack}
      >
        <FontAwesome name="arrow-left" size={24} color="#007AFF" />
        <Text style={styles.backButtonText}>Volver</Text>
      </TouchableOpacity>

      <Image
        source={{ uri: restaurante.imagen || 'https://via.placeholder.com/400' }}
        style={styles.imagen}
      />

      <View style={styles.contenido}>
        <Text style={styles.nombre}>{restaurante.nombre}</Text>
        <Text style={styles.categoria}>{restaurante.categoria}</Text>
        <Text style={styles.direccion}>{restaurante.direccion}</Text>
        <Text style={styles.horario}>{restaurante.horario}</Text>

        {/* Sección de reseñas */}
        <View style={styles.resenasSection}>
          <Text style={styles.resenasTitle}>Reseñas</Text>
          
          <FormularioResenas onSubmit={agregarResena} />

          {/* Lista de reseñas existentes */}
          {resenas.map(resena => (
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
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#007AFF',
  },
  imagen: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  contenido: {
    padding: 16,
  },
  nombre: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  categoria: {
    fontSize: 16,
    color: '#E74C3C',
    marginBottom: 8,
  },
  direccion: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  horario: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  resenasSection: {
    marginTop: 24,
  },
  resenasTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  resenaCard: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  resenaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  resenaUsuario: {
    fontWeight: 'bold',
  },
  estrellas: {
    flexDirection: 'row',
  },
  estrella: {
    marginLeft: 4,
  },
  resenaTexto: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default RestauranteDetalle;