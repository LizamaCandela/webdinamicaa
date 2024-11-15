import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const HotelDetalle = ({ hotel, onBack }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.backButton} onPress={onBack}>← Volver</Text>
        <Text style={styles.title}>{hotel.nombre}</Text>
      </View>

      <View style={styles.reviewsContainer}>
        <View style={styles.ratingContainer}>
          <Text style={styles.categoria}>{hotel.categoria}</Text>
        </View>

        <View style={styles.reviewCard}>
          <Text style={styles.reviewAuthor}>Ubicación</Text>
          <Text style={styles.reviewText}>{hotel.ubicacion}</Text>
        </View>

        <View style={styles.reviewCard}>
          <Text style={styles.reviewAuthor}>Teléfono</Text>
          <Text style={styles.reviewText}>{hotel.telefono}</Text>
        </View>

        <View style={styles.reviewCard}>
          <Text style={styles.reviewAuthor}>Precio</Text>
          <Text style={styles.reviewText}>{hotel.precio}</Text>
        </View>

        <View style={styles.reviewCard}>
          <Text style={styles.reviewAuthor}>Descripción</Text>
          <Text style={styles.reviewText}>{hotel.descripcion}</Text>
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
    marginBottom: 8,
  },
  categoria: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewCard: {
    marginBottom: 8,
  },
  reviewAuthor: {
    fontWeight: 'bold',
  },
  reviewText: {
    marginLeft: 8,
  },
}); 