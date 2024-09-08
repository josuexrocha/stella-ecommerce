// client/src/hooks/useHeroPhrases.ts

import { useEffect, useState } from "react";

const heroPhrases = [
  "Illuminer votre vie.",
  "Parcourir les constellations et trouver la bonne étoile !",
  "Découvrez les plus éclatants : la splendeur à portée de clic !",
  "Adoptez une étoile voisine : votre coin de ciel personnalisé !",
];

export const useHeroPhrases = (interval = 10000) => {
  const [currentPhrase, setCurrentPhrase] = useState(heroPhrases[0]);
  const [fade, setFade] = useState(true); // Contrôle le fade in/fade out

  useEffect(() => {
    let currentIndex = 0;
    const updatePhrase = () => {
      setFade(false);
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % heroPhrases.length;
        setCurrentPhrase(heroPhrases[currentIndex]);
        setFade(true);
      }, 200);
    };

    const timer = setInterval(updatePhrase, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return { currentPhrase, fade };
};
