// client/src/stores/useWishlistStore.ts
import { create } from 'zustand';
import { getWishlist } from '../services/api';
import type { WishlistItem } from '../types';

interface WishlistState {
  wishlistItems: WishlistItem[];
  loading: boolean;
  error: string | null;
  fetchWishlist: () => Promise<void>;
}

export const useWishlistStore = create<WishlistState>((set) => ({
  wishlistItems: [],
  loading: true,
  error: null,

  fetchWishlist: async () => {
    set({ loading: true, error: null });
    try {
      const wishlistResponse = await getWishlist();
      set({ wishlistItems: wishlistResponse.data, loading: false });
    } catch (error) {
      console.error('Erreur lors de la récupération de la liste d\'envies:', error);
      set({ error: 'Erreur lors de la récupération de la liste d\'envies.', loading: false });
    }
  },
}));
