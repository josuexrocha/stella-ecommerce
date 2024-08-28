// client/src/components/Header.tsx

import type React from "react";
import { Link } from "react-router-dom";
import { Menu, Container } from "semantic-ui-react";
import "../styles/Header.css";

const Header: React.FC = () => {
  return (
    <Menu inverted fixed="top" className="custom-header">
      <Container>
        <Menu.Item as={Link} to="/" header>
          Stella
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item as={Link} to="/catalog">
            Catalogue
          </Menu.Item>
          <Menu.Item as={Link} to="/register">
            S'inscrire
          </Menu.Item>
          <Menu.Item as={Link} to="/login">
            Se connecter
          </Menu.Item>
          <Menu.Item as={Link} to="/faq">
            FAQ
          </Menu.Item>
          <Menu.Item as={Link} to="/about">
            Qui sommes-nous ?
          </Menu.Item>
          <Menu.Item as={Link} to="/contact">
            Contact
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

export default Header;
