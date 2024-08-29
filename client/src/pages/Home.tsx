// client/src/pages/Home.tsx

import type React from "react";
import { Container, Header, Segment, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useFunFacts } from '../hooks/useFunFacts';
import '../styles/Home.css';

const Home: React.FC = () => {
  const currentFact = useFunFacts();

  return (
    <Container className="main-content">
      <Header as="h1" textAlign="center" className="elegant-title main-title font-playwrite">Stella</Header>
      <Header as="h2" textAlign="center" className="subtitle font-roboto-slab">Illuminez votre vie</Header>

      <Segment className="blur-segment">
        <Header as="h3" className="font-roboto-slab">Nouveautés</Header>

        <Button as={Link} to="/catalog">Voir le catalogue</Button>
      </Segment>

      <Segment className="blur-segment">
        <Header as="h3" className="font-roboto-slab">Qui sommes-nous ?</Header>
        <p>
          Bienvenue chez Stella, votre portail vers les étoiles. Fondée en 2024, notre mission est
          de rapprocher l'univers de chacun d'entre vous.
        </p>
        <Button as={Link} to="/about">Voir plus</Button>
      </Segment>

      <Segment className="blur-segment">
        <Header as="h3" className="font-roboto-slab">Le saviez-vous ?</Header>
        <p>{currentFact}</p>
      </Segment>
    </Container>
  );
};

export default Home;