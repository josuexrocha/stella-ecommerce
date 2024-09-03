// client/src/hooks/useHeroPhrases.ts

import { useEffect, useState } from "react";

const heroPhrases = [
  "Illuminer votre vie.",
  "Parcourir les constellations et trouver la bonne étoile !",
  "Découvrez les plus éclatants : la splendeur à portée de clic !",
  "Adoptez une étoile voisine : votre coin de ciel personnalisé !",
];

export const useHeroPhrases = (interval = 7000) => {
  // Interval augmenté pour plus de temps à l'écran
  const [currentPhrase, setCurrentPhrase] = useState(heroPhrases[0]);
  const [fade, setFade] = useState(true); // Etat pour gérer l'opacité et les transitions

  useEffect(() => {
    let currentIndex = 0;
    const updatePhrase = () => {
      setFade(false); // Commence la transition de disparition
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % heroPhrases.length;
        setCurrentPhrase(heroPhrases[currentIndex]);
        setFade(true); // Fait apparaître la nouvelle phrase
      }, 500); // Temps de transition
    };

    const timer = setInterval(updatePhrase, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return { currentPhrase, fade };
};
