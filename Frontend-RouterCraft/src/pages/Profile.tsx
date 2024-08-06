import {ApiInstance} from "@/Services/Api.ts";
import * as Yup from "yup";
import {Formik} from "formik";
import Input from "../components/input/InputLabel";
import {Button} from "@/components/ui/button.tsx";

const Profile = () => {
    const initialValues = {
        name: "",
        email: "",
        password: "",
    };

    const validationSchema = Yup.object({
        name: Yup.string()
            .min(3, "El nombre tiene que tener mas de 3 digitos"),
        email: Yup.string()
            .email("El correo no es valido"),
        password: Yup.string()
            .min(5, "La contraseña tiene que tener mas de 5 digitos")
    });

    const onSubmit = async (values: typeof initialValues) => {
        try {
            const valuesToSend = Object.fromEntries(
                Object.entries(values).filter(([_, value]) => value !== null && value !== "")
            );
            const response = await ApiInstance.put("user", valuesToSend);
            console.log(response.data);
            if(response.data.token) {
                localStorage.setItem("jwtToken", response.data.token);
                ApiInstance.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;
            }
            alert("Usuario actualizado correctamente");
        } catch (error: any) {
            if (error.response) {
                const response = error.response.data;
                console.log(response)
                alert("Error al actualizar el usuario");
            }
        }
    }

    return (
        <div className={"size-full p-6 flex justify-center mt-20"}>
            <div className={"max-w-96"}>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    {({handleSubmit, handleChange, values, errors}) => (
                        <form onSubmit={handleSubmit} className={"space-y-6"}>
                            <Input
                                label={"Nombre"}
                                type={"text"}
                                name={"name"}
                                placeholder={"Juan Perez"}
                                value={values.name}
                                onChange={handleChange}
                                error={errors.name}
                                color={"black"}
                            />


                            <Input label={"Email"} type={"email"} name={"email"} placeholder={"another.email@gmail.com"}
                                   value={values.email} onChange={handleChange} error={errors.email} color={"black"} />
                            {/*<Button type={"submit"}>Validar Correo</Button>*/}
                            <Input label={"Password"} type={"password"} name={"password"}
                                   placeholder={"**********"} value={values.password} onChange={handleChange}
                                   error={errors.password} color={"black"}/>
                            <Button type={"submit"}>Actualizar</Button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Profile;