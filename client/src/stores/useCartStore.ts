// client/src/stores/useCartStore.ts
import { create } from "zustand";
import { getCart, addToCart, removeFromCart } from "../services/api";
import type { CartItem } from "../types";

interface CartState {
  cartItems: CartItem[];
  loading: boolean;
  error: string | null; // Ajout de l'état d'erreur
  fetchCart: () => Promise<void>;
  addItem: (starId: number, quantity: number) => Promise<void>;
  removeItem: (cartItemId: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set) => ({
  cartItems: [],
  loading: false, // Initialiser à false
  error: null,

  fetchCart: async () => {
    set({ loading: true, error: null });
    try {
      const cart = await getCart();
      set({ cartItems: cart.cartItems, loading: false });
    } catch (error) {
      console.error("Erreur lors de la récupération du panier:", error);
      set({ error: "Erreur lors de la récupération du panier.", loading: false });
    }
  },

  addItem: async (starId: number, quantity: number) => {
    try {
      await addToCart(starId, quantity);
      const cart = await getCart();
      set({ cartItems: cart.cartItems });
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier:", error);
    }
  },

  removeItem: async (cartItemId: number) => {
    try {
      await removeFromCart(cartItemId);
      const cart = await getCart();
      set({ cartItems: cart.cartItems });
    } catch (error) {
      console.error("Erreur lors de la suppression de l'article du panier:", error);
    }
  },
}));
