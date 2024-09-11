import type React from "react";
import { useInView } from "react-intersection-observer";

interface FadeInSectionProps {
  children: React.ReactNode;
  duration?: number;
  translateY?: number;
  customClass?: string;
}

const FadeInSection: React.FC<FadeInSectionProps> = ({
  children,
  duration = 1000,
  translateY = 10,
  customClass = "",
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`transition-all duration-${duration} ease-out transform ${
        inView ? "opacity-100 translate-y-0" : `opacity-0 translate-y-${translateY}px`
      } ${customClass}`}
    >
      {children}
    </div>
  );
};

export default FadeInSection;
