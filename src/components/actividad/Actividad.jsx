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
import ActividadDetalle from './ActividadDetalle';

const municipiosNeuquen = [
  "Seleccione un municipio",
  "Añelo",
  "Aluminé",
  "Bajada del Agrio",
  "Barrancas",
  "Buta Ranquil",
  "Caviahue-Copahue",
  "Chos Malal",
  "Cultral-Có",
  "El Cholar",
  "El Huecú",
  "Huinganco",
  "Junín de los Andes",
  "Las Coloradas",
  "Las Lajas",
  "Loncopué",
  "Los Catutos",
  "Los Miches",
  "Manzano Amargo",
  "Neuquén Capital",
  "Paso Aguerre",
  "Picún Leufú",
  "Piedra del Águila",
  "Plaza Huincul",
  "Plottier",
  "Rincón de los Sauces",
  "San Martín de los Andes",
  "San Patricio del Chañar",
  "Senillosa",
  "Taquimilán",
  "Tricao Malal",
  "Villa El Chocón",
  "Villa La Angostura",
  "Villa Pehuenia",
  "Vista Alegre",
  "Zapala"
];

const Actividad = () => {
  const [actividades, setActividades] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [municipioSeleccionado, setMunicipioSeleccionado] = useState("Seleccione un municipio");
  const [actividadSeleccionada, setActividadSeleccionada] = useState(null);

  useEffect(() => {
    cargarActividades();
  }, [municipioSeleccionado]);

  const cargarActividades = async () => {
    if (municipioSeleccionado === "Seleccione un municipio") {
      setActividades([]);
      setCargando(false);
      return;
    }

    try {
      setCargando(true);
      const actividadesRef = collection(db, "actividades");
      
      const q = query(
        actividadesRef,
        where("municipio", "==", municipioSeleccionado)
      );

      const querySnapshot = await getDocs(q);
      const actividadesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setActividades(actividadesData);
      setCargando(false);
    } catch (error) {
      console.error('ERROR:', error);
      setError(`Error al cargar las actividades: ${error.message}`);
      setCargando(false);
    }
  };

  const actividadesFiltradas = busqueda
    ? actividades.filter(actividad =>
        actividad.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        actividad.ubicacion.toLowerCase().includes(busqueda.toLowerCase()) ||
        actividad.tipo.toLowerCase().includes(busqueda.toLowerCase())
      )
    : actividades;

  const handleActividadPress = (actividad) => {
    console.log("Actividad seleccionada:", actividad); 
    setActividadSeleccionada(actividad);
  };

  if (actividadSeleccionada) {
    return (
      <ActividadDetalle 
        actividad={actividadSeleccionada}
        onBack={() => setActividadSeleccionada(null)}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Actividades</Text>
        <Text style={styles.headerSubtitle}>Descubre experiencias únicas</Text>
        
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
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Cargando actividades...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={actividadesFiltradas}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.card}
              onPress={() => handleActividadPress(item)}
            >
              <Image 
                source={{ uri: item.imagen || 'https://via.placeholder.com/150' }} 
                style={styles.cardImage}
              />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.nombre}</Text>
                <Text style={styles.cardType}>{item.tipo}</Text>
                <Text style={styles.cardLocation}>{item.ubicacion}</Text>
                <Text style={styles.cardPrice}>{item.precio || 'Gratuito'}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          columnWrapperStyle={styles.row}
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
});

export default Actividad;