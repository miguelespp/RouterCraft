import { Link  } from "react-router-dom";
import { ApiInstance } from "../../Services/Api";

export interface NavBarProps {
  setSelectedOption: (option: string) => void;
  setExpandeState  : (option: boolean) => void;
  isExpanded?: boolean;
}

const NavBar = ({ setSelectedOption, setExpandeState, isExpanded }:NavBarProps) => {
  const handleLogout = () => {
    const response = ApiInstance.post('/logout');
    console.log(response);
    localStorage.removeItem('token');
    alert('Sesión cerrada');
  };

    return (
      <div className={`bg-gray-800 text-white ${isExpanded ? 'col-span-2' : 'col-span-1'} h-full transition-all duration-300`}>
        <button onClick={() => setExpandeState(!isExpanded)} className="p-2">
          {isExpanded ? '<' : '>'}
        </button>
        <nav className="h-[80%]">
          <ul className="space-y-3 h-full">
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
          <Link to="/" className="p-2 cursor-pointer" onClick={handleLogout}>Logout</Link>
        </nav>
      </div>
    );
  };
  
export default NavBar;
