import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const Mapa: React.FC = () => {
  const key = process.env.APP_GOOGLE_MAPS_API_KEY;
  return (
    <div className="flex justify-center items-center h-screen">
      <LoadScript googleMapsApiKey={key || ''}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Mapa;
