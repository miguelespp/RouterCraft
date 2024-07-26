import {useEffect, useState} from "react";
import {GoogleMap, Polyline} from "@react-google-maps/api";
import {ApiInstance} from "../Services/Api";
import {Table, TableBody, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {MdDelete} from "react-icons/md";
import {Button} from "@/components/ui/button.tsx";

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
            <Table className={"border-2 rounded"}>
                <TableHeader className={"bg-blue-500"}>
                    <TableRow>
                        <TableHead className={"text-center text-white"}>ID</TableHead>
                        <TableHead className={"text-center text-white"}>Name</TableHead>
                        <TableHead className={"text-center text-white"}>Created at</TableHead>
                        <TableHead className={"text-center text-white"}></TableHead>
                        <TableHead className={"text-center text-white"}></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className={"bg-gray-300"}>
                    {operations.map((operation) => (
                        <TableRow key={operation.id}>
                            <TableHead className={"text-center"}>{operation.id}</TableHead>
                            <TableHead className={"text-center"}>{operation.name}</TableHead>
                            <TableHead className={"text-center"}>{operation.created_at.split('T')[0]}</TableHead>
                            <TableHead className={"text-center"}>
                                <Button
                                    className="bg-blue-500 text-white"
                                    onClick={() => handleShowRoutes(operation.id)}
                                >
                                    Show Routes
                                </Button>
                            </TableHead>
                            <TableHead className={"text-center"}>
                                <Button variant={"destructive"}
                                    onClick={() => handleDeleteOperation(operation.id)}
                                >
                                    <MdDelete
                                        className={"w-5 h-5"}/>
                                </Button>
                            </TableHead>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

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
