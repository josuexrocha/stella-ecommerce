// client/src/pages/Contact.tsx

import type React from "react";
import { Button, Container, Form, Header, Segment } from "semantic-ui-react";

const Contact: React.FC = () => {
  return (
    <Container>
      <Header as="h1">Contactez-nous</Header>
      <Segment>
        <p>
          Vous avez des questions sur nos services ou besoin d'informations supplémentaires ?
          N'hésitez pas à nous contacter. Notre équipe est là pour vous répondre.
        </p>
        <Form>
          <Form.Field>
            <label>Nom</label>
            <input placeholder="Votre nom" />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input type="email" placeholder="Votre email" />
          </Form.Field>
          <Form.Field>
            <label>Sujet</label>
            <input placeholder="Sujet de votre message" />
          </Form.Field>
          <Form.TextArea label="Message" placeholder="Votre message..." />
          <Button primary type="submit">
            Envoyer
          </Button>
        </Form>
      </Segment>
      <Segment>
        <Header as="h3">Autres moyens de nous contacter</Header>
        <p>Email : contact@stella.com</p>
        <p>Téléphone : +33 1 23 45 67 89</p>
        <p>Adresse : 123 Rue des Étoiles, 75000 Paris, France</p>
      </Segment>
    </Container>
  );
};

export default Contact;
