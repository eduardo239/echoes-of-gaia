import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { PlayerContext } from "../hook/PlayerContext";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const CardItem = ({ type = null, item }) => {
  const { character, setCharacter, inventory, setInventory, gift, setGift } =
    useContext(PlayerContext);

  const useItem = () => {
    if (item.type === "heal") {
      // valida a quantidade máxima de vida, para não ultrapassar o limite
      if (character.health + item.value < character.maxHealth) {
        setCharacter({ ...character, health: character.health + item.value });
      } else {
        setCharacter({ ...character, health: character.maxHealth });
      }
    } else if (item.type === "mana") {
      // valida a quantidade máxima de vida, para não ultrapassar o limite
      if (character.mana + item.value < character.maxMana) {
        setCharacter({ ...character, mana: character.mana + item.value });
      } else {
        setCharacter({ ...character, mana: character.maxMana });
      }
    } else if (item.type === "poison") {
      setCharacter({ ...character, strength: character.strength + item.value });
    } else if (item.type === "gold") {
      setCharacter({ ...character, gold: character.gold + item.value });
    } else if (item.type === "gem") {
      setCharacter({ ...character, gold: character.gold + item.value });
    }
    // remove o item da lista
    const updatedList = inventory.filter((x) => x.id !== item.id);
    setInventory(updatedList);
  };

  const buyItem = () => {
    if (character.gold > item.price) {
      const purchasedItem = { ...item };
      purchasedItem.id = uuidv4();
      setInventory([...inventory, purchasedItem]);
      setCharacter({ ...character, gold: character.gold - item.price });
    } else {
      alert("Insufficient gold");
    }
  };

  const getGiftItem = () => {
    const updatedList = gift.filter((x) => x.id !== item.id);
    setInventory([...inventory, gift[0]]);
    setGift(updatedList);
  };

  return (
    <Card style={{ width: "11rem" }}>
      <Card.Img variant="top" src={item?.avatar} />
      <Card.Body>
        <Card.Title>{item?.name}</Card.Title>
        <Card.Text>Some quick example text to build.</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Price: {item?.price}</ListGroup.Item>
        <ListGroup.Item>Value: {item?.value}</ListGroup.Item>
        <ListGroup.Item>Type: {item?.type}</ListGroup.Item>
      </ListGroup>
      <Card.Body className="d-grid gap-2">
        {type === "use" && (
          <Button size="sm" onClick={useItem}>
            USE
          </Button>
        )}
        {type === "buy" && (
          <Button size="sm" onClick={buyItem}>
            BUY
          </Button>
        )}
        {type === "get" && (
          <Button size="sm" onClick={getGiftItem}>
            GET
          </Button>
        )}
        <br />
        <code>
          <small>{item?.id}</small>
        </code>
      </Card.Body>
    </Card>
  );
};

export default CardItem;
