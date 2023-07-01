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
      //
      return;
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
    <div className="card" style={{ width: "10rem" }}>
      <img src={item?.avatar} className="card-img-top" alt={description} />
      <div className="card-body">
        <h5 className="card-title">{item?.name}</h5>
        <p className="card-text">Text item 1</p>
        <p className="card-text">Text item 2</p>
        <div className="d-grid gap-2">
          <button className="btn btn-warning" onClick={useItem}>
            Use
          </button>

          <button className="btn btn-warning" onClick={buyItem}>
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
