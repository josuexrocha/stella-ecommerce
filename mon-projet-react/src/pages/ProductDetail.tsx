import type React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Container, Header, Segment } from "semantic-ui-react";

interface Star {
  id: string;
  name: string;
  constellation: string;
  price: number;
  description: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [star, setStar] = useState<Star | null>(null);

  useEffect(() => {
    // Simuler un appel API pour charger les détails de l'étoile
    const fetchStarDetails = async () => {
      // Remplacez ceci par un vrai appel API plus tard
      const response = await fetch(`/api/stars/${id}`);
      const data = await response.json();
      setStar(data);
    };

    fetchStarDetails();
  }, [id]);

  if (!star) {
    return <Container>Chargement...</Container>;
  }

  return (
    <Container>
      <Header as="h1">{star.name}</Header>
      <Segment>
        <p>Constellation : {star.constellation}</p>
        <p>Prix : {star.price.toFixed(2)} €</p>
        <p>{star.description}</p>
        <Button primary>Ajouter au panier</Button>
      </Segment>
    </Container>
  );
};

export default ProductDetail;
