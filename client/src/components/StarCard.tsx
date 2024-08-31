import type React from "react";
import type { Star } from "../types";

interface StarCardProps {
  star: Star;
}

const StarCard: React.FC<StarCardProps> = ({ star }) => {
  const price = typeof star.price === "number" ? star.price.toFixed(2) : "N/A";

  return (
    <div className="bg-secondary text-text rounded-lg shadow-lg overflow-hidden">
      <img
        src={`/assets/images/stars/${star.name.toLowerCase().replace(/\s+/g, "")}.jpg`}
        alt={star.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-serif mb-2">{star.name}</h2>
        <p className="text-sm mb-4">{star.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">{price} €</span>
          <a href="/" className="text-primary hover:underline">
            Découvrir
          </a>
        </div>
      </div>
    </div>
  );
};

export default StarCard;
