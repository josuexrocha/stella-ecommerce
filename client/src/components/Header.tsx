import { useState, useEffect } from "react";
import { FaHome, FaSearch, FaUser, FaShoppingCart, FaHeart } from "react-icons/fa";
import { searchStars, getCart } from "../services/api";
import { useNavigate, useLocation, Link } from "react-router-dom";
import type { Star, CartItem } from "../types";
import { usePageTitleOnScroll } from "../hooks/usePageTitleOnScroll";

const Header: React.FC = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState<Star[]>([]);
  const { isTitleVisible, pageTitle } = usePageTitleOnScroll();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [currentTitle, setCurrentTitle] = useState("");
  const [cartItemCount, setCartItemCount] = useState(0); // Nouvel état pour surveiller le nombre d'articles dans le panier
  const navigate = useNavigate();
  const location = useLocation();

  // Vérification et mise à jour de l'état d'authentification
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Mettre à jour l'état de connexion
  }, []);

  // Réinitialiser le titre quand la route change
  useEffect(() => {
    setCurrentTitle(""); // Réinitialise le titre lors du changement de page
  }, [location]);

  // Mise à jour du titre selon le scroll
  useEffect(() => {
    if (!isTitleVisible) {
      setCurrentTitle(pageTitle); // Afficher le titre dans le header lorsque l'utilisateur a scrollé
    } else {
      setCurrentTitle(""); // Cacher le titre lorsque l'utilisateur n'a pas scrollé
    }
  }, [isTitleVisible, pageTitle]);

  // Mise à jour des suggestions en temps réel lors de la frappe dans le champ de recherche
  useEffect(() => {
    if (searchValue) {
      searchStars(searchValue).then((results) => setSuggestions(results));
    } else {
      setSuggestions([]);
    }
  }, [searchValue]);

  // Récupérer les articles du panier et mettre à jour le compteur
  useEffect(() => {
    const fetchCartItemCount = async () => {
      try {
        const cart = await getCart(); // `getCart` retourne un `Cart`
        setCartItemCount(cart.cartItems.length); // Accès direct à `cartItems`
      } catch (error) {
        console.error("Erreur lors de la récupération du panier:", error);
      }
    };

    fetchCartItemCount();
  }, []);

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
    <header className="bg-background-inverse text-text fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-20 shadow-lg h-12 transition-all duration-300 ease-in-out">
      <div className="flex items-center space-x-3">
        <Link to="/" className="text-lg text-text hover:text-white">
          <FaHome className="text-xl text-text" />
        </Link>
      </div>

      <div className="flex items-center space-x-3 relative">
        {currentTitle && <span className="text-lg font-serif">{currentTitle}</span>}

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

export default Header;
