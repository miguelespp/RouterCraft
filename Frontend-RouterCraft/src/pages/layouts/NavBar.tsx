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
            className={`flex-none bg-gray-700 text-white ${isExpanded ? 'w-48' : 'w-28'} transition-all duration-300 min-h-screen border flex flex-col`}>
            <h2 className={"my-4 text-2xl font-bold"}>{isExpanded ? 'RouterCraft' : 'RC'}</h2>
            <Separator className="" />
            <div className="flex flex-col justify-between h-full">
                <div className="h-auto">
                    <ul className=" cursor-pointer space-y-3 h-auto mt-4">
                        <li className="mx-6 border rounded bg-gray-500 h-11">
                            <Link className="flex justify-around px-3 size-full py-2" to="/dashboard"
                                  onClick={() => setSelectedOption('Home')}>
                                <IoHome className={"size-5"}/>{isExpanded ? <span>Home</span> : ''}
                            </Link>
                        </li>
                        <li className="cursor-pointer mx-6 border rounded bg-gray-500 h-11">
                            <Link className="flex justify-around px-3 py-2" to="/dashboard/vehicle"
                                  onClick={() => setSelectedOption('Vehicles')}>
                                <FaTruck className={"size-5"}/>{isExpanded ? <span>Vehicles</span> : ''}
                            </Link>
                        </li>
                        <li className="cursor-pointer mx-6 border rounded bg-gray-500 h-11">
                            <Link className="flex justify-around px-3 py-2" to="/dashboard/routes"
                                  onClick={() => setSelectedOption('Routes')}>
                                <TbRouteSquare className={"size-5"}/>{isExpanded ?
                                <span>Routes</span> : ''}
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="pb-8">
                    <button onClick={() => setExpandeState(!isExpanded)} className="p-2 border rounded-full bg-white text-black ">
                        {isExpanded ? '<-|' : '|->'}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
