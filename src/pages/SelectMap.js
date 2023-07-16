import { useContext } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { PlayerContext } from "../hook/PlayerContext";
import { items, maps } from "../server";
import { SELECT_MAP } from "../constants";
import { generateRandomMap } from "../helper";
import { Item } from "../classes/Item";
import MapForMaps from "../components/map/MapForMaps";

const SelectMap = () => {
  const navigate = useNavigate();
  const { setMap, setShopItems } = useContext(PlayerContext);

  const selectMap = (_map) => {
    const map = generateRandomMap(_map.length);
    setMap(map);

    // preencher a lista de itens da loja
    const shopList = [];
    for (let s = 0; s < items.length; s++) {
      const _item = new Item(
        items[s].name,
        items[s].image,
        items[s].type,
        items[s].class,
        items[s].value,
        items[s].price
      );

      shopList.push(_item);
    }
    setShopItems(shopList);
  };

  return (
    <div>
      <h1>SelectMap</h1>

      <div className="d-flex justify-content-center flex-wrap gap-1">
        {maps && maps.length > 0 && (
          <MapForMaps
            list={maps}
            selectMap={selectMap}
            modalType={SELECT_MAP}
          />
        )}
      </div>

      <div className="d-flex justify-content-center gap-1 m-3">
        <Button onClick={() => navigate("/start-game")}>Start Game</Button>
        <Button onClick={() => navigate("/select-character")}>Back</Button>
      </div>
    </div>
  );
};

export default SelectMap;
