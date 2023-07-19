import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { heroes } from "../server";
import { SELECT_HERO } from "../constants";
import { PlayerContext } from "../hook/PlayerContext";
import MapForCharacters from "../components/map/MapForCharacters";
import Button from "react-bootstrap/Button";
import { Hero } from "../classes/Hero";

const SelectCharacter = () => {
  const navigate = useNavigate();

  const { heroList, setHeroList } = useContext(PlayerContext);
  //
  const [loadedHeroes, setLoadedHeroes] = useState([]);

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

  const loadCharacters = () => {
    const _newArray = [];

    heroes.forEach((hero) => {
      _newArray.push(
        new Hero(
          hero.name,
          hero.image,
          hero.type,
          hero.level,
          hero.class,
          hero.strength,
          hero.intelligence,
          hero.hp,
          hero.maxHp,
          hero.mp,
          hero.maxMp,
          hero.weapon
        )
      );
    });

    setLoadedHeroes(_newArray);
  };

  useEffect(() => {
    loadCharacters();

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>SelectCharacter</h1>

      <div className="d-flex justify-content-center flex-wrap gap-1">
        {loadedHeroes && loadedHeroes.length > 0 && (
          <MapForCharacters
            list={loadedHeroes}
            modalType={SELECT_HERO}
            removeCharacter={removeCharacter}
            selectCharacter={selectCharacter}
            selectedCharacter={heroList}
          />
        )}
      </div>

      <div className="d-flex justify-content-center gap-1 m-3">
        <Button onClick={() => navigate("/select-map")}>Select Map</Button>
        <Button onClick={() => navigate("/")}>Back</Button>
      </div>
    </div>
  );
};

export default SelectCharacter;
