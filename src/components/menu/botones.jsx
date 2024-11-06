import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importa el icono desde react-native-vector-icons
import { IoMdSettings } from "react-icons/io"; 



// Define a functional component called MenuComponent
const MenuComponent = () => {
  // Define a function called handlePress that takes a menuItem parameter
  const handlePress = (menuItem) => {
    // Log a message to the console indicating which menu item was pressed
    console.log(`${menuItem} pressed`);
  };



  // Define a state variable called selectedIndex and a function called setSelectedIndex using the useState hook
  const [selectedIndex, setSelectedIndex] = useState(0);



  // Return a JSX element that represents the menu component
  return (
    <ImageBackground
      source={require('../../../assets/mapa.png')} // reemplaza con la ruta de tu imagen
      style={styles.container}
      resizeMode="cover"
    >
      {/* Render a TouchableOpacity component for each menu item */}
      <TouchableOpacity style={styles.button} onPress={() => handlePress('Actividades')}>
        {/* Render a Text component inside the TouchableOpacity */}
        <Text style={styles.buttonText}>Actividades</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handlePress('Restaurantes')}>
        <Text style={styles.buttonText}>Restaurantes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handlePress('Hospedajes')}>
        <Text style={styles.buttonText}>Hospedajes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handlePress('Volver')}>
        <Text style={styles.buttonText}>Volver</Text>
      </TouchableOpacity>
      {/* Render a ButtonGroup component */}
      <View style={styles.buttonContainer}>
        <ButtonGroup
          buttonStyle={{ padding: 10 }}
          selectedButtonStyle={{ backgroundColor: '#e2e2e2' }}
          buttons={[
            <Icon name="format-align-left" size={24} color="#000" />, // Ajusta el tamaño y el color del icono 
            //<IoMdSettings style={styles.buttonConfig} />
          ]}
          selectedIndex={selectedIndex}
          onPress={setSelectedIndex}
        />
        <ButtonGroup
          button2Style={{ padding: 10 }}
          selectedButton2Style={{ backgroundColor: '#e2e2e2' }}
          buttons={[
            <IoMdSettings style={styles.button2Config} />
          ]}
          selectedIndex={selectedIndex}
          onPress={setSelectedIndex}
        />
      </View>
    </ImageBackground>
  );
};


// Define a StyleSheet object called styles that defines the styles for the menu component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', //eje Y
    alignItems: 'center', //eje X
    //left: 0, para moverlo
    backgroundColor: '#808080', // Fondo gris
    border:'5px solid black',
  },
  button: {
    backgroundColor: '#fff',
    borderBottomColor: '#red',
    padding: 15,
    margin: 10,
    borderRadius: 5,
    width: '40%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  buttonContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    //bottom: 0,
    padding: 10,
  },
  buttonConfig: {
    color: '#000',
  },
  button2Config: {
    color: '#000',
  },
});


// Export the MenuComponent component
export default MenuComponent;