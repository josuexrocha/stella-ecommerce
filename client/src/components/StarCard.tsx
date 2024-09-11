// client/src/components/StarCard.tsx

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { addToCart, getCart } from "../services/api";
import type { Star, CartItem, Cart, ApiResponse } from "../types";
import FadeInSection from "./FadeInSection";

interface StarCardProps {
  star: Star;
}

const StarCard: React.FC<StarCardProps> = ({ star }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    const checkCart = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        // Ne fais rien si l'utilisateur n'est pas connecté
        return;
      }

      try {
        const cart: Cart = await getCart();
        console.log("Réponse du panier:", cart);
        const isInCart = cart?.cartItems?.some((item: CartItem) => item.starId === star.starid);
        setInCart(!!isInCart);
      } catch (error) {
        console.error("Erreur lors de la vérification du panier:", error);
      }
    };

    checkCart();
  }, [star.starid]);

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      await addToCart(star.starid, 1);
      setInCart(true);
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier.", error);
      setError("Une erreur est survenue lors de l'ajout au panier.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FadeInSection>
      <div className="bg-secondary text-text rounded-lg shadow-lg flex flex-col h-full">
        <img
          src={`/assets/images/stars/${star.name.toLowerCase().replace(/\s+/g, "")}.jpg`}
          alt={star.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4 flex-grow">
          <h2 className="text-xl font-serif mb-2">{star.name}</h2>
          <p className="text-sm mb-4">{star.description}</p>
          <span className="text-lg font-semibold">{star.price} €</span>
          <Link to={`/star/${star.starid}`} className="btn mt-2 block">
            Découvrir
          </Link>
          <button
            type="button"
            onClick={handleAddToCart}
            className={`btn mt-2 ${inCart ? "bg-gray-500 cursor-not-allowed" : ""}`}
            disabled={loading || inCart}
          >
            {inCart ? "Ajouté" : loading ? "Ajout..." : "Ajouter au panier"}
          </button>
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </div>
      </div>
    </FadeInSection>
  );
};

export default StarCard;
