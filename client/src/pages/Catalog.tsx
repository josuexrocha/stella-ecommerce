import { useState, useEffect } from "react";
import StarCard from "../components/StarCard";
import { fetchStars } from "../services/api";
import type { Star } from "../types";

const Catalogue: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [filteredStars, setFilteredStars] = useState<Star[]>([]);

  const [isAlphabetical, setIsAlphabetical] = useState<boolean | null>(null);
  const [priceOrder, setPriceOrder] = useState<"asc" | "desc" | null>(null);
  const [selectedConstellations, setSelectedConstellations] = useState<string[]>([]);
  const [distanceOrder, setDistanceOrder] = useState<"asc" | "desc" | null>(null);
  const [luminosityOrder, setLuminosityOrder] = useState<"asc" | "desc" | null>(null);
  const [massOrder, setMassOrder] = useState<"asc" | "desc" | null>(null);

  const [showConstellationFilter, setShowConstellationFilter] = useState(false);

  // Obtenir les constellations uniques à partir des étoiles
  const uniqueConstellations = Array.from(new Set(stars.map((star) => star.constellation)));

  useEffect(() => {
    loadAllStars();
  }, []);

  useEffect(() => {
    applyFiltersAndSorting();
  }, [
    stars,
    isAlphabetical,
    priceOrder,
    selectedConstellations,
    distanceOrder,
    luminosityOrder,
    massOrder,
  ]);

  const loadAllStars = async () => {
    const response = await fetchStars();
    setStars(response.data);
  };

  const applyFiltersAndSorting = () => {
    let filtered = [...stars];

    // Tri alphabétique
    if (isAlphabetical !== null) {
      filtered.sort((a, b) =>
        isAlphabetical ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
      );
    }

    // Filtrage par constellations
    if (selectedConstellations.length > 0) {
      filtered = filtered.filter((star) => selectedConstellations.includes(star.constellation));
    }

    // Tri par prix
    if (priceOrder !== null) {
      filtered.sort((a, b) => (priceOrder === "asc" ? a.price - b.price : b.price - a.price));
    }

    // Tri par distance
    if (distanceOrder !== null) {
      filtered.sort((a, b) =>
        distanceOrder === "asc"
          ? a.distanceFromEarth - b.distanceFromEarth
          : b.distanceFromEarth - a.distanceFromEarth,
      );
    }

    // Tri par luminosité
    if (luminosityOrder !== null) {
      filtered.sort((a, b) =>
        luminosityOrder === "asc" ? a.luminosity - b.luminosity : b.luminosity - a.luminosity,
      );
    }

    // Tri par masse
    if (massOrder !== null) {
      filtered.sort((a, b) => (massOrder === "asc" ? a.mass - b.mass : b.mass - a.mass));
    }

    setFilteredStars(filtered);
  };

  // Gestion du basculement des filtres
  const toggleAlphabeticalOrder = () => {
    setIsAlphabetical((prev) => (prev === true ? false : prev === false ? null : true));
  };

  const cycleOrder = (
    currentOrder: "asc" | "desc" | null,
    setOrder: (order: "asc" | "desc" | null) => void,
  ) => {
    setOrder(currentOrder === "asc" ? "desc" : currentOrder === "desc" ? null : "asc");
  };

  const togglePriceOrder = () => cycleOrder(priceOrder, setPriceOrder);
  const toggleDistanceOrder = () => cycleOrder(distanceOrder, setDistanceOrder);
  const toggleLuminosityOrder = () => cycleOrder(luminosityOrder, setLuminosityOrder);
  const toggleMassOrder = () => cycleOrder(massOrder, setMassOrder);

  const toggleConstellation = (constellation: string) => {
    setSelectedConstellations((prev) =>
      prev.includes(constellation)
        ? prev.filter((c) => c !== constellation)
        : [...prev, constellation],
    );
  };

  const handleConstellationFilterToggle = () => {
    setShowConstellationFilter((prev) => !prev);
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
            {isAlphabetical === null ? "A-Z" : isAlphabetical ? "A-Z" : "Z-A"}
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
            onClick={handleConstellationFilterToggle}
          >
            Constellations
          </button>
          <button
            type="button"
            className={`btn-filter ${distanceOrder ? "active-filter" : ""}`}
            onClick={toggleDistanceOrder}
          >
            {distanceOrder === "asc"
              ? "Distance ⬆"
              : distanceOrder === "desc"
                ? "Distance ⬇"
                : "Distance"}
          </button>
          <button
            type="button"
            className={`btn-filter ${luminosityOrder ? "active-filter" : ""}`}
            onClick={toggleLuminosityOrder}
          >
            {luminosityOrder === "asc"
              ? "Luminosité ⬆"
              : luminosityOrder === "desc"
                ? "Luminosité ⬇"
                : "Luminosité"}
          </button>
          <button
            type="button"
            className={`btn-filter ${massOrder ? "active-filter" : ""}`}
            onClick={toggleMassOrder}
          >
            {massOrder === "asc" ? "Taille ⬆" : massOrder === "desc" ? "Taille ⬇" : "Taille"}
          </button>
        </div>

        {showConstellationFilter && (
          <div className="bg-background-inverse border border-primary rounded-lg shadow-lg p-4 mb-4">
            <h4 className="text-md font-serif mb-3 text-text">Sélectionnez les constellations :</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {uniqueConstellations.map((constellation) => (
                <div key={constellation} className="flex items-center">
                  <input
                    type="checkbox"
                    id={constellation}
                    checked={selectedConstellations.includes(constellation)}
                    onChange={() => toggleConstellation(constellation)}
                    className="mr-2 h-3 w-3 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label htmlFor={constellation} className="text-sm text-text">
                    {constellation}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredStars.length > 0 ? (
            filteredStars.map((star: Star) => <StarCard key={star.id} star={star} />)
          ) : (
            <p className="text-center text-text">Aucune étoile trouvée selon ces critères...</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Catalogue;
