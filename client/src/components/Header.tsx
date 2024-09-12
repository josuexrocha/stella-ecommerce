import { useState, useEffect, memo } from "react";
import { FaHome, FaSearch, FaUser, FaShoppingCart, FaHeart } from "react-icons/fa";
import { searchStars, getCart } from "../services/api";
import { useNavigate, useLocation, Link } from "react-router-dom";
import type { Star, CartItem } from "../types";
import { usePageTitleOnScroll } from "../hooks/usePageTitleOnScroll";
import { useAuth } from "../context/AuthContext"; // Import du contexte Auth

const Header: React.FC = () => {
  const { isAuthenticated } = useAuth(); // Utilisation du contexte pour vérifier l'authentification
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState<Star[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { isTitleVisible, pageTitle } = usePageTitleOnScroll(); // Utilisation du hook pour le titre de la page
  const [cartItemCount, setCartItemCount] = useState(0); // Compteur d'articles du panier
  const navigate = useNavigate();
  const location = useLocation();

  // Charger les articles du panier lorsque l'utilisateur est connecté
  useEffect(() => {
    if (isAuthenticated) {
      const fetchCartItemCount = async () => {
        try {
          const cart = await getCart();
          setCartItemCount(cart.cartItems.length);
        } catch (error) {
          console.error("Erreur lors de la récupération du panier:", error);
        }
      };
      fetchCartItemCount();
    }
  }, [isAuthenticated, location]);

  // Mise à jour des suggestions lors de la frappe dans la barre de recherche
  useEffect(() => {
    if (searchValue) {
      searchStars(searchValue).then((results) => setSuggestions(results));
    } else {
      setSuggestions([]);
    }
  }, [searchValue]);

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setTimeout(() => {
      setIsSearchFocused(false);
    }, 100); // Petit délai pour permettre le clic sur la suggestion avant de cacher
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
    setSearchValue(""); // Réinitialiser la recherche lorsque la barre est cachée
    setSuggestions([]); // Réinitialiser les suggestions aussi
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSelectSuggestion = (starid: string) => {
    setSearchValue("");
    setSuggestions([]);
    navigate(`/star/${starid}`);
  };

  return (
    <header className="bg-background-inverse text-text fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-20 shadow-lg h-12 transition-all duration-300 ease-in-out">
      <div className="flex items-center space-x-3">
        <Link to="/" className="text-lg text-text hover:text-white">
          <FaHome className="text-xl text-text" />
        </Link>
      </div>

      <div className="flex items-center space-x-3 relative">
        {/* Affiche le titre de la page seulement quand il n'est plus visible */}
        {!isTitleVisible && <span className="text-lg font-serif">{pageTitle}</span>}

        {/* Barre de recherche */}
        {isSearchVisible && (
          <div className="relative transition-opacity duration-300 ease-in-out">
            <input
              type="text"
              className="w-48 p-2 pl-4 pr-3 rounded-full bg-secondary text-text focus:outline-none h-8"
              placeholder="Rechercher"
              value={searchValue}
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur} // Utilisation du onBlur avec timeout
              aria-label="Rechercher une étoile"
              aria-expanded={isSearchVisible}
            />

            {/* Suggestions de recherche */}
            {isSearchFocused && suggestions.length > 0 && (
              <div className="absolute w-full mt-1 z-20">
                <ul className="bg-secondary text-text rounded-lg shadow-lg border border-primary max-h-60 overflow-y-auto">
                  {suggestions.map((star) => (
                    <li
                      key={star.starid}
                      className="px-4 py-2 hover:bg-primary hover:text-white transition-colors duration-300 ease-in-out"
                    >
                      <button
                        type="button"
                        onClick={() => handleSelectSuggestion(star.starid)}
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

        {/* Bouton pour afficher/masquer la recherche */}
        {!isSearchVisible && (
          <button
            type="button"
            onClick={toggleSearch}
            aria-expanded={isSearchVisible}
            className="text-text hover:text-white focus:outline-none"
          >
            <FaSearch className="text-xl" />
          </button>
        )}

        {/* Icônes selon l'état d'authentification */}
        {isAuthenticated ? (
          <>
            <Link to="/cart" className="relative text-lg text-text hover:text-white">
              <FaShoppingCart />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
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
            <Link to="/auth" className="text-lg text-text hover:text-white">
              <FaShoppingCart />
            </Link>
            <Link to="/auth" className="text-lg text-text hover:text-white">
              <FaHeart />
            </Link>
            <Link to="/auth" className="text-lg text-text hover:text-white">
              <FaUser />
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default memo(Header);
