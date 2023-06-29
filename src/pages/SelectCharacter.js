import { useNavigate } from "react-router-dom";
import { heroes } from "../server";
import { useContext } from "react";
import { PlayerContext } from "../hook/PlayerContext";

const SelectCharacter = () => {
  const navigate = useNavigate();
  const { character, setCharacter } = useContext(PlayerContext);

  const selectCharacter = (item) => {
    setCharacter({ ...item, inventory: { totalItems: 4, items: [] } });
  };

  return (
    <div>
      <h1>SelectCharacter</h1>
      <div className="d-flex justify-content-start">
        {heroes.length > 0 ? (
          heroes.map((item, index) => (
            <div className="card" key={index}>
              <img className="character-avatar" src={item.avatar} alt="" />
              <button
                onClick={() => selectCharacter(item)}
                className="btn btn-info"
              >
                {item.name}
              </button>
            </div>
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
