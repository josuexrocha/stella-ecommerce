// client/src/components/AddToWishlistButton.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWishlistStore } from "../stores/useWishlistStore";
import { useAuth } from "../context/AuthContext";
import { FaHeart } from "react-icons/fa"; // Import de l'icône

interface AddToWishlistButtonProps {
  starId: string;
}

const AddToWishlistButton: React.FC<AddToWishlistButtonProps> = ({ starId }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { wishlistItems, addItemToWishlist } = useWishlistStore();
  const [inWishlist, setInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const isInWishlist = wishlistItems.some((item) => item.starId === starId);
    setInWishlist(isInWishlist);
  }, [wishlistItems, starId]);

  const handleAddToWishlist = async () => {
    if (!isAuthenticated) {
      navigate("/auth", {
        state: { from: "/wishlist", message: "Veuillez vous connecter pour ajouter des articles à la liste de souhaits." },
      });
      return;
    }

    setLoading(true);
    try {
      await addItemToWishlist(starId);
      setInWishlist(true);
    } catch (err) {
      setError("Erreur lors de l'ajout à la liste de souhaits.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleAddToWishlist}
        className={`btn mt-2 ${inWishlist ? "bg-gray-500 cursor-not-allowed" : ""}`}
        disabled={loading || inWishlist}
        aria-live="polite"
        aria-label={inWishlist ? "Produit déjà ajouté à la liste de souhaits" : "Ajouter à la liste de souhaits"}
      >
        <FaHeart className="text-xl" />
      </button>
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </>
  );
};

export default AddToWishlistButton;