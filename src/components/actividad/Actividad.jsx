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
import ActividadDetalle from './ActividadDetalle';

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

      actividadesData.sort((a, b) => a.nombre.localeCompare(b.nombre));
      setActividades(actividadesData);
      setCargando(false);

    } catch (error) {
      console.error('ERROR DETALLADO:', error);
      setError(`Error al cargar las actividades: ${error.message}`);
      setCargando(false);
    }
  };

  const actividadesFiltradas = busqueda
    ? actividades.filter(act =>
        act.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        act.ubicacion.toLowerCase().includes(busqueda.toLowerCase()) ||
        act.tipo.toLowerCase().includes(busqueda.toLowerCase())
      )
    : actividades;

  const handleActividadPress = (actividad) => {
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
        <View style={styles.pickerWrapper}>
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
      </View>

      <View style={styles.busquedaContainer}>
        <TextInput
          style={styles.busquedaInput}
          placeholder="Buscar actividad..."
          value={busqueda}
          onChangeText={setBusqueda}
        />
      </View>

      {cargando ? (
        <View style={styles.centeredContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.cargandoText}>Cargando actividades...</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.gridContainer}>
            {actividadesFiltradas.length > 0 ? (
              <View style={styles.grid}>
                {actividadesFiltradas.map(actividad => (
                  <TouchableOpacity 
                    key={actividad.id} 
                    style={styles.actividadCard}
                    onPress={() => handleActividadPress(actividad)}
                  >
                    <Image
                      source={{ uri: actividad.imagen || 'https://via.placeholder.com/150' }}
                      style={styles.actividadImagen}
                    />
                    <View style={styles.actividadInfo}>
                      <Text style={styles.nombre} numberOfLines={1}>{actividad.nombre}</Text>
                      <Text style={styles.tipo} numberOfLines={1}>{actividad.tipo}</Text>
                      <Text style={styles.ubicacion} numberOfLines={1}>{actividad.ubicacion}</Text>
                      <Text style={styles.horario} numberOfLines={1}>{actividad.horario}</Text>
                      <Text style={styles.precio} numberOfLines={1}>{actividad.precio}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View style={styles.noResultados}>
                <Text style={styles.noResultadosText}>
                  {municipioSeleccionado === "Seleccione un municipio" 
                    ? "Por favor, seleccione un municipio"
                    : "No hay actividades disponibles en este municipio"}
                </Text>
              </View>
            )}
          </View>
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
    alignItems: 'center',
  },
  pickerWrapper: {
    width: '80%',
    maxWidth: 300,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  picker: {
    height: 40,
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
    flexGrow: 1,
    padding: 10,
  },
  gridContainer: {
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actividadCard: {
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
  actividadImagen: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  actividadInfo: {
    padding: 8,
  },
  nombre: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  tipo: {
    fontSize: 12,
    color: '#007AFF',
    marginBottom: 2,
  },
  ubicacion: {
    fontSize: 11,
    color: '#666',
    marginBottom: 2,
  },
  horario: {
    fontSize: 11,
    color: '#666',
    marginBottom: 2,
  },
  precio: {
    fontSize: 11,
    color: '#666',
  },
  noResultados: {
    padding: 20,
    alignItems: 'center',
    width: '100%',
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
  },
  cargandoText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  }
});

export default Actividad;