// client/src/pages/ProductDetail.tsx

import type React from "react";
import { useParams } from "react-router-dom";
import { useStarDetail } from "../hooks/useStarDetail";
import StarCard from "../components/StarCard";
import type { Star } from "../types";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Récupère l'ID de l'étoile à partir de l'URL
  const { star, relatedStars, loading, error } = useStarDetail(id); // Hook personnalisé pour récupérer les détails d'une étoile

  if (loading) {
    return <p className="text-center text-text">Chargement des détails de l'étoile...</p>;
  }

  if (error || !star) {
    return (
      <p className="text-center text-red-600">Erreur lors du chargement des détails de l'étoile.</p>
    );
  }

  // Assurez-vous que `price` est bien un nombre avant de l'utiliser
  const price = typeof star.price === "string" ? Number.parseFloat(star.price) : star.price;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start">
        {/* Image principale de l'étoile */}
        <div className="md:w-1/2">
          <img
            src={`/assets/images/stars/${star.name.toLowerCase().replace(/\s+/g, "")}.jpg`}
            alt={star.name}
            className="w-full h-auto object-cover rounded-md"
          />
        </div>

        {/* Détails de l'étoile */}
        <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
          <h1 className="text-4xl font-display mb-4">{star.name}</h1>
          <p className="text-lg font-serif mb-6">{star.description}</p>
          <ul className="text-lg font-serif mb-6">
            <li>
              <strong>Constellation :</strong> {star.constellation}
            </li>
            <li>
              <strong>Distance de la Terre :</strong> {star.distanceFromEarth} al
            </li>
            <li>
              <strong>Luminosité :</strong> {star.luminosity} L
            </li>
            <li>
              <strong>Magnitude :</strong> {star.magnitude}
            </li>
            <li>
              <strong>Masse :</strong> {star.mass} M
            </li>
          </ul>
          <p className="text-2xl font-bold mb-4">
            {price ? `${price.toFixed(2)} €` : "Prix non disponible"}
          </p>

          <div className="flex items-center space-x-4">
            <button type="button" className="btn">
              AJOUTER AU PANIER
            </button>
            <button type="button" className="text-primary">
              <i className="far fa-heart" />
            </button>
            <button type="button" className="text-primary">
              <i className="far fa-star" />
            </button>
          </div>
        </div>
      </div>

      {/* Section "Vous pouvez aimer aussi" */}
      <section className="mt-12">
        <h2 className="text-3xl font-display mb-6">Vous pouvez aimer aussi :</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedStars.map((relatedStar: Star) => (
            <StarCard key={relatedStar.id} star={relatedStar} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
