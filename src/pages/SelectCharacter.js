import { useNavigate } from "react-router-dom";
import { heroes } from "../server";
import { useContext } from "react";
import { PlayerContext } from "../hook/PlayerContext";
import CharacterCard from "../components/CharacterCard";

const SelectCharacter = () => {
  const navigate = useNavigate();
  const { setCharacter } = useContext(PlayerContext);

  const selectCharacter = (item) => {
    setCharacter({ ...item, inventory: { totalItems: 4, items: [] } });
  };

  return (
    <div>
      <h1>SelectCharacter</h1>
      <div className="d-flex justify-content-start">
        {heroes.length > 0 ? (
          heroes.map((item, index) => (
            <CharacterCard character={item} key={index}>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-warning"
                  onClick={() => selectCharacter(item)}
                >
                  Select
                </button>
              </div>
            </CharacterCard>
          ))
        ) : (
          <p>A lista está vazia.</p>
        )}
      </div>

      <button className="btn btn-info" onClick={() => navigate("/")}>
        Back
      </button>
      <button className="btn btn-info" onClick={() => navigate("/start-game")}>
        Start Game
      </button>
    </div>
  );
};

export default SelectCharacter;
