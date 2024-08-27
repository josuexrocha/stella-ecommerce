import { useEffect, useState } from "react";

const funFacts = [
  "La plus proche étoile de la Terre, après le Soleil, est Proxima Centauri, située à 4,2 années-lumière.",
  "Il y a plus d'étoiles dans l'univers que de grains de sable sur toutes les plages de la Terre.",
  "Certaines étoiles sont si grandes que si elles remplaçaient notre Soleil, elles engloberaient l'orbite de Jupiter.",
  "Les étoiles ne scintillent pas réellement, c'est l'atmosphère terrestre qui crée cette illusion.",
  "La couleur d'une étoile indique sa température : les étoiles bleues sont les plus chaudes, les rouges les plus froides.",
];

export const useFunFacts = (interval = 10000) => {
  const [currentFact, setCurrentFact] = useState(funFacts[0]);

  useEffect(() => {
    let currentIndex = 0;
    const updateFact = () => {
      currentIndex = (currentIndex + 1) % funFacts.length;
      setCurrentFact(funFacts[currentIndex]);
    };

    const timer = setInterval(updateFact, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return currentFact;
};
