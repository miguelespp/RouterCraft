import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ApiInstance } from "../Services/Api";


interface Route {
    // corregir
    id: number;
    name: string;
}

const ShowRoutes = () => {
    const [routes, setRoutes] = useState<Route[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        try {
            const response = ApiInstance.get("/operations/routes");
            // setRoutes(response.data);
        } catch (error) {
            console.error(error);
        }
        
    
    }, []);
    
    if (loading) {
        return <p>Loading...</p>;
    }
    
    return (
        <div>
        <h1>Routes</h1>
        <ul>
            {routes.map((route) => (
            <li key={route.id}>
                <Link to={`/routes/${route.id}`}>{route.name}</Link>
            </li>
            ))}
        </ul>
        </div>
    );
    };

export default ShowRoutes;
