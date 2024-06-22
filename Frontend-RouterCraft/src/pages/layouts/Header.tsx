interface HeaderProps {
    selectedOption: string;
  }

const Header = ({ selectedOption }:HeaderProps) => {
    return (
      <header className="h-full bg-gray-700 text-white p-4">
        <h1>{selectedOption}</h1>
      </header>
    );
  };
  
  export default Header;
