import { useState, useEffect } from "react";
import { ApiInstance } from "../Services/Api";
import { GoogleMap, LoadScript, Polyline } from '@react-google-maps/api';

interface Operation {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    user_id: number;
}

interface Route {
    lat: number;
    lng: number;
}

const ShowRoutes = () => {
    const [operations, setOperations] = useState<Operation[]>([]);
    const [routes, setRoutes] = useState<Route[][]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedOperationId, setSelectedOperationId] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOperations = async () => {
            try {
                const response = await ApiInstance.get("/operations");
                setOperations(response.data.operations);
            } catch (error) {
                console.error(error);
                setError("Failed to fetch operations");
            } finally {
                setLoading(false);
            }
        };

        fetchOperations();
    }, []);

    const fetchRoutes = async (operationId: number) => {
        try {
            console.log(`Fetching routes for operation ID: ${operationId}`);
            const response = await ApiInstance.post("/operations/routes", { operation_id: operationId });
            console.log('Routes fetched:', response.data.routes);
            setRoutes(response.data.routes);
            setSelectedOperationId(operationId);
        } catch (error) {
            console.error(error);
            setError("Failed to fetch routes");
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Operations</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {operations.map((operation) => (
                        <tr key={operation.id}>
                            <td>{operation.id}</td>
                            <td>{operation.name}</td>
                            <td>
                                <button onClick={() => fetchRoutes(operation.id)}>View Routes</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedOperationId && routes.length > 0 && (
                <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                    <GoogleMap
                        mapContainerStyle={{ height: "400px", width: "800px" }}
                        center={routes[0][0]}
                        zoom={10}
                    >
                        {routes.map((route, index) => (
                            <Polyline
                                key={index}
                                path={route}
                                options={{ strokeColor: "#FF0000" }}
                            />
                        ))}
                    </GoogleMap>
                </LoadScript>
            )}
        </div>
    );
};

export default ShowRoutes;
