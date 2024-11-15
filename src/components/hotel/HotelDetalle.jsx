import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import FormularioResenas from '../resenas/FormularioResenas';
import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from "../../firebase/firebase";
import { FontAwesome } from '@expo/vector-icons';

const HotelDetalle = ({ hotel, onBack }) => {
  const [resenas, setResenas] = useState([]);

  useEffect(() => {
    cargarResenas();
  }, [hotel.id]);

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
        usuario: 'Usuario Anónimo'
      };

      await addDoc(collection(db, 'resenas'), resenaDoc);
      await cargarResenas();
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

        {/* Sección de reseñas */}
        <View style={styles.resenasSection}>
          <Text style={styles.resenasTitle}>Reseñas</Text>
          
          <FormularioResenas onSubmit={agregarResena} />

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
  // ... estilos existentes ...
  resenasSection: {
    marginTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 16,
  },
  resenasTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
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
    color: '#333',
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
    color: '#666',
  },
  // ... mantener los estilos existentes ...
});

export default HotelDetalle;