import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const FormularioResenas = ({ onSubmit, resenaInicial = null }) => {
  const [calificacion, setCalificacion] = useState(resenaInicial?.calificacion || 0);
  const [comentario, setComentario] = useState(resenaInicial?.texto || '');

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Escribir una reseña</Text>
      
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
        placeholder="Escribe tu comentario aquí"
        value={comentario}
        onChangeText={setComentario}
        multiline
        numberOfLines={4}
      />

      <Pressable
        style={styles.boton}
        onPress={() => onSubmit({ calificacion, texto: comentario })}
      >
        <Text style={styles.botonTexto}>Publicar reseña</Text>
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
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  estrellas: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
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
  },
  boton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FormularioResenas;