import { useState } from 'react';
export interface NavBarProps {
    setSelectedOption: (option: string) => void;
    isExpanded?: boolean;
}

const NavBar = ({ setSelectedOption }:NavBarProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
  
    return (
      <div className={`bg-gray-800 text-white ${isExpanded ? 'col-span-2' : 'col-span-1'} h-full transition-all duration-300`}>
        <button onClick={() => setIsExpanded(!isExpanded)} className="p-2">
          {isExpanded ? '<' : '>'}
        </button>
        <nav>
          <ul>
            {['Home', 'Customers', 'Settings'].map(option => (
              <li key={option} className="p-2 cursor-pointer" onClick={() => setSelectedOption(option)}>
                {isExpanded ? option : option[0]}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    );
  };
  
  export default NavBar;
