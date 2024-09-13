// client/src/services/api.ts

import axios from "axios";
import type { AxiosInstance } from "axios";
import type {
  User,
  UserProfileData,
  Star,
  OrderData,
  Order,
  OrderStatus,
  Cart,
  Review,
  WishlistItem,
  ApiResponse,
} from "../types";

// Configuration de l'instance Axios
const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour ajouter le token d'authentification dans chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Fonction pour récupérer toutes les étoiles
export const fetchStars = async (): Promise<ApiResponse<Star[]>> => {
  const response = await api.get<ApiResponse<Star[]>>("/stars");
  return response.data;
};

// Fonction pour récupérer une étoile par ID
export const fetchStarById = async (starid: string) => {
  try {
    const response = await api.get(`/stars/${starid}`);
    // Conversion en chaîne si nécessaire
    if (response?.data?.starid) {
      response.data.starid = String(response.data.starid);
    }
    return response;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'étoile par ID:", error);
    throw error;
  }
};

// Fonction pour filtrer les étoiles
export const filterStars = async (params: {
  constellation?: string;
  minMagnitude?: number;
  maxMagnitude?: number;
}): Promise<ApiResponse<Star[]>> => {
  const response = await api.get<ApiResponse<Star[]>>("/stars/filter", { params });
  return response.data;
};

// Focntion pour la recherche d'étoiles
export const searchStars = async (query: string): Promise<Star[]> => {
  const response = await api.get<Star[]>("/stars/search", {
    params: { q: query },
  });
  return response.data;
};

// Fonction pour inscrire un utilisateur
export const registerUser = async (userData: {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}): Promise<{ token: string; userId: number }> => {
  const response = await api.post<{ token: string; userId: number }>("/users/register", userData);
  return response.data; // On retourne directement le token et l'ID de l'utilisateur
};

// Fonction pour connecter un utilisateur
export const loginUser = async (loginData: { email: string; password: string }) => {
  return api.post<{ token: string }>("/users/login", loginData);
};

export const getUserProfile = async (): Promise<User> => {
  const response = await api.get<User>("/users/profile");
  return response.data;
};

export const updateUserProfile = async (userData: UserProfileData): Promise<ApiResponse<User>> => {
  const response = await api.put<ApiResponse<User>>("/users/profile", userData);
  return response.data;
};

export const logoutUser = async (): Promise<ApiResponse<null>> => {
  const response = await api.post<ApiResponse<null>>("/users/logout");
  return response.data;
};

export const deleteUserAccount = async (): Promise<ApiResponse<null>> => {
  return api.delete("/users/me");
};

// Cart
export const getCart = async (): Promise<Cart> => {
  try {
    const response = await api.get("/cart");

    // Effectue un casting explicite vers le type Cart
    const cart: Cart = response.data as Cart;
    return cart; // Retourne l'objet Cart
  } catch (error) {
    console.error("Erreur lors de la récupération du panier:", error);
    throw error;
  }
};

export const addToCart = async (starId: string, quantity: number): Promise<ApiResponse<Cart>> => {
  const response = await api.post<ApiResponse<Cart>>("/cart/add", { starId, quantity });
  return response.data;
};

export const updateCartItem = async (
  cartItemId: string,
  quantity: number,
): Promise<ApiResponse<Cart>> => {
  const response = await api.put<ApiResponse<Cart>>("/cart/update", { cartItemId, quantity });
  return response.data;
};

export const removeFromCart = async (cartItemId: string): Promise<ApiResponse<Cart>> => {
  const response = await api.delete<ApiResponse<Cart>>(`/cart/remove/${cartItemId}`);
  return response.data;
};

// Wishlist
export const getWishlist = async (): Promise<ApiResponse<WishlistItem[]>> => {
  const response = await api.get<ApiResponse<WishlistItem[]>>("/wishlist");
  return response.data;
};

export const addToWishlist = async (starId: string): Promise<ApiResponse<WishlistItem[]>> => {
  const response = await api.post<ApiResponse<WishlistItem[]>>("/wishlist/add", { starId });
  return response.data;
};

export const removeFromWishlist = async (starId: string): Promise<ApiResponse<WishlistItem[]>> => {
  const response = await api.delete<ApiResponse<WishlistItem[]>>(`/wishlist/remove/${starId}`);
  return response.data;
};

// Orders
export const createOrder = async (orderData: OrderData): Promise<ApiResponse<Order>> => {
  const response = await api.post<ApiResponse<Order>>("/orders", orderData);
  return response.data;
};

export const getUserOrders = async (): Promise<ApiResponse<Order[]>> => {
  const response = await api.get<ApiResponse<Order[]>>("/orders");
  return response.data;
};

export const getOrderDetails = async (orderId: string): Promise<ApiResponse<Order>> => {
  const response = await api.get<ApiResponse<Order>>(`/orders/${orderId}`);
  return response.data;
};

export const updateOrderStatus = async (
  orderId: string,
  status: OrderStatus,
): Promise<ApiResponse<Order>> => {
  const response = await api.put<ApiResponse<Order>>(`/orders/${orderId}/update-status`, {
    status,
  });
  return response.data;
};

// Reviews
export const getReviewsForStar = async (starId: string): Promise<ApiResponse<Review[]>> => {
  const response = await api.get<ApiResponse<Review[]>>("/reviews", { params: { starId } });
  return response.data;
};

export const addReview = async (reviewData: {
  starId: string;
  rating: number;
  comment: string;
}): Promise<ApiResponse<Review>> => {
  const response = await api.post<ApiResponse<Review>>("/reviews/add", reviewData);
  return response.data;
};

export const updateReview = async (
  reviewId: string,
  reviewData: { rating?: number; comment?: string },
): Promise<ApiResponse<Review>> => {
  const response = await api.put<ApiResponse<Review>>(`/reviews/${reviewId}`, reviewData);
  return response.data;
};

export const deleteReview = async (reviewId: string): Promise<ApiResponse<null>> => {
  const response = await api.delete<ApiResponse<null>>(`/reviews/${reviewId}`);
  return response.data;
};

export default api;