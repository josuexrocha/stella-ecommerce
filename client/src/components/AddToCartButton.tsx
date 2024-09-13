// client/src/components/AddToCartButton.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { useAuth } from "../context/AuthContext";
import { FaShoppingCart } from "react-icons/fa"; // Import de l'icône

interface AddToCartButtonProps {
  starId: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ starId }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { cartItems, addItem } = useCartStore();
  const [inCart, setInCart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const isInCart = cartItems.some((item) => item.starId === starId);
    setInCart(isInCart);
  }, [cartItems, starId]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      // Affichage du message de connexion
      navigate("/auth", {
        state: { from: "/cart", message: "Veuillez vous connecter pour ajouter des articles au panier." },
      });
      return;
    }

    setLoading(true);
    try {
      await addItem(starId, 1);
      setInCart(true);
    } catch (err) {
      setError("Erreur lors de l'ajout au panier.");
      console.error(err);
    } finally {
      setLoading(false);
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