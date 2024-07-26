import {Link} from "react-router-dom";

export interface NavBarProps {
    setSelectedOption: (option: string) => void;
    setExpandeState: (option: boolean) => void;
    isExpanded?: boolean;
}

const NavBar = ({setSelectedOption, setExpandeState, isExpanded}: NavBarProps) => {

    return (
        <div
            className={`bg-gray-800 text-white ${isExpanded ? 'col-span-2' : 'col-span-1'} h-full transition-all duration-300`}>
            <button onClick={() => setExpandeState(!isExpanded)} className="p-2">
                {isExpanded ? '<' : '>'}
            </button>
            <nav className="h-auto">
                <ul className="space-y-3 h-full mt-4">
                    <li className="p-2 cursor-pointer">
                        <Link to="/dashboard" onClick={() => setSelectedOption('Home')}>Home</Link>
                    </li>
                    <li className="p-2 cursor-pointer">
                        <Link to="/dashboard/vehicle" onClick={() => setSelectedOption('Vehicles')}>Vehiculos</Link>
                    </li>
                    <li className="p-2 cursor-pointer">
                        <Link to="/dashboard/routes" onClick={() => setSelectedOption('Routes')}>Routes</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default NavBar;
