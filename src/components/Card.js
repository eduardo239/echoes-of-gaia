import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { PlayerContext } from "../hook/PlayerContext";

const Card = ({ description = "", item }) => {
  const { character, setCharacter, inventory, setInventory } =
    useContext(PlayerContext);

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

  return (
    <div className="card" style={{ width: "11rem" }}>
      <img src={item?.avatar} className="card-img-top" alt={description} />
      <div className="card-body" style={{ height: "100%" }}>
        <div className="d-flex flex-column">
          <p className="card-title">
            <b>{item?.name}</b>
          </p>

          <div style={{ flex: 1 }}>
            <code>
              <small>{item?.id}</small>
            </code>
            <p className="card-text mb-0">Price: {item?.price}</p>
            <p className="card-text mb-0">Value: {item?.value}</p>
            <p className="card-text mb-2">Type: {item?.type}</p>
          </div>

          <div className="d-flex gap-2">
            <button className="btn btn-warning" onClick={useItem}>
              Use
            </button>

            <button className="btn btn-warning" onClick={buyItem}>
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
