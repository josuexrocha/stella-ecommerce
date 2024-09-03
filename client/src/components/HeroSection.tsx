import type { MouseEventHandler, KeyboardEventHandler } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

// Interface pour les propriétés de flèches
interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

// Composant pour la flèche suivante
const SampleNextArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => {
  const handleKeyUp: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      onClick?.(event as unknown as React.MouseEvent<HTMLDivElement, MouseEvent>);
    }
  };

  return (
    <div
      className={className}
      style={{ ...style, display: "block", right: "10px", zIndex: 1 }}
      onClick={onClick}
      onKeyUp={handleKeyUp}
      role="button"
      tabIndex={0}
    />
  );
};

// Composant pour la flèche précédente
const SamplePrevArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => {
  const handleKeyUp: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      onClick?.(event as unknown as React.MouseEvent<HTMLDivElement, MouseEvent>);
    }
  };

  return (
    <div
      className={className}
      style={{ ...style, display: "block", left: "10px", zIndex: 1 }}
      onClick={onClick}
      onKeyUp={handleKeyUp}
      role="button"
      tabIndex={0}
    />
  );
};

// Interface pour les propriétés de HeroSection
interface HeroSectionProps {
  children?: React.ReactNode;
}

// Composant HeroSection avec un carousel
const HeroSection: React.FC<HeroSectionProps> = ({ children }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // Augmenté à 5 secondes
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <section className="w-full h-screen overflow-hidden relative">
      <Slider {...settings}>
        <div className="relative w-full h-screen flex items-center justify-between flex-col">
          <img
            src="/assets/images/hero/1.jpg"
            alt="Constellations"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center text-left p-4 pt-[70vh]">
            <h2 className="text-lg md:text-xl font-serif text-text mb-2">
              Parcourir les constellations et trouver la bonne étoile !
            </h2>
            <Link to="/catalog?filter=constellation" className="btn">
              Voir plus
            </Link>
          </div>
        </div>
        <div className="relative w-full h-screen flex items-center justify-between flex-col">
          <img
            src="/assets/images/hero/2.jpg"
            alt="Étoiles éclatantes"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center text-left p-4 pt-[70vh]">
            <h2 className="text-lg md:text-xl font-serif text-text mb-2">
              Découvrez les plus éclatants : la splendeur à portée de clic !
            </h2>
            <Link to="/catalog?filter=eclatant" className="btn">
              Voir plus
            </Link>
          </div>
        </div>
        <div className="relative w-full h-screen flex items-center justify-between flex-col">
          <img
            src="/assets/images/hero/3.jpg"
            alt="Adopter une étoile"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center text-left p-4 pt-[70vh]">
            <h2 className="text-lg md:text-xl font-serif text-text mb-2">
              Adoptez une étoile voisine : votre coin de ciel personnalisé !
            </h2>
            <Link to="/catalog?filter=voisin" className="btn">
              Voir plus
            </Link>
          </div>
        </div>
      </Slider>
      {children && (
        <div className="absolute inset-0 flex flex-col justify-between items-center text-center transition-opacity duration-500">
          {children}
        </div>
      )}
    </section>
  );
};

export default HeroSection;
