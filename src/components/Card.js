import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { PlayerContext } from "../hook/PlayerContext";

const Card = ({ type = null, item }) => {
  const { character, setCharacter, inventory, setInventory } =
    useContext(PlayerContext);
  const [collectedTreasure, setCollectedTreasure] = useState(false);

  const useItem = () => {
    if (item.type === "heal") {
      // valida a quantidade máxima de vida, para não ultrapassar o limite
      if (character.health + item.value < character.maxHealth) {
        setCharacter({ ...character, health: character.health + item.value });
      } else {
        setCharacter({ ...character, health: character.maxHealth });
      }
    } else if (item.type === "poison") {
      setCharacter({ ...character, strength: character.strength + item.value });
    }
    // remove o item da lista
    const updatedList = inventory.filter((x) => x.id !== item.id);
    setInventory(updatedList);
  };

  const buyItem = () => {
    const purchasedItem = { ...item };
    purchasedItem.id = uuidv4();
    setInventory([...inventory, purchasedItem]);
  };

  const getGiftItem = () => {
    setInventory([...inventory, item]);
    setCollectedTreasure(true);
  };

  return (
    <div className="rpg-card">
      <img src={item?.avatar} alt={item?.description} className="card-image" />
      <div className="card-content">
        <h2 className="card-title mb-2">
          <b>{item?.name}</b>
        </h2>

        <p className="card-description">Price: {item?.price}</p>
        <p className="card-description">Value: {item?.value}</p>
        <p className="card-description">Type: {item?.type}</p>

        <div className="d-flex gap-2 mt-3">
          {type === "use" && (
            <button className="card-button" onClick={useItem}>
              USE
            </button>
          )}
          {type === "buy" && (
            <button className="card-button" onClick={buyItem}>
              BUY
            </button>
          )}
          {type === "get" && (
            <button
              disabled={collectedTreasure}
              className={
                collectedTreasure ? "card-button disabled" : "card-button"
              }
              onClick={getGiftItem}
            >
              GET
            </button>
          )}
        </div>

        <code>
          <small>{item?.id}</small>
        </code>
      </div>
    </div>
  );
};

export default Card;
