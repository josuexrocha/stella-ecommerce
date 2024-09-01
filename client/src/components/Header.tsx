import { useState, useEffect } from "react";
import { FaHome, FaSearch, FaUser, FaShoppingCart, FaHeart } from "react-icons/fa";

const Header: React.FC = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const isLoggedIn = true; // Remplacer par une vérification réelle de l'état de connexion

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
  }, [isSearchVisible]);

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
    <header className="bg-primary text-text fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 shadow-lg h-10">
      <div className="flex items-center space-x-3">
        <a href="/" className="text-lg text-text hover:text-white">
          <FaHome className="text-xl text-text" />
        </a>
      </div>

      <div className="flex items-center space-x-3">
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
              className="w-36 p-2 pl-8 pr-3 rounded-full bg-secondary text-secondary focus:outline-none h-6"
              placeholder="Rechercher"
              value={searchValue}
              onChange={handleSearchChange}
            />
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
