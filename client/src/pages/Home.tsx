// client/src/pages/Home.tsx

import type React from "react";
import { Container, Header, Segment, Button, Grid, Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useFunFacts } from "../hooks/useFunFacts";
import { useLatestStars } from "../hooks/useLatestStars";
import StarCard from "../components/StarCard";
import "../styles/Home.css";

const Home: React.FC = () => {
  const currentFact = useFunFacts();
  const { stars, loading, error } = useLatestStars(6);

  console.log("Home render - stars:", stars);
  console.log("Home render - loading:", loading);
  console.log("Home render - error:", error);

  return (
    <Container className="main-content">
      <Header as="h1" textAlign="center" className="elegant-title main-title font-playwrite">
        Stella
      </Header>
      <Header as="h2" textAlign="center" className="subtitle font-roboto-slab">
        Illuminez votre vie
      </Header>

      <Segment className="blur-segment news-segment">
        <Header as="h3" className="font-roboto-slab">
          Nouveautés
        </Header>
        {loading && <p>Chargement des nouveautés...</p>}
        {error && <p>Erreur: {error}</p>}
        {!loading && !error && (
          <Card.Group itemsPerRow={3} stackable>
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
        <Button as={Link} to="/catalog" className="top-right-button">
          Voir le catalogue
        </Button>
      </Segment>

      <Grid columns={2} stackable>
        <Grid.Column>
          <Segment className="blur-segment about-segment">
            <Header as="h3" className="font-roboto-slab">
              Qui sommes-nous ?
            </Header>
            <div className="segment-content">
              <p>
                Bienvenue chez Stella, votre portail vers les étoiles. Fondée en 2024, notre mission
                est de rapprocher l'univers de chacun d'entre vous.
              </p>
            </div>
            <Button as={Link} to="/about" className="top-right-button">
              Voir plus
            </Button>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment className="blur-segment funfact-segment">
            <Header as="h3" className="font-roboto-slab">
              Le saviez-vous ?
            </Header>
            <div className="segment-content">
              <p>{currentFact}</p>
            </div>
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Home;
