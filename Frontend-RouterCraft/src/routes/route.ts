import AddVehicle from "../pages/AddVehicle";
import Customers from "../pages/Customers";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Welcome from "../pages/Welcome";
import Error from "../pages/error/404";
import BaseDashBoard from "../pages/layouts/BaseDashBoard";
import ShowRoutes from "../pages/ShowRoutes";
import Profile from "@/pages/Profile.tsx";
import Settings from "@/pages/Settings.tsx";

export interface RouteInterface {
    path: string;
    element: () => JSX.Element;
    children?: RouteInterface[];
    errorElement?: () => JSX.Element;
}

export const routes : RouteInterface[] = [
    {
        path: "/",
        element: Welcome,
        errorElement: Error,
        
    },
    {
        path: "/register",
        element: Register,
        
    },
    {
        path: "/login",
        element: Login
    },
    {
        path: "/dashboard",
        element: BaseDashBoard,
        children: [
            {
                path: "",
                element: Customers,
            },
            {
                path: "vehicle",
                element: AddVehicle
            },
            {
                path: "routes",
                element: ShowRoutes
            },
            {
                path: "profile",
                element: Profile
            },
            {
                path: "settings",
                element: Settings
            }
        ],
    },
]