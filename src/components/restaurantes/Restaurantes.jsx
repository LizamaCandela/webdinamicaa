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
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { db } from "../../firebase/firebase.jsx";
import RestauranteDetalle from './RestauranteDetalle';

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

const Restaurantes = () => {
  const [restaurantes, setRestaurantes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [municipioSeleccionado, setMunicipioSeleccionado] = useState("Seleccione un municipio");
  const [restauranteSeleccionado, setRestauranteSeleccionado] = useState(null);

  useEffect(() => {
    cargarRestaurantes();
  }, [municipioSeleccionado]);

  const handleMunicipioChange = (value) => {
    setMunicipioSeleccionado(value);
  };

  const cargarRestaurantes = async () => {
    if (municipioSeleccionado === "Seleccione un municipio") {
      setRestaurantes([]);
      setCargando(false);
      return;
    }

    try {
      setCargando(true);
      console.log('1. Iniciando carga para municipio:', municipioSeleccionado);

      const restaurantesRef = collection(db, "restaurantes");
      console.log('2. Referencia a colección creada');

      // Obtener TODOS los documentos primero para debug
      const todosLosRestaurantes = await getDocs(collection(db, "restaurantes"));
      console.log('3. TODOS los restaurantes:');
      todosLosRestaurantes.forEach(doc => {
        console.log('Documento:', {
          id: doc.id,
          municipio: doc.data().municipio,
          datos: doc.data()
        });
      });

      const q = query(
        restaurantesRef,
        where("municipio", "==", municipioSeleccionado),
        orderBy("nombre")
      );
      console.log('4. Query creada para municipio:', municipioSeleccionado);

      const querySnapshot = await getDocs(q);
      console.log('5. Documentos encontrados:', querySnapshot.size);

      const restaurantesData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        console.log('6. Procesando documento:', { id: doc.id, ...data });
        return {
          id: doc.id,
          ...data
        };
      });

      console.log('7. Datos finales:', restaurantesData);
      setRestaurantes(restaurantesData);
      setCargando(false);

    } catch (error) {
      console.error('ERROR DETALLADO:', {
        mensaje: error.message,
        codigo: error.code,
        nombre: error.name,
        stack: error.stack
      });
      setError(`Error al cargar los restaurantes: ${error.message}`);
      setCargando(false);
    }
  };

  const restaurantesFiltrados = busqueda
    ? restaurantes.filter(rest =>
        rest.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        rest.direccion.toLowerCase().includes(busqueda.toLowerCase()) ||
        rest.categoria.toLowerCase().includes(busqueda.toLowerCase())
      )
    : restaurantes;

  const handleRestaurantePress = (restaurante) => {
    setRestauranteSeleccionado(restaurante);
  };

  const renderRestaurante = ({ item: restaurante }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => handleRestaurantePress(restaurante)}
    >
      {restaurante.imagen ? (
        <Image 
          source={{ uri: restaurante.imagen }} 
          style={styles.cardImage}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.cardImage, styles.noImage]}>
          <Text style={styles.noImageText}>Sin imagen</Text>
        </View>
      )}
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {restaurante.nombre}
        </Text>
        <Text style={styles.cardText} numberOfLines={1}>
          {restaurante.direccion}
        </Text>
        <Text style={styles.cardText} numberOfLines={1}>
          {restaurante.horario}
        </Text>
        <Text style={styles.cardCategory}>
          {restaurante.categoria}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (restauranteSeleccionado) {
    return (
      <RestauranteDetalle 
        restaurante={restauranteSeleccionado}
        onBack={() => setRestauranteSeleccionado(null)}
      />
    );
  }

  if (error) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Restaurantes</Text>
        <Text style={styles.headerSubtitle}>Descubre los mejores lugares</Text>
        
        <View style={styles.pickerContainer}>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={municipioSeleccionado}
              onValueChange={handleMunicipioChange}
              style={styles.picker}
            >
              {municipiosNeuquen.map((municipio) => (
                <Picker.Item 
                  key={municipio} 
                  label={municipio} 
                  value={municipio}
                />
              ))}
            </Picker>
          </View>
        </View>
      </View>

      {error && (
        <Text style={styles.error}>{error}</Text>
      )}

      {cargando ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Buscando restaurantes...</Text>
        </View>
      ) : (
        <FlatList
          data={restaurantes}
          renderItem={renderRestaurante}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
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
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
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
    textAlign: 'center',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#E8E8E8',
    textAlign: 'center',
    marginBottom: 20,
  },
  pickerContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  pickerWrapper: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  picker: {
    height: 45,
    width: '100%',
  },
  grid: {
    padding: 15,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
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
    height: 130,
  },
  noImage: {
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    color: '#999',
    fontSize: 12,
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  cardText: {
    fontSize: 12,
    color: '#7F8C8D',
    marginBottom: 2,
  },
  cardCategory: {
    fontSize: 12,
    color: '#E74C3C',
    marginTop: 4,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#7F8C8D',
  },
  error: {
    color: '#E74C3C',
    padding: 20,
    textAlign: 'center',
    backgroundColor: '#FADBD8',
    margin: 10,
    borderRadius: 8,
  }
});

export default Restaurantes;