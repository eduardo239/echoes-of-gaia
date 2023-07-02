import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { PlayerContext } from "../hook/PlayerContext";

const Card = ({ type = null, item }) => {
  const { character, setCharacter, inventory, setInventory, gift, setGift } =
    useContext(PlayerContext);

  const useItem = () => {
    if (item.type === "heal") {
      // valida a quantidade máxima de vida, para não ultrapassar o limite
      if (character.health + item.value < character.maxHealth) {
        setCharacter({ ...character, health: character.health + item.value });
      } else {
        setCharacter({ ...character, health: character.maxHealth });
      }
    } else if (item.type === "mana") {
      // valida a quantidade máxima de vida, para não ultrapassar o limite
      if (character.mana + item.value < character.maxMana) {
        setCharacter({ ...character, mana: character.mana + item.value });
      } else {
        setCharacter({ ...character, mana: character.maxMana });
      }
    } else if (item.type === "poison") {
      setCharacter({ ...character, strength: character.strength + item.value });
    } else if (item.type === "gold") {
      setCharacter({ ...character, gold: character.gold + item.value });
    } else if (item.type === "gem") {
      setCharacter({ ...character, gold: character.gold + item.value });
    }
    // remove o item da lista
    const updatedList = inventory.filter((x) => x.id !== item.id);
    setInventory(updatedList);
  };

  const buyItem = () => {
    if (character.gold > item.price) {
      const purchasedItem = { ...item };
      purchasedItem.id = uuidv4();
      setInventory([...inventory, purchasedItem]);
      setCharacter({ ...character, gold: character.gold - item.price });
    } else {
      console.log("Insufficient gold");
    }
  };

  const getGiftItem = () => {
    setInventory([...inventory, item]);
    setGift([]);
  };

  return (
    <div className="rpg-card">
      <img src={item?.avatar} alt={item?.description} className="card-image" />
      <div className="card-content">
        <h2 className="card-title mb-2">
          <b>{item?.name}</b>
        </h2>
        <div className="card-description">
          <p>Price: {item?.price}</p>
          <p>Value: {item?.value}</p>
          <p>Type: {item?.type}</p>
        </div>
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
            <button className="card-button" onClick={getGiftItem}>
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
