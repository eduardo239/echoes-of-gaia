import ListGroup from "react-bootstrap/ListGroup";
import { BOSS, EMPTY, ENEMY, ITEM } from "../../constants";

const MapForPositions = ({ list, position }) => {
  const map_for_items = () => {
    return (
      list &&
      list.length > 0 &&
      list.map((local, index) => (
        <ListGroup.Item
          key={index}
          className={`${
            position === index ? " active" : position - 1 > index ? "none" : ""
          } ${
            local[0].type === ITEM
              ? "position-item"
              : local[0].type === ENEMY
              ? "position-enemy"
              : local[0].type === EMPTY
              ? "position-empty"
              : local[0].type === BOSS
              ? "position-boss"
              : ""
          }`}
        >
          {index} -{" "}
          {local.length === 1 ? local[0].type : local.map((i) => i.name + " ")}
        </ListGroup.Item>
      ))
    );
  };

  return <ListGroup>{list && list.length > 0 && map_for_items()}</ListGroup>;
};

export default MapForPositions;
