import { useContext, useEffect, useState } from "react";
import { generateRandomItemAndPlaceItems, rollDice } from "../helper";
import { PlayerContext } from "../hook/PlayerContext";

const StartGame = () => {
  const { character } = useContext(PlayerContext);

  const [places, setPlaces] = useState(null);
  const [characterActualPlace, setCharacterActualPlace] = useState(0);
  const [dice, setDice] = useState(0);

  const rollTheDice = () => {
    const result = rollDice();
    setDice(result);
    setCharacterActualPlace(characterActualPlace + result);
  };

  useEffect(() => {
    const items = generateRandomItemAndPlaceItems();
    setPlaces(items);
    return () => {};
  }, []);

  return (
    <div>
      <h1>Game</h1>

      {!!character && (
        <div className="d-flex justify-content-start">
          <div className="card">
            <img className="character-avatar" src={character.avatar} alt="" />
          </div>
        </div>
      )}

      <div>
        <h3>dice</h3>
        <button className="btn btn-info" onClick={rollTheDice}>
          Roll The Dice {dice}
        </button>
      </div>

      {!!places && places.length > 0 ? (
        places.map((item, index) => (
          <div key={index}>
            <p>
              {item.type} {index === characterActualPlace ? "You are here" : ""}
            </p>
          </div>
        ))
      ) : (
        <p>A lista está vazia.</p>
      )}
    </div>
  );
};

export default StartGame;
