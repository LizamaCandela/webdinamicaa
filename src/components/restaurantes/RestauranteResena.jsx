import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const FormularioResena = ({ onSubmit, resenaInicial = null }) => {
  const [calificacion, setCalificacion] = useState(resenaInicial?.calificacion || 0);
  const [comentario, setComentario] = useState(resenaInicial?.comentario || '');

  const handleSubmit = () => {
    if (calificacion === 0) {
      alert('Por favor, selecciona una calificación');
      return;
    }
    
    onSubmit({
      calificacion,
      comentario: comentario.trim()
    });

    // Limpiar el formulario si no es una edición
    if (!resenaInicial) {
      setCalificacion(0);
      setComentario('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {resenaInicial ? 'Editar reseña' : 'Escribir una reseña'}
      </Text>
      
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Pressable
            key={star}
            onPress={() => setCalificacion(star)}
          >
            <FontAwesome
              name={star <= calificacion ? "star" : "star-o"}
              size={30}
              color="#FFD700"
              style={styles.star}
            />
          </Pressable>
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Escribe tu comentario aquí"
        value={comentario}
        onChangeText={setComentario}
        multiline
        numberOfLines={4}
      />

      <Pressable 
        style={styles.submitButton}
        onPress={handleSubmit}
      >
        <Text style={styles.submitButtonText}>
          {resenaInicial ? 'Actualizar' : 'Publicar'} reseña
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  star: {
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
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FormularioResena;