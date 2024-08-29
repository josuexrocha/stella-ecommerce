// client/src/components/StarCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react';

interface StarCardProps {
  id: string;
  name: string;
  constellation: string;
  price: number;
}

const StarCard: React.FC<StarCardProps> = React.memo(({ id, name, constellation, price }) => {
  
  console.log("StarCard render:", { id, name, constellation, price });


  const imageName = name.toLowerCase().replace(/\s+/g, '');
  const imagePath = `/src/assets/images/stars/${imageName}.jpg`;

  return (
    <Card>
      <Image src={imagePath} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>{constellation}</Card.Meta>
        <Card.Description>
          <strong>{price.toFixed(2)} €</strong>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button as={Link} to={`/star/${id}`} primary fluid>
          Découvrir
        </Button>
      </Card.Content>
    </Card>
  );
});

export default StarCard;