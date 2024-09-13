// client/src/components/Cart.tsx
import { useEffect, memo } from "react";
import { useCartStore } from "../stores/useCartStore";
import FadeInSection from "./FadeInSection";
import { useAuth } from "../context/AuthContext"; // Import du contexte d'authentification
import { useNavigate, useLocation } from "react-router-dom"; // Pour la navigation
import { Link } from "react-router-dom"; // Pour les liens

const ShoppingCart: React.FC = () => {
  const { cartItems, loading, error, fetchCart } = useCartStore();
  const { isAuthenticated } = useAuth(); // Vérifier si l'utilisateur est authentifié
  const navigate = useNavigate();

  // Charger les articles du panier si l'utilisateur est authentifié
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [fetchCart, isAuthenticated]);

  if (loading) {
    return <p>Chargement du panier...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  // Si l'utilisateur n'est pas authentifié
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto pt-20 px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Votre panier est vide</h1>
        <p className="text-lg mb-6 font-serif">
          Vous n'êtes pas connecté. Connectez-vous ou inscrivez-vous pour commencer à ajouter des étoiles à votre panier !
        </p>
        <div className="flex justify-center space-x-4">
          <button
            type="button"
            onClick={() => navigate('/auth', { state: { from: '/cart', mode: 'login' } })}
            className="btn"
          >
            Se connecter
          </button>
          <button
            type="button"
            onClick={() => navigate('/auth', { state: { from: '/cart', mode: 'register' } })}
            className="btn"
          >
            S'inscrire
          </button>
        </div>
      </div>
    );
  }

  // Si l'utilisateur est authentifié mais que le panier est vide
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto pt-20 px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Votre panier est vide</h1>
        <p className="text-lg mb-6 font-serif">
          Votre panier est actuellement vide. Parcourez notre catalogue pour ajouter des étoiles à
          votre panier !
        </p>
        <Link to="/catalog" className="btn">
          Parcourir le catalogue
        </Link>
      </div>
    );
  }

  // Si l'utilisateur est authentifié et que le panier contient des articles
  return (
    <div className="container mx-auto pt-20 px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Votre Panier</h1>
      <FadeInSection>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} className="border p-4 mb-2">
              {item.Star.name} - {item.quantity} x {item.Star.price} €
            </li>
          ))}
        </ul>
        <p className="text-xl font-bold mt-6">
          Total :{" "}
          {cartItems.reduce((total, item) => total + item.quantity * item.Star.price, 0).toFixed(2)}{" "}
          €
        </p>
      </FadeInSection>
    </div>
  );
};

export default memo(ShoppingCart);
