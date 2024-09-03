import type { ReactNode } from "react";
import Slider from "react-slick";

interface HeroSectionProps {
  children?: ReactNode;
}

const HeroSection: React.FC<HeroSectionProps> = ({ children }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,  // Activation du mode fade
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
  };

  return (
    <section className="w-full h-[85vh] overflow-hidden relative">
      <Slider {...settings}>
        <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
          <img
            src="/assets/images/hero/1.jpg"
            alt="Constellations"
            className="w-full h-full object-cover hero-img-animate"
          />
        </div>
        <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
          <img
            src="/assets/images/hero/2.jpg"
            alt="Étoiles éclatantes"
            className="w-full h-full object-cover hero-img-animate"
          />
        </div>
        <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
          <img
            src="/assets/images/hero/3.jpg"
            alt="Adopter une étoile"
            className="w-full h-full object-cover hero-img-animate"
          />
        </div>
      </Slider>
      {children && (
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center transition-opacity duration-500">
          {children}
        </div>
      )}
    </section>
  );
};

export default HeroSection;
