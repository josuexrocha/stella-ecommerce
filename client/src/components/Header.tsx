import type React from "react";
import { FaHome, FaSearch, FaUser } from "react-icons/fa"; // Utilisation des icônes FontAwesome

const Header: React.FC = () => {
  return (
    <header className="bg-primary text-text flex justify-between items-center p-4 shadow-lg">
      <div className="flex items-center space-x-4">
        <FaHome className="text-2xl text-text" />
        <span className="text-2xl font-display">Stella</span>
      </div>
      <div className="flex-grow mx-8">
        <div className="relative">
          <input
            type="text"
            className="w-full p-2 pl-10 pr-4 text-secondary rounded-md bg-secondary"
            placeholder="Rechercher"
          />
          <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-text" />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <a href="/login" className="text-xl text-text hover:text-white">
          <FaUser />
        </a>
      </div>
    </header>
  );
};

export default Header;
