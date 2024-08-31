import type React from "react";
import { Link } from "react-router-dom"; // Utilisé pour la navigation vers le catalogue

const HeroSection: React.FC = () => {
  return (
    <section className="bg-secondary text-text py-8 md:py-16">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-display mb-4">Stella</h1>
        <p className="text-lg md:text-2xl font-serif mb-8">Illuminez votre vie</p>
      </div>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Première image avec titre et bouton */}
        <div className="relative">
          <img src="/assets/images/1.jpg" alt="Constellations" className="w-full h-48 object-cover rounded-md" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center rounded-md">
            <h2 className="text-lg md:text-xl font-serif text-white mb-4">Parcourir les constellations et trouver la bonne étoile !</h2>
            <Link to="/catalog?filter=constellation" className="btn">VOIR PLUS</Link>
          </div>
        </div>
        {/* Deuxième image avec titre et bouton */}
        <div className="relative">
          <img src="/assets/images/2.jpg" alt="Étoiles éclatantes" className="w-full h-48 object-cover rounded-md" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center rounded-md">
            <h2 className="text-lg md:text-xl font-serif text-white mb-4">Découvrez les plus éclatantes : la splendeur à portée de clic !</h2>
            <Link to="/catalog?filter=eclatant" className="btn">VOIR PLUS</Link>
          </div>
        </div>
        {/* Troisième image avec titre et bouton */}
        <div className="relative">
          <img src="/assets/images/3.jpg" alt="Adopter une étoile" className="w-full h-48 object-cover rounded-md" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center rounded-md">
            <h2 className="text-lg md:text-xl font-serif text-white mb-4">Adoptez une étoile voisine : votre coin de ciel personnalisé !</h2>
            <Link to="/catalog?filter=voisin" className="btn">VOIR PLUS</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
