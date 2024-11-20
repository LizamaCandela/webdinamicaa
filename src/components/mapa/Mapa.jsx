import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Modal } from 'react-native';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const MapComponent = () => {
  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;
  const [searchText, setSearchText] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();

  // Lista de ciudades de Neuquén con sus coordenadas
  const ciudadesNeuquen = [
    { nombre: "Neuquén", lat: -38.9516, lng: -68.0591 },
    { nombre: "San Martín de los Andes", lat: -40.1553, lng: -71.3548 },
    { nombre: "Villa La Angostura", lat: -40.7631, lng: -71.6424 },
    { nombre: "Junín de los Andes", lat: -39.9493, lng: -71.0821 },
    { nombre: "Zapala", lat: -38.9024, lng: -70.0667 },
    // Agrega más ciudades según necesites
  ];

  const filteredCities = ciudadesNeuquen.filter(ciudad =>
    ciudad.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleCitySelect = (ciudad) => {
    setSelectedLocation(ciudad);
    setSearchText(ciudad.nombre);
    setShowModal(true);
  };

  const handleOptionSelect = (option) => {
    setShowModal(false);
    console.log('Opción seleccionada:', option); // Debug
    console.log('Navigation object:', navigation); // Debug

    if (!selectedLocation) {
      console.log('No hay ubicación seleccionada');
      return;
    }

    try {
      switch(option) {
        case 'actividades':
          console.log('Intentando navegar a Actividad'); // Debug
          navigation.navigate('Actividad', {
            municipio: selectedLocation.nombre
          });
          break;
        case 'restaurantes':
          navigation.navigate('Restaurantes', {
            municipio: selectedLocation.nombre
          });
          break;
        case 'hoteles':
          navigation.navigate('Hotel', {
            municipio: selectedLocation.nombre
          });
          break;
      }
    } catch (error) {
      console.error('Error en la navegación:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar ciudad..."
          value={searchText}
          onChangeText={setSearchText}
        />
        {searchText !== '' && (
          <View style={styles.suggestionsList}>
            {filteredCities.map((ciudad, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestionItem}
                onPress={() => handleCitySelect(ciudad)}
              >
                <Text>{ciudad.nombre}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <APIProvider apiKey={apiKey}>
        <Map 
          style={styles.map}
          defaultCenter={{ lat: -38.9516, lng: -68.0591 }}
          defaultZoom={8}
          options={{
            restriction: {
              latLngBounds: {
                north: -36.0,
                south: -41.0,
                east: -68.0,
                west: -71.0
              },
              strictBounds: true
            }
          }}
        >
          {selectedLocation && (
            <Marker
              position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
              onClick={() => setShowModal(true)}
            />
          )}
        </Map>
      </APIProvider>

      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>¿Qué deseas ver en {selectedLocation?.nombre}?</Text>
            
            <TouchableOpacity 
              style={styles.optionButton}
              onPress={() => handleOptionSelect('actividades')}
            >
              <FontAwesome name="calendar" size={24} color="#3498DB" />
              <Text style={styles.optionText}>Actividades</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.optionButton}
              onPress={() => handleOptionSelect('restaurantes')}
            >
              <FontAwesome name="cutlery" size={24} color="#3498DB" />
              <Text style={styles.optionText}>Restaurantes</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.optionButton}
              onPress={() => handleOptionSelect('hoteles')}
            >
              <FontAwesome name="bed" size={24} color="#3498DB" />
              <Text style={styles.optionText}>Hoteles</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    position: 'absolute',
    top: 40,
    zIndex: 1,
    width: '50%',
    alignSelf: 'center',
    left: '25%',
    right: '25%',
  },
  searchInput: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    fontSize: 12,
    height: 35,
    textAlign: 'center',
  },
  suggestionsList: {
    backgroundColor: 'white',
    marginTop: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxHeight: 150,
  },
  suggestionItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2C3E50',
    textAlign: 'center',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    marginVertical: 5,
    width: '100%',
  },
  optionText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#2C3E50',
  },
  closeButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#e74c3c',
    borderRadius: 10,
    width: '100%',
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  }
});

export default MapComponent;