import { useContext } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { PlayerContext } from "../hook/PlayerContext";
import { items } from "../helper/server";
import { generateRandomMap } from "../helper";
import { Item } from "../classes/Item";
import MapForMaps from "../components/map/MapForMaps";
import { SELECT_MAP } from "../helper/constants";
import TextTitle from "../components/TextTitle";
import ButtonContainer from "../components/ButtonContainer";

const SelectMap = () => {
  const navigate = useNavigate();
  const { map, setMap, setShopItems, allMaps } = useContext(PlayerContext);

  const selectMap = (selectedMap) => {
    // preencher o map
    const _positions = generateRandomMap(selectedMap.length);
    selectedMap.setPositions(_positions);
    setMap(selectedMap);

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
    <>
      <TextTitle title="Select Map" />

      <ButtonContainer>
        <Button className="w-123" onClick={() => navigate("/select-character")}>
          Back
        </Button>
        <Button
          className="w-123"
          onClick={() => navigate("/start-game")}
          variant="danger"
        >
          Start Game
        </Button>
      </ButtonContainer>

      <div className="d-flex justify-content-center flex-wrap gap-1 mb-3 p-3 bg-light">
        {allMaps && allMaps.length > 0 && (
          <MapForMaps
            list={allMaps}
            selectMap={selectMap}
            modalType={SELECT_MAP}
            selectedMap={[map]}
          />
        )}
      </div>
    </>
  );
};

export default SelectMap;
