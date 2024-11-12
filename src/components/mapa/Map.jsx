import React, { useState } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

const MapComponent = () => {
  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;
  const [selectedLocation, setSelectedLocation] = useState(null);
  
  // Coordenadas de Neuquén
  const neuquenBounds = {
    north: -36.5,
    south: -41.0,
    west: -71.5,
    east: -68.0
  };

  const neuquenCenter = {
    lat: -38.9517,
    lng: -68.0592
  };

  const handleMapClick = (event) => {
    const newLocation = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };
    setSelectedLocation(newLocation);
  };

  return (
    <APIProvider apiKey={apiKey}>
      <div style={styles.container}>
        <Map 
          style={{ width: '100%', height: '100%' }}
          defaultCenter={neuquenCenter}
          defaultZoom={8}
          onClick={handleMapClick}
          options={{
            restriction: {
              latLngBounds: neuquenBounds,
              strictBounds: true,
            },
            minZoom: 7,
            maxZoom: 18,
            mapTypeControl: true,
            mapTypeId: 'terrain',
          }}
        >
          {selectedLocation && (
            <Marker
              position={selectedLocation}
              icon={{
                url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
              }}
            />
          )}
        </Map>
      </div>
    </APIProvider>
  );
};

const styles = {
  container: {
    width: '92vw',
    height: '100vh',
    marginBottom: '1%',
    position: 'relative'
  }
};

export default MapComponent;