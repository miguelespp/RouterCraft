import {Link} from "react-router-dom";
import {Separator} from "@/components/ui/separator.tsx";

export interface NavBarProps {
    setSelectedOption: (option: string) => void;
    setExpandeState: (option: boolean) => void;
    isExpanded?: boolean;
}

const NavBar = ({setSelectedOption, setExpandeState, isExpanded}: NavBarProps) => {

    return (
        <nav
            className={`flex-none bg-gray-700 text-white ${isExpanded ? 'w-52' : 'w-32'} transition-all duration-300 h-screen border`}>
            <h2 className={"my-4 text-2xl font-bold"}>{isExpanded ? 'RouterCraft': 'RC'}</h2>
            <Separator  />
            <button onClick={() => setExpandeState(!isExpanded)} className="p-2">
                {isExpanded ? '<' : '>'}
            </button>
            <div className="h-auto">
                <ul className="space-y-3 h-full mt-4">
                    <li className="p-2 cursor-pointer">
                        <Link to="/dashboard" onClick={ () => setSelectedOption('Home')}>Home</Link>
                    </li>
                    <li className="p-2 cursor-pointer">
                        <Link to="/dashboard/vehicle" onClick={() => setSelectedOption('Vehicles')}>Vehiculos</Link>
                    </li>
                    <li className="p-2 cursor-pointer">
                        <Link to="/dashboard/routes" onClick={() => setSelectedOption('Routes')}>Routes</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
