import type React from "react";
import HeroSection from "../components/HeroSection";
import StarCard from "../components/StarCard";
import { useLatestStars } from "../hooks/useLatestStars";
import { useFunFacts } from "../hooks/useFunFacts";

const Home: React.FC = () => {
  const { stars, loading, error } = useLatestStars(6);
  const currentFact = useFunFacts();

  return (
    <div className="pt-16">
      <div className="text-center mb-8">
        <h1 className="text-5xl md:text-6xl font-display mb-4">Stella</h1>
        <p className="text-lg md:text-2xl font-serif">Illuminez votre vie</p>
      </div>
      <HeroSection />

      {/* Section Nouveautés */}
      <section className="my-8 container mx-auto px-4">
        <h2 className="text-3xl font-display text-center mb-6">Nouveautés</h2>
        {loading && <p className="text-center text-text">Chargement des étoiles...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {stars.map((star) => (
              <StarCard key={star.id} star={star} />
            ))}
          </div>
        )}
      </section>

      {/* Section Qui sommes-nous ? */}
      <section className="my-8 container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-display mb-4">Qui sommes-nous ?</h2>
          <p className="text-lg font-serif">
            Chez Stella, nous sommes passionnés par les étoiles et leur capacité à inspirer des générations.
            Nous vous proposons une expérience unique : adopter une étoile et la personnaliser pour en faire un cadeau inoubliable.
            Notre mission est d'illuminer la vie de nos clients en leur offrant un morceau du ciel.
          </p>
        </div>
        <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center">
          <img
            src="/assets/images/astro.png"
            alt="Astronaute"
            className="w-3/4 md:w-full object-contain"
          />
        </div>
      </section>

      {/* Section Le saviez-vous ? */}
      <section className="my-8 container mx-auto px-4 p-4 bg-primary text-text rounded-md">
        <h2 className="text-2xl font-display mb-4">Le saviez-vous ?</h2>
        <p className="text-lg font-serif">{currentFact}</p>
      </section>

      {/* Section Rejoignez-nous */}
      <section className="my-8 bg-secondary text-text py-8 rounded-md text-center">
        <h2 className="text-3xl font-display mb-4">Rejoignez-nous</h2>
        <p className="text-lg font-serif mb-6">
          Rejoignez la communauté Stella pour être au courant des dernières nouveautés et événements
          autour des étoiles. Inscrivez-vous à notre newsletter et faites partie de notre univers.
        </p>
        <button type="button" className="btn">
          S'inscrire
        </button>
      </section>
    </div>
  );
};

export default Home;
