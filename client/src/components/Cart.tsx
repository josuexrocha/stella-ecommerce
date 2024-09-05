import { useState, useEffect } from "react";
import { getCart } from "../services/api"; // Fetch cart items from API
import type { CartItem } from "../types";

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const getCartItems = async () => {
      try {
        const response = await getCart(); // API call to fetch cart items
        setCartItems(response.data.cartItems);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    getCartItems();
  }, []);

  if (cartItems.length === 0) return <p>Votre panier est vide.</p>;

  return (
    <div>
      <ul>
        {cartItems.map(item => (
          <li key={item.id} className="border p-4 mb-2">
            {item.star.name} - {item.star.price}€
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
