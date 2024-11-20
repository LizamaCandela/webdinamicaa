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
  Picker,
  FlatList 
} from "react-native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase.jsx";
import HotelDetalle from './HotelDetalle';

const municipiosNeuquen = [
  "Seleccione un municipio",
  "Aluminé",
  "Caviahue-Copahue",
  "Chos Malal",
  "Cultral-Có",
  "Junín de los Andes",
  "Loncopué",
  "Neuquén Capital",
  "Picún Leufú",
  "Piedra del Águila",
  "Plaza Huincul",
  "Plottier",
  "San Martín de los Andes",
  "Senillosa",
  "Villa El Chocón",
  "Villa La Angostura",
  "Villa Pehuenia",
  "Zapala"
];
const Hotel = ({ route }) => {
  const [hoteles, setHoteles] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [municipioSeleccionado, setMunicipioSeleccionado] = useState("Seleccione un municipio");
  const [hotelSeleccionado, setHotelSeleccionado] = useState(null);

  useEffect(() => {
    cargarHoteles();
  }, [municipioSeleccionado]);

  useEffect(() => {
    if (route?.params?.municipio) {
      console.log('Municipio recibido en Hotel:', route.params.municipio); // Debug
      setMunicipioSeleccionado(route.params.municipio);
      cargarHoteles(); // Asegúrate de que esta función se llame después de establecer el municipio
    }
  }, [route?.params?.municipio]);

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

      setHoteles(hotelesData);
      setCargando(false);
    } catch (error) {
      console.error('ERROR:', error);
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

  const handleHotelPress = (hotel) => {
    setHotelSeleccionado(hotel);
  };

  if (hotelSeleccionado) {
    return (
      <HotelDetalle 
        hotel={hotelSeleccionado}
        onBack={() => setHotelSeleccionado(null)}
      />
    );
  }

  const renderHotel = ({ item: hotel }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => handleHotelPress(hotel)}
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
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Hoteles</Text>
        <Text style={styles.headerSubtitle}>Encuentra el mejor alojamiento</Text>
        
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={municipioSeleccionado}
            style={styles.picker}
            onValueChange={(itemValue) => setMunicipioSeleccionado(itemValue)}
          >
            {municipiosNeuquen.map((municipio) => (
              <Picker.Item 
                key={municipio} 
                label={municipio} 
                value={municipio}
                style={styles.pickerItem}
              />
            ))}
          </Picker>
        </View>
      </View>

      {cargando ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2C3E50" />
          <Text style={styles.loadingText}>Cargando hoteles...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={hotelesFiltrados}
          renderItem={renderHotel}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {municipioSeleccionado === "Seleccione un municipio"
                  ? "Por favor, seleccione un municipio"
                  : "No hay hoteles disponibles en este municipio"}
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#2C3E50',
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#E8E8E8',
    marginBottom: 20,
  },
  pickerContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  pickerItem: {
    fontSize: 16,
  },
  listContainer: {
    padding: 10,
  },
  row: {
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    overflow: 'hidden',
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
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#2C3E50',
  },
  cardCategory: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 4,
  },
  cardLocation: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2ECC71',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#E74C3C',
    fontSize: 16,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default Hotel;