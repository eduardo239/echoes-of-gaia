import ListGroup from "react-bootstrap/ListGroup";
import { HERO } from "../../constants";

const MapForQueue = ({ list, firstInTheQueue }) => {
  const map_for_items = () => {
    return list.map((character, index) => (
      <ListGroup.Item
        key={index}
        className={
          character.type === HERO
            ? "list-item-hero"
            : firstInTheQueue?.id === character.id && character.type === HERO
            ? "list-item-hero list-item-hero__first"
            : "list-item-enemy"
        }
      >
        {/* FIXME: primeiro da lista */}
        {index} - {character && character.name}
      </ListGroup.Item>
    ));
  };

  return <ListGroup>{list && list.length > 0 && map_for_items()}</ListGroup>;
};

export default MapForQueue;
