import { Link } from "react-router-dom";

const Welcome = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-green-500 flex flex-col items-center justify-center text-white">
            <div className="bg-white bg-opacity-25 p-10 rounded-lg shadow-lg text-center">
                <h1 className="text-5xl font-bold mb-6">Welcome to RouterCraft</h1>
                <p className="text-xl mb-8">Solving routing problems efficiently and effectively.</p>
                <div className="space-x-4">
                    <Link to="/register" className="btn btn-primary bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded transition duration-300">Register</Link>
                    <Link to="/login" className="btn btn-secondary bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded transition duration-300">Login</Link>
                    {/* <Link to="/dashboard" className="btn btn-accent bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded transition duration-300">Dashboard</Link> */}
                </div>
            </div>
        </div>
    );
}

export default Welcome;