import { Link } from "react-router-dom";

const Welcome = () => {
    return (
        <div>
            <h1>Welcome to Vite + React + TypeScript!</h1>
            <div className="text-center space-x-2">
                <Link to="/register" className="btn btn-primary">Register</Link>
                <Link to="/login" className="btn btn-primary">Login</Link>
                <Link to="/dashboard" className="btn btn-primary">Dashboard</Link>
            </div>
            
        </div>
    );
}

export default Welcome;