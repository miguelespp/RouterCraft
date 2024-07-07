import { Link } from "react-router-dom";

export interface NavBarProps {
  setSelectedOption: (option: string) => void;
  setExpandeState  : (option: boolean) => void;
  isExpanded?: boolean;
}

const NavBar = ({ setSelectedOption, setExpandeState, isExpanded }:NavBarProps) => {
    
  
    return (
      <div className={`bg-gray-800 text-white ${isExpanded ? 'col-span-2' : 'col-span-1'} h-full transition-all duration-300`}>
        <button onClick={() => setExpandeState(!isExpanded)} className="p-2">
          {isExpanded ? '<' : '>'}
        </button>
        <nav>
          <ul>
            {/* {['Home', 'Customers', 'Settings'].map(option => (
              <li key={option} className="p-2 cursor-pointer" onClick={() => setSelectedOption(option)}>
                {option}
              </li>
            ))} */}
            <li className="p-2 cursor-pointer" onClick={() => setSelectedOption('Home')}>
              <Link to="/dashboard">Home</Link>
            </li>
            <li className="p-2 cursor-pointer">
            <Link to="/dashboard/vehicle">Vehiculos</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  };
  
  export default NavBar;
