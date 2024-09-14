// client/src/components/AddToCartButton.tsx

import { useNavigate } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { useAuth } from "../context/AuthContext";
import { FaShoppingCart } from "react-icons/fa";
import type React from "react";

interface AddToCartButtonProps {
  starId: number;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ starId }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Sélecteurs Zustand
  const cartItems = useCartStore((state) => state.cartItems);
  const addItem = useCartStore((state) => state.addItem);

  // Vérifier si l'article est déjà dans le panier
  const inCart = cartItems.some((item) => item.starId === starId);

  // Extraire les états de chargement et d'erreur depuis le store
  const loading = useCartStore((state) => state.loading);
  const error = useCartStore((state) => state.error);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      // Rediriger vers la page d'authentification avec un message
      navigate("/auth", {
        state: {
          from: "/cart",
          message: "Veuillez vous connecter pour ajouter des articles au panier.",
        },
      });
      return;
    }

    try {
      await addItem(starId, 1);
    } catch (err) {
      // Les erreurs sont gérées directement dans le store, vous pouvez ajouter un traitement supplémentaire si nécessaire
      console.error(err);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleAddToCart}
        className={`btn mt-2 ${inCart ? "bg-gray-500 cursor-not-allowed" : ""}`}
        disabled={loading || inCart}
        aria-live="polite"
        aria-label={inCart ? "Produit déjà ajouté au panier" : "Ajouter au panier"}
      >
        <FaShoppingCart className="text-xl" />
      </button>
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </>
  );
};

export default AddToCartButton;
