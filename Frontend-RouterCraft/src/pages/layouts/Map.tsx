import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { ApiInstance } from '../../Services/Api';

interface Location {
  name: string;
  latitude: number;
  longitude: number;
}

interface DataStructure {
  name: string;
  storage?: Location;
  clients: Location[];
}

interface MarkerData {
  id: number;
  position: {
    lat: number;
    lng: number;
  };
  color: 'blue' | 'red';
}

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const Mapa: React.FC = () => {
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [data, setData] = useState<DataStructure>({
    name: 'NuevaOperacion',
    storage: undefined,
    clients: []
  });
  const key = process.env.APP_GOOGLE_MAPS_API_KEY;

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const newMarker: MarkerData = {
        id: Date.now(),
        position: {
          lat: event.latLng.lat(),
          lng: event.latLng.lng()
        },
        color: markers.length === 0 ? 'blue' : 'red'
      };
      setMarkers([...markers, newMarker]);

      if (markers.length === 0) {
        // First click, set as storage
        setData((prevData) => ({
          ...prevData,
          storage: {
            name: 'almacen1',
            latitude: newMarker.position.lat,
            longitude: newMarker.position.lng
          }
        }));
      } else {
        // Subsequent clicks, set as clients
        const newClient: Location = {
          name: `client${markers.length}`,
          latitude: newMarker.position.lat,
          longitude: newMarker.position.lng
        };
        setData((prevData) => ({
          ...prevData,
          clients: [...prevData.clients, newClient]
        }));
      }
    }
  };

  const handleMarkerRightClick = (markerId: number) => {
    const updatedMarkers = markers.filter(marker => marker.id !== markerId);
    setMarkers(updatedMarkers);

    if (updatedMarkers.length === 0) {
      // Remove storage if the first marker is deleted
      setData((prevData) => ({
        ...prevData,
        storage: undefined
      }));
    } else {
      // Update clients
      const updatedClients = updatedMarkers.slice(1).map((marker, index) => ({
        name: `client${index + 1}`,
        latitude: marker.position.lat,
        longitude: marker.position.lng
      }));
      setData((prevData) => ({
        ...prevData,
        clients: updatedClients
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await ApiInstance.post('/operations', data);
      console.log('Operation saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving operation:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <LoadScript googleMapsApiKey={key || ''}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onClick={handleMapClick}
        >
          <Marker position={center} />
          {markers.map(marker => (
            <Marker
              key={marker.id}
              position={marker.position}
              icon={{
                url: `http://maps.google.com/mapfiles/ms/icons/${marker.color}-dot.png`
              }}
              onRightClick={() => handleMarkerRightClick(marker.id)}
            />
          ))}
        </GoogleMap>
      </LoadScript>
      <div>
        <h2>Datos Guardados:</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
      <div className='w-16 bg-blue-500 rounded p-2'>
        <button onClick={handleSubmit}>Guardar</button>
      </div>
    </div>
  );
};

export default Mapa;
