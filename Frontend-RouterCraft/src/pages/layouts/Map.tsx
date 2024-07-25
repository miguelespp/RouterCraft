import React, {useEffect, useState} from 'react';
import {GoogleMap, Marker } from '@react-google-maps/api';
import {ApiInstance} from '@/Services/Api.ts';

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


const Mapa: React.FC = () => {
    const [center, setCenter] = useState({lat: -12.04318, lng: -77.02824});
    const [markers, setMarkers] = useState<MarkerData[]>([]);
    const [data, setData] = useState<DataStructure>({
        name: '',
        storage: undefined,
        clients: []
    });

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    setCenter(pos);
                },
                () => {
                    console.error("Error al obtener la ubicación");
                }
            );
        } else {
            console.error("Geolocalización no soportada por este navegador.");
        }
    };

    useEffect(() => {
        getUserLocation();
    }, []);

    const handleInputChange = (event: any) => {
        setData({...data, name: event.target.value});
    };

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
            alert('Operation saved successfully')

            setData(
                {
                    name: '',
                    storage: undefined,
                    clients: []
                }
            );
            setMarkers([]);
        } catch (error) {
            console.error('Error saving operation:', error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
                onClick={handleMapClick}
            >
                <Marker position={center}/>
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

            <div>
                <strong className='font-sans mb-5 text-2xl'>Nueva Operacion</strong>
                <div className='space-y-4 mt-10'>
                    <label htmlFor="name">Nombre de la operación</label>
                    <input type="text" name="name" id="name" value={data.name} onChange={handleInputChange}
                           className='h-10 p-3'/>
                    <div className='rounded bg-blue-500 mx-12'>
                        <button onClick={handleSubmit} className='p-6'>Guardar</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Mapa;
