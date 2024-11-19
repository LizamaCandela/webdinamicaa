import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { db } from '../../firebase/firebase';
import { deleteDoc, doc } from 'firebase/firestore';

const FormularioResenas = ({ 
  onSubmit, 
  resenas = [], 
  onEditar, 
  resenaEnEdicion,
  setResenaEnEdicion 
}) => {
  const [resenasLocales, setResenasLocales] = useState(resenas);
  const [calificacion, setCalificacion] = useState(resenaEnEdicion?.calificacion || 0);
  const [texto, setTexto] = useState(resenaEnEdicion?.texto || '');

  useEffect(() => {
    setResenasLocales(resenas);
  }, [resenas]);

  useEffect(() => {
    if (resenaEnEdicion) {
      setCalificacion(resenaEnEdicion.calificacion);
      setTexto(resenaEnEdicion.texto);
    }
  }, [resenaEnEdicion]);

  const handleSubmit = () => {
    if (calificacion === 0) {
      alert('Por favor, selecciona una calificación');
      return;
    }

    if (!texto.trim()) {
      alert('Por favor, escribe una reseña');
      return;
    }

    if (resenaEnEdicion) {
      onEditar({
        ...resenaEnEdicion,
        calificacion,
        texto: texto.trim()
      });
    } else {
      onSubmit({ calificacion, texto: texto.trim() });
    }

    setCalificacion(0);
    setTexto('');
    setResenaEnEdicion(null);
  };

  const eliminarResena = async (resenaId) => {
    console.log('Intentando eliminar reseña con ID:', resenaId);
    
    try {
      const docRef = doc(db, 'resenas', resenaId);
      await deleteDoc(docRef);
      console.log('Documento eliminado exitosamente');
      
      setResenasLocales(prevResenas => 
        prevResenas.filter(resena => resena.id !== resenaId)
      );
      
      alert('Reseña eliminada correctamente');
    } catch (error) {
      console.error('Error al eliminar:', error);
      alert('Error al eliminar la reseña: ' + error.message);
    }
  };

  const handleEliminarClick = (resenaId) => {
    console.log('Botón eliminar presionado para reseña:', resenaId);
    
    if (window.confirm('¿Estás seguro de que deseas eliminar esta reseña?')) {
      eliminarResena(resenaId);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        {resenaEnEdicion ? 'Editar Reseña' : 'Escribir Reseña'}
      </Text>
      
      <View style={styles.estrellas}>
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
        value={texto}
        onChangeText={setTexto}
        multiline
        numberOfLines={4}
      />

      <Pressable
        style={[
          styles.botonPublicar,
          (!calificacion || !texto.trim()) && styles.botonDeshabilitado
        ]}
        onPress={handleSubmit}
      >
        <Text style={styles.botonTexto}>
          {resenaEnEdicion ? 'Actualizar' : 'Publicar'}
        </Text>
      </Pressable>

      <View style={styles.resenasContainer}>
        <Text style={styles.tituloResenas}>Reseñas ({resenasLocales.length})</Text>
        {resenasLocales.map((resena) => (
          <View key={resena.id} style={styles.resenaItem}>
            <View style={styles.resenaHeader}>
              <Text style={styles.usuarioNombre}>
                {resena.usuario || 'Usuario Anónimo'}
              </Text>
              <View style={styles.botonesContainer}>
                <Pressable 
                  style={styles.botonAccion}
                  onPress={() => setResenaEnEdicion(resena)}
                >
                  <FontAwesome name="edit" size={20} color="#007AFF" />
                </Pressable>
                <Pressable 
                  style={styles.botonAccion}
                  onPress={() => handleEliminarClick(resena.id)}
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
                  size={20}
                  color="#FFD700"
                  style={styles.estrella}
                />
              ))}
            </View>
            <Text style={styles.resenaTexto}>{resena.texto}</Text>
            <Text style={styles.fecha}>
              {resena.fecha ? new Date(resena.fecha.toDate()).toLocaleDateString() : ''}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    marginVertical: 8,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  estrellas: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
  },
  estrella: {
    marginHorizontal: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    backgroundColor: '#fff',
    fontSize: 16,
  },
  botonPublicar: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  botonDeshabilitado: {
    backgroundColor: '#cccccc',
    opacity: 0.7
  },
  resenasContainer: {
    marginTop: 24,
  },
  tituloResenas: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  resenaItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  resenaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  usuarioNombre: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
    maxWidth: '70%',
  },
  botonesContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  botonAccion: {
    padding: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 6,
  },
  resenaTexto: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
  fecha: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    fontStyle: 'italic'
  }
});

export default FormularioResenas;