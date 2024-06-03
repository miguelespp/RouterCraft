import { Formik } from "formik";
import * as Yup from "yup";
import Input from "../components/input/InputLabel";
import Button from "../components/button/InputButton";
import { ApiInstance } from "../Services/Api";

const Register = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  const onSubmit = async (values: typeof initialValues) => {
    try {
      const response = await ApiInstance.post("/auth/register", values)
      console.log(response);
    } catch (error:any) {
      if(error.response){
        console.log(error.response.data)
      }
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(10, "EL nombre tiene que tener mas de 10 letras")
      .required("El nombre es obligatorio"),
    email: Yup.string()
      .email("El correo no es valido")
      .required("El correo es obligatorio"),
    password: Yup.string()
      .min(5, "La contraseña tiene que tener mas de 5 digitos")
      .required("La contraseña es obligatoria"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
      .required("La confirmacion de la contraseña es obligatoria"),
  });

  return (
    <section className="min-h-screen " style={{backgroundImage: `url('../assets/login.jpg')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-[5%] lg:px-8 bg-sky-500 ">
        <div className="rounded-lg h-full w-full">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Logo"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
              >
                {({ values, errors, handleChange, handleSubmit }) => (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                      label="Nombre"
                      type="text"
                      name="name"
                      placeholder="Ingrese su nomre"
                      error={errors.name}
                      onChange={handleChange}
                      value={values.name}
                    />
                    <Input
                      label="Correo"
                      type="email"
                      name="email"
                      placeholder="example@gmail.com"
                      error={errors.email}
                      onChange={handleChange}
                      value={values.email}
                    />
                    <Input
                      label="Contraseña"
                      type="password"
                      name="password"
                      placeholder="**************"
                      error={errors.password}
                      onChange={handleChange}
                      value={values.password}
                    />
                    <Input
                      label="Confirmar contraseña"
                      type="password"
                      name="password_confirmation"
                      placeholder="**************"
                      error={errors.password_confirmation}
                      onChange={handleChange}
                      value={values.password_confirmation}
                    />

                    <Button type="submit" value="Registrar" />
                  </form>
                )}
              </Formik>

        
        </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
