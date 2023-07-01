import { useContext, useEffect, useState } from "react";
import {
  generateRandomItemAndPlaceItems,
  generateRandomNumber,
  getRandomItem,
  rollDice,
} from "../helper";
import { PlayerContext } from "../hook/PlayerContext";
import { useNavigate } from "react-router-dom";
import { items } from "../server";

const StartGame = () => {
  const navigate = useNavigate();
  // hero, hero_inventory
  const { character, setCharacter, inventory, setInventory } =
    useContext(PlayerContext);
  // inimigo de batalha
  const [enemy, setEnemy] = useState(null);
  // gerar um novo mapa
  const [places, setPlaces] = useState(null);
  //
  const [dice, setDice] = useState(0);
  // ui
  const [message, setMessage] = useState("");
  // status da batalha
  const [characterActualPlace, setCharacterActualPlace] = useState(0);
  const [isFighting, setIsFighting] = useState(false);
  const [turn, setTurn] = useState(null);

  // dados
  const rollTheDice = () => {
    // reset da mensagem
    setMessage("");

    const result = rollDice();
    setDice(result);
    // novo local em que o herói irá
    const newPlace = characterActualPlace + result;
    setCharacterActualPlace(newPlace);
    // validar o tipo de local
    const placeType = places[newPlace].type;

    // validar o resultado do local atual
    if (placeType === "potion") {
      setMessage("Potion found");
      // adicionar um potion ao inventário do cliente
      return;
    } else if (placeType === "enemy") {
      setMessage("Enemy found");
      // escolhe aleatoriamente quem vai começar 0 = hero, 1 = enemy
      setIsFighting(true);
      setEnemy(places[newPlace]);

      const turn = generateRandomNumber(0, 1);
      if (turn === 0) {
        setMessage("Hero Time");
        setTurn(1);
      } else {
        setMessage("Enemy Time");
        setTurn(0);
      }

      return;
    } else if (placeType === "treasure") {
      // adicionar um tesouro ao inventário do herói
      setMessage("Foi encontrado um tesouro");
      setInventory({ x: 1 });
      return;
    } else if (placeType === "nothing") {
      // local vazio, nada acontece
      setMessage("");
      return;
    } else if (placeType === "boss") {
      inventory.push("Boss found");
      return;
    }
  };

  const hit = () => {
    if (turn === 0) {
      const damage = generateRandomNumber(
        character.strength,
        character.strength + 45
      );
      // provoca um dano ao inimigo
      setEnemy({ ...enemy, health: enemy.health - damage });
      setTurn(1);
    } else {
      const enemyDamage = generateRandomNumber(
        enemy.strength,
        enemy.strength + 10
      );
      setTimeout(() => {
        // provoca um dano ao herói, após um delay
        setCharacter({ ...character, health: character.health - enemyDamage });
        setTurn(0);
      }, 500);
    }

    if (enemy && enemy.health < 1) {
      winner();
    }
    if (character && character.health < 1) {
      gameOver();
    }
  };

  const getGold = () => {
    const gold = generateRandomNumber(10, 20);
    setCharacter({ ...character, gold: character.gold + gold });
  };
  const getItem = () => {
    const item = getRandomItem(items);
    setInventory([...inventory, item]);
  };

  function getExp(level) {
    const y = 1.65;
    const x = Math.pow(character.level, y);
    setCharacter({ ...character, exp: character.exp + x });
    return x;
  }

  const winner = () => {
    setMessage("Victory!");
    // adiciona experiência ao herói
    getExp();
    // adiciona gold à conta do herói
    getGold();
    // adiciona um item ao herói
    getItem();
    // finaliza o turno de batalha
    setIsFighting(false);
    setTimeout(() => setMessage(""), 1000);
    return;
  };

  const gameOver = () => {
    return;
  };

  useEffect(() => {
    if (isFighting && turn && turn === 1) hit();

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turn, isFighting]);

  useEffect(() => {
    const place = generateRandomItemAndPlaceItems(1000);
    setPlaces(place);
    return () => {
      setPlaces([]);
    };
  }, []);

  return (
    <div>
      <h3>Game</h3>

      {!!character && (
        <div className="d-flex justify-content-start  mb-3 ">
          <div className="card rounded-0 me-3">
            <img className="character-avatar" src={character.avatar} alt="" />
            <div className="card-body">
              <p className="card-text mb-1">HP: {character.health}</p>
              <p className="card-text mb-1">MP: {character.mana}</p>
              <p className="card-text mb-1">XP: {character.exp}</p>
              <p className="card-text mb-1">IT: {inventory.length}</p>
              {isFighting && (
                <div className="d-grid gap-2">
                  <button
                    disabled={turn === 1}
                    type="button"
                    className="btn btn-warning"
                    onClick={hit}
                  >
                    {turn === 1 ? "Enemy Turn" : "Fight"}
                  </button>
                  <button type="button" className="btn btn-warning">
                    Inventory
                  </button>
                </div>
              )}
            </div>
          </div>
          {isFighting && (
            <div className="card rounded-0">
              <img className="character-avatar" src={enemy.avatar} alt="" />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text mb-1">HP: {enemy.health}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {!character && (
        <button
          className="btn btn-info mb-3"
          onClick={() => navigate("/select-character")}
        >
          Back
        </button>
      )}

      {!!character && (
        <button
          disabled={isFighting}
          className="btn btn-info mb-3"
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

      {!!places && places.length > 0 ? (
        places.map((item, index) => (
          <div
            key={index}
            className={
              index === characterActualPlace
                ? "alert alert-success mb-0"
                : "alert alert-light mb-0"
            }
          >
            {index + 1} - {item.name}
          </div>
        ))
      ) : (
        <p>Empty list.</p>
      )}
    </div>
  );
};

export default StartGame;
