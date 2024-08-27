import type React from "react";
import { Card, Container, Header, Message } from "semantic-ui-react";
import StarCard from "../components/StarCard";
import { useFunFacts } from "../hooks/useFunFacts";
import { useLatestStars } from "../hooks/useLatestStars";

const Home: React.FC = () => {
  const currentFact = useFunFacts();
  const { stars, loading, error } = useLatestStars();

  return (
    <Container>
      <Header as="h1">Bienvenue chez Stella</Header>
      <p>Découvrez notre catalogue d'étoiles uniques.</p>

      <Message info>
        <Message.Header>Le saviez-vous ?</Message.Header>
        <p>{currentFact}</p>
      </Message>

      <Header as="h2">Nouveautés</Header>
      {loading && <p>Chargement des nouveautés...</p>}
      {error && <Message negative>{error}</Message>}
      {!loading && !error && (
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
      )}
    </Container>
  );
};

export default Home;
