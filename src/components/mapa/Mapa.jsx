import React from 'react';
import { View, StyleSheet } from 'react-native';
import { APIProvider, Map } from '@vis.gl/react-google-maps';

const MapComponent = () => {
  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <View style={styles.container}>
      <APIProvider apiKey={apiKey}>
        <Map 
          style={styles.map}
          defaultCenter={{ lat: 40.4168, lng: -3.7038 }}
          defaultZoom={13}
        />
      </APIProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  }
});

export default MapComponent;