import * as Yup from "yup";
import { ApiInstance } from "../Services/Api";
import { Formik } from "formik";
import Input from "../components/input/InputLabel";
import Button from "../components/button/InputButton";

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values: typeof initialValues) => {
    try {
      const response = await ApiInstance.post("/auth/login", values)
      console.log(response);
    } catch (error:any) {
      if(error.response){
        console.log(error.response.data)
      }
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("El correo no es valido")
      .required("El correo es obligatorio"),
    password: Yup.string()
      .min(5, "La contraseña tiene que tener mas de 5 digitos")
      .required("La contraseña es obligatoria"),
  });

  return (
    <section className="bg-slate-500 w-full h-full min-h-screen">
      <div className="container m-auto py-[10%] max-w-[40%]">
        <div className="grid grid-cols-1 h-full md:grid-cols-2 gap-4">
          <div className="flex items-center justify-center">
            <div className="  max-w-md w-full space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-center text-white">
                  Login
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

export default Login;
