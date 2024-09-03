// client/src/components/Header.tsx

import { useState, useEffect } from "react";
import { FaHome, FaSearch, FaUser, FaShoppingCart, FaHeart } from "react-icons/fa";
import { searchStars } from "../services/api";
import { useNavigate } from "react-router-dom";
import type { Star } from "../types";

const Header: React.FC = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState<Star[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const isLoggedIn = true; // Remplacer par une vérification réelle de l'état de connexion
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Pas besoin de spécifier handleScroll comme dépendance car il est défini dans useEffect

  const toggleSearch = () => {
    setIsSearchVisible(true);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setIsSearchVisible(true); // Toujours afficher la barre lors de la saisie
  };

  const handleSelectSuggestion = (id: string) => {
    setSearchValue("");
    setSuggestions([]);
    navigate(`/star/${id}`);
  };

  return (
    <header className="bg-background-inverse text-text fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 shadow-lg h-10">
      <div className="flex items-center space-x-3">
        <a href="/" className="text-lg text-text hover:text-white">
          <FaHome className="text-xl text-text" />
        </a>
      </div>

      <div className="flex items-center space-x-3 relative">
        {!scrolled ? null : <span className="text-lg font-serif">Stella</span>}

        {!isSearchVisible && (
          <button
            type="button"
            onClick={toggleSearch}
            className="text-text hover:text-white focus:outline-none"
          >
            <FaSearch className="text-xl" />
          </button>
        )}
        {isSearchVisible && (
          <div className="relative">
            <FaSearch className="absolute top-1/2 left-2 transform -translate-y-1/2 text-text" />
            <input
              type="text"
              className="w-36 p-2 pl-8 pr-3 rounded-full bg-secondary text-text focus:outline-none h-6"
              placeholder="Rechercher"
              value={searchValue}
              onChange={handleSearchChange}
              onKeyPress={() => setIsSearchVisible(true)} // Réinitialise le délai à chaque frappe
            />
            {suggestions.length > 0 && (
              <ul className="absolute left-0 right-0 bg-white text-gray-800 rounded-lg mt-2 shadow-lg z-10">
                {suggestions.map((star) => (
                  <li key={star.id} className="px-4 py-2">
                    <button
                      type="button"
                      onClick={() => handleSelectSuggestion(star.id)}
                      className="w-full text-left cursor-pointer hover:bg-gray-200 focus:outline-none"
                    >
                      {star.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        {isLoggedIn && (
          <>
            <a href="/cart" className="text-lg text-text hover:text-white">
              <FaShoppingCart />
            </a>
            <a href="/wishlist" className="text-lg text-text hover:text-white">
              <FaHeart />
            </a>
          </>
        )}
        <a href="/auth" className="text-lg text-text hover:text-white">
          <FaUser />
        </a>
      </div>
    </header>
  );
};

export default Header;
