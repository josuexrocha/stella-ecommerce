// client/src/hooks/useLatestStars.ts

import { useState, useEffect } from "react";
import { fetchStars } from "../services/api";
import type { Star } from "../types/index";

export const useLatestStars = (limit = 6) => {
  const [stars, setStars] = useState<Star[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getStars = async () => {
      try {
        setLoading(true);
        const response = await fetchStars();
        console.log("API response:", response); // Ajoutez ceci
        if (Array.isArray(response.data)) {
          setStars(response.data.slice(0, limit));
        } else if (Array.isArray(response)) {
          setStars(response.slice(0, limit));
        } else {
          throw new Error("Unexpected response format");
        }
        setError(null);
        console.log("Stars set:", stars); // Et ceci après avoir set les étoiles
      } catch (err) {
        console.error("Erreur lors de la récupération des étoiles:", err);
        setError("Impossible de charger les nouveautés pour le moment.");
      } finally {
        setLoading(false);
      }
    };
    getStars();
  }, [limit]);

  return { stars, loading, error };
};
