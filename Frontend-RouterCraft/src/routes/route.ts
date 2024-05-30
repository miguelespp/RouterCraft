import Customers from "../pages/Customers";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Welcome from "../pages/Welcome";
import Error from "../pages/error/404";
import BaseDashBoard from "../pages/layouts/BaseDashBoard";

export const routes = [
    {
        path: "/",
        element: Welcome,
        errorElement: Error,
        
    },
    {
        path: "register",
        element: Register
        
    },
    {
        path: "login",
        element: Login
    },
    {
        path: "dashboard",
        element: BaseDashBoard,
        children: [
            {
                path: "/",
                element: Customers
            },
        ]
    }
]