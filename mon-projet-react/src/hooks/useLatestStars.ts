import { useEffect, useState } from "react";

interface Star {
  id: string;
  name: string;
  constellation: string;
  price: number;
}

export const useLatestStars = (limit = 4) => {
  const [stars, setStars] = useState<Star[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestStars = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/stars?limit=${limit}&sort=createdAt,desc`);
        if (!response.ok) throw new Error("Erreur lors du chargement des étoiles");
        const data = await response.json();
        setStars(data);
        setError(null);
      } catch (err) {
        setError("Impossible de charger les nouveautés pour le moment.");
        console.error("Erreur:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestStars();
  }, [limit]);

  return { stars, loading, error };
};
