import React, { createContext, useEffect, useRef, useState } from "react";
import { heroes, maps, magics } from "../helper/server";
import { Hero } from "../classes/Hero";
import { Map_ } from "../classes/Map_";
import { Magic } from "../classes/Magic";
import { INFO } from "../helper/constants";

const PlayerContext = createContext();

function PlayerContextProvider({ children }) {
  const refToast = useRef(null);

  const [player, setPlayer] = useState(null);
  const [heroList, setHeroList] = useState([]);
  const [enemyList, setEnemyList] = useState([]);
  const [map, setMap] = useState(null);
  const [mapSettings, setMapSettings] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [inventoryByType, setInventoryByType] = useState([]);
  const [shopItems, setShopItems] = useState([]);
  const [battleQueue, setBattleQueue] = useState([]);
  const [giftItemList, setGiftItemList] = useState([]);
  //
  const [allHeroes, setAllHeroes] = useState([]);
  const [allMaps, setAllMaps] = useState([]);
  const [allMagics, setAllMagics] = useState([]);
  //
  const [isGameWasRestarted, setIsGameWasRestarted] = useState(false);
  //
  const toastDefault = { message: "", show: false, type: INFO };
  const [toast, setToast] = useState(toastDefault);

  const resetToast = () => {
    setToast(toastDefault);
  };

  useEffect(() => {
    if (refToast.current) {
      setTimeout(() => {
        // setToast(toastDefault);
      }, 1000);
    }
    return () => {};
  }, [toast]);

  const loadAllMagics = () => {
    const _newArray = [];

    magics.forEach((magic) => [
      _newArray.push(
        new Magic(magic.name, magic.value, magic.mp, magic.type, magic.image)
      ),
    ]);
    setAllMagics(_newArray);
  };

  const loadAllHeroes = () => {
    const _newArray = [];

    heroes.forEach((hero) => {
      _newArray.push(
        new Hero(
          hero.name,
          hero.image,
          hero.type,
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
    maps.forEach((map, index) => {
      if (index === 0) {
        newMapList.push(
          new Map_(map.name, map.length, map.difficulty, map.image, true)
        );
      } else {
        newMapList.push(
          new Map_(map.name, map.length, map.difficulty, map.image, false)
        );
      }
    });

    setAllMaps(newMapList);
  };

  useEffect(() => {
    loadAllHeroes();
    loadAllMaps();
    loadAllMagics();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGameWasRestarted]);

  return (
    <PlayerContext.Provider
      value={{
        player,
        setPlayer,
        inventory,
        setInventory,
        inventoryByType,
        setInventoryByType,
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

        allHeroes,
        allMaps,
        allMagics,

        setIsGameWasRestarted,

        toast,
        setToast,
        refToast,
        resetToast,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export { PlayerContextProvider, PlayerContext };
