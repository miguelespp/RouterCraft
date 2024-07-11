import { useState, useEffect } from "react";
import { ApiInstance } from "../Services/Api";
import * as Yup from "yup";
import { Formik } from "formik";
import Input from "../components/input/InputLabel";
import Button from "../components/button/InputButton";

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
    const fetchOperations = async () => {
      try {
        const response = await ApiInstance.get("/vehicles");
        setVehicles(response.data.vehicles);
      } catch (error) {
        console.error("Error fetching operations:", error);
      }
    };

    fetchOperations();
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
    <div className="">
      <h1 className="text-2xl mb-4">Operations List</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">ID</th>
            <th className="py-2">Name</th>
            <th className="py-2">Capacity</th>
            <th className="py-2"></th>
            <th className="py-2"></th>
          </tr>
        </thead>
        <tbody>
          
          { vehicles ? vehicles.map((operation) => (
            <tr key={operation.id}>
              <td className="py-2">{operation.id}</td>
              <td className="py-2">{operation.model}</td>
              <td className="py-2">{operation.capacity}</td>
              <td className="py-2">
              </td>
              <td className="py-2">
                <button
                  className="bg-red-500 text-white px-4 py-1 rounded"
                  onClick={() => handleDeleteVehicles(operation.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          )) : null}
        </tbody>
      </table>
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
