import ListGroup from "react-bootstrap/ListGroup";

const MapForQueue = ({ list }) => {
  const map_for_items = () => {
    return list.map((character, index) => (
      <ListGroup.Item key={index}>
        {index} - {character && character.name}
      </ListGroup.Item>
    ));
  };

  return <ListGroup>{list && list.length > 0 && map_for_items()}</ListGroup>;
};

export default MapForQueue;
