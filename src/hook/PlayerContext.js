import React, { createContext, useState } from "react";

const PlayerContext = createContext();

function PlayerContextProvider({ children }) {
  const [gift, setGift] = useState([]);

  // new
  const [character, setCharacter] = useState(null);
  const [inventory, setInventory] = useState([]);

  // new
  const [heroList, setHeroList] = useState([]);
  const [enemyList, setEnemyList] = useState([]);
  const [map, setMap] = useState(null);
  const [mapSettings, setMapSettings] = useState(null);
  const [shopItems, setShopItems] = useState([]);

  return (
    <PlayerContext.Provider
      value={{
        character,
        setCharacter,
        inventory,
        setInventory,
        gift,
        setGift,
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
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export { PlayerContextProvider, PlayerContext };
