// client/src/components/Wishlist.tsx
import { useEffect, memo } from "react";
import { useWishlistStore } from "../stores/useWishlistStore";
import { useAuth } from "../context/AuthContext"; // Import du contexte d'authentification
import { useNavigate } from "react-router-dom"; // Import pour la navigation
import { Link } from "react-router-dom"; // Import pour les liens
import FadeInSection from "./FadeInSection"; // Si vous souhaitez l'utiliser

const Wishlist: React.FC = () => {
  const { wishlistItems, loading, error, fetchWishlist } = useWishlistStore();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Charger les articles de la wishlist si l'utilisateur est authentifié
  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlist();
    }
  }, [fetchWishlist, isAuthenticated]);

  if (loading) {
    return <p>Chargement de la liste d'envies...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  // Si l'utilisateur n'est pas authentifié
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto pt-20 px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Votre liste d'envies est vide</h1>
        <p className="text-lg mb-6 font-serif">
          Vous n'êtes pas connecté. Connectez-vous ou inscrivez-vous pour commencer à ajouter des étoiles à votre liste d'envies !
        </p>
        <div className="flex justify-center space-x-4">
          <button
            type="button"
            onClick={() => navigate('/auth', { state: { from: '/wishlist', mode: 'login' } })}
            className="btn"
          >
            Se connecter
          </button>
          <button
            type="button"
            onClick={() => navigate('/auth', { state: { from: '/wishlist', mode: 'register' } })}
            className="btn"
          >
            S'inscrire
          </button>
        </div>
      </div>
    );
  }

  // Si l'utilisateur est authentifié mais que la wishlist est vide
  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto pt-20 px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Votre liste d'envies est vide</h1>
        <p className="text-lg mb-6 font-serif">
          Votre liste d'envies est actuellement vide. Parcourez notre catalogue pour ajouter des étoiles à votre liste d'envies !
        </p>
        <Link to="/catalog" className="btn">
          Parcourir le catalogue
        </Link>
      </div>
    );
  }

  // Si l'utilisateur est authentifié et que la wishlist contient des articles
  return (
    <div className="container mx-auto pt-20 px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Votre Liste d'envies</h1>
      <FadeInSection>
        <ul>
          {wishlistItems.map((item) => (
            <li key={item.id} className="border p-4 mb-2">
              {item.star.name} - {item.star.price}€
            </li>
          ))}
        </ul>
      </FadeInSection>
    </div>
  );
};

export default memo(Wishlist);
