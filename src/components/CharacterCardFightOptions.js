import Button from "react-bootstrap/Button";

const CharacterCardFightOptions = ({ turn, hit }) => {
  return (
    <div className="d-grid gap-2">
      <Button disabled={turn === 1} size="sm" onClick={hit}>
        {turn === 1 ? "Enemy Turn" : "Fight"}
      </Button>
      <Button size="sm">Inventory</Button>
    </div>
  );
};

export default CharacterCardFightOptions;
