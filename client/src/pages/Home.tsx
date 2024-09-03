import { useState, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import StarCard from "../components/StarCard";
import { useLatestStars } from "../hooks/useLatestStars";
import { useFunFacts } from "../hooks/useFunFacts";

const Home: React.FC = () => {
  const { stars, loading, error } = useLatestStars(6);
  const currentFact = useFunFacts();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <HeroSection>
        <div
          className={`absolute inset-0 flex flex-col justify-center items-center text-center transition-opacity duration-500 ${
            scrolled ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <h1 className="text-5xl md:text-6xl font-display mb-4 text-text h1-neon">Stella</h1>
          <p className="text-lg md:text-2xl font-serif text-text">Illuminez votre vie</p>
          <a href="/catalog" className="btn mt-4">
            Voir notre catalogue
          </a>
        </div>
      </HeroSection>

      {/* Section Nouveautés */}
      <section className="my-8 bg-primary text-text py-8 text-center">
        <h2 className="text-3xl font-display text-center my-6">Nouveautés</h2>
        {loading && <p className="text-center text-text">Chargement des étoiles...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        {!loading && !error && (
          <div className="relative pl-6 pt-2">
            <div className="flex overflow-x-auto pb-6 space-x-6 scrollbar-thumb-rounded scrollbar-thin scrollbar-thumb-gray-400">
              {stars.slice(0, 10).map((star) => (
                <div key={star.id} className="min-w-[200px]">
                  <StarCard star={star} />
                </div>
              ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-transparent" />
          </div>
        )}
      </section>

      {/* Section Qui sommes-nous ? */}
      <section className="my-8 container mx-auto px-4 py-6">
        <h2 className="text-3xl font-display mb-8 text-center text-text">Qui sommes-nous ?</h2>
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
            <img
              src="/assets/images/astro.png"
              alt="Astronaute"
              className="w-2/3 md:w-full object-contain h-[200px] md:h-[300px]" // Réduction de la hauteur
            />
          </div>
          <div className="md:w-2/3 md:pl-6 text-center md:text-left">
            <p className="text-lg font-serif text-text">
              Chez Stella, nous sommes passionnés par les étoiles et leur capacité à inspirer des
              générations. Nous vous proposons une expérience unique : adopter une étoile et la
              personnaliser pour en faire un cadeau inoubliable. Notre mission est d'illuminer la
              vie de nos clients en leur offrant un morceau du ciel.
            </p>
            <button type="button" className="btn mt-4">
              <a href="/about">Voir plus</a>
            </button>
          </div>
        </div>
      </section>

      {/* Section Le saviez-vous ? */}
      <section className="my-8 bg-primary text-text py-8 text-center">
        <h2 className="text-3xl font-display mb-4">Le saviez-vous ?</h2>
        <p className="text-lg font-serif mx-8">{currentFact}</p>
      </section>

      {/* Section Rejoignez-nous */}
      <section className="my-8 bg-secondary text-text py-8 text-center">
        <h2 className="text-3xl font-display mb-4">Rejoignez-nous</h2>
        <p className="text-lg font-serif m-6">
          Rejoignez la communauté Stella pour être au courant des dernières nouveautés et événements
          autour des étoiles. Inscrivez-vous à notre newsletter et faites partie de notre univers.
        </p>
        <button type="button" className="btn">
          <a href="/auth">S'inscrire</a>
        </button>
      </section>
    </div>
  );
};

export default Home;
