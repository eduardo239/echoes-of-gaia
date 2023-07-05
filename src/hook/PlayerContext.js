import React, { createContext, useState } from "react";

const PlayerContext = createContext();

function PlayerContextProvider({ children }) {
  const [gift, setGift] = useState([]);

  // new
  const [character, setCharacter] = useState(null);
  const [inventory, setInventory] = useState([]);

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
