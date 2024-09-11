// client/src/components/Cart.tsx
import { useEffect, memo } from "react"; // Ajoute useEffect
import { useCartStore } from "../stores/useCartStore";
import FadeInSection from "./FadeInSection";

const ShoppingCart: React.FC = () => {
  const { cartItems, loading, error, fetchCart } = useCartStore();

  // Charger les articles du panier à l'ouverture du composant
  useEffect(() => {
    fetchCart(); // Charge les articles du panier depuis Zustand
  }, [fetchCart]);

  if (loading) {
    return <p>Chargement du panier...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (cartItems.length === 0) {
    return <p>Votre panier est vide.</p>;
  }

  return (
    <div role="listitem" className="container mx-auto pt-20 px-4 py-8">
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
          Total:{" "}
          {cartItems.reduce((total, item) => total + item.quantity * item.Star.price, 0).toFixed(2)}{" "}
          €
        </p>
      </FadeInSection>
    </div>
  );
};

export default memo(ShoppingCart);
