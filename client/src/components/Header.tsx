import type React from "react";
import { Link } from "react-router-dom";
import { Container, Menu } from "semantic-ui-react";

const Header: React.FC = () => {
  return (
    <Menu inverted color="blue" fixed="top">
      <Container>
        <Menu.Item as={Link} to="/" header>
          Stella
        </Menu.Item>
        <Menu.Item as={Link} to="/">
          Accueil
        </Menu.Item>
        <Menu.Item as={Link} to="/catalog">
          Catalogue
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item as={Link} to="/login">
            Connexion
          </Menu.Item>
          <Menu.Item as={Link} to="/register">
            Inscription
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

export default Header;
