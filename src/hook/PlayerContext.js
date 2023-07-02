import React, { createContext, useState } from "react";

const PlayerContext = createContext();

function PlayerContextProvider({ children }) {
  const [character, setCharacter] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [gift, setGift] = useState([]);

  return (
    <PlayerContext.Provider
      value={{
        character,
        setCharacter,
        inventory,
        setInventory,
        gift,
        setGift,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export { PlayerContextProvider, PlayerContext };
