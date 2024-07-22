import { useState, useEffect } from "react";
import { ApiInstance } from "../Services/Api";
import * as Yup from "yup";
import { Formik } from "formik";
import Input from "../components/input/InputLabel";
import Button from "../components/button/InputButton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";

interface vehicles {
  id: number;
  model: string;
  capacity: string;
}

const AddVehicle =  () => {
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
          <TableRow >
            <TableHead className={"text-center text-white"}>ID</TableHead>
            <TableHead className={"text-center text-white"}>Name</TableHead>
            <TableHead className={"text-center text-white"}>Capacity</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell>{vehicle.id}</TableCell>
                <TableCell>{vehicle.model}</TableCell>
                <TableCell>{vehicle.capacity}</TableCell>

                <TableCell className="text-center">
                  <button
                      className="bg-red-500 text-white px-4 py-1 rounded"
                      onClick={() => handleDeleteVehicles(vehicle.id)}
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>


      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ values, errors, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit} className="space-y-12 py-4 mx-80">
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

            <Button type="submit" value="Registrar" />
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AddVehicle;
