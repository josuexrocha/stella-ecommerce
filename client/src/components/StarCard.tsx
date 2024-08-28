// client/src/components/StarCard.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'semantic-ui-react';

interface StarCardProps {
  id: string;
  name: string;
  constellation: string;
  price: number;
}

const StarCard: React.FC<StarCardProps> = React.memo(({ id, name, constellation, price }) => {
    return (
    <Card>
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>{constellation}</Card.Meta>
        <Card.Description>
          <strong>{price.toFixed(2)} €</strong>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button as={Link} to={`/star/${id}`} primary>
          Découvrir
        </Button>
      </Card.Content>
    </Card>
  );
});

export default StarCard;