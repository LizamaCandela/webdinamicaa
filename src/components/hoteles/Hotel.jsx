import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  Image, 
  TextInput, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Picker 
} from "react-native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase.jsx";
import HotelDetalle from './HotelDetalle';

const municipiosNeuquen = [
  "Seleccione un municipio",
  "Neuquén Capital",
  "San Martín de los Andes",
  "Villa La Angostura",
  "Junín de los Andes",
  "Aluminé",
  "Zapala",
  "Villa Pehuenia",
  "Caviahue-Copahue",
  "Las Lajas",
  "Piedra del Águila"
];

const Hotel = () => {
  const [hoteles, setHoteles] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [municipioSeleccionado, setMunicipioSeleccionado] = useState("Seleccione un municipio");
  const [hotelSeleccionado, setHotelSeleccionado] = useState(null);

  useEffect(() => {
    cargarHoteles();
  }, [municipioSeleccionado]);

  const cargarHoteles = async () => {
    if (municipioSeleccionado === "Seleccione un municipio") {
      setHoteles([]);
      setCargando(false);
      return;
    }

    try {
      setCargando(true);
      const hotelesRef = collection(db, "hoteles");
      
      const q = query(
        hotelesRef,
        where("municipio", "==", municipioSeleccionado)
      );

      const querySnapshot = await getDocs(q);
      const hotelesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      hotelesData.sort((a, b) => a.nombre.localeCompare(b.nombre));
      setHoteles(hotelesData);
      setCargando(false);

    } catch (error) {
      console.error('ERROR DETALLADO:', error);
      setError(`Error al cargar los hoteles: ${error.message}`);
      setCargando(false);
    }
  };

  const hotelesFiltrados = busqueda
    ? hoteles.filter(hotel =>
        hotel.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        hotel.ubicacion.toLowerCase().includes(busqueda.toLowerCase()) ||
        hotel.categoria.toLowerCase().includes(busqueda.toLowerCase())
      )
    : hoteles;

  if (hotelSeleccionado) {
    return (
      <HotelDetalle 
        hotel={hotelSeleccionado}
        onBack={() => setHotelSeleccionado(null)}
      />
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.backgroundHeader}>
        <Text style={styles.mainTitle}>Hoteles</Text>
        <Text style={styles.subtitle}>Descubre los mejores lugares</Text>
      </View>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={municipioSeleccionado}
          style={styles.picker}
          onValueChange={(itemValue) => setMunicipioSeleccionado(itemValue)}
        >
          {municipiosNeuquen.map((municipio) => (
            <Picker.Item key={municipio} label={municipio} value={municipio} />
          ))}
        </Picker>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar hotel..."
          value={busqueda}
          onChangeText={setBusqueda}
        />
      </View>

      {cargando ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text>Cargando hoteles...</Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollView}>
          {hotelesFiltrados.length === 0 ? (
            <View style={styles.messageContainer}>
              <Text style={styles.messageText}>
                Por favor, seleccione un municipio
              </Text>
            </View>
          ) : (
            <View style={styles.cardsContainer}>
              {hotelesFiltrados.map(hotel => (
                <TouchableOpacity
                  key={hotel.id}
                  style={styles.card}
                  onPress={() => setHotelSeleccionado(hotel)}
                >
                  <Image
                    source={{ uri: hotel.imagen || 'https://via.placeholder.com/150' }}
                    style={styles.cardImage}
                  />
                  <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{hotel.nombre}</Text>
                    <Text style={styles.cardCategory}>{hotel.categoria}</Text>
                    <Text style={styles.cardLocation}>{hotel.ubicacion}</Text>
                    <Text style={styles.cardPrice}>{hotel.precio}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundHeader: {
    backgroundColor: '#2C3E50',
    padding: 15,
  },
  mainTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#fff',
    fontSize: 16,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    margin: 10,
    borderRadius: 5,
  },
  picker: {
    height: 50,
  },
  searchContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  messageContainer: {
    padding: 20,
    alignItems: 'center',
  },
  messageText: {
    fontSize: 16,
    color: '#666',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardCategory: {
    fontSize: 12,
    color: '#007AFF',
    marginBottom: 2,
  },
  cardLocation: {
    fontSize: 11,
    color: '#666',
    marginBottom: 2,
  },
  cardPrice: {
    fontSize: 11,
    color: '#666',
  }
});

export default Hotel; 