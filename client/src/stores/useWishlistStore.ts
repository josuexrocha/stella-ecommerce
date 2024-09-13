import { create } from "zustand";
import { getWishlist, addToWishlist, removeFromWishlist } from "../services/api";
import type { WishlistItem } from "../types";

interface WishlistState {
  wishlistItems: WishlistItem[];
  loading: boolean;
  error: string | null;
  fetchWishlist: () => Promise<void>;
  addItemToWishlist: (starId: number) => Promise<void>; // starId est un nombre
  removeItemFromWishlist: (starId: number) => Promise<void>;
}

export const useWishlistStore = create<WishlistState>((set, _get) => ({
  wishlistItems: [],
  loading: false,
  error: null,

  fetchWishlist: async () => {
    set({ loading: true, error: null });
    try {
      const { wishlist } = await getWishlist();
      set({ wishlistItems: wishlist || [], loading: false });
    } catch (error) {
      console.error("Erreur lors de la récupération de la liste d'envies:", error);
      set({ error: "Erreur lors de la récupération de la liste d'envies.", loading: false });
    }
  },

  addItemToWishlist: async (starId: number) => {
    try {
      const { wishlistItem } = await addToWishlist(starId);
      set((state) => ({
        wishlistItems: [...state.wishlistItems, wishlistItem],
        error: null,
      }));
    } catch (error) {
      console.error("Erreur lors de l'ajout à la liste d'envies:", error);
      set({ error: "Erreur lors de l'ajout à la liste d'envies." });
    }
  },

  removeItemFromWishlist: async (starId: number) => {
    try {
      await removeFromWishlist(starId);
      set((state) => ({
        wishlistItems: state.wishlistItems.filter((item) => item.starId !== starId),
        error: null,
      }));
    } catch (error) {
      console.error("Erreur lors de la suppression de la liste d'envies:", error);
      set({ error: "Erreur lors de la suppression de la liste d'envies." });
    }
  },
}));
