import { createElement, useState } from "react";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { routes } from "./routes/route";

function App() {
  const router = createBrowserRouter(routes.map((route) => ({
    ...route,
    element: createElement(route.element)
  })));

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
