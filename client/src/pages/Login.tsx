// client/src/pages/Login.tsx

import type React from "react";
import { Button, Container, Form, Header } from "semantic-ui-react";

const Login: React.FC = () => {
  return (
    <Container>
      <Header as="h1">Connexion</Header>
      <Form>
        <Form.Field>
          <label>Email</label>
          <input placeholder="Email" />
        </Form.Field>
        <Form.Field>
          <label>Mot de passe</label>
          <input type="password" placeholder="Mot de passe" />
        </Form.Field>
        <Button type="submit">Se connecter</Button>
      </Form>
    </Container>
  );
};

export default Login;
