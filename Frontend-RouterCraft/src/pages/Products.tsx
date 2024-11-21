import { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import Input from "../components/input/InputLabel";
import * as XLSX from "xlsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { MdDelete } from "react-icons/md";
import stateProduct from "@/store/Product";
import { Switch } from "@/components/ui/switch";

const ProductView = () => {
  const { products, setProduct, removeProduct } = stateProduct();
  const initialValues = {
    name: "",
    description: "",
    price: 0,
    available: false,
  };

  const onSubmit = (value: typeof initialValues) => {
    console.log(value);
    setProduct({ id: products.length + 1, ...value });
  };

  const handleDeleteProduct = (id: number) => {
    removeProduct(id);
  };

  const exportToExcel = () => {
    // Crear un libro de Excel
    const worksheet = XLSX.utils.json_to_sheet(products); // Convierte JSON a hoja de cálculo
    const workbook = XLSX.utils.book_new(); // Crea un libro nuevo
    XLSX.utils.book_append_sheet(workbook, worksheet, "Datos"); // Añade la hoja al libro

    // Exportar el archivo
    XLSX.writeFile(workbook, "Datos.xlsx"); // Nombre del archivo
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("El nombre es requerido"),
    description: Yup.string().required("La descripcion es requerida"),
    price: Yup.number().required("El precio es requerido"),
    available: Yup.boolean().required("La disponibilidad es requerida"),
  });

  return (
    <div className="p-4 rounded-md">
      <h1 className="text-2xl my-4">Stock de Products</h1>

      <Table className={"border-2 rounded"}>
        <TableHeader className={"bg-blue-500"}>
          <TableRow>
            <TableHead className={"text-center text-white"}>ID</TableHead>
            <TableHead className={"text-center text-white"}>Name</TableHead>
            <TableHead className={"text-center text-white"}>
              Description
            </TableHead>
            <TableHead className={"text-center text-white"}>Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className={"bg-gray-300"}>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.price}</TableCell>

              <TableCell className="text-center">
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  <MdDelete className={"w-5 h-5"} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={"flex "}>
        <Button className={"bg-cyan-800 mt-4 w-18"} onClick={exportToExcel}>
          Exportar a Excel
        </Button>
        <Dialog>
          <DialogTrigger className={"ml-auto mr-4"}>
            <Button className={"bg-cyan-800 mt-4 w-18"}>Add</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a product</DialogTitle>
              <DialogDescription>
                We need some information to add a vehicle
              </DialogDescription>
            </DialogHeader>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              {({ values, errors, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit} className="space-y-12 py-4">
                  <Input
                    label="Nombre del producto"
                    type="text"
                    name="name"
                    placeholder=""
                    error={errors.name}
                    onChange={handleChange}
                    value={values.name}
                    color="black"
                  />
                  <Input
                    label="Descripcion del producto"
                    type="text"
                    name="description"
                    placeholder=""
                    error={errors.description}
                    onChange={handleChange}
                    value={values.description}
                    color="black"
                  />
                  <Input
                    label="Precio del producto"
                    type="number"
                    name="price"
                    placeholder=""
                    error={errors.price}
                    onChange={handleChange}
                    value={values.price}
                    color="black"
                  />
                  <Switch
                    name="available"
                    value={values.available}
                    onChange={handleChange}
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

export default ProductView;
