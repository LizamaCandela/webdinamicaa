import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity,
  ActivityIndicator,
  Picker,
  FlatList 
} from "react-native";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../../firebase/firebase.jsx";
import RestauranteDetalle from './RestauranteDetalle';

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

const Restaurantes = ({ route }) => {
  const [restaurantes, setRestaurantes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [municipioSeleccionado, setMunicipioSeleccionado] = useState("Seleccione un municipio");
  const [restauranteSeleccionado, setRestauranteSeleccionado] = useState(null);

  useEffect(() => {
    cargarRestaurantes();
  }, [municipioSeleccionado]);

  useEffect(() => {
    if (route?.params?.municipio) {
      console.log('Municipio recibido en Restaurantes:', route.params.municipio); 
      setMunicipioSeleccionado(route.params.municipio);
      cargarRestaurantes(); 
    }
  }, [route?.params?.municipio]);

  const cargarRestaurantes = async () => {
    if (municipioSeleccionado === "Seleccione un municipio") {
      setRestaurantes([]);
      setCargando(false);
      return;
    }

    try {
      setCargando(true);
      const restaurantesRef = collection(db, "restaurantes");
      const q = query(
        restaurantesRef,
        where("municipio", "==", municipioSeleccionado),
        orderBy("nombre")
      );

      const querySnapshot = await getDocs(q);
      const restaurantesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setRestaurantes(restaurantesData);
      setCargando(false);
    } catch (error) {
      console.error('ERROR:', error);
      setError(`Error al cargar los restaurantes: ${error.message}`);
      setCargando(false);
    }
  };

  const handleRestaurantePress = (restaurante) => {
    console.log("Restaurante seleccionado:", restaurante);
    setRestauranteSeleccionado(restaurante);
  };

  if (restauranteSeleccionado) {
    return (
      <RestauranteDetalle 
        restaurante={restauranteSeleccionado}
        onBack={() => setRestauranteSeleccionado(null)}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Restaurantes</Text>
        <Text style={styles.headerSubtitle}>Encuentra los mejores lugares para comer</Text>
        
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
          <Text style={styles.loadingText}>Cargando restaurantes...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={restaurantes}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.card}
              onPress={() => handleRestaurantePress(item)}
            >
              <Image 
                source={{ uri: item.imagen || 'https://via.placeholder.com/150' }} 
                style={styles.cardImage}
              />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.nombre}</Text>
                <Text style={styles.cardType}>{item.tipo}</Text>
                <Text style={styles.cardLocation}>{item.ubicacion}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          columnWrapperStyle={styles.row}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {municipioSeleccionado === "Seleccione un municipio"
                  ? "Por favor, seleccione un municipio"
                  : "No hay restaurantes disponibles en este municipio"}
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
  cardType: {
    fontSize: 14,
    color: '#E74C3C',
    marginBottom: 4,
  },
  cardLocation: {
    fontSize: 12,
    color: '#666',
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

export default Restaurantes;