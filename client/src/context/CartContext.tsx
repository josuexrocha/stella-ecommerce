// client/src/context/CartContext.tsx

import { createContext, useState, useEffect, useContext } from "react";
import { getCart, addToCart, removeFromCart } from "../services/api";
import { useAuth } from "./AuthContext"; // Utilise ton AuthContext ici
import type { CartItem } from "../types";

interface CartContextType {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addItemToCart: (starId: string, quantity: number) => Promise<void>;
  removeItemFromCart: (cartItemId: string) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { isAuthenticated } = useAuth(); // Récupère l'état d'authentification

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!isAuthenticated) {
        return;
      }

      try {
        const cart = await getCart();
        setCartItems(cart.cartItems);
      } catch (error) {
        console.error("Erreur lors de la récupération du panier:", error);
      }
    };

    fetchCartItems();
  }, [isAuthenticated]);

  const addItemToCart = async (starId: string, quantity: number) => {
    if (!isAuthenticated) {
      return;
    }

    try {
      await addToCart(starId, quantity);
      const cart = await getCart();
      setCartItems(cart.cartItems);
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier:", error);
    }
  };

  const removeItemFromCart = async (cartItemId: string) => {
    if (!isAuthenticated) {
      return;
    }

    try {
      await removeFromCart(cartItemId);
      const cart = await getCart();
      setCartItems(cart.cartItems);
    } catch (error) {
      console.error("Erreur lors de la suppression du panier:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addItemToCart, removeItemFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart doit être utilisé à l'intérieur d'un CartProvider");
  }
  return context;
};