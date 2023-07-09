import ListGroup from "react-bootstrap/ListGroup";

const MapForPositions = ({ list, position }) => {
  const map_for_items = () => {
    return list.map((local, index) => (
      <ListGroup.Item
        key={index}
        className={
          position === index ? " active" : position - 1 > index ? "none" : ""
        }
      >
        {index} -{" "}
        {local.length === 1 ? local[0].type : local.map((i) => i.type + " ")}
      </ListGroup.Item>
    ));
  };

  return <ListGroup>{list && list.length > 0 && map_for_items()}</ListGroup>;
};

export default MapForPositions;
