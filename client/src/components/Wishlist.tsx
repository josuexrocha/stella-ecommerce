// client/src/components/Wishlist.tsx
import { useEffect, memo } from "react";
import { useWishlistStore } from "../stores/useWishlistStore"; // Importation du store Zustand

const Wishlist: React.FC = () => {
  const { wishlistItems, loading, error, fetchWishlist } = useWishlistStore();

  // Charger les articles de la liste d'envies au montage du composant
  useEffect(() => {
    fetchWishlist(); // Charge les articles de la wishlist depuis Zustand
  }, [fetchWishlist]);

  if (loading) {
    return <p>Chargement de la liste d'envies...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (wishlistItems.length === 0) {
    return <p>Votre liste d'envies est vide.</p>;
  }

  return (
    <div>
      <ul>
        {wishlistItems.map((item) => (
          <li key={item.id} className="border p-4 mb-2">
            {item.star.name} - {item.star.price}€
          </li>
        ))}
      </ul>
    </div>
  );
};

export default memo(Wishlist);
