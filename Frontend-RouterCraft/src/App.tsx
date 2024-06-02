import { createElement } from "react";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { routes, RouteInterface } from "./routes/route";


function App() {
  const router = createBrowserRouter(routes.map((route:RouteInterface) => ({
    path: route.path,
    element: createElement(route.element),
    children: route.children?.map((child) => ({
      path: child.path,
      element: createElement(child.element),
    })),
    errorElement: route.errorElement ? createElement(route.errorElement) : undefined,
  })));

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
