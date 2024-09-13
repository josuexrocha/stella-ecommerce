import { useEffect, memo } from "react";
import { useCartStore } from "../stores/useCartStore";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import StarCard from "./StarCard";
import type { CartItem } from "../types";

const ShoppingCart: React.FC = () => {
  const { cartItems, loading, error, fetchCart, removeItem } = useCartStore();
  const { isAuthenticated } = useAuth();
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
          Votre panier est actuellement vide. Parcourez notre catalogue pour ajouter des étoiles à votre panier !
        </p>
        <Link to="/catalog" className="btn">
          Parcourir le catalogue
        </Link>
      </div>
    );
  }

  // Fonction pour retirer un article du panier
  const handleRemoveFromCart = async (cartItemId: number) => {
    try {
      await removeItem(cartItemId);
      alert('Article retiré du panier.');
    } catch (error) {
      console.error('Erreur lors de la suppression du panier:', error);
    }
  };

  // Si l'utilisateur est authentifié et que le panier contient des articles
  return (
    <div className="container mx-auto pt-20 px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Votre Panier</h1>
      <div>
        {cartItems.map((item: CartItem) => (
          item.Star && (
            <StarCard
              key={item.id}
              star={item.Star}
              quantity={item.quantity}
              context="cart"
              onRemove={() => handleRemoveFromCart(item.id)}
            />
          )
        ))}
        <p className="text-xl font-bold mt-6">
          Total :{" "}
          {cartItems.reduce((total, item) => total + item.quantity * item.Star.price, 0).toFixed(2)}{" "}
          €
        </p>
      </div>
    </div>
  );
};

export default memo(ShoppingCart);
