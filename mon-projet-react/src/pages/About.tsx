// src/pages/About.tsx
import type React from "react";
import { Container, Header, Segment } from "semantic-ui-react";

const About: React.FC = () => {
  return (
    <Container>
      <Header as="h1">À propos de Stella</Header>
      <Segment>
        <p>
          Bienvenue chez Stella, votre portail vers les étoiles. Fondée en 2024, notre mission est
          de rapprocher l'univers de chacun d'entre vous.
        </p>
        <p>
          Chez Stella, nous croyons que chaque étoile raconte une histoire unique. Notre passion est
          de vous permettre de faire partie de cette histoire cosmique en vous offrant la
          possibilité de posséder votre propre étoile.
        </p>
        <p>
          Notre équipe d'astronomes passionnés travaille sans relâche pour cartographier le ciel
          nocturne et identifier les étoiles les plus fascinantes. Chaque étoile de notre catalogue
          est soigneusement sélectionnée pour sa beauté et son caractère unique.
        </p>
        <p>
          En choisissant Stella, vous ne faites pas qu'acheter une étoile - vous devenez gardien
          d'un morceau de l'univers, créant un lien éternel entre vous et le cosmos.
        </p>
      </Segment>
    </Container>
  );
};

export default About;
