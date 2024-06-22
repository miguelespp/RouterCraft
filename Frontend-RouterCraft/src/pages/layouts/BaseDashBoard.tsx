import React, { useState } from "react";
import NavBar from "./NavBar";
import Header from "./Header";
import Footer from "./Footer";
import Mapa from "./Map";

interface BaseDashBoardProps {
  page: string;
  children: any;
}

const BaseDashBoard = ({ page, children }: BaseDashBoardProps) => {
  const [selectedOption, setSelectedOption] = useState('Dashboard');
  return (
    <div className="container min-h-screen grid grid-cols-10">
        <NavBar setSelectedOption={setSelectedOption} />
      <div className="col-span-8 grid grid-cols-1">
        <header className="h-14 col-span-full">
          <Header selectedOption={selectedOption} />
        </header>

        <div className="col-span-3 flex-grow p-6 bg-gray-100 h-full w-full">
          <Mapa />
        </div>
        <footer className="col-span-full h-full">
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default BaseDashBoard;
