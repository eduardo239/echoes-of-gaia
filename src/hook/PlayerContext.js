import React, { createContext, useEffect, useState } from "react";
import { heroes, maps } from "../server";
import { Hero } from "../classes/Hero";
import { Map_ } from "../classes/Map_";

const PlayerContext = createContext();

function PlayerContextProvider({ children }) {
  const [player, setPlayer] = useState(null);
  const [heroList, setHeroList] = useState([]);
  const [enemyList, setEnemyList] = useState([]);
  const [map, setMap] = useState(null);
  const [mapSettings, setMapSettings] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [shopItems, setShopItems] = useState([]);
  const [battleQueue, setBattleQueue] = useState([]);
  const [giftItemList, setGiftItemList] = useState([]);
  //
  const [toastMessage, setToastMessage] = useState({
    date: null,
    title: "Title",
    message: "",
    type: "success",
  });
  //
  const [allHeroes, setAllHeroes] = useState([]);
  const [allMaps, setAllMaps] = useState([]);

  const loadAllHeroes = () => {
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
    setAllHeroes(_newArray);
  };

  const loadAllMaps = () => {
    const newMapList = [];
    maps.forEach((map) => {
      newMapList.push(
        new Map_(map.name, map.length, map.difficulty, map.image)
      );
    });
    setAllMaps(newMapList);
  };

  useEffect(() => {
    loadAllHeroes();
    loadAllMaps();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        player,
        setPlayer,
        inventory,
        setInventory,
        battleQueue,
        setBattleQueue,
        heroList,
        setHeroList,
        map,
        setMap,
        mapSettings,
        setMapSettings,
        enemyList,
        setEnemyList,
        shopItems,
        setShopItems,
        giftItemList,
        setGiftItemList,
        toastMessage,
        setToastMessage,

        allHeroes,
        allMaps,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export { PlayerContextProvider, PlayerContext };
