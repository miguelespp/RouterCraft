import {useEffect, useState} from "react";
import {GoogleMap, Polyline} from "@react-google-maps/api";
import {ApiInstance} from "../Services/Api";

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
    const [routes, setRoutes] = useState<{ [key: string]: Route[] }>({});
    const [selectedOperationId, setSelectedOperationId] = useState<number | null>(
        null
    );

    useEffect(() => {
        const fetchOperations = async () => {
            try {
                const response = await ApiInstance.get("/operations");
                setOperations(response.data.operations);
            } catch (error) {
                console.error("Error fetching operations:", error);
            }
        };

        fetchOperations();
    }, []);

    const handleShowRoutes = async (operationId: number) => {
        // window.location.reload();
        try {
            setSelectedOperationId(operationId);
            const response = await ApiInstance.post<{
                routes: { [key: string]: Route[] };
            }>("/operations/routes", {operation_id: operationId});
            const routesData = response.data.routes || {};

            // Ensure lat and lng are numbers
            const parsedRoutes = Object.fromEntries(
                Object.entries(routesData).map(([key, route]) => [
                    key,
                    route.map((point: Route) => ({
                        lat: parseFloat(point.lat.toString()),
                        lng: parseFloat(point.lng.toString()),
                    })),
                ])
            );
            setRoutes(parsedRoutes);
        } catch (error) {
            console.error("Error fetching routes:", error);
            setRoutes({});
        }
    };

    const handleDeleteOperation = async (operationId: number) => {
        try {
            await ApiInstance.delete(`/operations`, {data: {operation_id: operationId}});
            setOperations((operations) =>
                operations.filter((operation) => operation.id !== operationId)
            );
        } catch (error) {
            console.error("Error deleting operation:", error);
        }
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">Operations List</h1>
            <table className="min-w-full bg-white">
                <thead>
                <tr>
                    <th className="py-2">ID</th>
                    <th className="py-2">Name</th>
                    <th className="py-2">Created at</th>
                    <th className="py-2"></th>
                    <th className="py-2"></th>
                </tr>
                </thead>
                <tbody>

                {operations.map((operation) => (
                    <tr key={operation.id}>
                        <td className="py-2">{operation.id}</td>
                        <td className="py-2">{operation.name}</td>
                        <td className="py-2">{operation.created_at.split('T')[0]}</td>
                        <td className="py-2">
                            <button
                                className="bg-blue-500 text-white px-4 py-1 rounded"
                                onClick={() => handleShowRoutes(operation.id)}
                            >
                                Show Routes
                            </button>
                        </td>
                        <td className="py-2">
                            <button
                                className="bg-red-500 text-white px-4 py-1 rounded"
                                onClick={() => handleDeleteOperation(operation.id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {selectedOperationId && (
                <div className="mt-8">
                    <h2 className="text-xl mb-4">
                        Routes for Operation ID: {selectedOperationId}
                    </h2>
                    <GoogleMap
                        mapContainerStyle={{width: "100%", height: "400px"}}
                        center={{lat: -12.0547, lng: -77.057}}
                        zoom={14}
                    >
                        {Object.keys(routes).map((key, index) => (
                            <Polyline
                                key={index}
                                path={routes[key]}
                                options={{
                                    strokeColor: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`,
                                    strokeOpacity: 1.0,
                                    strokeWeight: 2,
                                }}
                            />
                        ))}
                    </GoogleMap>

                </div>
            )}
        </div>
    );
};

export default ShowRoutes;
