import type { ReactNode } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/parallax';
import Parallax from 'swiper';

interface HeroSectionProps {
  children?: ReactNode;
}

const HeroSection: React.FC<HeroSectionProps> = ({ children }) => {
  const images = [
    '/assets/images/hero/1.jpg',
    '/assets/images/hero/2.jpg',
    '/assets/images/hero/3.jpg',
  ];

  return (
    <section className="w-full h-screen overflow-hidden relative">
      <Swiper
        modules={[Parallax]}
        parallax={true}
        speed={600}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000 }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="h-screen w-full relative">
              <div
                className="parallax-bg"
                style={{ backgroundImage: `url(${image})` }}
                data-swiper-parallax="-30%"
              />
              {/* Overlay gris */}
              <div className="absolute inset-0 bg-black opacity-50" />
              {/* Contenu */}
              {index === 0 && (
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
                  {children}
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSection;
