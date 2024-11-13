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
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { db } from "../../firebase/firebase.jsx";

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

const Restaurantes = () => {
  const [restaurantes, setRestaurantes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [municipioSeleccionado, setMunicipioSeleccionado] = useState("Seleccione un municipio");

  useEffect(() => {
    cargarRestaurantes();
  }, [municipioSeleccionado]);

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
      console.error("Error al cargar restaurantes:", error);
      setError("Error al cargar los restaurantes");
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

  if (error) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.selectorContainer}>
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

      <View style={styles.busquedaContainer}>
        <TextInput
          style={styles.busquedaInput}
          placeholder="Buscar restaurante..."
          value={busqueda}
          onChangeText={setBusqueda}
        />
      </View>

      {cargando ? (
        <View style={styles.centeredContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.cargandoText}>Cargando restaurantes...</Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollView}>
          {restaurantesFiltrados.length > 0 ? (
            restaurantesFiltrados.map(restaurante => (
              <TouchableOpacity 
                key={restaurante.id} 
                style={styles.restauranteCard}
              >
                <Image
                  source={{ uri: restaurante.imagen || 'https://via.placeholder.com/150' }}
                  style={styles.restauranteImagen}
                />
                <View style={styles.restauranteInfo}>
                  <Text style={styles.nombre}>{restaurante.nombre}</Text>
                  <Text style={styles.categoria}>{restaurante.categoria}</Text>
                  <Text style={styles.direccion}>{restaurante.direccion}</Text>
                  <Text style={styles.horario}>{restaurante.horario}</Text>
                  <Text style={styles.telefono}>{restaurante.telefono}</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.noResultados}>
              <Text style={styles.noResultadosText}>
                {municipioSeleccionado === "Seleccione un municipio" 
                  ? "Por favor, seleccione un municipio"
                  : "No hay restaurantes disponibles en este municipio"}
              </Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  selectorContainer: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  busquedaContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  busquedaInput: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  restauranteCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  restauranteImagen: {
    width: '100%',
    height: 200,
  },
  restauranteInfo: {
    padding: 16,
  },
  nombre: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  categoria: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 8,
  },
  direccion: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  horario: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  telefono: {
    fontSize: 14,
    color: '#666',
  },
  noResultados: {
    padding: 20,
    alignItems: 'center',
  },
  noResultadosText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  }
});

export default Restaurantes;