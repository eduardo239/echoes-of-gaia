import React, { createContext, useState } from "react";

const PlayerContext = createContext();

function PlayerContextProvider({ children }) {
  const [character, setCharacter] = useState(null);
  const [inventory, setInventory] = useState([]);

  return (
    <PlayerContext.Provider
      value={{ character, setCharacter, inventory, setInventory }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export { PlayerContextProvider, PlayerContext };
