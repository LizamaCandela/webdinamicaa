import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const RestauranteDetalle = ({ restaurante, onBack }) => {
  const [placeDetails, setPlaceDetails] = useState(null);
  const GOOGLE_API_KEY = 'AIzaSyCmQFWmgvFql8WLH9hle3fybz7LT7OnzIQ'; // Reemplaza con tu API key

  useEffect(() => {
    const fetchGooglePlaceDetails = async () => {
      try {
        // Primero, buscar el lugar por nombre y dirección
        const searchQuery = `${restaurante.nombre} ${restaurante.direccion}`;
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
            searchQuery
          )}&key=${GOOGLE_API_KEY}`
        );
        
        const data = await response.json();
        
        if (data.results && data.results[0]) {
          const placeId = data.results[0].place_id;
          
          // Luego, obtener los detalles del lugar
          const detailsResponse = await fetch(
            `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,user_ratings_total,reviews&key=${GOOGLE_API_KEY}`
          );
          
          const detailsData = await detailsResponse.json();
          setPlaceDetails(detailsData.result);
        }
      } catch (error) {
        console.error('Error fetching Google Place details:', error);
      }
    };

    fetchGooglePlaceDetails();
  }, [restaurante]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.backButton} onPress={onBack}>← Volver</Text>
        <Text style={styles.title}>{restaurante.nombre}</Text>
      </View>

      {placeDetails ? (
        <View style={styles.reviewsContainer}>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>
              {placeDetails.rating} ★
            </Text>
            <Text style={styles.totalReviews}>
              ({placeDetails.user_ratings_total} reseñas)
            </Text>
          </View>

          {placeDetails.reviews?.map((review, index) => (
            <View key={index} style={styles.reviewCard}>
              <Text style={styles.reviewAuthor}>{review.author_name}</Text>
              <Text style={styles.reviewRating}>{'★'.repeat(review.rating)}</Text>
              <Text style={styles.reviewText}>{review.text}</Text>
              <Text style={styles.reviewDate}>
                {new Date(review.time * 1000).toLocaleDateString()}
              </Text>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.loading}>
          <Text>Cargando reseñas...</Text>
        </View>
      )}
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
  rating: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 8,
  },
  totalReviews: {
    color: '#666',
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
  reviewRating: {
    color: '#FFD700',
    marginBottom: 4,
  },
  reviewText: {
    marginBottom: 8,
  },
  reviewDate: {
    color: '#666',
    fontSize: 12,
  },
  loading: {
    padding: 16,
    alignItems: 'center',
  },
});

export default RestauranteDetalle;
