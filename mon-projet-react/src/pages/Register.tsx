// src/pages/Register.tsx
import type React from "react";
import { Button, Container, Form, Header } from "semantic-ui-react";

const Register: React.FC = () => {
  return (
    <Container>
      <Header as="h1">Inscription</Header>
      <Form>
        <Form.Field>
          <label>Nom</label>
          <input placeholder="Nom" />
        </Form.Field>
        <Form.Field>
          <label>Prénom</label>
          <input placeholder="Prénom" />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input placeholder="Email" />
        </Form.Field>
        <Form.Field>
          <label>Mot de passe</label>
          <input type="password" placeholder="Mot de passe" />
        </Form.Field>
        <Button type="submit">S'inscrire</Button>
      </Form>
    </Container>
  );
};

export default Register;
