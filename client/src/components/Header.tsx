import { useState, useEffect } from "react";
import { FaHome, FaSearch, FaUser, FaShoppingCart, FaHeart } from "react-icons/fa";
import { searchStars } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import type { Star } from "../types";

const Header: React.FC = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState<Star[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();

  // Vérification et mise à jour de l'état d'authentification
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Mettre à jour l'état de connexion
  }, [localStorage.getItem("token")]); // Le hook s'exécute à chaque changement du token dans localStorage

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
  }, []);

  // Mise à jour des suggestions en temps réel lors de la frappe dans le champ de recherche
  useEffect(() => {
    if (searchValue) {
      searchStars(searchValue).then((results) => setSuggestions(results));
    } else {
      setSuggestions([]);
    }
  }, [searchValue]);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
    setSearchValue(""); // Réinitialiser la valeur de la recherche lorsque la barre est cachée
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSelectSuggestion = (id: string) => {
    setSearchValue("");
    setSuggestions([]);
    navigate(`/star/${id}`);
  };

  return (
    <header className="bg-background-inverse text-text fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 shadow-lg h-12 transition-all duration-300 ease-in-out">
      <div className="flex items-center space-x-3">
        <Link to="/" className="text-lg text-text hover:text-white">
          <FaHome className="text-xl text-text" />
        </Link>
      </div>

      <div className="flex items-center space-x-3 relative">
        {scrolled && <span className="text-lg font-serif">Stella</span>}

        {/* Barre de recherche avec transition */}
        {isSearchVisible && (
          <div className="relative transition-opacity duration-300 ease-in-out">
            <input
              type="text"
              className="w-48 p-2 pl-4 pr-3 rounded-full bg-secondary text-text focus:outline-none h-8"
              placeholder="Rechercher"
              value={searchValue}
              onChange={handleSearchChange}
              onBlur={() => setIsSearchVisible(false)}
            />

            {/* Conteneur pour suggestions, positionné sous la barre de recherche */}
            {suggestions.length > 0 && (
              <div className="absolute w-full mt-1 z-20">
                <ul className="bg-secondary text-text rounded-lg shadow-lg border border-primary max-h-60 overflow-y-auto">
                  {suggestions.map((star) => (
                    <li
                      key={star.id}
                      className="px-4 py-2 hover:bg-primary hover:text-white transition-colors duration-300 ease-in-out"
                    >
                      <button
                        type="button"
                        onClick={() => handleSelectSuggestion(star.id)}
                        className="w-full text-left cursor-pointer focus:outline-none"
                      >
                        {star.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Bouton pour afficher ou masquer la recherche */}
        {!isSearchVisible && (
          <button
            type="button"
            onClick={toggleSearch}
            className="text-text hover:text-white focus:outline-none"
          >
            <FaSearch className="text-xl" />
          </button>
        )}

        {isLoggedIn ? (
          <>
            <Link to="/cart" className="text-lg text-text hover:text-white">
              <FaShoppingCart />
            </Link>
            <Link to="/wishlist" className="text-lg text-text hover:text-white">
              <FaHeart />
            </Link>
            <Link to="/profile" className="text-lg text-text hover:text-white">
              <FaUser />
            </Link>
          </>
        ) : (
          <>
            <button
              type="button"
              className="text-lg text-text hover:text-white"
              onClick={() => navigate("/auth")}
            >
              <FaShoppingCart />
            </button>
            <button
              type="button"
              className="text-lg text-text hover:text-white"
              onClick={() => navigate("/auth")}
            >
              <FaHeart />
            </button>
            <button
              type="button"
              className="text-lg text-text hover:text-white"
              onClick={() => navigate("/auth")}
            >
              <FaUser />
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
