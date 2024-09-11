import { memo } from "react";
import { Link } from "react-router-dom";
import type { Star } from "../types";
import FadeInSection from "./FadeInSection";
import AddToCartButton from "../components/AddToCartButton";

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
  return (
    <FadeInSection>
      <div
        className={`bg-secondary text-text rounded-lg shadow-lg flex ${isDetailedView ? "md:flex-row" : "flex-col"} h-full`}
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
          <Link to={`/star/${star.starid}`} className="btn mt-2 block">
            {isDetailedView ? "Retour au catalogue" : "Découvrir"}
          </Link>

          {showAddToCartButton && <AddToCartButton starId={star.starid} />}
        </div>
      </div>
    </FadeInSection>
  );
};

export default memo(StarCard);
