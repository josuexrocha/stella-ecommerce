// client/src/types/index.ts

// User related types
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "client" | "admin";
}

export interface UserProfileData {
  firstName?: string;
  lastName?: string;
  email?: string;
}

// Star related types
export interface Star {
  id: string;
  name: string;
  constellation: string;
  description: string;
  magnitude: number;
  price: number;
  createdAt: string;
  distanceFromEarth: number;
  luminosity: number;
  mass: number;
}

// Order related types
export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export interface OrderItem {
  starId: string;
  quantity: number;
}

export interface OrderData {
  items: OrderItem[];
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: "credit_card" | "paypal" | "bank_transfer";
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

// Cart related types
export interface CartItem {
  id: string;
  starId: string;
  quantity: number;
  star: Star;
}

export interface Cart {
  id: string;
  userId: string;
  cartItems: CartItem[];
}

// Review related types
export interface Review {
  id: string;
  userId: string;
  starId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  user?: User;
}

// Wishlist related types
export interface WishlistItem {
  id: string;
  userId: string;
  starId: string;
  star: Star;
}

// API response types
export interface ApiResponse<T> {
  message: string;
  data: T;
}
