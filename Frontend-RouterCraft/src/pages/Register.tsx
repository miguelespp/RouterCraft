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

  const onSubmit = (values: typeof initialValues) => {
    ApiInstance.post("/auth/register", values)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
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
    <section className="bg-slate-500">
      <div className="container mx-auto py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-center">
            <img
              src="https://source.unsplash.com/1600x900/?technology"
              alt="technology"
              className="object-cover h-96 w-full rounded-lg"
            />
          </div>
          <div className="flex items-center justify-center">
            <div className="max-w-md w-full space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-center text-white">
                  Register
                </h2>
              </div>
              <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
              >
                {({ values, errors, handleChange, handleSubmit }) => (
                  <form onSubmit={handleSubmit} className="space-y-4">
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
      </div>
    </section>
  );
};

export default Register;
