import {Link} from "react-router-dom";
import {Separator} from "@/components/ui/separator.tsx";
import {IoHome} from "react-icons/io5";
import {FaTruck} from "react-icons/fa";
import {TbRouteSquare} from "react-icons/tb";

export interface NavBarProps {
    setSelectedOption: (option: string) => void;
    setExpandeState: (option: boolean) => void;
    isExpanded?: boolean;
}

const NavBar = ({setSelectedOption, setExpandeState, isExpanded}: NavBarProps) => {

    return (
        <nav
            className={`flex-none bg-gray-700 text-white ${isExpanded ? 'w-36' : 'w-24'} transition-all duration-300 min-h-screen border`}>
            <h2 className={"my-4 text-2xl font-bold"}>{isExpanded ? 'RouterCraft' : 'RC'}</h2>
            <Separator/>
            <button onClick={() => setExpandeState(!isExpanded)} className="p-2">
                {isExpanded ? '<-|' : '|->'}
            </button>
            <div className="h-auto">
                <ul className="space-y-3 h-full mt-4">
                    <li className="p-2 cursor-pointer mx-6 border rounded bg-gray-500">
                        <Link to="/dashboard" onClick={() => setSelectedOption('Home')}>
                            {isExpanded ? 'Home' : <IoHome className={"mx-auto size-5"}/>}
                        </Link>
                    </li>
                    <li className="p-2 cursor-pointer mx-6 border rounded bg-gray-500">
                        <Link to="/dashboard/vehicle" onClick={() => setSelectedOption('Vehicles')}>
                            {isExpanded ? 'Vehicles' : <FaTruck className={"mx-auto size-5"}/>}
                        </Link>
                    </li>
                    <li className="p-2 cursor-pointer mx-6 border rounded bg-gray-500">
                        <Link to="/dashboard/routes" onClick={() => setSelectedOption('Routes')}>
                            {isExpanded ? 'Routes' : <TbRouteSquare className={"mx-auto size-5"}/>}
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
