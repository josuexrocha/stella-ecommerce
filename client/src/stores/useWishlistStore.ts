// client/src/stores/useWishlistStore.ts
import { create } from "zustand";
import { getWishlist, addToWishlist, removeFromWishlist } from "../services/api";
import type { WishlistItem } from "../types";

interface WishlistState {
  wishlistItems: WishlistItem[];
  loading: boolean;
  error: string | null;
  fetchWishlist: () => Promise<void>;
  addItemToWishlist: (starId: string) => Promise<void>;
  removeItemFromWishlist: (starId: string) => Promise<void>;
}

export const useWishlistStore = create<WishlistState>((set) => ({
  wishlistItems: [], // Assurez-vous que wishlistItems est toujours un tableau
  loading: true,
  error: null,

  fetchWishlist: async () => {
    set({ loading: true, error: null });
    try {
      const wishlistResponse = await getWishlist();
      set({ wishlistItems: wishlistResponse.data || [], loading: false }); // Assurez-vous d'assigner un tableau vide si `data` est indéfini
    } catch (error) {
      console.error("Erreur lors de la récupération de la liste d'envies:", error);
      set({ wishlistItems: [], error: "Erreur lors de la récupération de la liste d'envies.", loading: false });
    }
  },

  addItemToWishlist: async (starId: string) => {
    try {
      const updatedWishlist = await addToWishlist(starId);
      set((state) => ({ wishlistItems: updatedWishlist.data || [], error: null }));
    } catch (error) {
      console.error("Erreur lors de l'ajout à la liste d'envies:", error);
      set({ error: "Erreur lors de l'ajout à la liste d'envies." });
    }
  },

  removeItemFromWishlist: async (starId: string) => {
    try {
      const updatedWishlist = await removeFromWishlist(starId);
      set((state) => ({ wishlistItems: updatedWishlist.data || [], error: null }));
    } catch (error) {
      console.error("Erreur lors de la suppression de la liste d'envies:", error);
      set({ error: "Erreur lors de la suppression de la liste d'envies." });
    }
  },
}));
