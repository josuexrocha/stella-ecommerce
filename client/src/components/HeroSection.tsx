import type React from "react";
import { Link } from "react-router-dom";

const HeroSection: React.FC = () => {
  return (
    <section className="bg-secondary text-text">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        <div className="relative flex items-center justify-center">
          <img
            src="/assets/images/hero/1.jpg"
            alt="Constellations"
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-end items-center text-left p-4">
            <h2 className="text-lg md:text-xl font-serif text-text mb-2">
              Parcourir les constellations et trouver la bonne étoile !
            </h2>
            <Link
              to="/catalog?filter=constellation"
              className="btn"
            >
              VOIR PLUS
            </Link>
          </div>
        </div>
        <div className="relative flex items-center justify-center">
          <img
            src="/assets/images/hero/2.jpg"
            alt="Étoiles éclatantes"
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-end items-center text-left p-4">
            <h2 className="text-lg md:text-xl font-serif text-text mb-2">
              Découvrez les plus éclatants : la splendeur à portée de clic !
            </h2>
            <Link
              to="/catalog?filter=eclatant"
              className="btn"
            >
              VOIR PLUS
            </Link>
          </div>
        </div>
        <div className="relative flex items-center justify-center">
          <img
            src="/assets/images/hero/3.jpg"
            alt="Adopter une étoile"
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-end items-center text-left p-4">
            <h2 className="text-lg md:text-xl font-serif text-text mb-2">
              Adoptez une étoile voisine : votre coin de ciel personnalisé !
            </h2>
            <Link
              to="/catalog?filter=voisin"
              className="btn"
            >
              VOIR PLUS
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;