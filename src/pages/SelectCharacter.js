import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SELECT_HERO } from "../constants";
import { PlayerContext } from "../hook/PlayerContext";
import MapForCharacters from "../components/map/MapForCharacters";
import Button from "react-bootstrap/Button";
import TextTitle from "../components/TextTitle";

const SelectCharacter = () => {
  const navigate = useNavigate();
  const { heroList, setHeroList, allHeroes } = useContext(PlayerContext);

  const selectCharacter = (character) => {
    const alreadyChosen = heroList.some((x) => x.id === character.id);
    if (!alreadyChosen) {
      setHeroList([...heroList, character]);
    }
  };
  const removeCharacter = (character) => {
    const newList = heroList.filter((x) => x.id !== character.id);
    setHeroList(newList);
  };

  return (
    <>
      <TextTitle title="Select Characters" />

      <div className="d-flex justify-content-center gap-1 m-3">
        <Button onClick={() => navigate("/create-player")}>Back</Button>
        <Button onClick={() => navigate("/select-map")}>Next</Button>
      </div>

      <div className="d-flex justify-content-center flex-wrap gap-1">
        {allHeroes && allHeroes.length > 0 && (
          <MapForCharacters
            list={allHeroes}
            modalType={SELECT_HERO}
            removeCharacter={removeCharacter}
            selectCharacter={selectCharacter}
            selectedCharacter={heroList}
          />
        )}
      </div>
    </>
  );
};

export default SelectCharacter;
