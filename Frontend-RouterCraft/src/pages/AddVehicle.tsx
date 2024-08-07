import {useEffect, useState} from "react";
import {ApiInstance} from "../Services/Api";
import * as Yup from "yup";
import {Formik} from "formik";
import Input from "../components/input/InputLabel";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Button} from "@/components/ui/button.tsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {MdDelete} from "react-icons/md";

interface vehicles {
    id: number;
    model: string;
    capacity: string;
}

const AddVehicle = () => {
    const [vehicles, setVehicles] = useState<vehicles[]>([]);
    const initialValues = {
        model: "",
        capacity: "",
    };

    useEffect(() => {
        const fetchvehicles = async () => {
            try {
                const response = await ApiInstance.get("/vehicles");
                setVehicles(response.data.vehicles);
                // console.log(response.data.vehicles)
            } catch (error) {
                console.error("Error fetching vehicles:", error);
            }
        };

        fetchvehicles();

    }, []);

    const handleDeleteVehicles = async (id: number) => {
        try {
            await ApiInstance.delete(`/vehicles`, {data: {vehicle_id: id}});
        } catch (error) {
            console.error("Error deleting vehicle:", error);
        }
    };

    const onSubmit = async (values: typeof initialValues) => {
        console.log(values);
        try {
            await ApiInstance.post("/vehicles", values);
            alert("Vehicle added successfully");
        } catch (error) {
            alert("Failed to add vehicle");
        }
        window.location.reload();
    };

    const validationSchema = Yup.object({
        model: Yup.string(),
        capacity: Yup.number().required("Capacity is required"),
    });

    return (
        <div className="p-4 rounded-md">
            <h1 className="text-2xl my-4">Vehicles List</h1>


            <Table className={"border-2 rounded"}>
                <TableHeader className={"bg-blue-500"}>
                    <TableRow>
                        <TableHead className={"text-center text-white"}>ID</TableHead>
                        <TableHead className={"text-center text-white"}>Name</TableHead>
                        <TableHead className={"text-center text-white"}>Capacity</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className={"bg-gray-300"}>
                    {vehicles.map((vehicle) => (
                        <TableRow key={vehicle.id}>
                            <TableCell>{vehicle.id}</TableCell>
                            <TableCell>{vehicle.model}</TableCell>
                            <TableCell>{vehicle.capacity}</TableCell>

                            <TableCell className="text-center">
                                <Button variant="destructive" onClick={() => handleDeleteVehicles(vehicle.id)}><MdDelete
                                    className={"w-5 h-5"}/></Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className={"flex "}>
                <Dialog>
                    <DialogTrigger className={"ml-auto mr-4"}>
                        <Button className={"bg-cyan-800 mt-4 w-18"}>Add</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add a vehicle</DialogTitle>
                            <DialogDescription>
                                We need some information to add a vehicle
                            </DialogDescription>
                        </DialogHeader>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={onSubmit}
                            validationSchema={validationSchema}
                        >
                            {({values, errors, handleChange, handleSubmit}) => (
                                <form onSubmit={handleSubmit} className="space-y-12 py-4">
                                    <Input
                                        label="Modelo"
                                        type="text"
                                        name="model"
                                        placeholder="Hyundai Accent 2021"
                                        error={errors.model}
                                        onChange={handleChange}
                                        value={values.model}
                                        color="black"
                                    />
                                    <Input
                                        label="Capacidad"
                                        type="text"
                                        name="capacity"
                                        placeholder="150 cc"
                                        error={errors.capacity}
                                        onChange={handleChange}
                                        value={values.capacity}
                                        color="black"
                                    />
                                    <DialogFooter>
                                        <Button type="submit">Registrar</Button>
                                    </DialogFooter>
                                </form>
                            )}
                        </Formik>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default AddVehicle;
