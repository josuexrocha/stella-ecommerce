import type React from "react";
import StarCard from "../components/StarCard";
import { useLatestStars } from "../hooks/useLatestStars";
import type { Star } from "../types";

const Catalogue: React.FC = () => {
  const { stars, loading, error } = useLatestStars(12); // Récupération des 12 dernières étoiles

  return (
    <div className="container mx-auto px-4">
      <section className="my-8">
        <div className="flex justify-center items-center mb-6">
          <h1 className="text-4xl font-display">Catalogue des Étoiles</h1>
          <span className="ml-4 text-lg font-serif text-primary animate-pulse">
            Illuminez votre vie
          </span>
        </div>

        {/* Filtres sous forme de boutons */}
        <div className="flex justify-center space-x-4 mb-8">
          <button type="button" className="btn">Toutes</button>
          <button type="button"className="btn">Constellations</button>
          <button type="button"className="btn">Étoiles Éclatantes</button>
          <button type="button"className="btn">Étoiles Voisines</button>
          {/* Ajoutez d'autres filtres si nécessaire */}
        </div>

        {loading && <p className="text-center text-text">Chargement des étoiles...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {stars.map((star: Star) => (
              <StarCard key={star.id} star={star} />
            ))}
          </div>
        )}

        {/* Pagination Section */}
        <div className="flex justify-center mt-8">
          <button type="button"className="btn mx-2">Précédent</button>
          <button type="button"className="btn mx-2">Suivant</button>
        </div>
      </section>
    </div>
  );
};

export default Catalogue;
