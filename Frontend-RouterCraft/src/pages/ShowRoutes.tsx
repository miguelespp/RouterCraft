import {useEffect, useState} from "react";
import {GoogleMap, Polyline} from "@react-google-maps/api";
import {ApiInstance} from "../Services/Api";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {MdDelete} from "react-icons/md";
import {Button} from "@/components/ui/button.tsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.tsx";

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
    const [storagePosition, setStoragePosition] = useState({lat: -12.0547, lng: -77.057});
    const [dialogOpen, setDialogOpen] = useState(false);

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
        setRoutes({});
        try {
            setDialogOpen(true);
            setSelectedOperationId(operationId);
            const response = await ApiInstance.post<{
                routes: { [key: string]: Route[] };
                storage: { lat: number; lng: number};
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
            const storage = response.data.storage;
            setStoragePosition(storage);
            setRoutes(parsedRoutes);
            console.log(routes)
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
        <div className="p-4 rounded-md">
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
                            <TableCell>{operation.id}</TableCell>
                            <TableCell>{operation.name}</TableCell>
                            <TableCell>{operation.created_at.split('T')[0]}</TableCell>
                            <TableCell>

                                        <Button
                                            className="bg-blue-500 text-white"
                                            onClick={() => handleShowRoutes(operation.id)}
                                        >
                                            Show Routes
                                        </Button>

                            </TableCell>
                            <TableCell>
                                <Button variant={"destructive"}
                                        onClick={() => handleDeleteOperation(operation.id)}
                                >
                                    <MdDelete
                                        className={"w-5 h-5"}/>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(false)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Your route </DialogTitle>
                        <DialogDescription>Estado actual de la ruta {selectedOperationId}</DialogDescription>
                    </DialogHeader>
                    <GoogleMap
                        clickableIcons={false}
                        mapContainerStyle={{width: "100%", height: "400px"}}
                        center={storagePosition}
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
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ShowRoutes;