import { useState, useEffect } from "react";
import { FaHome, FaSearch, FaUser, FaShoppingCart, FaHeart } from "react-icons/fa";

const Header: React.FC = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const isLoggedIn = true; // Remplacer par une vérification réelle de l'état de connexion

  // Timer pour masquer la barre de recherche après un délai d'inactivité
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isSearchVisible) {
      timeout = setTimeout(() => {
        setIsSearchVisible(false);
      }, 5000); // Masquer la barre après 5 secondes d'inactivité
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isSearchVisible, searchValue]);

  const toggleSearch = () => {
    setIsSearchVisible(true);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (!isSearchVisible) {
      setIsSearchVisible(true);
    }
  };

  return (
    <header className="bg-primary text-text fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 shadow-lg h-12">
      <div className="flex items-center space-x-4">
        <a href="/" className="text-xl text-text hover:text-white">
          <FaHome className="text-2xl text-text" />
        </a>
      </div>

      <div className="flex items-center space-x-4">
        {!isSearchVisible && (
          <button
            type="button"
            onClick={toggleSearch}
            className="text-text hover:text-white focus:outline-none"
          >
            <FaSearch className="text-2xl" />
          </button>
        )}
        {isSearchVisible && (
          <div className="relative">
            <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-text" />
            <input
              type="text"
              className="w-48 p-2 pl-10 pr-4 rounded-full bg-secondary text-secondary focus:outline-none h-8"
              placeholder="Rechercher"
              value={searchValue}
              onChange={handleSearchChange}
            />
          </div>
        )}
        {isLoggedIn && (
          <>
            <a href="/cart" className="text-xl text-text hover:text-white">
              <FaShoppingCart />
            </a>
            <a href="/wishlist" className="text-xl text-text hover:text-white">
              <FaHeart />
            </a>
          </>
        )}
        <a href="/auth" className="text-xl text-text hover:text-white">
          <FaUser />
        </a>
      </div>
    </header>
  );
};

export default Header;
