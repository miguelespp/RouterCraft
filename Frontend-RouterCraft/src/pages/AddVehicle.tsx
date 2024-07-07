import { ApiInstance } from "../Services/Api";
import * as Yup from "yup";
import { Formik } from "formik";
import Input from "../components/input/InputLabel";
import Button from "../components/button/InputButton";


const AddVehicle = () => {
    const initialValues = {
        model: "",
        capacity: "",
    };

    const onSubmit = async (values: typeof initialValues) => {
        try {
            await ApiInstance.post("/vehicles", values);
            alert("Vehicle added successfully");
        } catch (error) {
            alert("Failed to add vehicle");
        }
    }

    const validationSchema = Yup.object({
        model: Yup.string()
            .required("Model is required"),
        capacity: Yup.number().required("Capacity is required"),
    });



    
    return (
        <div>
        <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              {({ values, errors, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit} className="space-y-6 py-4">
                  <Input
                    label="Model"
                    type="text"
                    name="model"
                    placeholder="Hyundai Accent 2021"
                    error={errors.model}
                    onChange={handleChange}
                    value={values.model}
                  />
                  <Input
                    label="Capacidad"
                    type="text"
                    name="capacity"
                    placeholder="150 cc"
                    error={errors.capacity}
                    onChange={handleChange}
                    value={values.capacity}
                  />

                  <Button type="submit" value="Registrar" />
                </form>
              )}
            </Formik>
        </div>
    );
    }

export default AddVehicle;