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
          defaultCenter={{ lat: -38.9516, lng: -68.0591 }}
          defaultZoom={8}
          options={{
            restriction: {
              latLngBounds: {
                north: -36.0,
                south: -41.0,
                east: -68.0,
                west: -71.0
              },
              strictBounds: true
            }
          }}
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