import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const ActividadDetalle = ({ actividad, onBack }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.backButton} onPress={onBack}>← Volver</Text>
        <Text style={styles.title}>{actividad.nombre}</Text>
      </View>

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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    fontSize: 16,
    color: '#007AFF',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  reviewsContainer: {
    padding: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  tipo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 8,
    color: '#007AFF',
  },
  reviewCard: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  reviewAuthor: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  reviewText: {
    marginBottom: 8,
  }
});

export default ActividadDetalle; 