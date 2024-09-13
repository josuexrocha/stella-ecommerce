// client/src/components/StarCard.tsx
import { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaArrowLeft } from "react-icons/fa"; // Import des icônes supplémentaires
import AddToCartButton from "../components/AddToCartButton";
import AddToWishlistButton from "../components/AddToWishlistButton";
import FadeInSection from "./FadeInSection";
import type { Star } from "../types";

interface StarCardProps {
  star: Star;
  showAddToCartButton?: boolean;
  isDetailedView?: boolean;
}

const StarCard: React.FC<StarCardProps> = ({
  star,
  showAddToCartButton = true,
  isDetailedView = false,
}) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Cela fait revenir l'utilisateur à la page précédente
  };

  return (
    <FadeInSection>
      <div
        className={`bg-secondary text-text rounded-lg shadow-lg flex ${
          isDetailedView ? "md:flex-row" : "flex-col"
        } h-full`}
      >
        <img
          src={`/assets/images/stars/${star.name.toLowerCase().replace(/\s+/g, "")}.jpg`}
          alt={star.name}
          className={`w-full ${isDetailedView ? "md:w-1/2" : "h-48"} object-cover`}
        />
        <div className={`p-4 flex-grow ${isDetailedView ? "md:pl-8" : ""}`}>
          <h2 className="text-xl font-serif mb-2">{star.name}</h2>

          {isDetailedView ? (
            <>
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
            </>
          ) : (
            <p className="text-sm mb-4">{star.description}</p>
          )}

          <span className="text-lg font-semibold">{star.price} €</span>

          {/* Barre de boutons */}
          <div className="flex mt-4">
            {isDetailedView ? (
              <button type="button" onClick={handleBackClick} className="btn mt-2">
                <FaArrowLeft className="text-xl" />
                <span className="sr-only">Retour</span>
              </button>
            ) : (
              <Link to={`/star/${star.starid}`} className="btn mt-2">
                <FaEye className="text-xl" />
                <span className="sr-only">Découvrir</span>
              </Link>
            )}

            {showAddToCartButton && <AddToCartButton starId={star.starid} />}
            <AddToWishlistButton starId={star.starid} />
          </div>
        </div>
      </div>
    </FadeInSection>
  );
};

export default memo(StarCard);
