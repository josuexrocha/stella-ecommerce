import { useEffect, memo } from "react";
import { useWishlistStore } from "../stores/useWishlistStore";
import StarCard from "./StarCard";
import FadeInSection from "./FadeInSection";

const Wishlist: React.FC = () => {
  const { wishlistItems, loading, error, fetchWishlist, removeItemFromWishlist } = useWishlistStore();

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const handleRemoveFromWishlist = (starId: number) => {
    removeItemFromWishlist(starId);
  };

  if (loading) {
    return <p>Chargement de la liste d'envies...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (!wishlistItems || wishlistItems.length === 0) {
    return (
      <div className="container mx-auto pt-20 px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Votre liste d'envies est vide</h1>
        <p className="text-lg mb-6 font-serif">
          Vous n'avez pas encore ajouté d'étoiles à votre liste d'envies. Explorez notre catalogue pour en ajouter !
        </p>
        <a href="/catalog" className="btn">Voir notre catalogue</a>
      </div>
    );
  }

  return (
    <div className="container mx-auto pt-20 px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Votre Liste d'envies</h1>
      <FadeInSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <StarCard
              key={item.id}
              star={item.Star} // Utilisez 'item.Star' avec une majuscule
              context="wishlist"
              onRemove={() => handleRemoveFromWishlist(item.starId)}
            />
          ))}
        </div>
      </FadeInSection>
    </div>
  );
};

export default memo(Wishlist);
