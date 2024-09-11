import { useState, useEffect } from "react";
import { useCartStore } from "../stores/useCartStore"; // ou ton hook useCartStatus

interface AddToCartButtonProps {
  starId: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ starId }) => {
  const { cartItems, addItem } = useCartStore();
  const [inCart, setInCart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const isInCart = cartItems.some((item) => item.starId === starId);
    setInCart(isInCart);
  }, [cartItems, starId]);

  const handleAddToCart = async () => {
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
        {inCart ? "Ajouté" : loading ? "Ajout..." : "Ajouter au panier"}
      </button>
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </>
  );
};

export default AddToCartButton;
