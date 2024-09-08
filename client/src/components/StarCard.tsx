import type React from "react";
import { Link } from "react-router-dom";
import type { Star } from "../types";
import FadeInSection from "./FadeInSection";

interface StarCardProps {
  star: Star;
}

const StarCard: React.FC<StarCardProps> = ({ star }) => {
  const price = typeof star.price === "string" ? Number.parseFloat(star.price) : star.price;

  return (
    <FadeInSection>
      <div className="bg-secondary text-text rounded-lg shadow-lg overflow-hidden flex flex-col h-full transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
        <img
          src={`/assets/images/stars/${star.name.toLowerCase().replace(/\s+/g, "")}.jpg`}
          alt={star.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4 flex flex-col flex-grow">
          <h2 className="text-xl font-serif mb-2">{star.name}</h2>
          <p className="text-sm mb-4 flex-grow">{star.description}</p>
          <div className="mt-auto">
            <span className="text-lg font-semibold block">
              {price ? `${price.toFixed(2)} €` : "N/A"}
            </span>
            <Link to={`/star/${star.starid}`} className="btn text-center mt-2 block">
              Découvrir
            </Link>
          </div>
        </div>
      </div>
    </FadeInSection>
  );
};

export default StarCard;
