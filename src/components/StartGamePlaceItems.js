import ListGroup from "react-bootstrap/ListGroup";

const StartGamePlaceItems = ({ places, characterActualPlace }) => {
  return (
    <ListGroup className="list-of-positions">
      {!!places && places.length > 0 ? (
        places.map((item, index) => (
          <ListGroup.Item
            key={index}
            className={
              index === characterActualPlace
                ? "active"
                : index < characterActualPlace - 1
                ? "none"
                : ""
            }
          >
            {index + 1} - {item.name}
          </ListGroup.Item>
        ))
      ) : (
        <p>Empty list.</p>
      )}
    </ListGroup>
  );
};

export default StartGamePlaceItems;
