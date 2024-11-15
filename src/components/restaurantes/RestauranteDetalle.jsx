import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { db } from '../../firebase/firebase';
import { 
  collection, 
  addDoc, 
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  query, 
  where, 
  serverTimestamp 
} from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const RestauranteDetalle = ({ restaurante }) => {
  const navigation = useNavigation();
  const [resenas, setResenas] = useState([]);
  const [nuevaResena, setNuevaResena] = useState('');
  const [calificacion, setCalificacion] = useState(0);
  const [editandoResena, setEditandoResena] = useState(null);

  useEffect(() => {
    cargarResenas();
  }, [restaurante?.id]);

  const cargarResenas = async () => {
    if (!restaurante?.id) return;
    
    try {
      const q = query(
        collection(db, 'resenas'),
        where('restauranteId', '==', restaurante.id)
      );
      
      const querySnapshot = await getDocs(q);
      const resenasData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setResenas(resenasData);
    } catch (error) {
      console.error('Error al cargar reseñas:', error);
    }
  };

  const agregarResena = async () => {
    if (nuevaResena.trim() === '' || calificacion === 0) {
      Alert.alert('Error', 'Por favor escribe una reseña y selecciona una calificación');
      return;
    }

    try {
      const nuevaResenaDoc = {
        restauranteId: restaurante.id,
        texto: nuevaResena,
        calificacion,
        fecha: serverTimestamp(),
        usuario: 'Usuario Anónimo'
      };

      await addDoc(collection(db, 'resenas'), nuevaResenaDoc);
      await cargarResenas();
      setNuevaResena('');
      setCalificacion(0);
      Alert.alert('Éxito', 'Reseña publicada correctamente');
    } catch (error) {
      console.error('Error al agregar reseña:', error);
      Alert.alert('Error', 'No se pudo publicar la reseña');
    }
  };

  const editarResena = (resena) => {
    setEditandoResena(resena);
    setNuevaResena(resena.texto);
    setCalificacion(resena.calificacion);
  };

  const actualizarResena = async () => {
    if (nuevaResena.trim() === '' || calificacion === 0) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    try {
      const resenaRef = doc(db, 'resenas', editandoResena.id);
      await updateDoc(resenaRef, {
        texto: nuevaResena,
        calificacion,
        fechaEdicion: serverTimestamp()
      });

      await cargarResenas();
      setEditandoResena(null);
      setNuevaResena('');
      setCalificacion(0);
      Alert.alert('Éxito', 'Reseña actualizada correctamente');
    } catch (error) {
      console.error('Error al actualizar reseña:', error);
      Alert.alert('Error', 'No se pudo actualizar la reseña');
    }
  };

  const eliminarResena = async (id) => {
    try {
      await deleteDoc(doc(db, 'resenas', id));
      await cargarResenas();
      Alert.alert('Éxito', 'Reseña eliminada correctamente');
    } catch (error) {
      console.error('Error al eliminar reseña:', error);
      Alert.alert('Error', 'No se pudo eliminar la reseña');
    }
  };

  const cancelarEdicion = () => {
    setEditandoResena(null);
    setNuevaResena('');
    setCalificacion(0);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Pressable 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
        >
          <FontAwesome name="arrow-left" size={24} color="#007AFF" />
        </Pressable>
        <View style={styles.restauranteInfo}>
          <Text style={styles.nombre}>{restaurante.nombre}</Text>
          <Text style={styles.direccion}>{restaurante.direccion}</Text>
        </View>
      </View>

      <View style={styles.resenaForm}>
        <Text style={styles.formTitle}>
          {editandoResena ? 'Editar Reseña' : 'Escribir Reseña'}
        </Text>
        
        <View style={styles.calificacionContainer}>
          {[1, 2, 3, 4, 5].map((estrella) => (
            <Pressable
              key={estrella}
              onPress={() => setCalificacion(estrella)}
            >
              <FontAwesome
                name={estrella <= calificacion ? "star" : "star-o"}
                size={30}
                color="#FFD700"
                style={styles.estrella}
              />
            </Pressable>
          ))}
        </View>

        <TextInput
          style={styles.input}
          placeholder="Escribe tu reseña aquí"
          value={nuevaResena}
          onChangeText={setNuevaResena}
          multiline
          rows={4}
          textAlignVertical="top"
        />

        <View style={styles.botonesContainer}>
          <Pressable
            style={[styles.submitButton, styles.buttonFlex]}
            onPress={editandoResena ? actualizarResena : agregarResena}
          >
            <Text style={styles.submitButtonText}>
              {editandoResena ? 'Actualizar' : 'Publicar'}
            </Text>
          </Pressable>

          {editandoResena && (
            <Pressable
              style={[styles.cancelButton, styles.buttonFlex]}
              onPress={cancelarEdicion}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </Pressable>
          )}
        </View>
      </View>

      <View style={styles.resenasContainer}>
        <Text style={styles.resenasTitle}>Reseñas ({resenas.length})</Text>
        
        {resenas.map(resena => (
          <View key={resena.id} style={styles.resenaCard}>
            <View style={styles.resenaHeader}>
              <Text style={styles.usuario}>{resena.usuario}</Text>
              <View style={styles.accionesContainer}>
                <Pressable
                  onPress={() => editarResena(resena)}
                  style={styles.accionBoton}
                >
                  <FontAwesome name="edit" size={20} color="#007AFF" />
                </Pressable>
                <Pressable
                  onPress={() => eliminarResena(resena.id)}
                  style={styles.accionBoton}
                >
                  <FontAwesome name="trash" size={20} color="#FF3B30" />
                </Pressable>
              </View>
            </View>
            
            <View style={styles.estrellas}>
              {[...Array(5)].map((_, index) => (
                <FontAwesome
                  key={index}
                  name={index < resena.calificacion ? "star" : "star-o"}
                  size={16}
                  color="#FFD700"
                  style={styles.estrella}
                />
              ))}
            </View>
            
            <Text style={styles.resenaTexto}>{resena.texto}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    padding: 10,
    marginRight: 10,
  },
  restauranteInfo: {
    flex: 1,
  },
  nombre: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  direccion: {
    fontSize: 16,
    color: '#666',
  },
  resenaForm: {
    marginBottom: 24,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  calificacionContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  estrella: {
    marginRight: 8,
  },
  input: {
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    minHeight: 100,
  },
  botonesContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  buttonFlex: {
    flex: 1,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  resenasContainer: {
    marginTop: 24,
  },
  resenasTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  resenaCard: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  resenaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  usuario: {
    fontWeight: 'bold',
  },
  accionesContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  accionBoton: {
    padding: 5,
  },
  resenaTexto: {
    fontSize: 16,
    lineHeight: 24,
  },
  estrellas: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
  },
  estrella: {
    marginRight: 4,
  },
});

export default RestauranteDetalle;