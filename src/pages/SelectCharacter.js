import { useNavigate } from "react-router-dom";
import { heroes } from "../server";
import { useContext } from "react";
import { PlayerContext } from "../hook/PlayerContext";
import CharacterCard from "../components/CharacterCard";
import Button from "react-bootstrap/Button";

const SelectCharacter = () => {
  const navigate = useNavigate();
  const { setCharacter } = useContext(PlayerContext);

  const selectCharacter = (item) => {
    setCharacter({ ...item, inventory: { totalItems: 4, items: [] } });
  };
  console.log(heroes);
  return (
    <div>
      <h1>SelectCharacter</h1>
      <div className="d-flex gap-3 justify-content-start">
        {heroes.length > 0 ? (
          heroes.map((item, index) => (
            <CharacterCard character={item} key={index}>
              <Button onClick={() => selectCharacter(item)}>Select</Button>
            </CharacterCard>
          ))
        ) : (
          <p>A lista está vazia.</p>
        )}
      </div>
      <div className="d-flex justify-content-center gap-3 my-3">
        <Button onClick={() => navigate("/")}>Back</Button>
        <Button onClick={() => navigate("/start-game")}>Start Game</Button>
      </div>
    </div>
  );
};

export default SelectCharacter;
