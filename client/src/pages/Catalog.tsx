import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import StarCard from "../components/StarCard";
import { fetchStars } from "../services/api";
import type { Star } from "../types";

const Catalogue: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [filteredStars, setFilteredStars] = useState<Star[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [_page, setPage] = useState(1);

  // État des filtres
  const [isAlphabetical, setIsAlphabetical] = useState<boolean | null>(null);
  const [priceOrder, setPriceOrder] = useState<"asc" | "desc" | null>(null);
  const [selectedConstellations, setSelectedConstellations] = useState<string[]>([]);
  const [distanceOrder, setDistanceOrder] = useState<"asc" | "desc" | null>(null);
  const [luminosityOrder, setLuminosityOrder] = useState<"asc" | "desc" | null>(null);
  const [massOrder, setMassOrder] = useState<"asc" | "desc" | null>(null);

  useEffect(() => {
    loadMoreStars();
  }, []);

  useEffect(() => {
    applyFiltersAndSorting();
  }, [stars, isAlphabetical, priceOrder, selectedConstellations, distanceOrder, luminosityOrder, massOrder]);

  const loadMoreStars = async () => {
    const newStars = await fetchStars(); 
    const updatedStars = [...stars, ...newStars.data];
    setStars(updatedStars);
    setHasMore(newStars.data.length > 0);
    setPage((prevPage) => prevPage + 1);
  };

  const applyFiltersAndSorting = () => {
    let filtered = [...stars];

    // Tri alphabétique
    if (isAlphabetical !== null) {
      filtered.sort((a, b) => isAlphabetical ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
    }

    // Filtrage par constellations
    if (selectedConstellations.length > 0) {
      filtered = filtered.filter(star => selectedConstellations.includes(star.constellation));
    }

    // Tri par prix
    if (priceOrder !== null) {
      filtered.sort((a, b) => priceOrder === "asc" ? a.price - b.price : b.price - a.price);
    }

    // Tri par distance
    if (distanceOrder !== null) {
      filtered.sort((a, b) => distanceOrder === "asc" ? a.distance - b.distance : b.distance - a.distance);
    }

    // Tri par luminosité
    if (luminosityOrder !== null) {
      filtered.sort((a, b) => luminosityOrder === "asc" ? a.luminosity - b.luminosity : b.luminosity - a.luminosity);
    }

    // Tri par masse
    if (massOrder !== null) {
      filtered.sort((a, b) => massOrder === "asc" ? a.mass - b.mass : b.mass - a.mass);
    }

    setFilteredStars(filtered);
  };

  // Gestion du basculement des filtres
  const toggleAlphabeticalOrder = () => {
    setIsAlphabetical(prev => prev === null ? true : !prev);
  };

  const cycleOrder = (currentOrder: "asc" | "desc" | null, setOrder: (order: "asc" | "desc" | null) => void) => {
    setOrder(currentOrder === "asc" ? "desc" : currentOrder === "desc" ? null : "asc");
  };

  const togglePriceOrder = () => cycleOrder(priceOrder, setPriceOrder);
  const toggleDistanceOrder = () => cycleOrder(distanceOrder, setDistanceOrder);
  const toggleLuminosityOrder = () => cycleOrder(luminosityOrder, setLuminosityOrder);
  const toggleMassOrder = () => cycleOrder(massOrder, setMassOrder);

  const toggleConstellation = (constellation: string) => {
    setSelectedConstellations(prev =>
      prev.includes(constellation)
        ? prev.filter(c => c !== constellation)
        : [...prev, constellation]
    );
  };

  return (
    <div className="container mx-auto pt-12 px-4">
      <section className="my-8">
        <div className="flex justify-center items-center mb-6">
          <h1 className="text-4xl font-display">Catalogue</h1>
          <span className="ml-4 text-lg font-serif text-text animate-pulse">
            Illuminez votre vie
          </span>
        </div>

        <div className="flex justify-center space-x-4 mb-8">
          <button
            type="button"
            className={`btn-filter ${isAlphabetical !== null ? "active-filter" : ""}`}
            onClick={toggleAlphabeticalOrder}
          >
            {isAlphabetical ? "A-Z" : "Z-A"}
          </button>
          <button
            type="button"
            className={`btn-filter ${priceOrder ? "active-filter" : ""}`}
            onClick={togglePriceOrder}
          >
            {priceOrder === "asc" ? "Prix ⬆" : priceOrder === "desc" ? "Prix ⬇" : "Prix"}
          </button>
          <button
            type="button"
            className={`btn-filter ${selectedConstellations.length > 0 ? "active-filter" : ""}`}
            onClick={() => toggleConstellation("Orion")}
          >
            Constellations {selectedConstellations.includes("Orion") && "✔"}
          </button>
          <button
            type="button"
            className={`btn-filter ${distanceOrder ? "active-filter" : ""}`}
            onClick={toggleDistanceOrder}
          >
            {distanceOrder === "asc" ? "Distance ⬆" : distanceOrder === "desc" ? "Distance ⬇" : "Distance"}
          </button>
          <button
            type="button"
            className={`btn-filter ${luminosityOrder ? "active-filter" : ""}`}
            onClick={toggleLuminosityOrder}
          >
            {luminosityOrder === "asc" ? "Luminosité ⬆" : luminosityOrder === "desc" ? "Luminosité ⬇" : "Luminosité"}
          </button>
          <button
            type="button"
            className={`btn-filter ${massOrder ? "active-filter" : ""}`}
            onClick={toggleMassOrder}
          >
            {massOrder === "asc" ? "Taille ⬆" : massOrder === "desc" ? "Taille ⬇" : "Taille"}
          </button>
        </div>

        <InfiniteScroll
          dataLength={filteredStars.length}
          next={loadMoreStars}
          hasMore={hasMore}
          loader={<h4>Chargement...</h4>}
          endMessage={<p className="text-center">Vous avez tout vu !</p>}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredStars.map((star: Star) => (
              <StarCard key={star.id} star={star} />
            ))}
          </div>
        </InfiniteScroll>
      </section>
    </div>
  );
};

export default Catalogue;
