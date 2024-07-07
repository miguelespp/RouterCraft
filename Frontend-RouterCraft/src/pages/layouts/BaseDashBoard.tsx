import { useState } from "react";
import NavBar from "./NavBar";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const BaseDashBoard = () => {
  const [selectedOption, setSelectedOption] = useState('Dashboard');
  // const { expanded, setExpanded } = stateNavBar();
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="container min-h-screen grid grid-cols-10">
        <NavBar setSelectedOption={setSelectedOption} isExpanded={expanded} setExpandeState={setExpanded} />
      <div className={`${expanded ? 'col-span-8': 'col-span-9'} grid grid-cols-1`}>
        <header className="h-14 col-span-full">
          <Header selectedOption={selectedOption} />
        </header>

        <div className="col-span-3 flex-grow p-6 bg-gray-100 h-full w-full">
          {/* <Mapa /> */}
          {/* Outlet indica el children que se renderizara por la ruta */}
          <Outlet />
        </div>
        <footer className="col-span-full h-14">
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default BaseDashBoard;
