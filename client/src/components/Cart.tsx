import { useState, useEffect } from "react";
import { getCart } from "../services/api";
import type { CartItem } from "../types";

const ShoppingCart: React.FC = () => { // Renommer ici
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await getCart();
        setCartItems(response.data.cartItems);
      } catch (error) {
        console.error("Erreur lors de la récupération du panier.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Votre Panier</h1>
      <ul>
        {cartItems.map(item => (
          <li key={item.id} className="border p-4 mb-2">
            {item.star.name} - {item.quantity} x {item.star.price} €
          </li>
        ))}
      </ul>
      <p className="text-xl font-bold mt-6">
        Total:{" "}
        {cartItems.reduce((total, item) => total + item.quantity * item.star.price, 0).toFixed(2)} €
      </p>
    </div>
  );
};

export default ShoppingCart;
