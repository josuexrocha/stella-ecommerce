import type React from "react";
import { useEffect, useState } from "react";
import { Card, Container, Header } from "semantic-ui-react";
import StarCard from "../components/StarCard";

interface Star {
  id: string;
  name: string;
  constellation: string;
  price: number;
}

const Catalog: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    // Simuler un appel API pour charger les étoiles
    const fetchStars = async () => {
      // Remplacez ceci par un vrai appel API plus tard
      const response = await fetch("/api/stars");
      const data = await response.json();
      setStars(data);
    };

    fetchStars();
  }, []);

  return (
    <Container>
      <Header as="h1">Catalogue d'étoiles</Header>
      <Card.Group>
        {stars.map((star) => (
          <StarCard
            key={star.id}
            id={star.id}
            name={star.name}
            constellation={star.constellation}
            price={star.price}
          />
        ))}
      </Card.Group>
    </Container>
  );
};

export default Catalog;
