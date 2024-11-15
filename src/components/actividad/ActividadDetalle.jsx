import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import FormularioResenas from '../resenas/FormularioResenas';
import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from "../../firebase/firebase";
import { FontAwesome } from '@expo/vector-icons';

const ActividadDetalle = ({ actividad, onBack }) => {
  const [resenas, setResenas] = useState([]);

  useEffect(() => {
    cargarResenas();
  }, [actividad.id]);

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
      await cargarResenas();
    } catch (error) {
      console.error('Error al agregar reseña:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.backButton} onPress={onBack}>← Volver</Text>
        <Text style={styles.title}>{actividad.nombre}</Text>
      </View>

      {actividad.imagen && (
        <Image
          source={{ uri: actividad.imagen }}
          style={styles.imagen}
        />
      )}

      <View style={styles.reviewsContainer}>
        <View style={styles.ratingContainer}>
          <Text style={styles.tipo}>{actividad.tipo}</Text>
        </View>

        <View style={styles.reviewCard}>
          <Text style={styles.reviewAuthor}>Ubicación</Text>
          <Text style={styles.reviewText}>{actividad.ubicacion}</Text>
        </View>

        <View style={styles.reviewCard}>
          <Text style={styles.reviewAuthor}>Horario</Text>
          <Text style={styles.reviewText}>{actividad.horario}</Text>
        </View>

        <View style={styles.reviewCard}>
          <Text style={styles.reviewAuthor}>Precio</Text>
          <Text style={styles.reviewText}>{actividad.precio}</Text>
        </View>

        <View style={styles.reviewCard}>
          <Text style={styles.reviewAuthor}>Descripción</Text>
          <Text style={styles.reviewText}>{actividad.descripcion}</Text>
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
  imagen: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
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
  // ... mantener los estilos existentes ...
});

export default ActividadDetalle;