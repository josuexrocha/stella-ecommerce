// client/src/components/Footer.tsx

import type React from "react";
import { Container, Segment } from "semantic-ui-react";
import "../styles/Footer.css";

const Footer: React.FC = () => {
  return (
    <Segment
      inverted
      vertical
      className="blur-background"
      style={{ padding: "2em 0em", marginTop: "auto" }}
    >
      <Container textAlign="center">© 2024 Stella. Tous droits réservés.</Container>
    </Segment>
  );
};

export default Footer;
