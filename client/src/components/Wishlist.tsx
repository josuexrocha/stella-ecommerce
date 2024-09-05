import { useState, useEffect } from "react";
import { getWishlist } from "../services/api"; // Fetch wishlist items from API
import type { WishlistItem } from "../types";

const Wishlist: React.FC = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const getWishlistItems = async () => {
      try {
        const response = await getWishlist(); // API call to fetch wishlist items
        setWishlistItems(response.data);
      } catch (error) {
        console.error("Error fetching wishlist items:", error);
      }
    };

    getWishlistItems();
  }, []);

  if (wishlistItems.length === 0) return <p>Votre liste d'envies est vide.</p>;

  return (
    <div>
      <ul>
        {wishlistItems.map(item => (
          <li key={item.id} className="border p-4 mb-2">
            {item.star.name} - {item.star.price}€
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;
