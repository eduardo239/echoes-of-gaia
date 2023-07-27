import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SELECT_HERO } from "../helper/constants";
import { PlayerContext } from "../hook/PlayerContext";
import MapForCharacters from "../components/map/MapForCharacters";
import Button from "react-bootstrap/Button";
import TextTitle from "../components/TextTitle";
import { chooseRandomItem } from "../helper";
import ButtonContainer from "../components/ButtonContainer";

const SelectCharacter = () => {
  const navigate = useNavigate();
  const { heroList, setHeroList, allHeroes, allMagics } =
    useContext(PlayerContext);

  const selectCharacter = (character) => {
    const alreadyChosen = heroList.some((x) => x.id === character.id);
    if (!alreadyChosen) {
      const randomMagic = chooseRandomItem(allMagics);
      character.setMagic([randomMagic]);

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

      <ButtonContainer>
        <Button className="w-123" onClick={() => navigate("/create-player")}>
          Back
        </Button>
        <Button className="w-123" onClick={() => navigate("/select-map")}>
          Next
        </Button>
      </ButtonContainer>

      <div className="d-flex justify-content-center flex-wrap gap-1 mb-3 p-3 bg-light">
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
