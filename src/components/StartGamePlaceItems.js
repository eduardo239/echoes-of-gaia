const StartGamePlaceItems = ({ places, characterActualPlace }) => {
  return (
    <ul className="list-of-positions">
      {!!places && places.length > 0 ? (
        places.map((item, index) => (
          <li
            key={index}
            className={
              index === characterActualPlace
                ? "active"
                : index < characterActualPlace + 1
                ? "none"
                : ""
            }
          >
            {index + 1} - {item.name}
          </li>
        ))
      ) : (
        <p>Empty list.</p>
      )}
    </ul>
  );
};

export default StartGamePlaceItems;
