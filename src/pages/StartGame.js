import { useContext, useEffect, useState } from "react";
import {
  generateRandomItemAndPlaceItems,
  generateRandomNumber,
  rollDice,
} from "../helper";
import { PlayerContext } from "../hook/PlayerContext";

import { useNavigate } from "react-router-dom";

const StartGame = () => {
  const navigate = useNavigate();
  const { character } = useContext(PlayerContext);

  const [places, setPlaces] = useState(null);
  const [characterActualPlace, setCharacterActualPlace] = useState(0);
  const [dice, setDice] = useState(0);
  const [message, setMessage] = useState("");
  const [enemy, setEnemy] = useState(null);
  const [isFighting, setIsFighting] = useState(false);
  const [turn, setTurn] = useState(null);

  const rollTheDice = () => {
    // reset
    setMessage("");

    const result = rollDice();
    setDice(result);
    const newPlace = characterActualPlace + result;
    setCharacterActualPlace(newPlace);

    const placeType = places[newPlace].type;
    const inventory = character.inventory.items;

    // validar o resultado do local atual
    if (placeType === "potion") {
      setMessage("Potion found");
      //
      inventory.push("Potion");
      return;
    } else if (placeType === "enemy") {
      setMessage("Enemy found");
      //
      const turn = generateRandomNumber(0, 1);
      setEnemy(places[newPlace]);
      setIsFighting(true);

      if (turn === 0) setTurn("hero");
      else setTurn("enemy");

      return;
    } else if (placeType === "treasure") {
      setMessage("Treasure found");
      //
      return;
    } else if (placeType === "nothing") {
      setMessage("Nothing");
      //
      return;
    } else if (placeType === "boss") {
      inventory.push("boss");
      return;
    }
  };

  const hitEnemy = () => {
    const damage = generateRandomNumber(
      character.strength + 1,
      character.strength + 10
    );
    console.log("damage " + damage);
    setEnemy({ ...enemy, health: enemy.health - damage });
  };

  useEffect(() => {
    console.log(character);
    console.log(enemy);
    if (isFighting && turn) {
      if (enemy.health <= 0) {
        setMessage("Hero Win");
        setIsFighting(false);
      }
    }

    return () => {};
  }, [character, enemy, isFighting, turn, characterActualPlace]);

  useEffect(() => {
    const items = generateRandomItemAndPlaceItems(1000);
    setPlaces(items);
    return () => {};
  }, []);

  return (
    <div>
      <h3>Game</h3>

      {!character && (
        <button
          className="btn btn-info"
          onClick={() => navigate("/select-character")}
        >
          Back
        </button>
      )}

      {!!character && (
        <div className="d-flex justify-content-start">
          <div className="card">
            <img className="character-avatar" src={character.avatar} alt="" />
          </div>
        </div>
      )}

      {!!character && (
        <button
          disabled={isFighting}
          className="btn btn-info"
          onClick={rollTheDice}
        >
          Roll The Dice {dice}
        </button>
      )}

      {!!message && (
        <p className="alert alert-light" role="alert">
          {message}
        </p>
      )}

      {isFighting && (
        <div>
          <div className="d-flex justify-content-start">
            <div className="card" style={{ width: "180px" }}>
              <img className="character-avatar" src={character.avatar} alt="" />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text mb-1">HP: {character.health}</p>
                <p className="card-text mb-1">MP: {character.mana}</p>

                <div className="d-grid gap-2">
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={hitEnemy}
                  >
                    Fight
                  </button>
                  <button type="button" className="btn btn-warning">
                    Inventory
                  </button>
                </div>
              </div>
            </div>

            <div className="card">
              <img className="character-avatar" src={enemy.avatar} alt="" />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text mb-1">HP: {enemy.health}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {!!places && places.length > 0 ? (
        places.map((item, index) => (
          <div key={index} className="alert alert-dark mb-0">
            {item.name} {index === characterActualPlace ? "You are here" : ""}
          </div>
        ))
      ) : (
        <p>A lista está vazia.</p>
      )}
    </div>
  );
};

export default StartGame;
