import { useEffect, useState } from "react";

// Hook personnalisé pour surveiller le scroll et détecter si le h1 a disparu
export const usePageTitleOnScroll = () => {
  const [isTitleVisible, setIsTitleVisible] = useState(true);
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const h1Element = document.querySelector("h1");
      if (h1Element) {
        const rect = h1Element.getBoundingClientRect();
        const isVisible = rect.top > 0 && rect.bottom < window.innerHeight;
        setIsTitleVisible(isVisible);
        if (!isVisible) {
          setPageTitle(h1Element.textContent || "");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { isTitleVisible, pageTitle };
};
