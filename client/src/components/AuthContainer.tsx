// client/src/components/AuthContainer.tsx

import { useState, useEffect } from "react";
import Login from "./Login";
import Register from "./Register";
import { getCart } from "../services/api";

const AuthContainer: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [_isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [_cartItemCount, setCartItemCount] = useState(0); // Nouvel état pour surveiller le nombre d'articles dans le panier

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Vérifier à chaque chargement de la page

    if (token) {
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
  }, [location]); // Ajout de la location pour réagir au changement de page

  return (
    <div className="container mx-auto pt-20 px-4 max-w-md">
      <h1 className="text-4xl font-display mb-8 text-center">
        {isLogin ? "Connexion" : "Inscription"}
      </h1>
      {isLogin ? <Login /> : <Register />}
      <div className="mt-6 text-center">
        <p className="text-sm font-serif text-text">
          {isLogin ? "Pas encore de compte ?" : "Vous avez déjà un compte ?"}
          <button type="button" onClick={toggleAuthMode} className="btn ml-4">
            {isLogin ? "S'inscrire" : "Se connecter"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthContainer;
