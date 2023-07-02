import { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  generateRandomItemAndPlaceItems,
  generateRandomNumber,
  getRandomItem,
  rollDice,
} from "../helper";
import { PlayerContext } from "../hook/PlayerContext";
import { useNavigate } from "react-router-dom";
import { items, treasures } from "../server";
import CharacterCard from "../components/CharacterCard";
import ModalItems from "../components/ModalItems";
import CharacterCardFightOptions from "../components/CharacterCardFightOptions";
import StartGameOptions from "../components/StartGameOptions";
import StartGamePlaceItems from "../components/StartGamePlaceItems";

const StartGame = () => {
  const navigate = useNavigate();
  // hero, hero_inventory
  const { character, setCharacter, inventory, gift, setGift } =
    useContext(PlayerContext);
  // inimigo de batalha
  const [enemy, setEnemy] = useState(null);
  // gerar um novo mapa
  const [places, setPlaces] = useState(null);
  // game
  const [dice, setDice] = useState(0);
  // ui
  const [message, setMessage] = useState("");
  // status da batalha
  const [characterActualPlace, setCharacterActualPlace] = useState(0);
  const [isFighting, setIsFighting] = useState(false);
  const [turn, setTurn] = useState(null);
  // toast mensagem

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
      getTreasure();
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
        character.strength + 50
      );
      // provoca um dano ao inimigo
      setEnemy({ ...enemy, health: enemy.health - damage });
      setTurn(1);
    } else {
      if (enemy.health > 0) {
        const enemyDamage = generateRandomNumber(
          enemy.strength,
          enemy.strength + 10
        );
        setTimeout(() => {
          // provoca um dano ao herói, após um delay
          setCharacter({
            ...character,
            health: character.health - enemyDamage,
          });
          setTurn(0);
        }, 500);
      } else {
      }
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

  const getTreasure = () => {
    const item = getRandomItem(treasures);
    const giftTreasure = { ...item };
    giftTreasure.id = uuidv4();
    setGift([...gift, giftTreasure]);
  };

  const getItem = () => {
    const item = getRandomItem(items);
    const giftItem = { ...item };
    giftItem.id = uuidv4();
    setGift([...gift, giftItem]);
  };

  function getExp() {
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
    setTurn(null);
    setTimeout(() => setMessage(""), 1000);
    return;
  };

  const gameOver = () => {
    return;
  };

  useEffect(() => {
    if (isFighting && turn && turn === 1) {
      hit();
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turn, isFighting]);

  useEffect(() => {
    // gera um novo mapa com locais gerados aleatoriamente
    const place = generateRandomItemAndPlaceItems(1000);
    setPlaces(place);
    return () => {
      setPlaces([]);
    };
  }, []);

  return (
    <div className="container ">
      <div className="row">
        {message && <code>{message}</code>}
        <div className="col-sm-6">
          {!character && (
            <button
              className="btn btn-info mb-3"
              onClick={() => navigate("/select-character")}
            >
              Back
            </button>
          )}

          {!!character && (
            <div className="d-flex justify-content-start mb-3">
              <CharacterCard character={character}>
                {isFighting && (
                  <CharacterCardFightOptions turn={turn} hit={hit} />
                )}
              </CharacterCard>
              {isFighting && <CharacterCard character={enemy}></CharacterCard>}
            </div>
          )}
        </div>

        <div className="col-sm-6">
          {!!character && (
            <StartGameOptions
              dice={dice}
              rollTheDice={rollTheDice}
              isFighting={isFighting}
              gift={gift}
            />
          )}

          <StartGamePlaceItems
            characterActualPlace={characterActualPlace}
            places={places}
          />

          {/* inventory */}
          <ModalItems
            id="inventoryModal"
            type="use"
            title="Inventory"
            character={character}
            items={inventory}
          />
          {/* shop */}
          <ModalItems
            id="shopModal"
            type="buy"
            title="Shop"
            character={character}
            items={items}
          />
          {/* winner */}

          <ModalItems
            id="giftModal"
            type="get"
            title="Winner"
            character={character}
            items={gift}
          />
        </div>
      </div>
    </div>
  );
};

export default StartGame;
