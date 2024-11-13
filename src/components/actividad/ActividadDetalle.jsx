import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';

const ActividadDetalle = ({ actividad, onBack }) => {
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={onBack}
      >
        <Text style={styles.backButtonText}>← Volver</Text>
      </TouchableOpacity>

      <Image
        source={{ uri: actividad.imagen || 'https://via.placeholder.com/400' }}
        style={styles.imagen}
      />

      <View style={styles.contenido}>
        <Text style={styles.nombre}>{actividad.nombre}</Text>
        <Text style={styles.tipo}>{actividad.tipo}</Text>
        
        <View style={styles.seccion}>
          <Text style={styles.label}>Ubicación:</Text>
          <Text style={styles.texto}>{actividad.ubicacion}</Text>
        </View>

        <View style={styles.seccion}>
          <Text style={styles.label}>Horario:</Text>
          <Text style={styles.texto}>{actividad.horario}</Text>
        </View>

        <View style={styles.seccion}>
          <Text style={styles.label}>Precio:</Text>
          <Text style={styles.texto}>{actividad.precio}</Text>
        </View>

        <View style={styles.seccion}>
          <Text style={styles.label}>Descripción:</Text>
          <Text style={styles.descripcion}>{actividad.descripcion}</Text>
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
  backButton: {
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  imagen: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  contenido: {
    padding: 16,
  },
  nombre: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  tipo: {
    fontSize: 16,
    color: '#007AFF',
    marginBottom: 16,
  },
  seccion: {
    marginBottom: 16,
  },
  label: {
    fontWeight: 'bold',
  },
  texto: {
    marginBottom: 8,
  },
  descripcion: {
    marginBottom: 16,
  },
}); 