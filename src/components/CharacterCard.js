import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const CharacterCard = ({ character, children }) => {
  return (
    <Card style={{ width: "11rem" }}>
      <Card.Img variant="top" src={character?.avatar} />
      <Card.Body>
        <Card.Title>{character?.name}</Card.Title>
        <Card.Text>Some quick example text to build.</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item
          className={
            character.health <= 20
              ? "card-description text-alert"
              : "card-description"
          }
        >
          Health: {character?.health}/
          {character?.maxHealth ? character.maxHealth : "???"}
        </ListGroup.Item>
        <ListGroup.Item>
          Mana: {character?.mana ? character.mana : "???"}
        </ListGroup.Item>
        <ListGroup.Item>
          Experience: {character.exp ? character.exp : 0}
        </ListGroup.Item>
        <ListGroup.Item>
          Strength: {character?.strength ? character.strength : "???"}
        </ListGroup.Item>
        <ListGroup.Item>
          Gold: {character?.gold ? character.gold : 0}
        </ListGroup.Item>
      </ListGroup>
      <Card.Body>
        {children}

        <br />
        <code>
          <small>{character?.id}</small>
        </code>
      </Card.Body>
    </Card>
  );
};

export default CharacterCard;
